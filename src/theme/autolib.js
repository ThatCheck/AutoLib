import jQuery from 'jquery';
jQuery(document).ready(function init() {
  if (jQuery('#side-menu').length > 0) {
    jQuery('#side-menu').metisMenu();
  }
  function fixHeight() {
    const heightWithoutNavbar = jQuery('body > #wrapper').height() - 61;
    jQuery('.sidebard-panel').css('min-height', heightWithoutNavbar + 'px');

    const navbarHeigh = jQuery('nav.navbar-default').height();
    const wrapperHeigh = jQuery('#page-wrapper').height();

    if (navbarHeigh > wrapperHeigh) {
      jQuery('#page-wrapper').css('min-height', navbarHeigh + 'px');
    }

    if (navbarHeigh < wrapperHeigh) {
      jQuery('#page-wrapper').css('min-height', jQuery(window).height() + 'px');
    }

    if (jQuery('body').hasClass('fixed-nav')) {
      jQuery('#page-wrapper').css('min-height', jQuery(window).height() - 60 + 'px');
    }

  }
  fixHeight();

  jQuery(window).bind('load resize scroll', function resize() {
    if (!jQuery('body').hasClass('body-small')) {
      fixHeight();
    }
  });

  jQuery('.slideToggle-listings-maps').click(function slideToggle() {
    jQuery('.container-listings-maps').slideToggle();
  });

});
