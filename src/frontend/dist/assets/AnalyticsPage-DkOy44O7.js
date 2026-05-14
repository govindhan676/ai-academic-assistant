import { R as React2, v as clsx, d as reactExports, j as jsxRuntimeExports, m as motion, f as ChartNoAxesColumn, F as FileText, o as Users } from "./index--tQIKzjM.js";
import { S as Skeleton } from "./skeleton-IdBDwz55.js";
import { a as useAnalytics, u as useDashboardStats } from "./useBackend-6ecES1Qd.js";
import { D as Download } from "./download-BoMwYMwG.js";
import { T as TrendingUp } from "./trending-up-Di3L6lLR.js";
import { f as filterProps, d as Layer, m as max, i as isNumber, e as Curve, A as Animate, g as interpolateNumber, h as isNil, j as isNan, k as isEqual, l as hasClipDot, n as LabelList, u as uniqueId, o as isFunction, G as Global, p as getValueByDataKey, q as getCateCoordinateOfLine, D as Dot, r as generateCategoricalChart, X as XAxis, Y as YAxis, s as formatAxisMap, R as ResponsiveContainer, B as BarChart, C as CartesianGrid, T as Tooltip, a as Bar, P as PieChart, c as Pie, b as Cell, L as Legend } from "./PieChart-S-se-V6E.js";
import "./backendService-DLDa8DMz.js";
var _excluded = ["layout", "type", "stroke", "connectNulls", "isRange", "ref"], _excluded2 = ["key"];
var _Area;
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var Area = /* @__PURE__ */ function(_PureComponent) {
  function Area2() {
    var _this;
    _classCallCheck(this, Area2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Area2, [].concat(args));
    _defineProperty(_this, "state", {
      isAnimationFinished: true
    });
    _defineProperty(_this, "id", uniqueId("recharts-area-"));
    _defineProperty(_this, "handleAnimationEnd", function() {
      var onAnimationEnd = _this.props.onAnimationEnd;
      _this.setState({
        isAnimationFinished: true
      });
      if (isFunction(onAnimationEnd)) {
        onAnimationEnd();
      }
    });
    _defineProperty(_this, "handleAnimationStart", function() {
      var onAnimationStart = _this.props.onAnimationStart;
      _this.setState({
        isAnimationFinished: false
      });
      if (isFunction(onAnimationStart)) {
        onAnimationStart();
      }
    });
    return _this;
  }
  _inherits(Area2, _PureComponent);
  return _createClass(Area2, [{
    key: "renderDots",
    value: function renderDots(needClip, clipDot, clipPathId) {
      var isAnimationActive = this.props.isAnimationActive;
      var isAnimationFinished = this.state.isAnimationFinished;
      if (isAnimationActive && !isAnimationFinished) {
        return null;
      }
      var _this$props = this.props, dot = _this$props.dot, points = _this$props.points, dataKey = _this$props.dataKey;
      var areaProps = filterProps(this.props, false);
      var customDotProps = filterProps(dot, true);
      var dots = points.map(function(entry, i) {
        var dotProps = _objectSpread(_objectSpread(_objectSpread({
          key: "dot-".concat(i),
          r: 3
        }, areaProps), customDotProps), {}, {
          index: i,
          cx: entry.x,
          cy: entry.y,
          dataKey,
          value: entry.value,
          payload: entry.payload,
          points
        });
        return Area2.renderDotItem(dot, dotProps);
      });
      var dotsProps = {
        clipPath: needClip ? "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")") : null
      };
      return /* @__PURE__ */ React2.createElement(Layer, _extends({
        className: "recharts-area-dots"
      }, dotsProps), dots);
    }
  }, {
    key: "renderHorizontalRect",
    value: function renderHorizontalRect(alpha) {
      var _this$props2 = this.props, baseLine = _this$props2.baseLine, points = _this$props2.points, strokeWidth = _this$props2.strokeWidth;
      var startX = points[0].x;
      var endX = points[points.length - 1].x;
      var width = alpha * Math.abs(startX - endX);
      var maxY = max(points.map(function(entry) {
        return entry.y || 0;
      }));
      if (isNumber(baseLine) && typeof baseLine === "number") {
        maxY = Math.max(baseLine, maxY);
      } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
        maxY = Math.max(max(baseLine.map(function(entry) {
          return entry.y || 0;
        })), maxY);
      }
      if (isNumber(maxY)) {
        return /* @__PURE__ */ React2.createElement("rect", {
          x: startX < endX ? startX : startX - width,
          y: 0,
          width,
          height: Math.floor(maxY + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1))
        });
      }
      return null;
    }
  }, {
    key: "renderVerticalRect",
    value: function renderVerticalRect(alpha) {
      var _this$props3 = this.props, baseLine = _this$props3.baseLine, points = _this$props3.points, strokeWidth = _this$props3.strokeWidth;
      var startY = points[0].y;
      var endY = points[points.length - 1].y;
      var height = alpha * Math.abs(startY - endY);
      var maxX = max(points.map(function(entry) {
        return entry.x || 0;
      }));
      if (isNumber(baseLine) && typeof baseLine === "number") {
        maxX = Math.max(baseLine, maxX);
      } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
        maxX = Math.max(max(baseLine.map(function(entry) {
          return entry.x || 0;
        })), maxX);
      }
      if (isNumber(maxX)) {
        return /* @__PURE__ */ React2.createElement("rect", {
          x: 0,
          y: startY < endY ? startY : startY - height,
          width: maxX + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1),
          height: Math.floor(height)
        });
      }
      return null;
    }
  }, {
    key: "renderClipRect",
    value: function renderClipRect(alpha) {
      var layout = this.props.layout;
      if (layout === "vertical") {
        return this.renderVerticalRect(alpha);
      }
      return this.renderHorizontalRect(alpha);
    }
  }, {
    key: "renderAreaStatically",
    value: function renderAreaStatically(points, baseLine, needClip, clipPathId) {
      var _this$props4 = this.props, layout = _this$props4.layout, type = _this$props4.type, stroke = _this$props4.stroke, connectNulls = _this$props4.connectNulls, isRange = _this$props4.isRange;
      _this$props4.ref;
      var others = _objectWithoutProperties(_this$props4, _excluded);
      return /* @__PURE__ */ React2.createElement(Layer, {
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null
      }, /* @__PURE__ */ React2.createElement(Curve, _extends({}, filterProps(others, true), {
        points,
        connectNulls,
        type,
        baseLine,
        layout,
        stroke: "none",
        className: "recharts-area-area"
      })), stroke !== "none" && /* @__PURE__ */ React2.createElement(Curve, _extends({}, filterProps(this.props, false), {
        className: "recharts-area-curve",
        layout,
        type,
        connectNulls,
        fill: "none",
        points
      })), stroke !== "none" && isRange && /* @__PURE__ */ React2.createElement(Curve, _extends({}, filterProps(this.props, false), {
        className: "recharts-area-curve",
        layout,
        type,
        connectNulls,
        fill: "none",
        points: baseLine
      })));
    }
  }, {
    key: "renderAreaWithAnimation",
    value: function renderAreaWithAnimation(needClip, clipPathId) {
      var _this2 = this;
      var _this$props5 = this.props, points = _this$props5.points, baseLine = _this$props5.baseLine, isAnimationActive = _this$props5.isAnimationActive, animationBegin = _this$props5.animationBegin, animationDuration = _this$props5.animationDuration, animationEasing = _this$props5.animationEasing, animationId = _this$props5.animationId;
      var _this$state = this.state, prevPoints = _this$state.prevPoints, prevBaseLine = _this$state.prevBaseLine;
      return /* @__PURE__ */ React2.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "area-".concat(animationId),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(_ref) {
        var t = _ref.t;
        if (prevPoints) {
          var prevPointsDiffFactor = prevPoints.length / points.length;
          var stepPoints = points.map(function(entry, index) {
            var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
            if (prevPoints[prevPointIndex]) {
              var prev = prevPoints[prevPointIndex];
              var interpolatorX = interpolateNumber(prev.x, entry.x);
              var interpolatorY = interpolateNumber(prev.y, entry.y);
              return _objectSpread(_objectSpread({}, entry), {}, {
                x: interpolatorX(t),
                y: interpolatorY(t)
              });
            }
            return entry;
          });
          var stepBaseLine;
          if (isNumber(baseLine) && typeof baseLine === "number") {
            var interpolator = interpolateNumber(prevBaseLine, baseLine);
            stepBaseLine = interpolator(t);
          } else if (isNil(baseLine) || isNan(baseLine)) {
            var _interpolator = interpolateNumber(prevBaseLine, 0);
            stepBaseLine = _interpolator(t);
          } else {
            stepBaseLine = baseLine.map(function(entry, index) {
              var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
              if (prevBaseLine[prevPointIndex]) {
                var prev = prevBaseLine[prevPointIndex];
                var interpolatorX = interpolateNumber(prev.x, entry.x);
                var interpolatorY = interpolateNumber(prev.y, entry.y);
                return _objectSpread(_objectSpread({}, entry), {}, {
                  x: interpolatorX(t),
                  y: interpolatorY(t)
                });
              }
              return entry;
            });
          }
          return _this2.renderAreaStatically(stepPoints, stepBaseLine, needClip, clipPathId);
        }
        return /* @__PURE__ */ React2.createElement(Layer, null, /* @__PURE__ */ React2.createElement("defs", null, /* @__PURE__ */ React2.createElement("clipPath", {
          id: "animationClipPath-".concat(clipPathId)
        }, _this2.renderClipRect(t))), /* @__PURE__ */ React2.createElement(Layer, {
          clipPath: "url(#animationClipPath-".concat(clipPathId, ")")
        }, _this2.renderAreaStatically(points, baseLine, needClip, clipPathId)));
      });
    }
  }, {
    key: "renderArea",
    value: function renderArea(needClip, clipPathId) {
      var _this$props6 = this.props, points = _this$props6.points, baseLine = _this$props6.baseLine, isAnimationActive = _this$props6.isAnimationActive;
      var _this$state2 = this.state, prevPoints = _this$state2.prevPoints, prevBaseLine = _this$state2.prevBaseLine, totalLength = _this$state2.totalLength;
      if (isAnimationActive && points && points.length && (!prevPoints && totalLength > 0 || !isEqual(prevPoints, points) || !isEqual(prevBaseLine, baseLine))) {
        return this.renderAreaWithAnimation(needClip, clipPathId);
      }
      return this.renderAreaStatically(points, baseLine, needClip, clipPathId);
    }
  }, {
    key: "render",
    value: function render() {
      var _filterProps;
      var _this$props7 = this.props, hide = _this$props7.hide, dot = _this$props7.dot, points = _this$props7.points, className = _this$props7.className, top = _this$props7.top, left = _this$props7.left, xAxis = _this$props7.xAxis, yAxis = _this$props7.yAxis, width = _this$props7.width, height = _this$props7.height, isAnimationActive = _this$props7.isAnimationActive, id = _this$props7.id;
      if (hide || !points || !points.length) {
        return null;
      }
      var isAnimationFinished = this.state.isAnimationFinished;
      var hasSinglePoint = points.length === 1;
      var layerClass = clsx("recharts-area", className);
      var needClipX = xAxis && xAxis.allowDataOverflow;
      var needClipY = yAxis && yAxis.allowDataOverflow;
      var needClip = needClipX || needClipY;
      var clipPathId = isNil(id) ? this.id : id;
      var _ref2 = (_filterProps = filterProps(dot, false)) !== null && _filterProps !== void 0 ? _filterProps : {
        r: 3,
        strokeWidth: 2
      }, _ref2$r = _ref2.r, r = _ref2$r === void 0 ? 3 : _ref2$r, _ref2$strokeWidth = _ref2.strokeWidth, strokeWidth = _ref2$strokeWidth === void 0 ? 2 : _ref2$strokeWidth;
      var _ref3 = hasClipDot(dot) ? dot : {}, _ref3$clipDot = _ref3.clipDot, clipDot = _ref3$clipDot === void 0 ? true : _ref3$clipDot;
      var dotSize = r * 2 + strokeWidth;
      return /* @__PURE__ */ React2.createElement(Layer, {
        className: layerClass
      }, needClipX || needClipY ? /* @__PURE__ */ React2.createElement("defs", null, /* @__PURE__ */ React2.createElement("clipPath", {
        id: "clipPath-".concat(clipPathId)
      }, /* @__PURE__ */ React2.createElement("rect", {
        x: needClipX ? left : left - width / 2,
        y: needClipY ? top : top - height / 2,
        width: needClipX ? width : width * 2,
        height: needClipY ? height : height * 2
      })), !clipDot && /* @__PURE__ */ React2.createElement("clipPath", {
        id: "clipPath-dots-".concat(clipPathId)
      }, /* @__PURE__ */ React2.createElement("rect", {
        x: left - dotSize / 2,
        y: top - dotSize / 2,
        width: width + dotSize,
        height: height + dotSize
      }))) : null, !hasSinglePoint ? this.renderArea(needClip, clipPathId) : null, (dot || hasSinglePoint) && this.renderDots(needClip, clipDot, clipPathId), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, points));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curPoints: nextProps.points,
          curBaseLine: nextProps.baseLine,
          prevPoints: prevState.curPoints,
          prevBaseLine: prevState.curBaseLine
        };
      }
      if (nextProps.points !== prevState.curPoints || nextProps.baseLine !== prevState.curBaseLine) {
        return {
          curPoints: nextProps.points,
          curBaseLine: nextProps.baseLine
        };
      }
      return null;
    }
  }]);
}(reactExports.PureComponent);
_Area = Area;
_defineProperty(Area, "displayName", "Area");
_defineProperty(Area, "defaultProps", {
  stroke: "#3182bd",
  fill: "#3182bd",
  fillOpacity: 0.6,
  xAxisId: 0,
  yAxisId: 0,
  legendType: "line",
  connectNulls: false,
  // points of area
  points: [],
  dot: false,
  activeDot: true,
  hide: false,
  isAnimationActive: !Global.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
});
_defineProperty(Area, "getBaseValue", function(props, item, xAxis, yAxis) {
  var layout = props.layout, chartBaseValue = props.baseValue;
  var itemBaseValue = item.props.baseValue;
  var baseValue = itemBaseValue !== null && itemBaseValue !== void 0 ? itemBaseValue : chartBaseValue;
  if (isNumber(baseValue) && typeof baseValue === "number") {
    return baseValue;
  }
  var numericAxis = layout === "horizontal" ? yAxis : xAxis;
  var domain = numericAxis.scale.domain();
  if (numericAxis.type === "number") {
    var domainMax = Math.max(domain[0], domain[1]);
    var domainMin = Math.min(domain[0], domain[1]);
    if (baseValue === "dataMin") {
      return domainMin;
    }
    if (baseValue === "dataMax") {
      return domainMax;
    }
    return domainMax < 0 ? domainMax : Math.max(Math.min(domain[0], domain[1]), 0);
  }
  if (baseValue === "dataMin") {
    return domain[0];
  }
  if (baseValue === "dataMax") {
    return domain[1];
  }
  return domain[0];
});
_defineProperty(Area, "getComposedData", function(_ref4) {
  var props = _ref4.props, item = _ref4.item, xAxis = _ref4.xAxis, yAxis = _ref4.yAxis, xAxisTicks = _ref4.xAxisTicks, yAxisTicks = _ref4.yAxisTicks, bandSize = _ref4.bandSize, dataKey = _ref4.dataKey, stackedData = _ref4.stackedData, dataStartIndex = _ref4.dataStartIndex, displayedData = _ref4.displayedData, offset = _ref4.offset;
  var layout = props.layout;
  var hasStack = stackedData && stackedData.length;
  var baseValue = _Area.getBaseValue(props, item, xAxis, yAxis);
  var isHorizontalLayout = layout === "horizontal";
  var isRange = false;
  var points = displayedData.map(function(entry, index) {
    var value;
    if (hasStack) {
      value = stackedData[dataStartIndex + index];
    } else {
      value = getValueByDataKey(entry, dataKey);
      if (!Array.isArray(value)) {
        value = [baseValue, value];
      } else {
        isRange = true;
      }
    }
    var isBreakPoint = value[1] == null || hasStack && getValueByDataKey(entry, dataKey) == null;
    if (isHorizontalLayout) {
      return {
        x: getCateCoordinateOfLine({
          axis: xAxis,
          ticks: xAxisTicks,
          bandSize,
          entry,
          index
        }),
        y: isBreakPoint ? null : yAxis.scale(value[1]),
        value,
        payload: entry
      };
    }
    return {
      x: isBreakPoint ? null : xAxis.scale(value[1]),
      y: getCateCoordinateOfLine({
        axis: yAxis,
        ticks: yAxisTicks,
        bandSize,
        entry,
        index
      }),
      value,
      payload: entry
    };
  });
  var baseLine;
  if (hasStack || isRange) {
    baseLine = points.map(function(entry) {
      var x = Array.isArray(entry.value) ? entry.value[0] : null;
      if (isHorizontalLayout) {
        return {
          x: entry.x,
          y: x != null && entry.y != null ? yAxis.scale(x) : null
        };
      }
      return {
        x: x != null ? xAxis.scale(x) : null,
        y: entry.y
      };
    });
  } else {
    baseLine = isHorizontalLayout ? yAxis.scale(baseValue) : xAxis.scale(baseValue);
  }
  return _objectSpread({
    points,
    baseLine,
    layout,
    isRange
  }, offset);
});
_defineProperty(Area, "renderDotItem", function(option, props) {
  var dotItem;
  if (/* @__PURE__ */ React2.isValidElement(option)) {
    dotItem = /* @__PURE__ */ React2.cloneElement(option, props);
  } else if (isFunction(option)) {
    dotItem = option(props);
  } else {
    var className = clsx("recharts-area-dot", typeof option !== "boolean" ? option.className : "");
    var key = props.key, rest = _objectWithoutProperties(props, _excluded2);
    dotItem = /* @__PURE__ */ React2.createElement(Dot, _extends({}, rest, {
      key,
      className
    }));
  }
  return dotItem;
});
var AreaChart = generateCategoricalChart({
  chartName: "AreaChart",
  GraphicalChild: Area,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }],
  formatAxisMap
});
const CHART_COLORS = [
  "oklch(0.62 0.24 250)",
  "oklch(0.62 0.22 290)",
  "oklch(0.75 0.18 195)",
  "oklch(0.65 0.20 220)",
  "oklch(0.68 0.20 270)"
];
const GRID_STROKE = "oklch(0.93 0.01 240 / 0.08)";
const AXIS_TICK = "oklch(0.58 0.015 240)";
function GlassTooltip({
  active,
  payload,
  label
}) {
  if (!active || !(payload == null ? void 0 : payload.length)) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl px-4 py-3 shadow-xl border border-white/15 text-sm", children: [
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mb-1", children: label }),
    payload.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "p",
      {
        className: "font-semibold text-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: p.color ?? "#fff" }, children: p.name ? `${p.name}: ` : "" }),
          p.value
        ]
      },
      `tooltip-${i}`
    ))
  ] });
}
function MetricCard({
  icon: Icon,
  label,
  value,
  color,
  delay
}) {
  const num = value == null ? "—" : Number(value).toLocaleString();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.4, ease: "easeOut" },
      className: "glass rounded-2xl p-5 flex items-start gap-4 hover:border-white/20 transition-smooth",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
            style: { background: `${color}22`, border: `1px solid ${color}44` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5", style: { color } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-1", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              className: "text-2xl font-display font-bold text-foreground",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: delay + 0.15 },
              children: num
            }
          )
        ] })
      ]
    }
  );
}
const DATE_RANGES = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 3 months", days: 90 }
];
function shortDate(str) {
  const d = new Date(str);
  if (Number.isNaN(d.getTime())) return str;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function buildWeeklyData(notesPerDay, days) {
  const weeks = {};
  const cutoff = Date.now() - days * 864e5;
  for (const [dateStr, count] of notesPerDay) {
    const ts = new Date(dateStr).getTime();
    if (ts < cutoff) continue;
    const weekKey = Math.floor(ts / (7 * 864e5)) * 7 * 864e5;
    const label = new Date(weekKey).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    weeks[label] = (weeks[label] ?? 0) + Number(count);
  }
  return Object.entries(weeks).map(([week, notes]) => ({ week, notes }));
}
function ChartCard({
  title,
  children,
  delay
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.45 },
      className: "glass rounded-2xl p-6",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-display font-semibold text-foreground mb-5", children: title }),
        children
      ]
    }
  );
}
function AnalyticsPage() {
  const [days, setDays] = reactExports.useState(30);
  const { data: analytics, isLoading: aLoading } = useAnalytics(days);
  const { data: stats, isLoading: sLoading } = useDashboardStats();
  const isLoading = aLoading || sLoading;
  const barData = reactExports.useMemo(() => {
    if (!(analytics == null ? void 0 : analytics.notesPerDay)) return [];
    return analytics.notesPerDay.map(([date, count]) => ({
      date: shortDate(date),
      notes: Number(count)
    }));
  }, [analytics]);
  const pieData = reactExports.useMemo(() => {
    if (!(analytics == null ? void 0 : analytics.papersPerDepartment)) return [];
    return analytics.papersPerDepartment.map(([name, value]) => ({
      name,
      value: Number(value)
    }));
  }, [analytics]);
  const lineData = reactExports.useMemo(() => {
    if (!(analytics == null ? void 0 : analytics.notesPerDay)) return [];
    return buildWeeklyData(analytics.notesPerDay, days);
  }, [analytics, days]);
  const avgDailyNotes = reactExports.useMemo(() => {
    if (!barData.length) return 0;
    return Math.round(
      barData.reduce((s, d) => s + d.notes, 0) / barData.length
    );
  }, [barData]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "flex items-center justify-between flex-wrap gap-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center glow-blue", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-5 h-5 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Analytics Dashboard" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Platform usage & content metrics" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 glass rounded-xl p-1", children: DATE_RANGES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `analytics.range_${r.days}`,
              onClick: () => setDays(r.days),
              className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth ${days === r.days ? "bg-gradient-brand text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
              children: r.label
            },
            r.days
          )) })
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Skeleton,
      {
        className: "h-24 rounded-2xl bg-white/5"
      },
      `skeleton-${i}`
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricCard,
        {
          icon: FileText,
          label: "Total Transcriptions",
          value: stats == null ? void 0 : stats.totalNotes,
          color: "oklch(0.62 0.24 250)",
          delay: 0.1
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricCard,
        {
          icon: Download,
          label: "Total Downloads",
          value: analytics == null ? void 0 : analytics.totalDownloads,
          color: "oklch(0.75 0.18 195)",
          delay: 0.18
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricCard,
        {
          icon: Users,
          label: "Active Students",
          value: analytics == null ? void 0 : analytics.activeStudents,
          color: "oklch(0.62 0.22 290)",
          delay: 0.26
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricCard,
        {
          icon: TrendingUp,
          label: "Avg Daily Notes",
          value: avgDailyNotes,
          color: "oklch(0.68 0.20 270)",
          delay: 0.34
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-2xl bg-white/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-2xl bg-white/5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-2xl bg-white/5" })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ChartCard,
        {
          title: `Daily Note Creation (Last ${days} Days)`,
          delay: 0.4,
          children: barData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-16 text-sm", children: "No data for this period." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            BarChart,
            {
              data: barData,
              margin: { top: 4, right: 8, left: -16, bottom: 0 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "linearGradient",
                  {
                    id: "barGradient",
                    x1: "0",
                    y1: "0",
                    x2: "0",
                    y2: "1",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "stop",
                        {
                          offset: "0%",
                          stopColor: "oklch(0.62 0.24 250)",
                          stopOpacity: 1
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "stop",
                        {
                          offset: "100%",
                          stopColor: "oklch(0.62 0.22 290)",
                          stopOpacity: 0.7
                        }
                      )
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CartesianGrid,
                  {
                    strokeDasharray: "3 3",
                    stroke: GRID_STROKE,
                    vertical: false
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  XAxis,
                  {
                    dataKey: "date",
                    tick: { fill: AXIS_TICK, fontSize: 11 },
                    axisLine: false,
                    tickLine: false,
                    interval: Math.ceil(barData.length / 10)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  YAxis,
                  {
                    tick: { fill: AXIS_TICK, fontSize: 11 },
                    axisLine: false,
                    tickLine: false,
                    allowDecimals: false
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Tooltip,
                  {
                    content: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassTooltip, {}),
                    cursor: { fill: "oklch(0.62 0.24 250 / 0.06)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Bar,
                  {
                    dataKey: "notes",
                    fill: "url(#barGradient)",
                    radius: [4, 4, 0, 0],
                    maxBarSize: 32
                  }
                )
              ]
            }
          ) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Notes by Department", delay: 0.5, children: pieData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-16 text-sm", children: "No data available." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pie,
            {
              data: pieData,
              cx: "40%",
              cy: "50%",
              innerRadius: 55,
              outerRadius: 90,
              paddingAngle: 3,
              dataKey: "value",
              labelLine: false,
              label: ({
                cx,
                cy,
                midAngle,
                innerRadius: iR,
                outerRadius: oR,
                percent
              }) => {
                if (percent < 0.05) return null;
                const RAD = Math.PI / 180;
                const r = iR + (oR - iR) * 0.5;
                const x = cx + r * Math.cos(-midAngle * RAD);
                const y = cy + r * Math.sin(-midAngle * RAD);
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "text",
                  {
                    x,
                    y,
                    fill: "white",
                    textAnchor: "middle",
                    dominantBaseline: "central",
                    fontSize: 12,
                    fontWeight: 600,
                    children: `${(percent * 100).toFixed(0)}%`
                  }
                );
              },
              children: pieData.map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Cell,
                {
                  fill: CHART_COLORS[idx % CHART_COLORS.length]
                },
                `cell-${idx}`
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Legend,
            {
              layout: "vertical",
              align: "right",
              verticalAlign: "middle",
              iconType: "circle",
              iconSize: 8,
              formatter: (value) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: AXIS_TICK, fontSize: 12 }, children: value })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassTooltip, {}) })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Weekly Note Creation", delay: 0.6, children: lineData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-16 text-sm", children: "No data for this period." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          AreaChart,
          {
            data: lineData,
            margin: { top: 4, right: 8, left: -16, bottom: 0 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "linearGradient",
                {
                  id: "areaGradient",
                  x1: "0",
                  y1: "0",
                  x2: "0",
                  y2: "1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "stop",
                      {
                        offset: "0%",
                        stopColor: "oklch(0.75 0.18 195)",
                        stopOpacity: 0.4
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "stop",
                      {
                        offset: "100%",
                        stopColor: "oklch(0.75 0.18 195)",
                        stopOpacity: 0.02
                      }
                    )
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CartesianGrid,
                {
                  strokeDasharray: "3 3",
                  stroke: GRID_STROKE,
                  vertical: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "week",
                  tick: { fill: AXIS_TICK, fontSize: 11 },
                  axisLine: false,
                  tickLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  tick: { fill: AXIS_TICK, fontSize: 11 },
                  axisLine: false,
                  tickLine: false,
                  allowDecimals: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  content: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassTooltip, {}),
                  cursor: {
                    stroke: "oklch(0.75 0.18 195 / 0.3)",
                    strokeWidth: 1
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Area,
                {
                  type: "monotone",
                  dataKey: "notes",
                  stroke: "oklch(0.75 0.18 195)",
                  strokeWidth: 2.5,
                  fill: "url(#areaGradient)",
                  dot: {
                    fill: "oklch(0.75 0.18 195)",
                    r: 3.5,
                    strokeWidth: 0
                  },
                  activeDot: {
                    r: 5,
                    fill: "oklch(0.75 0.18 195)",
                    strokeWidth: 0
                  }
                }
              )
            ]
          }
        ) }) })
      ] })
    ] })
  ] });
}
export {
  AnalyticsPage as default
};
