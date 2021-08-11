<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function update(Request $request)
    {
        $userId = $request['id'] ?? auth()->user()->id;

        $data = $request->all();
        $userData = User::find($userId);

        if (empty($userData)) {
            return response()->json(['status' => false, 'message' => 'No user found']);
        }

        //artist / brand name
        if (isset($data['name'])) $userData->name = $data['name'];
        if (isset($data['nickname'])) $userData->nickname = $data['nickname'];
        if (isset($data['surname'])) $userData->surname = $data['surname'];
        if (!empty($data['genre'])) $userData->primary_genre = $data['genre'];
        if (isset($data['country'])) $userData->country = $data['country'];
        if (isset($data['state'])) $userData->state = $data['state'];
        if (isset($data['city'])) $userData->city = $data['city'];
        if (isset($data['firstName'])) $userData->first_name = $data['firstName'];
        if (isset($data['lastName'])) $userData->last_name = $data['lastName'];
        if (isset($data['bio'])) $userData->bio = $data['bio'];
        if (isset($data['image'])) $userData->image = $data['image'];
        if (isset($data['handle'])) $userData->handle = $data['handle'];
        if (isset($data['favouriteGenres'])) $userData->favourite_genres = $data['favouriteGenres'];
        if (isset($data['password'])) $userData->password = Hash::make($data['password']);

        $userData->save();

        return response()->json(['status' => true, 'message' => 'Success', 'data' => $userData]);
    }

    public function updateBio(Request $request)
    {
        $userId = auth()->user()->id;

        $data = $request->all();
        $userData = User::find($userId);
        //artist / brand name
        $userData->bio = $data['bio'] ?? null;
        $userData->save();

        return response()->json(['status' => true, 'message' => 'Success', 'data' => $userData]);
        // return redirect('/home');
    }

    public function handleSocialIntegration(Request $request, $social)
    {
        if ($social != 'google') return;

        $socialProfile = $request->basicProfile;

        $socialEmail = $socialProfile['nt'];

        $updated = User::where('id', auth()->user()->id)
            ->update([
                'social' => json_encode([
                    'google' => [
                        'email' => $socialEmail,
                        'profile_data' => $socialProfile
                    ]
                ])
            ]);

        if($updated) {
            return response()->json(
                auth()->user()
            );
        }
        abort(401, 'Unauthenticated!');
    }

    public function purchase(Request $request)
    {
        $user = User::find(1);

        try {
            $payment = $user->charge(
                $request->amount,
                $request->payment_method_id
            );

            $payment = $payment->asStripePaymentIntent();

            return $payment;

        } catch (\Throwable $th) {
            //throw $th;
            return $th->getMessage();
        }
    }

    public function getUserByEmail(Request $request, $email)
    {
        try {
            $user = User::select('id', 'email', 'user_type', 'handle')->where('email', $email)->first();
            if(empty($user)) {
                return response()->json(['status' => false, 'message' => 'No user is registered with this email']);
            }
            return response()->json(['status' => true, 'message' => 'A registered user found with this email', 'data' => $user]);
        } catch (\Throwable $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        }
    }

    public function getArtistInfo(Request $request, $handle)
    {
        try {
            $user = User::with([
                'wallet:id,user_id,deposit_balance',
                'country:id,name',
                'state:id,name',
                'city:id,name',
                'videos'
            ])
            ->where('handle', $handle)
            ->first();

            if(empty($user)) {
                return response()->json(['status' => false, 'message' => 'No user is registered with this email', 'data' => []]);
            }
            return response()->json(['status' => true, 'message' => 'A registered user found with this email', 'data' => $user]);
        } catch (\Throwable $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        }
    }
    
}
