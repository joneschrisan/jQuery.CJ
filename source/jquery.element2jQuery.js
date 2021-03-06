/*
 *
 * Author: Chris 'CJ' Jones (chris.cj.jones@gmail.com)
 * Project: jQuery.element2jQuery
 * Date: Wednesday September 19 2013
 * Version: 1.00
 *
 */

/*
 * jQuery.element2jQuery
 * 
 * Usage:
 *   jQuery.element2jQuery(String id)
 *
 * Use instead of jQuery(String id) if id contains either ':', '[', or ']'
 */

/*
 *
 *  The MIT License (MIT)
 *  
 *  Copyright (c) 2013 Chris 'CJ' Jones
 *  
 *  Permission is hereby granted, free of charge, to any person obtaining a copy of
 *  this software and associated documentation files (the "Software"), to deal in
 *  the Software without restriction, including without limitation the rights to
 *  use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 *  the Software, and to permit persons to whom the Software is furnished to do so,
 *  subject to the following conditions:
 *  
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *  
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 *  FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 *  COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 *  IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 *  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

(function($) {
    $.element2jQuery = function(element_id) {
        var out = $(document.getElementById(element_id))
        var jQuerySafeId = $(out).attr('id').replace(/(:|\[|\])/g, '_');
        $(out).data('jQuerySafeId', jQuerySafeId)
        return out;
    }
})(jQuery);