/*
 *
 * Author: Chris 'CJ' Jones (chris.cj.jones@gmail.com)
 * Project: jQuery.element2jQuery
 * Date: Wednesday September 19 2013
 * Version: 1.00
 *
 */

(function($) {
    $.element2jQuery = function(element_id) {
        return $(document.getElementById(element_id));
    }
})(jQuery);