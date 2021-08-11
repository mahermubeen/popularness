<?php

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use phpDocumentor\Reflection\DocBlock\Tags\Uses;
use App\Traits\WistiaTrait;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/home', 'HomeController@test');
// Route::middleware('auth:sanctum')->get('/users', function () {
//         return User::all();
//     });

// Auth
Route::post('/login', 'AuthController@login');
Route::post('/register', 'AuthController@register');

Route::get('/countries', 'HomeController@countries');
Route::get('/states/{countryId?}', 'HomeController@states');
Route::get('/cities/{stateId?}', 'HomeController@cities');
Route::post('/cities/state', 'HomeController@cityByStateId');
Route::post('/complete-profile', 'UserController@update');

// Social Login/Signup
Route::get('/login/{social}', 'AuthController@socialLogin')->where(
    'social',
    'twitter|facebook|linkedin|google|github'
);
Route::post('/callback/{social}', 'AuthController@handleProviderCallback')->where(
    'social',
    'twitter|facebook|linkedin|google|github'
);

// Social Integration
Route::post('/social-integration/{social}', 'UserController@handleSocialIntegration')->where(
    'social',
    'twitter|facebook|linkedin|google|github'
);

// Password Reset
Route::post('reset-password', 'AuthController@sendPasswordResetLink');
Route::post('reset/password', 'AuthController@callResetPassword');

// Route::post('purchase', 'UserController@purchase');


Route::get('test', function () {
    $user = User::find(1);
    return $user->recentVideos;
    // return auth()->user->recentVideos();
    // return WistiaTrait::createWistiaProject(env('APP_ENV') . '-' . hash("md5", 'test@popularness.test'));
    // return Socialite::driver('google')->stateless()->redirect();
    dd('Yaaaayy!');
});
Route::get('test1', function () {
    dd('Yaaaayy!', request()->all());
});

// Route::get('/latest-videos/{genreId?}', 'VideoController@latestVideos')->name('latest-videos');
Route::post('/latest-videos', 'VideoController@latestVideos')->name('latest-videos');
Route::get('/get-videos/{id?}', 'VideoController@getVideoDetails')->name('get-videos-single');
Route::get('/genres/{genreId?}', 'VideoController@getGenres')->name('video-genres');

Route::post('videos/stats', 'VideoController@updateStats')->name('update-video-stats');

Route::get('/user/{email}', 'UserController@getUserByEmail');
Route::get('/artist-info/{email}', 'UserController@getArtistInfo');

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/logout', 'AuthController@logout');
    Route::post('/user/update', 'UserController@update');
    Route::post('/user/updateBio', 'UserController@updateBio');

    // Videos
    Route::post('video/save', 'VideoController@saveVideo')->name('save-video');
    Route::post('video/check-limit', 'VideoController@videoLimitCheck')->name('check-video-limit');
    Route::post('video/update', 'VideoController@updateVideoInfo')->name('update-video');
    Route::get('/myVideos', 'VideoController@myVideos')->name('my-videos');
    Route::get('/recently-watched', 'VideoController@recentlyWatched')->name('recently-watched');

    Route::get('/myPlaylists', 'PlayListController@myPlayListData')->name('my-playlist');
    Route::post('/savePlayList', 'PlayListController@savePlayList')->name('create-play-list');
    Route::post('/saveBasicPlaylist', 'PlayListController@saveBasicPlaylist');

    Route::get('video/stats/{hash_id}', 'VideoController@getVideoStats')->name('video-stats');

    // PlayList
    Route::get('/playList', 'PlayListController@myPlayList')->name('my-play-video');
    Route::get('/myPlayListData', 'PlayListController@myPlayListData')->name('my-play-list-data');
    Route::post('/VideoPlayList', 'PlayListController@VideoPlayList')->name('video-play-list');
    Route::post('/playListUpdate', 'PlayListController@playListUpdate')->name('update-play-list');
    Route::get('/viewPlayList/{id}', 'PlayListController@viewPlayList')->name('view-play-List');
    Route::post('/playListVideo/{hash_id}', 'PlayListController@playListVideo')->name('play-List-video');
    Route::post('/playListDelete', 'PlayListController@playListDelete');
    Route::post('/removeVideoFromPlayList', 'PlayListController@removeVideoFromPlayList')->name('remove-video-play-list');

    Route::post('/removeVideoFromFavouriteList',
		'VideoFavouriteController@removeVideoFromFavouriteList')->name('remove-video-favourite-list');
	Route::post('VideoFavourite', 'VideoFavouriteController@VideoFavourite')->name('video-favourite-list');

    Route::post('/deposit-wallet', 'StripePaymentController@depositWallet');
    Route::post('/video-tip', 'TransactionController@videoContribution');

    // Favourite
	Route::post('video/add-to-favourite', 'VideoFavouriteController@addToFavourite')->name('save-video-favourite');

    Route::get('/user', function (Request $request) {
        return User::with([
            'wallet:id,user_id,deposit_balance',
            'country:id,name',
            'state:id,name',
            'city:id,name',
        ])
        ->where('id', $request->user()->id)
        ->first();
    });
});
