/*
 *
 * Author: Chris 'CJ' Jones (chris.cj.jones@gmail.com)
 * Project: jQuery.CJ
 * Date: Wednesday September 19 2013
 * Version: 1.00
 *
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
        var safeId = $(element).attr('id').replace(/:/g, '_');
        $(element).data('tooltipSearch', options.tooltipSearch);
        $.SelectBox.draw(element, safeId, options.source);
        if($(element).val()) $.SelectBox.select($(element).val(), safeId);
    }
})(jQuery);