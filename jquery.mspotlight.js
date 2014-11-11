/*
 * Multi Spotlight v. 1.0.0
 * (c) 2014 Dmitry Pletnev aka Waxer - https://github.com/waxerdima/mspotlight
 * http://waxerdima.github.io/mspotlight/
 *
 * jQuery плагин для фокусировки внимания на нужных элементах страницы
 *
 * Опции: 
 * className - имя класса для блоков отвечающих за затемнение  default: spotlight 
 * overflowHidden - скрывать скролл или нет default: false
 * closeClick - выключать спотлайт при клике на затемненную область default: true
 * resetResize - выключать спотлайт при изменении размеров окна default: true
 *
 */

(function($) {
  var 
    _screen = {},
    _options = {},
    _defaults = {
      className: 'spotlight',
      overflowHidden: false,
      closeClick: true,
      resetResize: true
    },

    _getOptions = function($element) {
      return $element.data('options');
    },

    _setOptions = function($element, option, value) {
      var item = {};
      item[option] = value;
      $element.data('options', $.extend($element.data('options'), item));
    },

    _getOptions = function($element) {
      return $element.data('options');
    },

    _setOptions = function($element, option, value) {
      var item = {};
      item[option] = value;
      $element.data('options', $.extend($element.data('options'), item));
    },

    _getOptions = function($element) {
      return $element.data('options');
    },

    _setOptions = function($element, option, value) {
      var item = {};
      item[option] = value;
      $element.data('options', $.extend($element.data('options'), item));
    },
    _off = function() {
      $('. + _options.className).remove();
      if (_options.overflowHidden) {
        $('html').css({'overflow': 'visible'});
      }
      _options.spotlightInit = false;
    },

    _inRange = function(range, elements) {
      var block = [];

      $.each(elements, function(index, offset) {
        if (
          (offset.left < range.right && offset.right > range.left) &&
          (offset.top < range.bottom && offset.bottom > range.top)
        ) {
          block.push(offset);
        }  
      });

      return block;
    },

    _createBlock = function(range) {
      var block = {
        top: range.top,
        left: range.left,
        width: range.right - range.left,
        height: range.bottom - range.top
      };

      if (block.width <= 0|| block.height <= 0) {
        return false;
      }

        $("body"').append(
        $('<div>').css(block).addClass(_options.className).click(function() {
          if (_options.closeClick) {
            _off();
          }
        }
      );
    },

    _maxTop = function(blocks) {
      var 
        range, 
        top = Infinity;

      $.each(blocks, function(index, block) {
        if (top > block.top) {
          top = block.top;
          range = block;
        }
      });

      return range;
    },

    _fill = function(range, elements) {
      var 
        diff, 
        blocks = _inRange(range, elements);

      if (!blocks.length) {
        _createBlock(range);
      } else {
        diff = _maxTop(blocks);
        _createBlock({
    top: range.top,
          bottom: diff.top,
          left: range.left,
          right: range.right
        });

        _fill({
          top: diff.top,
          bottom: _screen.bottom,
          left: Math.max(0, range.left),
          right: diff.left
        }, blocks);

        _fill({
          top: diff.bottom,
          bottom: _screen.bottom,
          left: Math.max(diff.left, range.left),
          right: Math.min(diff.right, range.right)
        }, blocks);

        _fill({
          top: diff.top,
          bottom: _screen.bottom,
          left: diff.right,
          right: Math.min(_screen.right, range.right)
        }, blocks);
      }
    },

_fill = function(range, elements) {
        var
        diff,
        blocks = _inRange(range, elements);

      if (!blocks.length) {
        _createBlock(range);
      } else {
        diff = _maxTop(blocks);
        _createBlock({
          top: range.top,
          bottom: diff.top,
          left: range.left,
          right: range.right
        });

        _fill({
          top: diff.top,
          bottom: _screen.bottom,
          left: Math.max(0, range.left),
          right: diff.left
        }, blocks);

        _fill({
          top: diff.bottom,
          bottom: _screen.bottom,
          left: Math.max(diff.left, range.left),
          right: Math.min(diff.right, range.right)
        }, blocks);

        _fill({
          top: diff.top,
          bottom: _screen.bottom,
          left: diff.right,
          right: Math.min(_screen.right, range.right)
        }, blocks);
      }
    },

    _create = function($container) {
      var 
        blockSize = [],
        body = document.body,
        html = document.documentElement;

      if (_options.overflowHidden) {
        $('html').css({'overflow': 'hidden'});
      }

      $container.each(function() {
        var 
          $this = $(this),
          offset = $this.offset();

        blockSize.push({
          left: offset.left,
          right: offset.left + $this.outerWidth(),
          top: offset.top,
          bottom: offset.top + $this.outerHeight()
        });
      });

      _screen = {
        top: 0,
        bottom: Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight),
        left: 0,
        right: $('body').outerWidth(true)
      };

      _fill(_screen, blockSize);
  
      if (_options.resetResize) {
        $(window).resize(function() {
          _off();
        });
      }
    },
    
    _methods = {
      init: function(options) {  
        _options = {spotlightInit: true};
        $.extend(_options, _defaults, options); 
        _create(this); 
        return this;
      },

      off: function() {
        _off();
        return this;
      }
    };
             
  $.fn.mspotlight = function(method) {
    if (typeof method === 'object' || !method) {
      return _methods.init.apply(this, arguments);
    }
    if (_methods[method]) {
      return _methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    $.error('Method ' +  method + ' not found in jQuery.mspotlight');
  };
})(jQuery);
