/*
 *
 * Author: Chris 'CJ' Jones (chris.cj.jones@gmail.com)
 * Project: jQuery.stripInput
 * Date: Wednesday September 19 2013
 * Version: 1.00
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