<?php

namespace App;

use App\Notifications\PasswordResetNotification;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;
use Laravel\Nova\Actions\Actionable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use Notifiable, Actionable, CanResetPassword, HasFactory, HasApiTokens, Billable;

    protected $appends = ['favourite_video_ids'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'first_name', 'last_name', 'email', 'password', 'primary_genre', 'package_id', 'user_type', 'provider_id', 'email_verified_at', 'favourite_genres', 'project_id', 'social', 'handle'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function routeNotificationForSlack($notification)
    {
        return env('SLACK_END_POINT');
    }


    public function posts()
    {

        return $this->hasMany('App\Post');
    }


    public function videos()
    {
        return $this->hasMany('App\Video');
    }

    public function package()
    {
        return $this->belongsTo('App\Package');
    }

    public function wallet()
    {
        return $this->hasOne('App\Wallet');
    }


    public function transactions()
    {
        return $this->hasMany('App\Transaction');
    }

    /**
     * Override the mail body for reset password notification mail.
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new PasswordResetNotification($token));
    }

    public function recentVideos($count = 5)
    {
        return $this->hasMany(UserVideoWatchLog::class)
        ->orderBy('created_at', 'desc')
        ->limit($count)
        ->with('video:id,hash_id,title,description,views,image');
    }

    public function country()
    {
        return $this->belongsTo('App\Country', 'country');
    }
    
    public function state()
    {
        return $this->belongsTo('App\State', 'state');
    }

    public function city()
    {
        return $this->belongsTo('App\City', 'city');
    }

    public function favouriteVideos()
    {
        return $this->hasMany(UserVideoFavourite::class, 'user_id', 'id')
        ->whereStatus(1);
    }

    public function getFavouriteVideoIdsAttribute() {
        return $this->favouriteVideos()->pluck('video_id');
    }
}
