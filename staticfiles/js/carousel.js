var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  
define(['jquery', 'external/underscore'], function($j, $u) {
  var ComputerCarousel, transitionEvent, whichTransitionEvent;
  whichTransitionEvent = function() {
    var el, t, transitions;
    t = void 0;
    el = document.createElement('fakeelement');
    transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    };
    for (t in transitions) {
      t = t;
      if (el.style[t] !== void 0) {
        return transitions[t];
      }
    }
  };
  transitionEvent = whichTransitionEvent();
  return ComputerCarousel = (function() {
    var _changeActiveElement;

    function ComputerCarousel(ID) {
      this.resizeCarouselHeight = bind(this.resizeCarouselHeight, this);
      this.handleArrowClick = bind(this.handleArrowClick, this);
      this.handleBulletClick = bind(this.handleBulletClick, this);
      var lazyResize;
      this.$window = $j(window);
      this.$carousel = $j(ID);
      this.$imageList = this.$carousel.find('.image-list');
      this.$imageListLength = this.$carousel.find('.image-item').length;
      this.$copyList = this.$carousel.find('.copy-list');
      this.$copyListLength = this.$carousel.find('.copy-item').length;
      this.$bulletList = this.$carousel.find('.bullet-list');
      this.$bullets = this.$carousel.find('.bullet');
      this.currentItem = 0;
      this.changeActiveElement = $u.throttle(_changeActiveElement.bind(this), 1000);
      this.gradientMap = ['orange', 'blue', 'yellow'];
      $j(document).ready(function() {
        return this.resizeCarouselHeight;
      });
      lazyResize = $u.debounce(this.resizeCarouselHeight, 500);
      this.$window.resize(lazyResize);
      $j('.benefits-carousel__arrow', this.$carousel).on('click', this.handleArrowClick);
      this.$bullets.on('click', (function(_this) {
        return function(event) {
          return _this.handleBulletClick($j(event.target));
        };
      })(this));
    }

    ComputerCarousel.prototype.handleBulletClick = function(clickedBullet) {
      var destinationIndex;
      destinationIndex = clickedBullet.attr('data-index');
      this.currentIndex = $j('.active').attr('data-index');
      return this.changeActiveElement(destinationIndex);
    };

    ComputerCarousel.prototype.handleArrowClick = function(event) {
      var destinationIndex, items;
      event.preventDefault();
      items = this.$bullets.length;
      this.currentIndex = Number($j('.active').attr('data-index'));
      if (this.currentIndex === (items - 1)) {
        destinationIndex = 0;
      } else {
        destinationIndex = this.currentIndex + 1;
      }
      return this.changeActiveElement(destinationIndex);
    };

    ComputerCarousel.prototype.resizeCarouselHeight = function() {
      var height;
      height = 0;
      $j('.benefits-carousel__copy-item').each(function() {
        if ($j(this).height() > height) {
          return height = $j(this).height();
        }
      });
      return this.$copyList.height(height);
    };

    ComputerCarousel.prototype.translateX = function(selector, translateAmount) {
      return selector.css({
        '-webkit-transform': translateAmount,
        '-ms-transform': translateAmount,
        'transform': translateAmount
      });
    };

    _changeActiveElement = function(destinationIndex) {
      var copyFired, imageFired;
      if (this.currentIndex === destinationIndex) {

      } else {
        copyFired = false;
        imageFired = false;
        this.$carousel.find('.active').removeClass('active');
        $j('.benefits-carousel__copy-item').one(transitionEvent, (function(_this) {
          return function(event) {
            var translateAmount, translateX;
            if (event.originalEvent.propertyName === 'opacity' && copyFired === false) {
              copyFired = true;
              if (destinationIndex <= (_this.$copyListLength - 1)) {
                translateAmount = (destinationIndex / _this.$copyListLength) * 100;
              } else {
                translateAmount = 0;
              }
              translateX = "translateX(-" + translateAmount + "%)";
              _this.translateX(_this.$copyList, translateX);
              return _this.$copyList.find("[data-index=" + destinationIndex + "]").addClass('active');
            }
          };
        })(this));
        $j('.benefits-carousel__image-item').one(transitionEvent, (function(_this) {
          return function(event) {
            var translateAmount, translateX;
            if (event.originalEvent.propertyName === 'opacity' && imageFired === false) {
              imageFired = true;
              if (destinationIndex <= (_this.$imageListLength - 1)) {
                translateAmount = (destinationIndex / _this.$imageListLength) * 100;
              } else {
                translateAmount = 0;
              }
              translateX = "translateX(-" + translateAmount + "%)";
              _this.translateX(_this.$imageList, translateX);
              return _this.$imageList.find("[data-index=" + destinationIndex + "]").addClass('active');
            }
          };
        })(this));
        $j('.benefits-carousel__gradient').removeClass('benefits-carousel__gradient--' + this.gradientMap[this.currentIndex]);
        $j('.benefits-carousel__gradient').addClass('benefits-carousel__gradient--' + this.gradientMap[destinationIndex]);
        this.$bulletList.find("[data-index=" + destinationIndex + "]").addClass('active');
        return this.currentItem = destinationIndex;
      }
    };

    return ComputerCarousel;

  })();
});