$(document).ready(function(){

	/**
     * This part toggles if the nav bar is active or not, 
     * as well as the state of the menu icon.
     */

    $(".menu, links-container a").on('click', function(evn) {
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
     * This part causes smooth scrolling using scrollto.js
     * We target all a tags inside the nav, and apply the scrollto.js to it.
     */
    $(".links-container a").click(function(evn){
        evn.preventDefault();
        $('html,body').scrollTo(this.hash, this.hash);
    });
});