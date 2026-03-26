(function() {
  (function($, window) {
    var $mahFooter, $pagetop, $snsList, $window, Autoload, getFeatures, getPagetopBottom, pageTopVisible;
    jQuery.extend(jQuery.easing, {
      def: 'easeOutQuad',
      easeInQuad: function(x, t, b, c, d) {
        return c * (t /= d) * t + b;
      },
      easeOutQuad: function(x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
      }
    });
    Autoload = (function() {
      var _updateProgress;

      Autoload.prototype.element = null;

      Autoload.prototype.$element = null;

      Autoload.prototype.currentPage = 2;

      Autoload.prototype.threshold = 100;

      Autoload.prototype.extraThreshold = 0;

      Autoload.prototype.isRunning = false;

      Autoload.prototype.options = {
        url: '',
        method: 'GET',
        dataType: 'HTML',
        success: function() {},
        beforeSend: function() {},
        complete: function() {},
        error: function() {},
        data: null,
        pageParamName: 'p'
      };

      _updateProgress = false;

      function Autoload(element, options) {
        this.element = element;
        this.$element = $(this.element);
        this.options = $.extend({}, this.options, options);
        this.start();
      }

      Autoload.prototype.isScrollBottom = function() {
        var displayBottom, elementTop;
        elementTop = this.$element.offset().top;
        displayBottom = $(window).scrollTop() + $(window).height();
        return elementTop - displayBottom < (this.threshold + this.extraThreshold);
      };

      Autoload.prototype.start = function() {
        var _self;
        if (this.isRunning) {
          return;
        }
        _self = this;
        $(window).on('scroll.autoload', function() {
          if (_updateProgress) {
            return;
          }
          if (!_self.isScrollBottom()) {
            return;
          }
          return _self._load();
        });
        return this.isRunning = true;
      };

      Autoload.prototype.stop = function() {
        $(window).off('scroll.autoload');
        return this.isRunning = false;
      };

      Autoload.prototype.reload = function(data) {
        if (data != null) {
          this.options.data = data;
        }
        this.currentPage = 1;
        return this._load();
      };

      Autoload.prototype._load = function() {
        var _self, url;
        if (this.options.beforeSend && $.isFunction(this.options.beforeSend)) {
          this.options.beforeSend(this);
        }
        if (!this.options.url) {
          return;
        }
        url = this.options.url + '?' + this.options.pageParamName + '=' + this.currentPage;
        if (this.options.data != null) {
          url += '&' + $.param(this.options.data);
        }
        _self = this;
        _updateProgress = true;
        return $.ajax({
          method: _self.options.method,
          dataType: _self.options.dataType,
          url: url,
          success: function(res) {
            if (_self.options.success && $.isFunction(_self.options.success)) {
              _self.options.success(res, _self);
            }
            _self.currentPage++;
            return _updateProgress = false;
          },
          complete: function(req, status) {
            if (_self.options.complete && $.isFunction(_self.options.complete)) {
              return _self.options.complete(_self, req, status);
            }
          },
          error: function(req, status, err) {
            if (_self.options.error && $.isFunction(_self.options.error)) {
              _self.options.error(_self, req, status, err);
            }
            return _updateProgress = false;
          }
        });
      };

      return Autoload;

    })();
    $.fn.autoload = function(options) {
      return this.each(function() {
        var $this, data;
        $this = $(this);
        data = $this.data('autoload');
        if (!data) {
          return $this.data('autoload', new Autoload(this, options));
        }
      });
    };
    $pagetop = $('.pagetop');
    $mahFooter = $('.mah-footer');
    $window = $(window);
    getPagetopBottom = function() {
      return $mahFooter.offset().top;
    };
    if ($window.height() < getPagetopBottom()) {
      pageTopVisible = false;
      $pagetop.css({
        position: 'fixed',
        bottom: '-105px',
        marginBottom: '0'
      });
      $window.on('scroll.pagetop', function() {
        var wh, wt;
        wh = 50;
        wt = $window.scrollTop();
        if (pageTopVisible === false && wt > wh && wh + wt < getPagetopBottom()) {
          $pagetop.css({
            position: 'fixed',
            bottom: '15px',
            marginBottom: 0
          });
          return pageTopVisible = true;
        } else if (pageTopVisible === true && (wt <= wh || wh + wt >= getPagetopBottom())) {
          $pagetop.css({
            position: 'fixed',
            bottom: '-105px',
            marginBottom: '0'
          });
          return pageTopVisible = false;
        }
      });
      $pagetop.on('click', function() {
        var p;
        p = $($(this).attr('href')).offset().top;
        $('html,body').animate({
          scrollTop: p
        }, 'fast');
        return false;
      });
    }
    getFeatures = function(w, h) {
      return 'width=' + w + ', height=' + h + ', menubar=no, toolbar=no, scrollbars=yes';
    };
    $snsList = $('.sns-list');
    $snsList.find('.facebook').find('a').data('share', 'Facebook').on('click', function() {
      var w;
      w = window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL), 'FacebookShare', getFeatures(480, 280));
      w.focus();
      return false;
    });
    $snsList.find('.twitter').find('a').data('share', 'Twitter').on('click', function() {
      var $this, text, w;
      $this = $(this);
      text = $this.attr('data-text');
      if (text === void 0) {
        text = encodeURIComponent(document.title) + ': ' + encodeURIComponent(document.URL);
      }
      w = window.open('https://twitter.com/intent/tweet?text=' + text, 'TwitterShare', getFeatures(480, 400));
      w.focus();
      return false;
    });
    $snsList.find('.google-plus').find('a').data('share', 'Google-Plus').on('click', function() {
      var w;
      w = window.open('https://plus.google.com/share?url=' + encodeURIComponent(document.URL), 'GooglePlusShare', getFeatures(480, 440));
      w.focus();
      return false;
    });
    $snsList.find('.pocket').find('a').data('share', 'Pocket').on('click', function() {
      var w;
      w = window.open('https://getpocket.com/save?url=' + encodeURIComponent(document.URL) + '&title=' + encodeURIComponent(document.title), 'PocketShare', getFeatures(480, 290));
      w.focus();
      return false;
    });
    $snsList.find('.tumblr').find('a').data('share', 'Tumblr').on('click', function() {
      var description, w;
      description = $('meta[name=description]').attr('content');
      w = window.open('http://www.tumblr.com/share/link?url=' + encodeURIComponent(document.URL) + '&amp;name=' + encodeURIComponent(document.title) + '&amp;description=' + description, 'TumblrShare', getFeatures(480, 450));
      w.focus();
      return false;
    });
    $snsList.find('.line').find('a').data('share', 'Line').on('click', function() {
      var $linePhone, w;
      $linePhone = 'line://msg/text/';
      w = window.open($linePhone + encodeURIComponent(document.title) + '%0D%0A' + encodeURIComponent(document.URL), 'LineShare');
      w.focus();
      return false;
    });
    $snsList.find('a').on('click', function() {
      return $.ua.trackEvent($(this).data('share') + 'Share', 'Click', location.href, 1);
    });
    $(document).on('contextmenu', '.nomenu', function(e) {
      return false;
    });
    $('.unselectable').on('mousedown', function() {
      return false;
    }).on('mouseup', function() {
      return false;
    }).on('mouseover', function() {
      return false;
    }).on('drag', function() {
      return false;
    }).on('dragstart', function() {
      return false;
    }).on('dragend', function() {
      return false;
    });
    $('.js-mah-toggle-menu').on('click', function() {
      var $navPhone;
      $navPhone = $('.js-mah-nav-phone');
      if ($navPhone.is(':hidden')) {
        $.ua.trackEvent('SPMenu', 'Open', location.href, 1);
      } else {
        $.ua.trackEvent('SPMenu', 'Close', location.href, 1);
      }
      return $('.js-mah-nav-phone').slideToggle();
    });

    /* GA */
    $('.lang-setting').find('a').on('click', function() {
      return $.ua.trackEvent('Lang', 'Click', $(this).attr('data-lang'), 1);
    });
    return $('.service-list').find('a').on('click', function() {
      return $.ua.trackEvent('ServiceLink', 'Click', $(this).attr('href'), 1);
    });
  })(jQuery, window);

}).call(this);

function searchForm(n) {
	var keyword = $(n).find('input[name="q"]').val();
	if (keyword.trim() !== '') {
		keyword = keyword.split(" ").join("+");
		window.location.href = setting[0] + keyword + setting[1];
	}
	return false;
}
function qtip_item() {
    if (!jQuery.browser.mobile) {
        $('a.cluetip').cluetip({
			local:true,
            dropShadow: true,
            sticky: true,
            positionBy: 'mouse',
            mouseOutClose: true,
            showTitle: false,
            closeText: '',
            width: 360
        });
    }
}