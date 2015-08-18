$(document).ready(function(){

    /**
     * This part toggles if the nav bar is active or not, 
     * as well as the state of the menu icon.
     */

    $(".menu").on('click', function(evn) {
        evn.preventDefault();
        $(this).toggleClass('is-active');
        $(this).toggleClass('is-inactive');
    });

    $(".links-container a").on('click', function(evn) {
        evn.preventDefault();
        $('.menu').toggleClass('is-active');
        $('.menu').toggleClass('is-inactive');
    });

    /**
     * This part toggles if the nav bar is active or not, 
     * as well as the state of the menu icon.
     */

     $('.portfolio a').on('click', function() {
        $.ajax({
            url: 'portfolio/modal.html', 
            type: 'POST',
            dataType: 'html',
            success: function(result) {
                $('.modalContent').html(result);
            }
        });
     });

    /**
     * This part causes smooth scrolling using scrollto.js
     * We target all a tags inside the nav, and apply the scrollto.js to it.
     */

    $(".links-container a").click(function(evn){
        evn.preventDefault();
        $('html,body').scrollTo(this.hash, this.hash);
    });

    /**
     * This part hides the menu icon upon scrolling down and reveals it scrolling up.
     * It only targets the icon when it is inactive, i.e. not showing the nav bar.
     */

    var senseSpeed = 5;
    var previousScroll = 0;
    $(window).scroll(function(event){
       var scroller = $(this).scrollTop();
       if (scroller-senseSpeed > previousScroll){
          $(".menu.is-inactive").filter(':not(:animated)').slideUp(300);
       } else if (scroller+senseSpeed < previousScroll) {
          $(".menu.is-inactive").filter(':not(:animated)').slideDown(300);
       }
       previousScroll = scroller;
    });


    /**
     * This part handles the highlighting functionality.
     * We use the scroll functionality again, some array creation and 
     * manipulation, class adding and class removing, and conditional testing
     */

    var aChildren = $(".links-container ul li").children(); // find the a children of the list items
    var aArray = []; // create the empty aArray
    for (var i=0; i < aChildren.length; i++) {    
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values

    $(window).scroll(function(){
        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
        var windowHeight = $(window).height(); // get the height of the window
        var docHeight = $(document).height();

        for (var i=0; i < aArray.length; i++) {
            var theID = aArray[i];
            var divPos = $(theID).offset().top; // get the offset of the div from the top of page
            var divHeight = $(theID).height(); // get the height of the div in question
            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                $("a[href='" + theID + "']").addClass("nav-active");
            } else {
                $("a[href='" + theID + "']").removeClass("nav-active");
            }
        }

        if(windowPos + windowHeight == docHeight) {
            if (!$("nav li:last-child a").hasClass("nav-active")) {
                var navActiveCurrent = $(".nav-active").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
                $("nav li:last-child a").addClass("nav-active");
            }
        }
    });

});