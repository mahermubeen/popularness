<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserVideoWatchLog extends Model
{
    use HasFactory;
    protected $table = 'user_video_watch_logs';

    // public function recentVideos()
    // {
    //     return $this->belongsToMany(User::class, 'user_id');
    // }

    public function video()
    {
        return $this->belongsTo(Video::class, 'video_id');
    }
}
