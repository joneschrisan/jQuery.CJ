/*
 *
 * Author: Chris 'CJ' Jones (chris.cj.jones@gmail.com)
 * Project: jQuery.create
 * Date: Wednesday September 19 2013
 * Version: 1.00
 *
 */

/*
 * jQuery.create
 * 
 * Usage:
 *   jQuery.create(Object options)
 *
 * Elements can be nested by using append.
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
    $.create = function(options) {
        var options = options || null;
        var out = document.createElement(options.elementType);
        delete options.elementType;
        if(options) {
            Object.keys(options).forEach(function(key, index) {
                var value = options[key];
                switch(key) {
                    case 'data':
                        var arrayLength = value.length;
                        for(i = 0; i < arrayLength; i++) {
                            $(out).data(value[i][0], value[i][1]);
                        }
                        break;
                    case 'prepend':
                        if(Object.prototype.toString.call(value) === '[object Array]') {
                            var valueLength = value.length;
                            for(i = 0; i < valueLength; i++) {
                                $(out).prepend(value[i]);
                            }
                        } else {
                            $(out).prepend(value);
                        }
                        break;
                    case 'append':
                        if(Object.prototype.toString.call(value) === '[object Array]') {
                            var valueLength = value.length;
                            for(i = 0; i < valueLength; i++) {
                                $(out).append(value[i]);
                            }
                        } else {
                            $(out).append(value);
                        }
                        break;
                    case 'before':
                        if(Object.prototype.toString.call(value) === '[object Array]') {
                            var valueLength = value.length;
                            for(i = 0; i < valueLength; i++) {
                                $(out).before(value[i]);
                            }
                        } else {
                            $(out).before(value);
                        }
                        break;
                    case 'after':
                        if(Object.prototype.toString.call(value) === '[object Array]') {
                            var valueLength = value.length;
                            for(i = 0; i < valueLength; i++) {
                                $(out).after(value[i]);
                            }
                        } else {
                            $(out).after(value);
                        }
                        break;
                    case 'style':
                        if(Object.prototype.toString.call(value) == '[object Object]') {
                            Object.keys(value).forEach(function(style, styleIndex) {
                                var styleValue = value[style];
                                out.style[style] = styleValue;
                            });
                        } else {
                            $(out).attr('style', value);
                        }
                        break;
                    default:
                        out[key] = value;
                        break;
                }
            });
        }
        return out;
    }
})(jQuery);