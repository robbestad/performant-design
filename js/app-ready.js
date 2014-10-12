'use strict';

var $ = require("jquery"), jQuery=$;

//var barekit = require('./barekit.min.js');


/*
 Plugin: jQuery Parallax
 Version 1.1.3
 Author: Ian Lunn
 Twitter: @IanLunn
 Author URL: http://www.ianlunn.co.uk/
 Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

 Dual licensed under the MIT and GPL licenses:
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl.html
 */

(function( $ ){
    var $window = $(window);
    var windowHeight = $window.height();

    $window.resize(function () {
        windowHeight = $window.height();
    });

    $.fn.parallax = function(xpos, speedFactor, outerHeight) {
        var $this = $(this);
        var getHeight;
        var firstTop;
        var paddingTop = 0;

        //get the starting position of each element to have parallax applied to it
        $this.each(function(){
            firstTop = $this.offset().top;
        });

        if (outerHeight) {
            getHeight = function(jqo) {
                return jqo.outerHeight(true);
            };
        } else {
            getHeight = function(jqo) {
                return jqo.height();
            };
        }

        // setup defaults if arguments aren't specified
        if (arguments.length < 1 || xpos === null) xpos = "50%";
        if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
        if (arguments.length < 3 || outerHeight === null) outerHeight = true;

        // function to be called whenever the window is scrolled or resized
        function update(){
            var pos = $window.scrollTop();

            $this.each(function(){
                var $element = $(this);
                var top = $element.offset().top;
                var height = getHeight($element);

                // Check if totally above or totally below viewport
                if (top + height < pos || top > pos + windowHeight) {
                    return;
                }

                $this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
            });
        }

        $window.bind('scroll', update).resize(update);
        update();
    };
})(jQuery);


//initiating jQuery
$(function ($) {
    var scrollPosition = [
            self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
    ];

//    var setNavbar = (function () {
//        $(".navbar ul>li").css("width", ($(".content").width() / 3) - 2 + "px");
//    }());
//
//
//    $(document).ready(function () {
//        //enabling stickUp on the '.navbar-wrapper' class
//        $('.navbar-wrapper').stickUp();
//        //setting the navbar width
//        setNavbar();
//    });
//    $(window).resize(function () {
//        setNavbar();
//    });

    $(".modal-event").on('click',function(){
        $(".modal-img").attr("src", $(this).attr("src"));
        scrollPosition = [
                self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
                self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
        ];
        $(".masthead").css("opacity",0);
        $(".row").css("opacity",0);
        $(".nav").css("opacity",0);
        $(".modal-img").css("maxHeight", document.documentElement.clientHeight+"px");
        $("html").css("position","fixed");
        $(".modal-close").css("zIndex","9999");
        $(".modal-img").css("opacity",1);
    });

    $(".modal-close").on('click',function(){
        $("html").css("position","relative");
        window.scrollTo(scrollPosition[0], scrollPosition[1]);
        $("body").css("opacity",1);
        $(".masthead").css("opacity",1);
        $(".row").css("opacity",1);
        $(".nav").css("opacity",1);
        $(".modal-img").css("opacity",0);
        closeModal();
    });


    $(document).ready(function () {

        $(window).bind('load', function () {
            parallaxInit();
        });
        var headerParallax = jQuery('.masthead');

        function parallaxInit() {
            headerParallax.parallax("50%", 1);
        }

        parallaxInit();
    });

});
