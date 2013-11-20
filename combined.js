/*
 *
 * Author: Chris 'CJ' Jones (chris.cj.jones@gmail.com)
 * Project: jQuery.CJ
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

/* Add trim to String object */
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

/* Add math functions to jQuery */
(function($) {
    $.Math = $.Math || {};
    
    $.Math.toggleBit = function(num, bit) {
        var returns = false;
        if($.Math.hasBit(num, bit)) {
            $.Math.removeBit(num, bit);
        } else {
            $.Math.addBit(num, bit);
        }
        return returns;
    }
    
    $.Math.hasBit = function(num, bit) {
        if((num >> bit) % 2 != 0) return true;
        return false;
    }
    
    $.Math.addBit = function(num, bit) {
        return num | 1 << bit;
    }
    
    $.Math.removeBit = function(num, bit) {
        return num & ~(1 << bit);
    }
})(jQuery);

/*
 * jQuery.element2jQuery
 * 
 * Usage:
 *   jQuery.element2jQuery(String id)
 *
 * Use instead of jQuery(String id) if id contains either ':', '[', or ']'
 */

(function($) {
    $.element2jQuery = function(element_id) {
        var out = $(document.getElementById(element_id))
        var jQuerySafeId = $(out).attr('id').replace(/(:|\[|\])/g, '_');
        $(out).data('jQuerySafeId', jQuerySafeId)
        return out;
    }
})(jQuery);

/*
 * jQuery.create
 * 
 * Usage:
 *   jQuery.create(Object options)
 *
 * Elements can be nested by using append.
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

/* Strip input */
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

/*
 * Example 1 (Individual Table):
 *  jQuery(document).ready(function() {
 *      jQuery('#table_0').fixedTable({
 *          table: {
 *              height: 300,
 *              width: 800
 *          }
 *          
 *      });
 *  });
 *
 * Example 2 (All Tables With Class Name):
 *  jQuery.fixedTableByClassName('fixedTable', {
 *      table: {
 *              height: 300,
 *              width: 800
 *          }
 *          
 *      });
 *  });
 */
 
(function($) {
    $.fixedTableByClassName = function(className, options) {
        options = $.extend({}, $.FixedTable.defaults, options);
        
        var tables = document.getElementsByTagName('table');
        $(tables).each(function(index, element) {
            if($(element).hasClass(className)) {
                $(element).fixedTable(options)
            }
        });
    }
    
    $.fn.extend({
        fixedTable: function(options) {
            options = $.extend({}, $.FixedTable.defaults, options);
            
            this.each(function() {
                new $.FixedTable(this, options);
            });
            return this;
        }
    });
    
    $.FixedTable = function(element, options) {
        options.table.height = (options.table.height == 0) ? document.scrollHeight : options.table.height;
        options.table.width = (options.table.width == 0) ? document.scrollWidth : options.table.width;
        
        var fixedTableProperties = {};
        
        fixedTableProperties.fixedFirstColumns = {};
        fixedTableProperties.fixedLastColumns = {};
        
        fixedTableProperties.tableBodyCells = {};
        
        fixedTableProperties.fixedFirstColumnCount = 0;
        fixedTableProperties.fixedLastColumnCount = 0;
        
        fixedTableProperties.fixedFirstHeaders = {};
        fixedTableProperties.fixedLastHeaders = {};
        fixedTableProperties.headers = {};
        
        fixedTableProperties.fixedFirstFooters = {};
        fixedTableProperties.fixedLastFooters = {};
        fixedTableProperties.footers= {};
        
        $(element).data('fixedTableProperties', fixedTableProperties);
        
        $.FixedTable.getBody(element);
        
        fixedTableProperties.headers = $.FixedTable.getHeaders(element);
        fixedTableProperties.footers = $.FixedTable.getHeaders(element, 'tfoot');
        
        if(Object.keys(fixedTableProperties.fixedFirstColumns).length > 0) {
            var firstCols = $.FixedTable.createColumns(element);
        }
        
        if(Object.keys(fixedTableProperties.fixedLastColumns).length > 0) {
            var lastCols = $.FixedTable.createColumns(element, 'last');
        }
        
        if(Object.keys(fixedTableProperties.headers).length > 0) {
            var header = $.FixedTable.createHeaders(element, 'header');
        }
        
        if(Object.keys(fixedTableProperties.footers).length > 0) {
            var footer = $.FixedTable.createHeaders(element, 'footer');
        }
        
        var container = $.FixedTable.createOuter(element, options);
        
        var tableContent = document.createElement('div');
        tableContent.id = 'fixed_table_' + element.id + '_table_content';
        tableContent.style.clear = 'both';
        
        if(Object.keys(fixedTableProperties.headers).length > 0)
            container.appendChild(header);
        
        if(Object.keys(fixedTableProperties.fixedFirstColumns).length > 0)
            tableContent.appendChild(firstCols);
        
        var tableBody = $.FixedTable.createBody(element);
        
        tableContent.appendChild(tableBody);
        
        if(Object.keys(fixedTableProperties.fixedLastColumns).length > 0)
            tableContent.appendChild(lastCols);
        
        container.appendChild(tableContent);
        
        if(Object.keys(fixedTableProperties.footers).length > 0)
            container.appendChild(footer);
        
        $(container).insertBefore(element);
        
        var clearElement = document.createElement('div');
        clearElement.style.fontSize = '1px';
        clearElement.style.clear = 'both';
        clearElement.innerHTML = '&nbsp;';
        
        $(clearElement).insertBefore(element);
        
        /* Widths */
        var extraWidth = 0;
        
        if(Object.keys(fixedTableProperties.fixedFirstColumns).length > 0)
            extraWidth = extraWidth + document.getElementById('fixed_table_' + element.id + '_first').scrollWidth;
        
        if(Object.keys(fixedTableProperties.fixedLastColumns).length > 0)
            extraWidth = extraWidth + document.getElementById('fixed_table_' + element.id + '_last').scrollWidth;
        
        var bodyWidth = (options.table.width - extraWidth);
        document.getElementById('fixed_table_' + element.id + '_table_body').style.width = bodyWidth + 'px';
        document.getElementById('fixed_table_' + element.id + '_table_body_table').style.width = element.offsetWidth + 'px';
        
        if(Object.keys(fixedTableProperties.headers).length > 0) {
            document.getElementById('fixed_table_' + element.id + '_header_headers').style.width = bodyWidth + 'px';
            document.getElementById('fixed_table_' + element.id + '_header_headers_table').style.width = element.offsetWidth + 'px';
        }
        
        if(Object.keys(fixedTableProperties.footers).length > 0) {
            document.getElementById('fixed_table_' + element.id + '_footer_headers').style.width = bodyWidth + 'px';
            document.getElementById('fixed_table_' + element.id + '_footer_headers_table').style.width = element.offsetWidth + 'px';
        }
        
        /* Heights */
        var extraHeight = 0;
        
        if(Object.keys(fixedTableProperties.headers).length > 0) 
            extraHeight = extraHeight + document.getElementById('fixed_table_' + element.id + '_header').scrollHeight;
        
        if(Object.keys(fixedTableProperties.footers).length > 0)
            extraHeight = extraHeight + document.getElementById('fixed_table_' + element.id + '_footer').scrollHeight;
        
        var contentHeight = (options.table.height - extraHeight);
        document.getElementById('fixed_table_' + element.id + '_table_content').style.height = contentHeight + 'px';
        document.getElementById('fixed_table_' + element.id + '_table_body').style.height = contentHeight + 'px';
        
        if(Object.keys(fixedTableProperties.fixedFirstColumns).length > 0)
            document.getElementById('fixed_table_' + element.id + '_first').style.height = document.getElementById('fixed_table_' + element.id + '_table_body').clientHeight  + 'px';
        
        if(Object.keys(fixedTableProperties.fixedLastColumns).length > 0)
            document.getElementById('fixed_table_' + element.id + '_last').style.height = document.getElementById('fixed_table_' + element.id + '_table_body').clientHeight  + 'px';
        
        if(document.getElementById('fixed_table_' + element.id + '_table_body_table').offsetHeight > document.getElementById('fixed_table_' + element.id + '_table_body').offsetHeight) {
            var scrollBarSize = (document.getElementById('fixed_table_' + element.id + '_table_body').offsetHeight - document.getElementById('fixed_table_' + element.id + '_table_body').clientHeight);
            
            if(Object.keys(fixedTableProperties.headers).length > 0) {
                document.getElementById('fixed_table_' + element.id + '_header_headers').style.width = (document.getElementById('fixed_table_' + element.id + '_header_headers').offsetWidth - scrollBarSize) + 'px';
                if(Object.keys(fixedTableProperties.fixedLastColumns).length > 0)
                    document.getElementById('fixed_table_' + element.id + '_header_last').style.paddingLeft = scrollBarSize + 'px';
            }
                
            if(Object.keys(fixedTableProperties.footers).length > 0) {
                document.getElementById('fixed_table_' + element.id + '_footer_headers').style.width = (document.getElementById('fixed_table_' + element.id + '_footer_headers').offsetWidth - scrollBarSize) + 'px';
                if(Object.keys(fixedTableProperties.fixedLastColumns).length > 0)
                    document.getElementById('fixed_table_' + element.id + '_footer_last').style.paddingLeft = scrollBarSize + 'px';
            }
        }
        
        $(element).hide();
    }
    
    $.FixedTable.defaults = {
        table: {
            height: 300,
            width: 1000
        }
    }
    
    $.FixedTable.getHeaders = function(element, type) {
        var type = type || 'thead';
        type = type.toLowerCase();
        
        var header = {};
        var headerElement = element.getElementsByTagName(type);
        if(typeof headerElement[0] !== 'undefined') {
            var tr = headerElement[0].getElementsByTagName('tr');
            $(tr).each(function(trIndex, trElement) {
                var th = trElement.getElementsByTagName('th');
                $(th).each(function(thIndex, thElement) {
                    header[trIndex] = header[trIndex] || {};
                    header[trIndex][thIndex] = thElement.innerHTML;
                });
            });
        }
        
        return header;
    }
    
    $.FixedTable.getBody = function(element) {
        var fixedTableProperties = $(element).data('fixedTableProperties');
        var tBody = element.getElementsByTagName('tbody');
        if(typeof tBody[0] !== 'undefined') {
            fixedTableProperties.tableBodyCells = fixedTableProperties.tableBodyCells || {};
            fixedTableProperties.fixedFirstColumns = fixedTableProperties.fixedFirstColumns || {};
            fixedTableProperties.fixedLastColumns = fixedTableProperties.fixedLastColumns || {};
            
            var tr = tBody[0].getElementsByTagName('tr');
            $(tr).each(function(trIndex, trElement) {
                var bodyStarted = false;
                
                var firstIndex = 0;
                var lastIndex = 0;
                var bodyIndex = 0;
                
                $(trElement).children().each(function(index, cell) {
                    var type = $(cell).get(0).tagName.toLowerCase();
                    if(type == 'td') {
                        bodyStarted = true;
                        fixedTableProperties.tableBodyCells[trIndex] = fixedTableProperties.tableBodyCells[trIndex] || {};
                        fixedTableProperties.tableBodyCells[trIndex][bodyIndex] = cell.innerHTML;
                        bodyIndex++;
                    }
                    if(!bodyStarted && type == 'th') {
                        if(trIndex == 0) fixedTableProperties.fixedFirstColumnCount++;
                        fixedTableProperties.fixedFirstColumns[trIndex] = fixedTableProperties.fixedFirstColumns[trIndex] || {};
                        fixedTableProperties.fixedFirstColumns[trIndex][firstIndex] = cell.innerHTML;
                        firstIndex++;
                    }
                    if(bodyStarted && type == 'th') {
                        if(trIndex == 0) fixedTableProperties.fixedLastColumnCount++;
                        fixedTableProperties.fixedLastColumns[trIndex] = fixedTableProperties.fixedLastColumns[trIndex] || {};
                        fixedTableProperties.fixedLastColumns[trIndex][lastIndex] = cell.innerHTML;
                        lastIndex++;
                    }
                });
            });
        }
    }
    
    $.FixedTable.createOuter = function(element, options) {
        var out = document.createElement('div');
        out.id = 'fixed_table_' + element.id + '_container';
        out.style.height = options.table.height + 'px';
        out.style.width = options.table.width + 'px';
        out.style.clear = 'both';
        return out;
    }
    
    $.FixedTable.createHeaders = function(element, type) {
        var fixedTableProperties = $(element).data('fixedTableProperties');
        var type = type || "header";
        type = type.toLowerCase();
        
        var tmpObj = {};
        switch(type) {
            case 'footer':
                tmpObj = fixedTableProperties.footers;
                break;
            case 'header':
            default:
                tmpObj = fixedTableProperties.headers;
                break;
        }
        var startingCell = (Object.keys(tmpObj[0]).length - fixedTableProperties.fixedLastColumnCount);
        
        var container = document.createElement('div');
        container.id = 'fixed_table_' + element.id + '_' + type;
        container.style.overflow = 'hidden';
        container.style.clear = 'both';
        
        if(fixedTableProperties.fixedFirstColumnCount > 0) {
            var fixedFirstColumnHeaders = document.createElement('div');
            fixedFirstColumnHeaders.id = 'fixed_table_' + element.id + '_' + type + '_first';
            fixedFirstColumnHeaders.style.float = 'left';
            var tableHeader = document.createElement('table');
            Object.keys(tmpObj).forEach(function(row_id) {
                var tr = document.createElement('tr');
                Object.keys(tmpObj[row_id]).forEach(function(cell_id) {
                    if(cell_id >= fixedTableProperties.fixedFirstColumnCount) return;
                    var th = document.createElement('th');
                    var cell = tmpObj[row_id][cell_id];
                    th.innerHTML = cell;
                    tr.appendChild(th);
                    delete tmpObj[row_id][cell_id];
                });
                tableHeader.appendChild(tr);
            });
            fixedFirstColumnHeaders.appendChild(tableHeader);
        }
        
        if(fixedTableProperties.fixedLastColumnCount > 0) {
            var fixedLastColumnHeaders = document.createElement('div');
            fixedLastColumnHeaders.id = 'fixed_table_' + element.id + '_' + type + '_last';
            fixedLastColumnHeaders.style.float = 'left';
            var tableFooter = document.createElement('table');
            Object.keys(tmpObj).forEach(function(row_id) {
                var tr = document.createElement('tr');
                Object.keys(tmpObj[row_id]).forEach(function(cell_id) {
                    if(cell_id >= startingCell) {
                        //alert(cell_id)
                        
                        var th = document.createElement('th');
                        var cell = tmpObj[row_id][cell_id];
                        
                        th.innerHTML = cell;
                        tr.appendChild(th);
                        
                        delete tmpObj[row_id][cell_id];
                    }
                });
                tableFooter.appendChild(tr);
            });
            fixedLastColumnHeaders.appendChild(tableFooter);
        }
        
        if(fixedTableProperties.fixedFirstColumnCount > 0)
            container.appendChild(fixedFirstColumnHeaders);
        
        var headerTableContainer = document.createElement('div');
        headerTableContainer.style.overflow = "hidden";
        headerTableContainer.id = 'fixed_table_' + element.id + '_' + type + '_headers';
        headerTableContainer.style.float = 'left';
        
        var headerTable = document.createElement('table');
        headerTable.id = 'fixed_table_' + element.id + '_' + type + '_headers_table';
        
        Object.keys(tmpObj).forEach(function(row_id) {
            var headerTr = document.createElement('tr');
            Object.keys(tmpObj[row_id]).forEach(function(cell_id) {
                var headerTh = document.createElement('th');
                var headerCell = tmpObj[row_id][cell_id];
                headerTh.innerHTML = headerCell;
                headerTr.appendChild(headerTh);
            });
            headerTable.appendChild(headerTr);
        });
        
        headerTableContainer.appendChild(headerTable);
        
        container.appendChild(headerTableContainer);
        if(fixedTableProperties.fixedLastColumnCount > 0)
            container.appendChild(fixedLastColumnHeaders);
        
        return container;
    }
    
    $.FixedTable.createColumns = function(element, type) {
        var fixedTableProperties = $(element).data('fixedTableProperties');
        var type = type || "first";
        type = type.toLowerCase();
        
        var tmpObj = {};
        switch(type) {
            case 'last':
                tmpObj = fixedTableProperties.fixedLastColumns;
                break;
            case 'first':
            default:
                tmpObj = fixedTableProperties.fixedFirstColumns;
                break;
        }
        
        var container = document.createElement('div');
        container.id = 'fixed_table_' + element.id + '_' + type;
        container.style.float = 'left';
        container.style.overflow = 'hidden';
        
        var table = document.createElement('table');
        
        Object.keys(tmpObj).forEach(function(row_id) {
            var columnTr = document.createElement('tr');
            Object.keys(tmpObj[row_id]).forEach(function(cell_id) {
                var columnTh = document.createElement('th');
                var columnCell = tmpObj[row_id][cell_id];
                columnTh.innerHTML = columnCell;
                columnTr.appendChild(columnTh);
            });
            table.appendChild(columnTr);
        });
        
        container.appendChild(table);
        
        return container;
    }
    
    $.FixedTable.createBody = function(element) {
        var fixedTableProperties = $(element).data('fixedTableProperties');
        var container = document.createElement('div');
        container.id = 'fixed_table_' + element.id + '_table_body';
        container.style.float = 'left';
        container.style.overflow = 'auto';
        container.onscroll = function() {
            $.FixedTable.scroll(element)
        }
        
        var table = document.createElement('table');
        table.id = 'fixed_table_' + element.id + '_table_body_table';
        
        Object.keys(fixedTableProperties.tableBodyCells).forEach(function(row_id) {
            var tr = document.createElement('tr');
            Object.keys(fixedTableProperties.tableBodyCells[row_id]).forEach(function(cell_id) {
                var td = document.createElement('td');
                var cell = fixedTableProperties.tableBodyCells[row_id][cell_id];
                td.innerHTML = cell;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
        
        container.appendChild(table);
        
        return container;
    }
    
    $.FixedTable.scroll = function(element) {
        var fixedTableProperties = $(element).data('fixedTableProperties');
        
        var bodyScrollLeft = $('#fixed_table_' + element.id + '_table_body').scrollLeft();
        var bodyScrollTop = $('#fixed_table_' + element.id + '_table_body').scrollTop();
        
        if(Object.keys(fixedTableProperties.headers).length > 0) 
            $('#fixed_table_' + element.id + '_header_headers').scrollLeft(bodyScrollLeft);
        
        if(Object.keys(fixedTableProperties.footers).length > 0)
            $('#fixed_table_' + element.id + '_footer_headers').scrollLeft(bodyScrollLeft);
        
        if(Object.keys(fixedTableProperties.fixedFirstColumns).length > 0)
            $('#fixed_table_' + element.id + '_first').scrollTop(bodyScrollTop);
        
        if(Object.keys(fixedTableProperties.fixedLastColumns).length > 0)
            $('#fixed_table_' + element.id + '_last').scrollTop(bodyScrollTop);
    }
})(jQuery);

/*
 * jQuery.selectBox
 * 
 * Usage:
 *   jQuery.selectBox(Object options)
 *
 * Options:
 *   source: Array of Objects
 *     Object keys:
 *       value: Int ID
 *       name: String name
 *       tooltip: Optional String tooltip text
 */

(function($) {
    $.fn.extend({
        selectBox: function(options){
            new $.SelectBox.init(this, options);
        }
    });
    
    $.SelectBox = $.SelectBox || {};
    
    $.SelectBox.tooltip = function(safeId, value) {
        return $.create({
            elementType: 'a',
            href: '#',
            append: $.create({
                elementType: 'img',
                src: '/images/common/icons/tooltip-info.png',
                width: '12',
                height: '15',
                alt: 'tooltip'
            }),
            onmouseover: function() {
                $('#' + safeId + '_searchBox').data('selected', false);
                adms.html.tooltip(this, adms.html.window(value), { minHeight: 50, minWidth: 50, });
            }
        });
    }
    
    $.SelectBox.search = function(element, safeId, source, searchValue) {
        var searchValue = (searchValue !== null && searchValue) ? searchValue.toLowerCase() : null;
        var out = Array();
        var tooltipSearch = $(element).data('tooltipSearch');
        Object.keys(source).forEach(function(key, index) {
            var value = source[key];
            if(searchValue == null) {
                var tooltip = (value.tooltip) ? $.SelectBox.tooltip(safeId, value.tooltip) : '';
                var option = $.create({
                    elementType: 'div',
                    id: safeId + '_' + value.value + '_option',
                    className: 'jQuerySelectOption',
                    append: [
                        value.name,
                        '&nbsp;',
                        tooltip
                    ],
                    data: [
                        ['value', value.value],
                        ['name', value.name]
                    ],
                    onclick: function() {
                        $.SelectBox.select(jQuery(this).data('value'), safeId);
                    },
                    onmouseover: function() {
                        $(element).val($(this).data('value'));
                        $.SelectBox.mouseOut(element, null, safeId);
                        $('#' + safeId + '_searchBox').val($(this).data('name'));
                    },
                    onmouseout: function() {
                        $.SelectBox.mouseOut(element, this, safeId);
                    }
                });
                out[index] = option;
            } else {
                var name = value.name.toLowerCase();
                var tooltip = (value.tooltip) ? value.tooltip.toLowerCase() : '';
                if((searchValue == '') ||
                   (name.indexOf(searchValue) >= 0) ||
                   (tooltipSearch && tooltip.indexOf(searchValue) >= 0)
                  ) {
                    jQuery('#' + safeId + '_' + value.value + '_option').show();
                } else {
                    jQuery('#' + safeId + '_' + value.value + '_option').hide();
                }
            }
        });
        return out;
    }
    
    $.SelectBox.reset = function(element, safeId, source) {
        Object.keys(source).forEach(function(key, index) {
            var value = source[key];
            jQuery('#' + safeId + '_' + value.value + '_option').show();
            $('#' + safeId + '_searchBox').val('');
        });
    }
    
    $.SelectBox.close = function(element, safeId, source) {
        $('#' + safeId + '_container').hide();
        $('#' + safeId + '_searchBox').data('selected', false);
        $('#' + safeId + '_searchBox').blur();
        $.SelectBox.reset(element, safeId, source);
        if(($('#' + safeId + '_searchBox').val() == '') &&
           ($('#' + safeId + '_searchBox').data('selected_value')) &&
           ($('#' + safeId + '_searchBox').data('selected_name'))
          ) {
            $(element).val($('#' + safeId + '_searchBox').data('selected_value'));
            $('#' + safeId + '_searchBox').val($('#' + safeId + '_searchBox').data('selected_name'));
        }
    }
    
    $.SelectBox.select = function(element_value, safeId) {
        $('#' + safeId + '_searchBox').val($('#' + safeId + '_' + element_value + '_option').data('name'));
        $('#' + safeId + '_searchBox').data('selected_value', element_value);
        $('#' + safeId + '_searchBox').data('selected_name', $('#' + safeId + '_' + element_value + '_option').data('name'));
    }
    
    $.SelectBox.selectPrevious = function(element, safeId) {
        var first = $('#' + safeId + '_container div:first');
        if(value == $(first).data('value')) return false;
        
        var last = $('#' + safeId + '_container div:last');
        
        var value = ($(element).val()) ? $(element).val() : $(first).data('value');
        var option = $('#' + safeId + '_' + value + '_option');
        var selected = option.prev();
        if(selected.is(':hidden') == true) {
            while(selected.is(':hidden') == true) {
                selected = selected.next();
                if(selected.data('value') == last.data('value')) break;
            }
        }
        
        $.SelectBox.mouseOut(element, option, safeId);
        $.SelectBox.mouseOver(element, selected, safeId);
        return true;
    }
    
    $.SelectBox.selectNext = function(element, safeId) {
        var last = $('#' + safeId + '_container div:last');
        if(value == last.data('value')) return false;
        
        var first = $('#' + safeId + '_container div:first');
        
        var value = ($(element).val()) ? $(element).val() : first.data('value');
        var option = $('#' + safeId + '_' + value + '_option');
        
        var selected = option.next();
        if(selected.is(':hidden') == true) {
            while(selected.is(':hidden') == true) {
                selected = selected.next();
                if(selected.data('value') == last.data('value')) break;
            }
        }
        
        $.SelectBox.mouseOut(element, option, safeId);
        $.SelectBox.mouseOver(element, selected, safeId);
        return true;
    }
    
    $.SelectBox.mouseOver = function(element, selectedElement, safeId) {
        $(selectedElement).addClass('jQuerySelectOptionHover');
        $('#' + safeId + '_searchBox').val($(selectedElement).data('name'));
        $(element).val($(selectedElement).data('value'));
        if(selectedElement && $(selectedElement).position()) {
            console.log($(selectedElement).position().top + ' : ' + $('#' + safeId + '_container').scrollTop());
            if(
               ($(selectedElement).position().top > $('#' + safeId + '_container').height()) ||
               ($(selectedElement).position().top < ($('#' + safeId + '_container').scrollTop() + $(selectedElement).height()))
              ) {
                var scrollTop = $('#' + safeId + '_container').scrollTop() + ($(selectedElement).position().top - ($('#' + safeId + '_container').height() - ($(selectedElement).height() * 2)));
                if(scrollTop < 0) scrollTop = 0; 
                $('#' + safeId + '_container').scrollTop(scrollTop);
            }
        }
    }
    
    $.SelectBox.mouseOut = function(element, selectedElement, safeId) {
        var selectedElement = selectedElement || null;
        if(selectedElement) {
            $(selectedElement).removeClass('jQuerySelectOptionHover');
        } else {
            $('#' + safeId + '_container').children().each(function(index, el) {
                if($(this).hasClass('jQuerySelectOptionHover')) $(this).removeClass('jQuerySelectOptionHover');
            });
        }
    }
    
    $.SelectBox.draw = function(element, safeId, source) {
        //$(element).hide();
        
        $(document).click(function() {
            if(!$('#' + safeId + '_searchBox').is(':focus')) {
                $.SelectBox.close(element, safeId, source);
            }
        });
        
        var selectContainer = $.create({
            elementType: 'div',
        });
        $(element).after(selectContainer);
        
        $(element).data('suppressKey', false);
        
        $(selectContainer).append(
            $.create({
                elementType: 'input',
                type: 'text',
                id: safeId + '_searchBox',
                placeholder: 'Search By Name',
                className: 'jQuerySelect',
                data: [
                    ['selected', false]
                ],
                onclick: function() {
                    if($('#' + safeId + '_searchBox').is(':focus') && $('#' + safeId + '_searchBox').data('selected') == false) {
                        if($('#' + safeId + '_searchBox').val() != '') $('#' + safeId + '_searchBox').val('');
                        $('#' + safeId + '_container').show();
                        $.SelectBox.mouseOver(element, $('#' + safeId + '_' + $(element).val() + '_option'), safeId);
                        $('#' + safeId + '_searchBox').data('selected', true);
                    } else if($('#' + safeId + '_searchBox').is(':focus') && $('#' + safeId + '_searchBox').data('selected') == true) {
                        $.SelectBox.close(element, safeId, source);
                    }
                },
                onkeydown: function() {
                    switch(event.keyCode) {
                        case 9:
                            $.SelectBox.close(element, safeId, source);
                            break;
                        case 38:
                            $.SelectBox.selectPrevious(element, safeId);
                            $(element).data('suppressKey', true);
                            break;
                        case 40:
                            $.SelectBox.selectNext(element, safeId);
                            $(element).data('suppressKey', true);
                            break;
                        case 13:
                            $.SelectBox.select($(element).val(), safeId);
                            $.SelectBox.close(element, safeId, source);
                            $(element).data('suppressKey', true);
                            return false;
                            break;
                    }
                },
                onkeyup: function(event) {
                    if($(element).data('suppressKey')) {
                        $(element).data('suppressKey', false);
                        return false;
                    } else {
                        var searchString = this.value;
                        $.SelectBox.search(element, safeId, source, searchString)
                    }
                }
            })
        );
        
        $(selectContainer).append(
            $.create({
                elementType: 'div',
                className: 'jQuerySelectClear',
                innerHTML: '&nbsp;'
            })
        );
        
        $(selectContainer).append(
            $.create({
                elementType: 'div',
                id: safeId + '_container',
                className: 'jQuerySelectOptionsContainer',
                append: $.SelectBox.search(element, safeId, source),
                onmouseover: function() {
                    $.SelectBox.mouseOut(element, null, safeId);
                },
                onmouseout: function() {
                    $.SelectBox.mouseOut(element, null, safeId);
                }
            })
        );
        $('#' + safeId + '_searchBox').width($('#' + safeId + '_container').width());
        $('#' + safeId + '_container').width($('#' + safeId + '_searchBox').width());
        $('#' + safeId + '_container').hide();
    }
    
    $.SelectBox.init = function(element, options) {
        var safeId = $(element).attr('id').replace(/(:|\[|\])/g, '_');
        $(element).data('tooltipSearch', options.tooltipSearch);
        $.SelectBox.draw(element, safeId, options.source);
        if($(element).val()) $.SelectBox.select($(element).val(), safeId);
    }
})(jQuery);