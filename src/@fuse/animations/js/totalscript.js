var totalscript = function(){

	
document.createElement("article");
document.createElement("footer");
document.createElement("header");
document.createElement("hgroup");
document.createElement("nav");
document.createElement("aside");
document.createElement("section");


$(document).ready(function() {
     $('#navbtn').click(function() {
          $('ul.nav-menu').animate({ height: 'toggle'}, 300);
      });	  
});
// jQuery.browser = {};
// (function () {
// 	jQuery.browser.msie = false;
// 	jQuery.browser.version = 0;
// 	if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
// 		jQuery.browser.msie = true;
// 		jQuery.browser.version = RegExp.$1;
// 		}
// 		})();
// 	$(document).ready(function(){
// 	$(".product_finder_text").click(function(){
// 	$(".getin-popup").toggleClass("full-show");});
// })

$(document).ready(function() { 
//if ($(window).width() < 740) {
  $('ul.nav-menu').find('ul').parent().append('<span class="menuarrow"></span>');
  $(".menuarrow").click(function () {
		$(this).prev("ul").animate({ height: 'toggle'}, 300);
		//$(this).removeAttr("href");
		//return false;
		if ($(this).parent().hasClass('active')) {
      		$(this).parent().removeClass('active');
   		 } else {
      		$(this).parent().addClass('active');
    	} 
    });
//}
});
$.noConflict();
$(document).ready( function() {
	console.log('this is class', $('.wel-carousel'));
	if ($(window).width() > 1190) {
		
		$('.wel-carousel').carousel({frontWidth:600,frontHeight:400,carouselWidth:1200,carouselHeight:400,directionNav:true,reflection: false,shadow:false,buttonNav:'bullets'});
		
		}
	if ($(window).width() > 990) {
		$('.wel-carousel').carousel({frontWidth:500,frontHeight:333,carouselWidth:1000,carouselHeight:333,directionNav:true,reflection: false,shadow:false,buttonNav:'bullets'});
		}
	if ($(window).width() > 730) {
		$('.wel-carousel').carousel({frontWidth:374,frontHeight:249,carouselWidth:748,carouselHeight:249,directionNav:true,reflection: false,shadow:false});
		}
	if ($(window).width() > 450) {
		$('.wel-carousel').carousel({frontWidth:230,frontHeight:153,carouselWidth:460,carouselHeight:153,directionNav:true,reflection: false,shadow:false});
	}
	if ($(window).width() > 350) {
		$('.wel-carousel').carousel({frontWidth:155,frontHeight:103,carouselWidth:310,carouselHeight:103,directionNav:true,reflection: false,shadow:false});
	}

});



$(window).on('load',function () {
    width1 =  ($(".wrapper").width());
	var windowwith1 = $(window).width(), divWidth=0;
	var getwidth1 = ((windowwith1 - width1) / 2);
	$('.fullpage').css({'marginLeft':(-getwidth1)+'px'});
	$('.fullpage').css({'marginRight':(-getwidth1)+'px'});
	$('.fullpage-content').css({'marginLeft':(-getwidth1)+'px'});
	$('.fullpage-content').css({'marginRight':(-getwidth1)+'px'});
	$('.fullpage-content').css({'paddingLeft':(getwidth1)+'px'});
	$('.fullpage-content').css({'paddingRight':(getwidth1)+'px'});
});

var width = $(window).width();
$(window).resize(function(){
	width2 =  ($(".wrapper").width());
	var windowwith2 = $(window).width(), divWidth=0;
	var getwidth2 = ((windowwith2 - width2) / 2);
	$('.fullpage').css({'marginLeft':(-getwidth2)+'px'});
	$('.fullpage').css({'marginRight':(-getwidth2)+'px'});
	$('.fullpage-content').css({'marginLeft':(-getwidth2)+'px'});
	$('.fullpage-content').css({'marginRight':(-getwidth2)+'px'});
	$('.fullpage-content').css({'paddingLeft':(getwidth2)+'px'});
	$('.fullpage-content').css({'paddingRight':(getwidth2)+'px'});

});
// jQuery( document ).ready(function( $ ) {
//   $("#tabs").tabs();
// });

	$(document).ready(function() {
		$(".content").hide();
		$(".show_hide").on("click", function() {
			var txt = $(".content").is(':visible') ? 'Read More' : 'Read Less';
			$(".show_hide").text(txt);
			$(this).next('.content').slideToggle(200);
		});
	});  
}








