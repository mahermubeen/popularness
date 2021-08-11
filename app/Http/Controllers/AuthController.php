<?php

namespace App\Http\Controllers;

use Hash;
use App\User;
use App\Traits\WistiaTrait;
use Illuminate\Http\Request;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    use VerifiesEmails, HasApiTokens, WistiaTrait, SendsPasswordResetEmails, ResetsPasswords {
        SendsPasswordResetEmails::broker insteadof ResetsPasswords;
        ResetsPasswords::credentials insteadof SendsPasswordResetEmails;
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        $authenticated = Auth::attempt([
            'email' => $request->email,
            'password' => $request->password,
            'is_active' => 1
        ]);

        if ($authenticated) {
            return response()->json(['status' => true, 'message' => 'User authenticated successfully!', 'data' => auth()->user()]);
        }
        return response()->json(['status' => false, 'message' => 'User is unauthenticated or inactive!']);
        // abort(401, 'Unauthenticated!');
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json('Logged out successfully!');
    }

    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|email|max:255|unique:users'
        ]);

        try {
            // For non-production envirionment, use this fixed projectId
            $userProject = ['hashedId' => 'hhlt5axdl4'];

            if(env('APP_ENV') == 'production') {
                $userProject = WistiaTrait::createWistiaProject(env('APP_ENV') . '-' . hash("md5", $request['email']));
                $userProject = json_decode($userProject, true);
            }


            $userCreated = User::create([
                'email' => $request['email'],
                'project_id' => $userProject['hashedId'],
                'user_type' => empty($request['userType']) ? 1 : (int)$request['userType'],
                'package_id' => $request['packageId'],
                'handle' => empty($request['handle']) ? explode("@", $request['email'])[0] : $request['handle']
                ]);

            if ($userCreated) {
                $userCreated->sendEmailVerificationNotification();

                return response()->json(['status' => true, 'message' => 'Registration Succcessfull', 'data' => $userCreated]);
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        }
    }

    public function verify(Request $request, $id, $hash)
    {
        $user = User::find($id);

        // dd($request->all(), $request->route('id'), $user, $hash);
        if (!hash_equals((string) $request->route('id'), (string) $user->getKey())) {
            throw new AuthorizationException();
        }

        if (!hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))) {
            throw new AuthorizationException();
        }

        if ($user->hasVerifiedEmail()) {
            return $request->wantsJson()
                ? new JsonResponse([], 204)
                : redirect($this->redirectPath());
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
            $user->is_active = 1;
            $user->save();
        }

        if ($response = $this->verified($request)) {
            return $response;
        }

        $redirectRoute = $user->user_type == 2 ? '/dashboard' : ('complete-fan-profile/' . $user->id);
        return $request->wantsJson()
            ? new JsonResponse([], 204)
            : redirect($redirectRoute)->with('verified', true);
    }

    /**
     * Send password reset link. 
     */
    public function sendPasswordResetLink(Request $request)
    {
        return $this->sendResetLinkEmail($request);
    }

    /**
     * Handle reset password 
     */
    public function callResetPassword(Request $request)
    {
        return $this->reset($request);
    }

    public function socialLogin($social)
    {
        return Socialite::driver($social)->stateless()->redirect();
    }


    public function handleProviderCallback(Request $request, $social)
    {
        if ($social != 'google') return;

        $userProfile = $request->basicProfile;

        $userEmail = $userProfile['nt'];

        $user = User::firstOrNew(
            [
                'email' => $userEmail,
            ],
            [
                'user_type' => 1,
                'is_active' => 1
            ]
        );

        // Login the created user
        Auth::login($user, true);

        // Create a new access_token for the session (Passport)
        $token = Auth::user()->createToken('Popularness')->accessToken;

        if ($token) {
            return response()->json(
                auth()->user()
            );
        }
        abort(401, 'Unauthenticated!');
    }
}
