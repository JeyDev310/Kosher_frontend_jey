/* 
 * Create HTML5 elements for IE's sake
 * Reference: http://ejohn.org/blog/html5-shiv/
 * Reference: http://remysharp.com/2009/01/07/html5-enabling-script/
 */
var aboutscript = function(){
    // $.noConflict();
    // $(function() {
    //   $(".homepage-slider").owlCarousel();
    // });
    $(document).ready( function() {
      
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 5,
            nav : true,
            navText: [
                "<i class='fa fa-caret-left owl-btn'></i>",
                "<i class='fa fa-caret-right owl-btn'></i>"
            ],
            autoplay: true,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                },
                1240: {
                    items: 3
                }
            }
        })
    })
    $(document).ready(function () {
        $(".content").hide();
        $(".show_hide").on("click", function () {
            var txt = $(this).next(".content").is(':visible') ? 'Show More <i class="fa fa-caret-down"></i>' : 'Show Less <i class="fa fa-caret-up"></i>';
            $(this).html(txt);
            $(this).next('.content').slideToggle(200);
        });
    });

}








