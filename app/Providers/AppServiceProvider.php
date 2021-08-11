<?php

namespace App\Providers;

use App\User;
use App\Video;
use App\UserPlayList;
use Laravel\Nova\Nova;
use App\Observers\UserObserver;
use App\Observers\VideoObserver;
use App\Observers\VideoObserverNova;
use App\Observers\PlayListObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->isLocal()) {
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            $this->app->register(TelescopeServiceProvider::class);
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Nova::serving(function () {
            Video::observe(VideoObserverNova::class);
        });

        Video::observe(VideoObserver::class);
        UserPlayList::observe(PlayListObserver::class);
        User::observe(UserObserver::class);
    }
}
