/*
 *
 * Author: Chris 'CJ' Jones (chris.cj.jones@gmail.com)
 * Project: jQuery.create
 * Date: Wednesday September 19 2013
 * Version: 1.00
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