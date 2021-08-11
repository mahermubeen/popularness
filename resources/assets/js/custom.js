jQuery(document).ready(function () {
    //menu-open-btn
    $(".menu-open").click(function () {
        $(".menu-open").addClass("hidden");
        $(".close-btn").removeClass("hidden");

        $(".side-nav").addClass("hidden");
        $(".hidden-side-nav").removeClass("hidden");
    });

    //filter by btn
    $("#filter-btn").click(function () {
        $(".menu-open").addClass("hidden");
        $(".close-btn").removeClass("hidden");

        $(".side-nav").addClass("hidden");
        $(".hidden-side-nav").removeClass("hidden");
    });

    //menu-close-btn
    $(".close-btn").click(function () {
        $(".menu-open").removeClass("hidden");
        $(".close-btn").addClass("hidden");

        $(".side-nav").removeClass("hidden");
        $(".hidden-side-nav").addClass("hidden");
    });

    //mob-menu-open-btn
    $(".mob-nav").click(function () {
        $(".mob-menu-wrapper").removeClass("hidden");
        $(".right-mob-options").removeClass("hidden");
        $(".mob-nav").addClass("hidden");

    });
    //mob-menu-close-btn
    $(".right-mob-options").click(function () {
        $(".mob-menu-wrapper").addClass("hidden");
        $(".right-mob-options").addClass("hidden");
        $(".mob-nav").removeClass("hidden");
    });

    //on click mob-nav a
    $(".mob-nav1 a").click(function () {
        $(".right-mob-options").addClass("hidden");
        $(".mob-nav").removeClass("hidden");
    });


    //date-menu toggle
    $(".date-btn").click(function () {
        $(".date-btn").toggleClass("active");
        $(".genre-btn").removeClass("active");
        $(".artist-btn").removeClass("active");

        $(".date-menu").toggleClass("hidden");
        $(".genre-menu").addClass("hidden");
        $(".artist-menu").addClass("hidden");
    });

    //genre-menu toggle
    $(".genre-btn").click(function () {
        $(".genre-btn").toggleClass("active");
        $(".date-btn").removeClass("active");
        $(".artist-btn").removeClass("active");

        $(".genre-menu").toggleClass("hidden");
        $(".date-menu").addClass("hidden");
        $(".artist-menu").addClass("hidden");
    });

    //artist-menu toggle
    $(".artist-btn").click(function () {
        $(".artist-btn").toggleClass("active");
        $(".date-btn").removeClass("active");
        $(".genre-btn").removeClass("active");

        $(".artist-menu").toggleClass("hidden");
        $(".date-menu").addClass("hidden");
        $(".genre-menu").addClass("hidden");
    });

    var videoPlayButton4,
        videoWrapper4 = document.getElementsByClassName('video-wrapper4')[0],
        video4 = document.getElementsByClassName('video4')[0],
        videoMethods = {
            renderVideoPlayButton4: function () {
                if (video4 && videoWrapper4.contains(video4)) {
                    this.formatVideoPlayButton()
                    video4.classList.add('has-media-controls-hidden')
                    videoPlayButton4 = document.getElementsByClassName('video-overlay-play-button4')[0]
                    videoPlayButton4.addEventListener('click', this.hideVideoPlayButton)
                }
            },

            formatVideoPlayButton: function () {
                videoWrapper4.insertAdjacentHTML('beforeend', '\
                <svg class="video-overlay-play-button4" viewBox="0 0 200 200" alt="Play video">\
                    <circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="#fff"/>\
                    <polygon points="70, 55 70, 145 145, 100" fill="#fff"/>\
                </svg>\
            ')
            },

            hideVideoPlayButton: function () {
                video4.play()
                videoPlayButton4.classList.add('is-hidden')
                video4.classList.remove('has-media-controls-hidden')
                video4.setAttribute('controls', 'controls')
            }
        }

    videoMethods.renderVideoPlayButton4()

    var videoPlayButton1,
        videoWrapper1 = document.getElementsByClassName('video-wrapper1')[0],
        video1 = document.getElementsByClassName('video1')[0],
        videoMethods = {
            renderVideoPlayButton1: function () {
                if (videoWrapper1.contains(video1)) {
                    this.formatVideoPlayButton()
                    video1.classList.add('has-media-controls-hidden')
                    videoPlayButton1 = document.getElementsByClassName('video-overlay-play-button1')[0]
                    videoPlayButton1.addEventListener('click', this.hideVideoPlayButton1)
                }
            },

            formatVideoPlayButton: function () {
                videoWrapper1.insertAdjacentHTML('beforeend', '\
                <svg class="video-overlay-play-button1" viewBox="0 0 200 200" alt="Play video">\
                    <circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="#fff"/>\
                    <polygon points="70, 55 70, 145 145, 100" fill="#fff"/>\
                </svg>\
            ')
            },

            hideVideoPlayButton1: function () {
                video1.play()
                videoPlayButton1.classList.add('is-hidden')
                video1.classList.remove('has-media-controls-hidden')
                video1.setAttribute('controls', 'controls')
            }
        }

    videoMethods.renderVideoPlayButton1()


    var videoPlayButton2,
        videoWrapper2 = document.getElementsByClassName('video-wrapper2')[0],
        video2 = document.getElementsByClassName('video2')[0],
        videoMethods = {
            renderVideoPlayButton2: function () {
                if (videoWrapper2.contains(video2)) {
                    this.formatVideoPlayButton()
                    video2.classList.add('has-media-controls-hidden')
                    videoPlayButton2 = document.getElementsByClassName('video-overlay-play-button2')[0]
                    videoPlayButton2.addEventListener('click', this.hideVideoPlayButton)
                }
            },

            formatVideoPlayButton: function () {
                videoWrapper2.insertAdjacentHTML('beforeend', '\
                <svg class="video-overlay-play-button2" viewBox="0 0 200 200" alt="Play video">\
                    <circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="#fff"/>\
                    <polygon points="70, 55 70, 145 145, 100" fill="#fff"/>\
                </svg>\
            ')
            },

            hideVideoPlayButton: function () {
                video2.play()
                videoPlayButton2.classList.add('is-hidden')
                video2.classList.remove('has-media-controls-hidden')
                video2.setAttribute('controls', 'controls')
            }
        }

    videoMethods.renderVideoPlayButton2()


    var videoPlayButton3,
        videoWrapper3 = document.getElementsByClassName('video-wrapper3')[0],
        video3 = document.getElementsByClassName('video3')[0],
        videoMethods = {
            renderVideoPlayButton3: function () {
                if (videoWrapper3.contains(video3)) {
                    this.formatVideoPlayButton()
                    video3.classList.add('has-media-controls-hidden')
                    videoPlayButton3 = document.getElementsByClassName('video-overlay-play-button3')[0]
                    videoPlayButton3.addEventListener('click', this.hideVideoPlayButton)
                }
            },

            formatVideoPlayButton: function () {
                videoWrapper3.insertAdjacentHTML('beforeend', '\
                <svg class="video-overlay-play-button3" viewBox="0 0 200 200" alt="Play video">\
                    <circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="#fff"/>\
                    <polygon points="70, 55 70, 145 145, 100" fill="#fff"/>\
                </svg>\
            ')
            },

            hideVideoPlayButton: function () {
                video3.play()
                videoPlayButton3.classList.add('is-hidden')
                video3.classList.remove('has-media-controls-hidden')
                video3.setAttribute('controls', 'controls')
            }
        }

    videoMethods.renderVideoPlayButton3()





    $('.panel-collapse').on('show.bs.collapse', function () {
        $(this).siblings('.panel-heading').addClass('active');
    });

    $('.panel-collapse').on('hide.bs.collapse', function () {
        $(this).siblings('.panel-heading').removeClass('active');
    });

    $(".video-thumbnails .thumbnail").click(function () {
        $(".video-thumbnails .thumbnail").removeClass("active");
        $(this).addClass("active");
    });

    $(".cards-container .card-icon").click(function () {
        $(".card-icon").removeClass("selected");
        $(this).addClass("selected");
    });

    $(".close-menu").click(function () {
        $("aside").removeClass('active-aside');
    });

    $("header .menu-icon").click(function () {
        $(this).toggleClass("fa-bars fa-times");
        $("aside").toggleClass('active-aside');
    });

    $("header .user-dropdown .avtar").click(function () {
        $("header .user-dropdown-menu").slideToggle();
    });

    $(".actions-btns .thumbnail-pause").hide();
    $(".actions-btns .thumbnail-play").click(function () {
        $(this).hide();
        $(this).parent().find('.thumbnail-pause').show();
        $(this).parent().parent().find('video').trigger('play');
    });

    $(".actions-btns .thumbnail-pause").click(function () {
        $(this).hide();
        $(this).parent().find('.thumbnail-play').show();
        $(this).parent().parent().find('video').trigger('pause');
    });

    $("header .search-btn img").click(function () {
        $("header .search-btn .fld").toggleClass('search-active');
    });


    //Baner slider
    $('.banner-wrapper .owl-carousel').owlCarousel({
        loop: true,
        margin: 0,
        autoplay: true,
        autoplayTimeout: 3000,
        smartSpeed: 500,
        nav: true,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            }
        }
    })

    $(".payment-cards .cards-thumbnail").click(function () {
        $(".payment-cards .cards-thumbnail").removeClass("selected-card");
        $(this).addClass('selected-card');
    });

    //    $(".bubbles-wrapper .bubble").each(function () {
    //        var get_width = $(this).innerWidth();
    //        $(this).css({
    //            height: get_width,
    //            marginLeft: get_width,
    //            marginRight: get_width,
    //        });
    //    });

    $(".bubbles-wrapper.bubbles-wrapper2 .bubble .checkMark").each(function () {
        var get_width = $(this).innerWidth();
        $(this).css({
            height: get_width,
            marginLeft: 40,
            marginRight: 40,
            marginBottom: 0,
            marginTop: 40,
        });
    });

    function getHieght() {
        var get_pos = $(".content-container").position();
        var get_h = get_pos ? get_pos.top : 0;
        $(".content-container").css({
            'min-height': 'calc(100% - ' + get_h + 'px)'
        });
    }

    getHieght();

    $(function () {
        $('.calendar').pignoseCalendar({
            multiple: true
        });
    });

    //Shows slider
    $('.shows-wrapper .owl-carousel').owlCarousel({
        loop: false,
        margin: 0,
        nav: true,
        responsive: {
            0: {
                items: 1
            }
        }
    });

});
