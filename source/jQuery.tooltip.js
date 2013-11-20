/*
 *
 * Author: Chris 'CJ' Jones (chris.cj.jones@gmail.com)
 * Project: jQuery.tooltip
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

(function($) {
    $.fn.extend({
        tooltip: function(options){
            new $.tooltip.draw(this, options);
        }
    });
    
    $.tooltip.draw = function(element, options) {
        var elementNode = element || '';
        var tooltipNode = options.tooltipNode || '';
        var objectDialogOptionValues = options.objectDialogOptionValues || '';
        
        if ((!elementNode) || (!tooltipNode)) {
            return false;
        }
    
        if (!tooltipNode.hasAttribute('tooltipinit')) {
            var objectDialogOptions = {
                autoOpen: false, 
                draggable: false, 
                resizable: false, 
                dialogClass: 'tooltip', 
                position: {  my: "top", at: "right bottom", of: elementNode, collision: 'flipfit flip' },
            };
            if(objectDialogOptionValues) {
                Object.keys(objectDialogOptionValues).forEach(
                    function(prop) {
                        objectDialogOptions[prop] = objectDialogOptionValues[prop];
                    }
                );
            }
            $(tooltipNode).dialog(objectDialogOptions);
            tooltipNode.setAttribute('tooltipinit', 1);
        }
        if (!elementNode.hasAttribute('tooltipinit')) {
            elementNode.onmouseover = function() { $(tooltipNode).dialog('open') };
            elementNode.onmouseout = function() { $(tooltipNode).dialog('close') } ;
            elementNode.setAttribute('tooltipinit', 1);
            $(tooltipNode).dialog('open');
        }
        
        return true;
    }
})(jQuery);