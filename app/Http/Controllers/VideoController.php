<?php

namespace App\Http\Controllers;

use App\Genre;
use App\Package;
use App\Traits\WistiaTrait;
use App\Transaction;
use App\UserVideoWatchLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;
use App\Video;
use App\VideoPolicy;
use Carbon\Carbon;

class VideoController extends Controller
{
    use WistiaTrait;

    public function mediaStatusUpdate(Request $request)
    {
        $user_id = Auth::user()->id;

        $data = $request->all();
        $mediaId = $request['id'];
        $status = $data['status'];

        Video::where('id', $mediaId)->update(['status' => $status]);

        return response()->json($this->_myVideosData($user_id, false));
    }

    public function viewVideo($iframe, $id)
    {
        // Get the currently authenticated user's ID...
        $user_id = Auth::id();

        $video = Video::where(['id' => $id, 'user_id' => $user_id, 'wistia->id' => $iframe])->first();
        if (empty($video)) {
            return redirect()->back();
        }

        $genres = Genre::all();
        return view('client.video-edit', ['video' => $video, 'genres' => $genres]);
    }

    public function updateVideoInfo(Request $request)
    {
        $data = $request->all();

        $userId = Auth::user()->id;

        $updated = Video::where(['id' => $data['id'], 'user_id' => $userId])->update([
            'title' => $data['title'],
            'artistname' => $data['artist'],
            'genres' => $data['genre'],
            'director' => $data['directedBy'],
            'producer' => $data['producedBy'],
            'recordlabel' => $data['label'],
            'featuredartist' => $data['composers'],
        ]);
        if ($updated) {
            return response()->json(['status' => true, 'message' => 'Video Information Updated Successfully!']);
        }

        return response()->json(['status' => false, 'message' => 'Video Information Update Failed!']);
    }

    public function mediaDelete(Request $request)
    {
        $data = $request->all();
        $mediaId = $data['id'];
        $mediaHashId = $data['hashId'];

        // video content deleting from local db
        Video::where('id', $mediaId)->delete();

        //Checking transaction for the video
        $transaction = Transaction::where(['product_id' => $mediaId])->count();

        if ($transaction == 0) { // Video will be deleting from wistia only for transaction = 0
            //.
            $client = new Client(['base_uri' => env('WISTIA_API_URL')]);

            $response = $client->request('DELETE', "medias/$mediaHashId.json", [
                'auth' => ['api', env('WISTIA_API_KEY')],
            ]);

            //$return_result = json_decode($response->getBody(), true);
            //TODO:: Have to introduce slack notification if any error message found.
        }

        $user_id = Auth::user()->id;
        return response()->json($this->_myVideosData($user_id, false));
    }

    public function myVideo()
    {
        $userType = Auth::user()->user_type;

        // user type 1 = fan user and 2 = artist user
        if ($userType == 1) {
            return redirect()->back();
        }
        return view('client.video');
    }

    public function myVideos()
    {
        $userData = Auth::user();

        $user_id = $userData->id;

        $videos_data = $this->_myVideosData($user_id, false);

        return response()->json($videos_data);
    }

    private function _myVideosData($user_id, $groupBy = true)
    {
        $videos = Video::with('earningTransactionTotal')->where('user_id', $user_id)
            ->select(DB::raw("videos.created_at,videos.publish_date,videos.id,videos.title,videos.artistname,videos.status,videos.image,videos.description,videos.hash_id,videos.views,genres.genre as genres_name,DATE_FORMAT(videos.created_at,'%M %d,%Y') as created_date,DATE_FORMAT(videos.publish_date,'%M %d,%Y') as published_at"))
            ->join('genres', 'genres.id', '=', 'videos.genres')
            ->latest('videos.created_at')
            ->get();

        if ($groupBy) {
            return collect($videos)->groupBy('created_date');
        }
        return collect($videos);
    }

    public function uploadVideo(Request $request)
    {
        $data = $request->all();
        $userId = Auth::user()->id;

        $limitCheck = $this->videoLimitCheck($request, true);
        if (empty($limitCheck['status'] == 'error')) {
            return response()->json($limitCheck);
        }

        $hashId = $data['wistia']['id'];
        $image = $data['wistia']['thumbnail']['url'];

        Video::create([
            'title' => $data['title'],
            'user_id' => $userId,
            'artistname' => $data['artist'],
            'genres' => isset($data['primary_genre']) ? $data['primary_genre'] : 1,
            'maingenres' => isset($data['primary_genre']) ? $data['primary_genre'] : 1,
            'wistia' => json_encode($data['wistia']),
            'videotype' => $data['type'],
            'hash_id' => $hashId,
            'image' => $image,
            'size' => ($data['size'] / 1000) / 1000, // bytes to MB
            'views' => 0,
            'status' => 1,
        ]);

        return response()->json(['status' => 'success', 'message' => 'Successfully video inserted into local db']);
    }

    public function videoLimitCheck(Request $request, $internalCall = false)
    {
        $data = $request->all();
        $userInfo = Auth::user();
        $userId = $userInfo->id;
        $packageId = $userInfo->package_id;

        $packageInfo = Package::find($packageId);
        $monthlyUpload = (int) $packageInfo->monthly_upload;
        $packageStorage = (int) $packageInfo->total_storage;

        if (empty($data['precheck'])) $mediaSize = ($data['size'] / 1000) / 1000; // byte to MB

        // First day of this month
        $startDate = new Carbon('first day of this month');
        $toDate = Carbon::now();

        // default message
        $arr = ['status' => 'success', 'message' => "Everything is fine"];

        // Monthly video limit
        $videoQty = Video::where(['user_id' => $userId])
            ->whereBetween('created_at', [$startDate, $toDate])
            ->count();

        if ($monthlyUpload <= $videoQty) {
            $arr = [
                'status' => 'error',
                'message' => "You can't upload any video in this month as you already reached your limit!, Please check your subscription details",
                'qty' => $videoQty, 'package_limit' => $monthlyUpload
            ];
        }

        // Total Storage Limit
        $totalStorage = Video::where(['user_id' => $userId])->sum('size');
        if (empty($data['precheck'])) $totalStorage = $totalStorage + $mediaSize;

        if ($totalStorage > $packageStorage) {
            $arr = [
                'status' => 'error',
                'message' => "You're trying to cross total storage along with the video! Please check your subscription details",
                'total_storage' => $totalStorage, 'package_storage' => $packageStorage
            ];
        }

        if ($internalCall) {
            return $arr;
        }

        return response()->json($arr);
    }

    public function getVideoStats($hashId)
    {
        $video = Video::where('hash_id', $hashId)->first();

        if (empty($video)) {
            return response()->json(['status' => false, 'message' => 'Wrong Media URL. Please Try with a Correct One!', 'data' => []]);
        }
        $videoStats = WistiaTrait::getVideoStats($hashId);

        if (!empty($videoStats) && !empty(json_decode($videoStats, true)['stats'])) {
            return response()->json([
                'status' => true,
                'message' => 'Video Statistics Data Found!',
                'data' => [
                    'video' => $video,
                    'stats' => json_decode($videoStats, true)['stats']
                ]
            ]);
        }

        return response()->json(['status' => false, 'message' => 'Video Statistics Data Not Found!', 'data' => []]);
    }

    public function VideoStates($mediaHashId)
    {
        $client = new Client(['base_uri' => env('WISTIA_API_URL')]);

        $response = $client->request('GET', "medias/$mediaHashId/stats.json", [
            'auth' => ['api', env('WISTIA_API_KEY')],
        ]);

        $return_result = json_decode($response->getBody(), true);

        if (is_array($return_result)) {
            return response()->json($return_result);
        }
        return [];
    }

    public function viewTransaction($hashId, $videoId)
    {
        // Get the currently authenticated user's ID...
        $user_id = Auth::id();

        $video = Video::where(['id' => $videoId, 'user_id' => $user_id, 'wistia->id' => $hashId])->first();
        if (empty($video)) {
            return redirect()->back();
        }

        $transaction = Transaction::where(['product_id' => $videoId, 'wallet_type' => 2])
            ->select('transactions.id', 'transactions.amount', 'transactions.created_at')
            ->groupBy('transactions.id')
            ->get();
        $transaction = collect($transaction)->groupBy('id');

        return view('client.transaction', ['videoInfo' => $video, 'transactions' => $transaction]);
    }

    public function upload()
    {
        $genresData = Genre::all();
        return view('client.upload', ['genres' => $genresData]);
    }

    public function getGenres($id = null)
    {
        return Genre::all();
    }

    public function saveVideo(Request $request)
    {
        $data = $request->all();
        $userId = auth()->user()->id;

        $hashId = $data['wistia']['id'];
        $image = $data['wistia']['thumbnail']['url'];

        $videoExists = Video::where('hash_id', $hashId)->exists();

        $data = [
            'user_id' => $userId,
            'hash_id' => $hashId,
            'title' => $data['title'],
            'artistname' => $data['artist'],
            'director' => $data['directedBy'],
            'producer' => $data['producedBy'],
            'recordlabel' => $data['label'],
            'description' => $data['description'],
            'genres' => isset($data['genre']) ? $data['genre'] : 1,
            'maingenres' => isset($data['genre']) ? $data['genre'] : 1,
            'videourl' => isset($data['url']) ? $data['url'] : null,
            'wistia' => json_encode($data['wistia']) ?? '',
            'videotype' => $data['type'],
            'image' => $image,
            'size' => ((int)$data['size'] / 1000) / 1000, // bytes to MB
            'views' => 0,
            'status' => 0,
        ];

        if ($videoExists) {
            Video::where('hash_id', $hashId)->update($data);
        } else {
            $limitCheck = $this->videoLimitCheck($request, true);
            if ($limitCheck['status'] == 'error') {
                return response()->json($limitCheck);
            }

            Video::create($data);
        }

        // Video::upsert(
        //     [
        //         'user_id' => $userId,
        //         'hash_id' => $hashId,
        //         'title' => $data['title'],
        //         'artistname' => $data['artist'],
        //         'director' => $data['directedBy'],
        //         'producer' => $data['producedBy'],
        //         'recordlabel' => $data['label'],
        //         'description' => $data['description'],
        //         'genres' => isset($data['genre']) ? $data['genre'] : 1,
        //         'maingenres' => isset($data['genre']) ? $data['genre'] : 1,
        //         'videourl' => isset($data['url']) ? $data['url'] : null,
        //         'wistia' => json_encode($data['wistia']) ?? '',
        //         'videotype' => $data['type'],
        //         'image' => $image,
        //         'size' => ((int)$data['size'] / 1000) / 1000, // bytes to MB
        //         'views' => 0,
        //         'status' => 0,
        //     ],
        //     ['user_id', 'hash_id'],
        //     ['title', 'artistname', 'director', 'producer', 'recordlabel', 'description', 'genres', 'maingenres']
        // );
        // Video::updateOrCreate(
        //     [
        //         'user_id' => $userId,
        //         'hash_id' => $hashId,
        //     ],
        //     [
        //         'title' => $data['title'],
        //         'artistname' => $data['artist'],
        //         'director' => $data['directedBy'],
        //         'producer' => $data['producedBy'],
        //         'recordlabel' => $data['label'],
        //         'description' => $data['description'],
        //         'genres' => isset($data['genre']) ? $data['genre'] : 1,
        //         'maingenres' => isset($data['genre']) ? $data['genre'] : 1,
        //         'videourl' => isset($data['url']) ? $data['url'] : null,
        //         'wistia' => json_encode($data['wistia']) ?? '',
        //         'videotype' => $data['type'],
        //         'image' => $image,
        //         'size' => ((int)$data['size'] / 1000) / 1000, // bytes to MB
        //         'views' => 0,
        //         'status' => 0,
        //     ]
        // );

        return response()->json(['status' => true, 'message' => 'Video Information Saved Successfully']);
    }

    public function latestVideos(Request $request)
    {
        $genres =  $request->genreChecked ?? $request->genre ?? $request->genres;
        $artistInitial =  $request->artistInitial;
        $dateRange =  $request->dateRange;

        $latestVideos = Video::with('user:id,name,handle')
            ->where('status', 1)
            ->when(!empty($genres), function ($q) use ($genres) {
                $q->whereIn('genres', $genres);
            })
            ->when(!empty($artistInitial), function ($aq) use ($artistInitial) {
                $aq->where('artistname', 'like', "$artistInitial%");
            })
            ->when(!empty($dateRange), function ($dq) use ($dateRange) {
                $dq
                    ->whereDate('created_at', '>=', $dateRange['start'])
                    ->whereDate('created_at', '<=', $dateRange['end']);
            })
            ->with('genre:id,genre')
            // ->groupBy('publish_date')
            // ->latest()
            // ->orderBy('publish_date', 'DESC')
            ->get()
            ->sortByDesc('publish_date')
            ->groupBy(function ($item) {
                return Carbon::parse($item->publish_date)->toFormattedDateString();
            })
            ->toArray();
        

        return response()->json($latestVideos);
    }

    public function getVideoDetails($hashId)
    {
        $videoStats = WistiaTrait::getVideoStats($hashId);

        $videoDetails = Video::with([
            'playlists',
            'earningTransactionTotal',
            'user:id,name,handle'
        ])
            ->where('hash_id', $hashId)
            ->first();

        if (!empty($videoStats)) {
            $videoDetails->views = json_decode($videoStats, true)['stats']['plays'] ?? '';
        }

        $suggested = Video::where([
            'genres' => $videoDetails->genres,
            'status' => 1
        ])
            ->where('hash_id', '!=', $hashId)
            ->withCount('watchLog')
            ->when(auth()->user(), function ($q) {
                return $q->where('user_id', '!=', auth()->user()->id);
            })
            ->limit(3)
            ->latest('watch_log_count')
            ->get();

        $policies = VideoPolicy::first();

        return response()->json(['status' => true, 'message' => 'Success!', 'data' => $videoDetails, 'suggested' => $suggested, 'policies' => $policies]);
    }

    public function updateStats()
    {
        request()->validate([
            'id' => 'required',
            'hashId' => 'required'
        ]);

        $hashId = request('hashId');
        $videoStats = WistiaTrait::getVideoStats($hashId);

        if (!empty($videoStats) && !empty(json_decode($videoStats, true)['stats'])) {
            $stats = json_decode($videoStats, true)['stats'];
            $video = Video::find(request('id'));
            DB::beginTransaction();
            $queryResp =  $video->update([
                'views' => $stats['plays'],
                'stats' => json_encode($stats)
            ]);

            if (!$queryResp) {
                DB::rollBack();
                return response()->json(['status' => false, 'message' => 'Failed to Update Video Stats!']);
            }

            if (auth()->user() && auth()->user()->id != $video->user_id) {
                $log = new UserVideoWatchLog();
                $log->user_id = auth()->user()->id;
                $log->video_id = request('id');

                if (!$log->save()) {
                    DB::rollBack();
                    return response()->json(['status' => false, 'message' => 'Failed to Update Video Stats!']);
                }
            }
            DB::commit();
            return response()->json(['status' => true, 'message' => 'Video Stats Updated Successfully!']);
        }
        return response()->json(['status' => false, 'message' => 'Video Stats Not Updated!']);
    }

    public function recentlyWatched()
    {
        return response()->json(auth()->user()->recentVideos);
    }
}
