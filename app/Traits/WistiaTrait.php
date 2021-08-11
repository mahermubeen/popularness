<?php

namespace App\Traits;

use Illuminate\Support\Facades\Http;

trait WistiaTrait
{
    public static function getProjectInfo($hashId = null)
    {
        return Http::withBasicAuth('api', env('WISTIA_API_KEY'))
            ->get(env('WISTIA_API_URL') . 'projects.json')
            ->body() ?? false;
    }

    public static function createWistiaProject($name)
    {
        return Http::withBasicAuth('api', env('WISTIA_API_KEY'))
            ->post(env('WISTIA_API_URL') . 'projects.json', [
                'name' => $name
            ])
            ->body() ?? false;
    }

    public static function getVideoStats($hashId)
    {
        return Http::withBasicAuth('api', env('WISTIA_API_KEY'))
            ->get(env('WISTIA_API_URL') . "medias/$hashId/stats.json")
            ->body() ?? false;
    }
}
