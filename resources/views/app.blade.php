<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Popularness</title>
        
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">
        <link rel="stylesheet" href="//fast.wistia.com/assets/external/uploader.css"/>
        
    </head>
    <body>
        <div class="flex-center position-ref full-height" id="app">
            <router-view></router-view>
        </div>
        <script src="{{ mix('js/app.js') }}"></script>
        <script src="//fast.wistia.com/assets/external/api.js"></script>
    </body>
</html>
