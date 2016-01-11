import jQuery from 'jquery';
jQuery(document).ready(function init() {
  if (jQuery('#side-menu').length > 0) {
    jQuery('#side-menu').metisMenu();
  }
});
