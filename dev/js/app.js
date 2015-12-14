$(document).ready(function(){

    /**
     * This part toggles if the nav bar is active or not, 
     * as well as the state of the menu icon.
     */

    $(".menu").on('click', function(evn) {
        evn.preventDefault();
        $(this).children().toggleClass('origin-left');
        $(this).toggleClass('is-active');
        $(this).toggleClass('is-inactive');
    });

    $(".links-container a").on('click', function(evn) {
        evn.preventDefault();
        $('.menu').toggleClass('is-active');
        $('.menu').toggleClass('is-inactive');
    });

    /**
     * This part uses AJAX to load the content of
     * the specific portfolio into the modal window.
     */

     $('.portfolio').on('click', 'a', function() {
        $('body').addClass('modal-open');
        console.log(this);
        var id = "portfolio/" + $(this).data('id') + ".html"
        console.log(id);
        $.ajax({
            url: id, 
            type: 'GET',
            dataType: 'html',
            success: function(result) {
                $('.modalContent').hide().html(result).appendTo('.modalDialog').delay(400).fadeIn('slow');
            },
            error: function(request, errorType, errorMessage) {
                alert('Error: ' + errorType + ' with message: ' + errorMessage);
            },
            timeout: 3000,
            beforeSend: function() {
                $('.load-container').show();
            },
            complete: function() {
                $('.load-container').hide();
            }
        });
     });

     $('.modalDialog').on('click', '.close', function() {
        $('body').removeClass('modal-open');
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
          $(".menu.is-inactive").filter(':not(:animated)').addClass('hidden');
       } else if (scroller+senseSpeed < previousScroll) {
          $(".menu.is-inactive").filter(':not(:animated)').removeClass('hidden');
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