export const initFbsdk = () => {
    return new Promise(resolve => {
        window.fbAsyncInit = function() {
            FB.init({
                appId: process.env.MIX_FACEBOOK_CLIENT_ID,
                // appId: "2159318144361257",
                cookie: true, // enable cookies to allow the server to access the session
                xfbml: true, // parse social plugins on this page
                version: "v2.8" // use graph api version 2.8
            });

            (function(d, s, id) {
                var js,
                    fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/all.js";
                fjs.parentNode.insertBefore(js, fjs);
            })(document, "script", "facebook-jssdk")
        };
        // window.fbAsyncInit = (function() {
        //     FB.init({
        //         appId: "473706332715142",
        //         // appId: "2159318144361257",
        //         cookie: true, // enable cookies to allow the server to access the session
        //         xfbml: true, // parse social plugins on this page
        //         version: "v2.8" // use graph api version 2.8
        //     });
        // })(
        //     (function(d, s, id) {
        //         var js,
        //             fjs = d.getElementsByTagName(s)[0];
        //         if (d.getElementById(id)) return;
        //         js = d.createElement(s);
        //         js.id = id;
        //         js.src = "//connect.facebook.net/en_US/all.js";
        //         fjs.parentNode.insertBefore(js, fjs);
        //     })(document, "script", "facebook-jssdk")
        // );
    });
};
