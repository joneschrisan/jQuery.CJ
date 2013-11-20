/*
 *
 * Author: Chris 'CJ' Jones (chris.cj.jones@gmail.com)
 * Project: jQuery.stripInput
 * Date: Wednesday September 19 2013
 * Version: 1.00
 *
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

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

(function($) {
    $.stripInput = $.stripInput || {};
    
    $.stripInput.Alpha = function(input, length) {
        var input = input || String();
        var length = length || 0;
        
        var out = "";
        input = input.trim();
        
        var tmpArr = Array();
        tmpArr = input.split('');
        
        $.each(tmpArr, function(i, character) {
            if(
               (tmpArr[i] >= 'a' && tmpArr[i] <= 'z') ||
               (tmpArr[i] >= 'A' && tmpArr[i] <= 'Z') ||
               (tmpArr[i] == ' ')
              ) {
                out += tmpArr[i];
            }
        });
        
        if(length > 0)
            out = out.substring(0, length);
        
        return out;
    }
    
    $.stripInput.AlphaNumeric = function(input, length) {
        var input = input || String();
        var length = length || 0;
        
        var out = "";
        input = input.trim();
        
        var tmpArr = Array();
        tmpArr = input.split('');
        
        $.each(tmpArr, function(i, character) {
            if(
               (tmpArr[i] >= 'a' && tmpArr[i] <= 'z') ||
               (tmpArr[i] >= 'A' && tmpArr[i] <= 'Z') ||
               (tmpArr[i] >= '0' && tmpArr[i] <= '9') ||
               (tmpArr[i] == ' ')
              ) {
                out += tmpArr[i];
            }
        });
        
        if(length > 0)
            out = out.substring(0, length);
        
        return out;
    }
    
    $.stripInput.Numeric = function(input, length) {
        var input = input || String();
        var length = length || 0;
        
        var out = "";
        input = input.trim();
        
        var tmpArr = Array();
        tmpArr = input.split('');
        
        $.each(tmpArr, function(i, character) {
            if(
               (tmpArr[i] >= '0' && tmpArr[i] <= '9') ||
               (tmpArr[i] == '.')
              ) {
                out += tmpArr[i];
            }
        });
        
        if(length > 0)
            out = out.substring(0, length);
        
        return out;
    }
    
    $.stripInput.NegativeNumeric = function(input, length) {
        var input = input || String();
        var length = length || 0;
        
        var out = "";
        input = input.trim();
        
        var tmpArr = Array();
        tmpArr = input.split('');
        
        $.each(tmpArr, function(i, character) {
            if(
               (tmpArr[i] >= '0' && tmpArr[i] <= '9') ||
               (tmpArr[i] == '.') || (tmpArr[i] == "-")
              ) {
                out += tmpArr[i];
            }
        });
        
        if(length > 0)
            out = out.substring(0, length);
        
        return out;
    }
    
    $.stripInput.PosativeNumeric = function(input, length) {
        var input = input || String();
        var length = length || 0;
        
        var out = "";
        input = input.trim();
        
        var tmpArr = Array();
        tmpArr = input.split('');
        
        $.each(tmpArr, function(i, character) {
            if(
               (tmpArr[i] >= '0' && tmpArr[i] <= '9') ||
               (tmpArr[i] == '.') || (tmpArr[i] == "+")
              ) {
                out += tmpArr[i];
            }
        });
        
        if(length > 0)
            out = out.substring(0, length);
        
        return out;
    }
    
    $.stripInput.Integer = function(input, length) {
        var input = input || String();
        var length = length || 0;
        
        var out = "";
        input = input.trim();
        
        var tmpArr = Array();
        tmpArr = input.split('');
        
        $.each(tmpArr, function(i, character) {
            if(
               (tmpArr[i] >= '0' && tmpArr[i] <= '9')
              ) {
                out += tmpArr[i];
            }
        });
        
        if(length > 0)
            out = out.substring(0, length);
        
        return out;
    }
    
    $.stripInput.NegativeInteger = function(input, length) {
        var input = input || String();
        var length = length || 0;
        
        var out = "";
        input = input.trim();
        
        var tmpArr = Array();
        tmpArr = input.split('');
        
        $.each(tmpArr, function(i, character) {
            if(
               (tmpArr[i] >= '0' && tmpArr[i] <= '9') ||
               (tmpArr[i] == "-")
              ) {
                out += tmpArr[i];
            }
        });
        
        if(length > 0)
            out = out.substring(0, length);
        
        return out;
    }
    
    $.stripInput.PosativeInteger = function(input, length) {
        var input = input || String();
        var length = length || 0;
        
        var out = "";
        input = input.trim();
        
        var tmpArr = Array();
        tmpArr = input.split('');
        
        $.each(tmpArr, function(i, character) {
            if(
               (tmpArr[i] >= '0' && tmpArr[i] <= '9') ||
               (tmpArr[i] == "+")
              ) {
                out += tmpArr[i];
            }
        });
        
        if(length > 0)
            out = out.substring(0, length);
        
        return out;
    }
})(jQuery);