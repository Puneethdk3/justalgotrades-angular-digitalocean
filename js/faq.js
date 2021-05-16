function scrollView(){
    if(jQuery(document).scrollTop() > 400) {
		jQuery('.chat-with-us').addClass('view');
    } 
    
    if ($(window).width() <= 768) {
        if(jQuery(document).scrollTop() > 100) {
            jQuery('.banner-logo').addClass('hide');
            jQuery('.tradelogo').addClass('show');
        } else{
            jQuery('.banner-logo').removeClass('hide');
            jQuery('.tradelogo').removeClass('show');
        }
    }
    else {
        if(jQuery(document).scrollTop() > 150) {
            jQuery('.banner-logo').addClass('hide');
            jQuery('.tradelogo').addClass('show');
        } else{
            jQuery('.banner-logo').removeClass('hide');
            jQuery('.tradelogo').removeClass('show');
        }
    }
}
// Function for Menu Button Click
function menuBtnClick(){
	$(document).on('click', '.menuBtn', function(){
		if($(this).hasClass('open')){
			$(this).removeClass('open');
			$("body").removeClass("nav-open");	
		}else{
			$(this).addClass('open');
			$("body").addClass("nav-open");
		}
    });	

    $(document).on('mouseenter', '.has-submenu',function(){
		if($(this).hasClass('clicked')){
			$(this).removeClass('clicked');
			$(this).parent('.nav').find('.sub-menu').slideUp();
		}else {
			$('.has-submenu').removeClass('clicked');
			$('.sub-menu').slideUp();
			$(this).addClass('clicked');
			$(this).parent('.nav').find('.sub-menu').slideDown();
		}
    });
    $('.sub-menu').parent('.nav').addClass('inner_menu');
}

var win = $(window);

function resizeHandler() {
    $(window).scroll(function(){
        if(jQuery(document).scrollTop() > 200) {
            jQuery('.nk-docstage').addClass('small-header');
        } else {
            jQuery('.nk-docstage').removeClass('small-header');
        }
    });  
}

resizeHandler();

win.resize(resizeHandler);


function accordion(){
	$(document).on('click', '.AccHdr',function(){
		if($(this).hasClass('clicked')){
			$(this).removeClass('clicked');
			$(this).parent('.AccWrapInr').find('.AccCont').slideUp();
		}else {
			$('.AccHdr').removeClass('clicked');
			$('.AccCont').slideUp();
			$(this).addClass('clicked');
			$(this).parent('.AccWrapInr').find('.AccCont').slideDown();
		}
	});
}

$(document).ready(function(){
    accordion();
    scrollView();
    menuBtnClick();
});
$(window).on("load", function(){
    scrollView();
    resizeHandler();
});
$(window).on("scroll", function(){
    scrollView();
    resizeHandler();
});
