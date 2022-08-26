'use strict';

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var DynamicAdaptive = /*#__PURE__*/function () {
  function DynamicAdaptive() {
    _classCallCheck(this, DynamicAdaptive);

    this.adaptiveElems = document.querySelectorAll('[data-adaptive]');
    this.bundleMap = new Map();
    this.onSetAdaptive = this.onSetAdaptive.bind(this);

    var _iterator = _createForOfIteratorHelper(this.adaptiveElems),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var elem = _step.value;
        this.bundleMap.set(elem, {
          parent: elem.parentNode,
          index: this.getIndexOfChild(elem)
        });
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    window.addEventListener('resize', this.onSetAdaptive);
  }

  _createClass(DynamicAdaptive, [{
    key: "onSetAdaptive",
    value: function onSetAdaptive() {
      var windowWidth = document.documentElement.clientWidth;

      var _iterator2 = _createForOfIteratorHelper(this.adaptiveElems),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var elem = _step2.value;

          var _this$getInitStateOfE = this.getInitStateOfElem(elem),
              initParentNode = _this$getInitStateOfE.parent,
              initIndex = _this$getInitStateOfE.index;

          var _elem$dataset$adaptiv = elem.dataset.adaptive.split(' '),
              _elem$dataset$adaptiv2 = _slicedToArray(_elem$dataset$adaptiv, 2),
              width = _elem$dataset$adaptiv2[0],
              targetNodeSelector = _elem$dataset$adaptiv2[1];

          var targetParent = document.querySelector(targetNodeSelector);
          width = parseInt(width);
          if (!targetParent) return;

          if (windowWidth <= width) {
            targetParent.append(elem);
          } else {
            initIndex - 1 < 0 ? initParentNode.prepend(elem) : initParentNode.children[initIndex - 1].after(elem);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "getIndexOfChild",
    value: function getIndexOfChild(elem) {
      var children = Array.from(elem.parentNode.children);
      return children.indexOf(elem);
    }
  }, {
    key: "getInitStateOfElem",
    value: function getInitStateOfElem(elem) {
      return this.bundleMap.get(elem);
    }
  }, {
    key: "init",
    value: function init() {
      this.onSetAdaptive();
    }
  }]);

  return DynamicAdaptive;
}();

new DynamicAdaptive().init();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkR5bmFtaWNBZGFwdGl2ZSIsImFkYXB0aXZlRWxlbXMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJidW5kbGVNYXAiLCJNYXAiLCJvblNldEFkYXB0aXZlIiwiYmluZCIsImVsZW0iLCJzZXQiLCJwYXJlbnQiLCJwYXJlbnROb2RlIiwiaW5kZXgiLCJnZXRJbmRleE9mQ2hpbGQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwid2luZG93V2lkdGgiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImdldEluaXRTdGF0ZU9mRWxlbSIsImluaXRQYXJlbnROb2RlIiwiaW5pdEluZGV4IiwiZGF0YXNldCIsImFkYXB0aXZlIiwic3BsaXQiLCJ3aWR0aCIsInRhcmdldE5vZGVTZWxlY3RvciIsInRhcmdldFBhcmVudCIsInF1ZXJ5U2VsZWN0b3IiLCJwYXJzZUludCIsImFwcGVuZCIsInByZXBlbmQiLCJjaGlsZHJlbiIsImFmdGVyIiwiQXJyYXkiLCJmcm9tIiwiaW5kZXhPZiIsImdldCIsImluaXQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRU1BLGU7RUFDSiwyQkFBYztJQUFBOztJQUNaLEtBQUtDLGFBQUwsR0FBcUJDLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsaUJBQTFCLENBQXJCO0lBQ0EsS0FBS0MsU0FBTCxHQUFpQixJQUFJQyxHQUFKLEVBQWpCO0lBQ0EsS0FBS0MsYUFBTCxHQUFxQixLQUFLQSxhQUFMLENBQW1CQyxJQUFuQixDQUF3QixJQUF4QixDQUFyQjs7SUFIWSwyQ0FLSyxLQUFLTixhQUxWO0lBQUE7O0lBQUE7TUFLWixvREFBcUM7UUFBQSxJQUE1Qk8sSUFBNEI7UUFDbkMsS0FBS0osU0FBTCxDQUFlSyxHQUFmLENBQW1CRCxJQUFuQixFQUF5QjtVQUFFRSxNQUFNLEVBQUVGLElBQUksQ0FBQ0csVUFBZjtVQUEyQkMsS0FBSyxFQUFFLEtBQUtDLGVBQUwsQ0FBcUJMLElBQXJCO1FBQWxDLENBQXpCO01BQ0Q7SUFQVztNQUFBO0lBQUE7TUFBQTtJQUFBOztJQVNaTSxNQUFNLENBQUNDLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLEtBQUtULGFBQXZDO0VBQ0Q7Ozs7V0FFRCx5QkFBZ0I7TUFDZCxJQUFNVSxXQUFXLEdBQUdkLFFBQVEsQ0FBQ2UsZUFBVCxDQUF5QkMsV0FBN0M7O01BRGMsNENBR0csS0FBS2pCLGFBSFI7TUFBQTs7TUFBQTtRQUdkLHVEQUFxQztVQUFBLElBQTVCTyxJQUE0Qjs7VUFDbkMsNEJBQXFELEtBQUtXLGtCQUFMLENBQXdCWCxJQUF4QixDQUFyRDtVQUFBLElBQWdCWSxjQUFoQix5QkFBUVYsTUFBUjtVQUFBLElBQXVDVyxTQUF2Qyx5QkFBZ0NULEtBQWhDOztVQUNBLDRCQUFrQ0osSUFBSSxDQUFDYyxPQUFMLENBQWFDLFFBQWIsQ0FBc0JDLEtBQXRCLENBQTRCLEdBQTVCLENBQWxDO1VBQUE7VUFBQSxJQUFLQyxLQUFMO1VBQUEsSUFBWUMsa0JBQVo7O1VBQ0EsSUFBTUMsWUFBWSxHQUFHekIsUUFBUSxDQUFDMEIsYUFBVCxDQUF1QkYsa0JBQXZCLENBQXJCO1VBQ0FELEtBQUssR0FBR0ksUUFBUSxDQUFDSixLQUFELENBQWhCO1VBRUEsSUFBSSxDQUFDRSxZQUFMLEVBQW1COztVQUVuQixJQUFJWCxXQUFXLElBQUlTLEtBQW5CLEVBQTBCO1lBQ3hCRSxZQUFZLENBQUNHLE1BQWIsQ0FBb0J0QixJQUFwQjtVQUNELENBRkQsTUFFTztZQUNKYSxTQUFTLEdBQUcsQ0FBYixHQUFrQixDQUFsQixHQUNBRCxjQUFjLENBQUNXLE9BQWYsQ0FBdUJ2QixJQUF2QixDQURBLEdBRUFZLGNBQWMsQ0FBQ1ksUUFBZixDQUF3QlgsU0FBUyxHQUFHLENBQXBDLEVBQXVDWSxLQUF2QyxDQUE2Q3pCLElBQTdDLENBRkE7VUFHRDtRQUNGO01BbEJhO1FBQUE7TUFBQTtRQUFBO01BQUE7SUFtQmY7OztXQUVELHlCQUFnQkEsSUFBaEIsRUFBc0I7TUFDcEIsSUFBTXdCLFFBQVEsR0FBR0UsS0FBSyxDQUFDQyxJQUFOLENBQVczQixJQUFJLENBQUNHLFVBQUwsQ0FBZ0JxQixRQUEzQixDQUFqQjtNQUNBLE9BQU9BLFFBQVEsQ0FBQ0ksT0FBVCxDQUFpQjVCLElBQWpCLENBQVA7SUFDRDs7O1dBRUQsNEJBQW1CQSxJQUFuQixFQUF5QjtNQUN2QixPQUFPLEtBQUtKLFNBQUwsQ0FBZWlDLEdBQWYsQ0FBbUI3QixJQUFuQixDQUFQO0lBQ0Q7OztXQUVELGdCQUFPO01BQ0wsS0FBS0YsYUFBTDtJQUNEOzs7Ozs7QUFHSCxJQUFJTixlQUFKLEdBQXNCc0MsSUFBdEIiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBEeW5hbWljQWRhcHRpdmUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmFkYXB0aXZlRWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hZGFwdGl2ZV0nKTtcbiAgICB0aGlzLmJ1bmRsZU1hcCA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLm9uU2V0QWRhcHRpdmUgPSB0aGlzLm9uU2V0QWRhcHRpdmUuYmluZCh0aGlzKTtcblxuICAgIGZvciAobGV0IGVsZW0gb2YgdGhpcy5hZGFwdGl2ZUVsZW1zKSB7XG4gICAgICB0aGlzLmJ1bmRsZU1hcC5zZXQoZWxlbSwgeyBwYXJlbnQ6IGVsZW0ucGFyZW50Tm9kZSwgaW5kZXg6IHRoaXMuZ2V0SW5kZXhPZkNoaWxkKGVsZW0pIH0pO1xuICAgIH1cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uU2V0QWRhcHRpdmUpO1xuICB9XG5cbiAgb25TZXRBZGFwdGl2ZSgpIHtcbiAgICBjb25zdCB3aW5kb3dXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcblxuICAgIGZvciAobGV0IGVsZW0gb2YgdGhpcy5hZGFwdGl2ZUVsZW1zKSB7XG4gICAgICBjb25zdCB7IHBhcmVudDogaW5pdFBhcmVudE5vZGUsIGluZGV4OiBpbml0SW5kZXggfSA9IHRoaXMuZ2V0SW5pdFN0YXRlT2ZFbGVtKGVsZW0pO1xuICAgICAgbGV0IFt3aWR0aCwgdGFyZ2V0Tm9kZVNlbGVjdG9yXSA9IGVsZW0uZGF0YXNldC5hZGFwdGl2ZS5zcGxpdCgnICcpO1xuICAgICAgY29uc3QgdGFyZ2V0UGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXROb2RlU2VsZWN0b3IpO1xuICAgICAgd2lkdGggPSBwYXJzZUludCh3aWR0aCk7XG5cbiAgICAgIGlmICghdGFyZ2V0UGFyZW50KSByZXR1cm47XG5cbiAgICAgIGlmICh3aW5kb3dXaWR0aCA8PSB3aWR0aCkge1xuICAgICAgICB0YXJnZXRQYXJlbnQuYXBwZW5kKGVsZW0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKGluaXRJbmRleCAtIDEpIDwgMCA/XG4gICAgICAgIGluaXRQYXJlbnROb2RlLnByZXBlbmQoZWxlbSkgOlxuICAgICAgICBpbml0UGFyZW50Tm9kZS5jaGlsZHJlbltpbml0SW5kZXggLSAxXS5hZnRlcihlbGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRJbmRleE9mQ2hpbGQoZWxlbSkge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShlbGVtLnBhcmVudE5vZGUuY2hpbGRyZW4pO1xuICAgIHJldHVybiBjaGlsZHJlbi5pbmRleE9mKGVsZW0pO1xuICB9XG5cbiAgZ2V0SW5pdFN0YXRlT2ZFbGVtKGVsZW0pIHtcbiAgICByZXR1cm4gdGhpcy5idW5kbGVNYXAuZ2V0KGVsZW0pO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLm9uU2V0QWRhcHRpdmUoKTtcbiAgfVxufVxuXG5uZXcgRHluYW1pY0FkYXB0aXZlKCkuaW5pdCgpO1xuIl19
