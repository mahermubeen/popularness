<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Nova\Actions\Actionable;

class Video extends Model
{

    use Actionable, SoftDeletes;

    protected $appends = ['favourite_video_count'];

    protected $fillable = [
        'title', 'user_id', 'size', 'videotype', 'artistname', 'hash_id', 'image', 'genres', 'maingenres', 'wistia',
        'views', 'status'
    ];


    public function user()
    {

        return $this->belongsTo('App\User');
    }

    public function genre()
    {

        return $this->belongsTo('App\Genre', 'genres');
    }

    public function earningTransactionTotal()
    {
        return $this->hasMany('App\Transaction', 'product_id', 'id')
            ->where('wallet_type', 2)
            ->selectRaw('product_id,SUM(amount) as total,count(DISTINCT wallet_id) as supporter_count')
            ->groupBy('product_id');
    }
    
    public function playlists()
    {
        return $this->hasMany(UserPlayList::class, 'user_id', 'id');
    }

    public function watchLog()
    {
        return $this->hasMany(UserVideoWatchLog::class, 'video_id', 'id');
    }

    public function favouriteUsers()
    {
        return $this->hasMany(UserVideoFavourite::class, 'video_id', 'id')
        ->whereStatus(1);
    }

    public function getFavouriteVideoCountAttribute() {
        return $this->favouriteUsers()->count();
    }
}
