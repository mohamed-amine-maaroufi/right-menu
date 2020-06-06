(function() {
    'use strict';

    /** ie10 **/
    if (/*@cc_on!@*/false && document.documentMode === 10) {
        document.documentElement.className+=' ie10';
    }

    /** is ipad? **/
    var isiPad = navigator.userAgent.match(/iPad/i) !== null;

    $(function() {
        var app = {
            sliderContainer: {
                closeAll: function($container, callback) {
                    $container.parent().find('.slider-container.opened').find('main').slideUp();
                    $container.parent().find('.slider-container.opened').find('.slick-initialized').slick('unslick');
                    $container.parent().find('.slider-container.opened').removeClass('opened').addClass('closed');
                    callback();
                },
                open: function($container) {
                    $container.find('main').slideDown().queue(function() {
                        // if slider is not initialized
                        if($container.find('.slick-initialized').length === 0) {
                            app.sliders.init($container.find('.slick-slider-container'));
                            $container.removeClass('closed').addClass('opened');
                        }
                    }).dequeue();
                },
                close: function($container) {
                    $container.find('main').slideUp().queue(function() {
                        setTimeout(function() {
                            $container.find('.slick-initialized').slick('unslick');
                        }, 400);
                    }).dequeue();
                    $container.removeClass('opened').addClass('closed');
                },
                init: function($container) {
                    var t = this;
                    $container.find('header').on({
                        'click tap': function(e) {
                            e.preventDefault();

                            if($container.hasClass('opened')) {
                                t.close($container);
                            } else {
                                t.open($container);
                            }
                        }
                    });
                }
            },
            sliders: {
                init: function($container) {
                    var $el = $container.find('.main-slider');

                    $el.slick({
                        dots: false,
                        arrows: false,
                        infinite: true,
                        autoplay: true,
                        autoplaySpeed: 4000,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        responsive: [
                            {
                                breakpoint: 992,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                }
                            }
                        ]
                    });

                    $el.slick('slickGoTo', 0);

                    $container.find('.arrow-prev').on('click tap', function(e) {
                        e.preventDefault();
                        $el.slick('slickPrev');
                    });

                    $container.find('.arrow-next').on('click tap', function(e) {
                        e.preventDefault();
                        $el.slick('slickNext');
                    });
                },
                initCatalagueSelection: function($container) {
                    var $el = $container.find('.main-slider');

                    $el.slick({
                        dots: false,
                        arrows: false,
                        infinite: true,
                        autoplay: true,
                        autoplaySpeed: 4000
                    });

                    $container.find('.arrow-prev').on('click tap', function(e) {
                        e.preventDefault();
                        $el.slick('slickPrev');
                    });

                    $container.find('.arrow-next').on('click tap', function(e) {
                        e.preventDefault();
                        $el.slick('slickNext');
                    });
                }
            },
            map: {
                initPointerEvents: function() {
                    /** pointer-events **/
                    $('.map-container').on('click', function(e) {
                        e.preventDefault();

                        $('.map').css('pointer-events', 'auto');
                        $('.map-container').on('mouseleave', function(e) {
                            $('.map').css('pointer-events', 'none');
                        });
                    });
                }
            },
            article: {
                initFancybox: function($el) {
                },
                onClick: function($el) {
                    var t = this;
                    $el.on('click tap', function(e) {
                        t.initFancybox($el);
                    });
                },
                initEvents: function() {
                    var t = this;
                    $('news-page article-excerpt').each(function(i, d) {
                        t.onClick($(d));
                    });
                }
            },
            timeline: {
                open: function($el) {
                    $el.addClass('active');
                    $('.entreprise-history-content').html($el.find('.entreprise-history-item-container').clone());
                },
                closeAll: function() {
                    $('.timeline-item.active').each(function(i, d) {
                        $(d).removeClass('active');
                    });
                },
                init: function() {
                    var t = this;
                    $('.timeline-item').each(function(i, d) {
                        $(d).on('mouseenter', function(e) {
                            e.preventDefault();
                            t.closeAll();
                            t.open($(d));
                        });
                    });
                }
            },
            menu: {
                toggle: function($menu) {
                    $menu.slideToggle();
                },
                init: function() {
                    var t = this;
                    $('.mobile-menu-btn').on('click tap', function(e) {
                        e.preventDefault();
                        t.toggle($('.mobile-menu ul'));
                    });
                }
            },
            links: {
                scrollAuto: function($target) {
                    if($target.hasClass('slider-container')) {
                        app.sliderContainer.open($target);
                    }

                    $('html, body').animate({
                        scrollTop: $target.offset().top
                    }, 1000);
                },
                smoothScroll: function($el) {
                    var t = this;
                    var $target = $($el[0].hash);
                    if ($target.length) {
                        t.scrollAuto($target);
                    }
                }
            },
            mobile: {
                init: function() {
                    var t = this;
                    if($(window).width() <= 992) {
                        t.launch();
                    }
                },
                launch: function() {
                    // if home
                    if($('.home-page').length > 0) {
                        $('.home-box-gamme').addClass('opened');
                        $('.home-box-suivi').addClass('closed');
                        $('.home-box-sav').addClass('closed');

                        $('.home-box-footer').on('click tap', function(e) {
                            e.preventDefault();
                            var $el = $(this).parent('.home-box');

                            $('.home-box.opened').each(function(i, d) {
                                $(d).removeClass('opened').addClass('closed');
                            });

                            $el.removeClass('closed').addClass('opened');
                        });
                    }
                }
            },
            pages: {
                init: function() {
                    var h = window.location.hash;
                    if(window.location.hash !== '') {
                        app.links.scrollAuto($(h));
                    }
                },
                setHeaderHeight: function() {
                    if( $('.page-header').hasClass('catalogue-header') ) {
                        if( $(window).width() < 992 ) {
                            $('.page-header').css({
                                height: Math.max($(window).height()-$('.mobile-menu').height(), $('.page-header .container').height())
                            });
                        } else {
                            $('.page-header').css({
                                height: 'auto'
                            });
                        }
                    } else {
                        $('.page-header').css({
                            height: Math.max($(window).height()-$('.mobile-menu').height(), $('.page-header .container').height())
                        });
                    }
                }
            }
        };

        /** pages with maps **/
        if($('.map').length > 0) {
            app.map.initPointerEvents();
        }

        /** home **/
        $('.home-box').on('click tap', function(e) {
            e.preventDefault();

            window.location = $(this).find('.home-box-more a').attr('href');
        });

        /** entreprise page **/
        if($('.entreprise-page').length > 0) {
            app.timeline.init();
        }

        /** catalague page **/
        if($('.catalogue-page').length > 0) {
            app.sliders.initCatalagueSelection($('.catalogue-selection-slider-container'));
        }


        /** all pages **/
        $('.slider-container').each(function(i, d) {
            app.sliderContainer.init($(d));
        });

        $('.slick-slider-container').each(function(i, d) {
            //only if slider is displayed and not hidden
            if($(d).height() > 0) {
                app.sliders.init($(d));
            }
        });

        $('.block-cutted-corner').on('click tap', function(e) {
            e.preventDefault();
            window.location = $(this).attr('data-href');
        });

        /** event is set on parent **/
        $('.smooth-scroll-link').each(function(i, d) {
            var $d = $(d);
            var $a = $(d);
            if( $(d).parent().is('button') ) {
                $d = $(d).parent();
            }

            $d.on('click tap', function(e) {
                e.preventDefault();
                app.links.smoothScroll($a);
            });
        });

        app.menu.init();
        app.pages.setHeaderHeight();
        app.mobile.init();
        app.pages.init();

        // on resize
        $(window).resize(function() {
            if( !isiPad ) {
                app.pages.setHeaderHeight();
            }
            app.mobile.init();
        });
    });
})();


