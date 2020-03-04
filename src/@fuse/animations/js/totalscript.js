/* 
 * Create HTML5 elements for IE's sake
 * Reference: http://ejohn.org/blog/html5-shiv/
 * Reference: http://remysharp.com/2009/01/07/html5-enabling-script/
 */
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

$(document).ready(function(){
$(".product_finder_text").click(function(){
$(".getin-popup").toggleClass("full-show");});
})


//$(document).ready(function() {
//     $('.popup-btn').click(function() {
//          $('.getin-popup').animate({ height: 'toggle'}, 300);
//      });	  
//});



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

$(document).ready( function() {

if ($(window).width() > 1190) {
	
	$('.carousel').carousel({frontWidth:600,frontHeight:400,carouselWidth:1200,carouselHeight:400,directionNav:true,reflection: false,shadow:false,buttonNav:'bullets'});
	
	}

if ($(window).width() > 990) {
	$('.carousel').carousel({frontWidth:500,frontHeight:333,carouselWidth:1000,carouselHeight:333,directionNav:true,reflection: false,shadow:false,buttonNav:'bullets'});
	}
	
if ($(window).width() > 730) {
	$('.carousel').carousel({frontWidth:374,frontHeight:249,carouselWidth:748,carouselHeight:249,directionNav:true,reflection: false,shadow:false});
	}
	


if ($(window).width() > 450) {
$('.carousel').carousel({frontWidth:230,frontHeight:153,carouselWidth:460,carouselHeight:153,directionNav:true,reflection: false,shadow:false});
}
if ($(window).width() > 350) {
$('.carousel').carousel({frontWidth:155,frontHeight:103,carouselWidth:310,carouselHeight:103,directionNav:true,reflection: false,shadow:false});
}

});



$(window).load(function () {
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

$( function() {
    $( "#tabs" ).tabs();
  } );
  

}








