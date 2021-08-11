<?php

use App\Mail\UserRegister;
use App\User;
use App\Traits\WistiaTrait;
use App\Video;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Auth::routes();

Route::get('/', function () {
    return view('app');
});

Route::get('test', function () {
    $videoDetails = Video::where('hash_id', "74uyjegbs6")->first();
    $suggested = Video::where('genres', $videoDetails->genres)->limit(3)->latest();
    // $projects = WistiaTrait::createWistiaProject(env('APP_ENV') . '-' . hash("md5", 'test@popularnes.test'));
    // dd(json_decode($projects, true));
    // dd('Yay!');
    // $user = User::first();
    // return Cache::get('test');
    // return Cache::put('test', 'anotherTest');
});

Route::get('/welcome', function () {
    return view('welcome');
})->name('welcome');

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/test-upload', 'VideoController@upload')->name('video-upload');

Route::get('/users/verify/{id}/{hash}', 'AuthController@verify')
// ->middleware(['auth:sanctum', 'signed'])
->name('verification.verify')
;

// Route::get('/email/verify', function () {
//     return view('auth.verify-email');
// })->middleware('auth')->name('verification.notice');

Route::get('/callback/{social}', 'AuthController@handleProviderCallback')->where('social',
    'twitter|facebook|linkedin|google|github');

Route::post('/stripe-webhook', 'StripePaymentController@handleWebhook');

Route::get('{any?}', function () {
    return view('app');
})->where('any', '^(?!admin|nova|telescope|test|test-upload|stripe-subscription-webhook).*$');
