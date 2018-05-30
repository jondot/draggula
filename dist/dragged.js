"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var react_native_1 = require("react-native");
var utils_1 = require("./utils");
var SNAP_DEBOUNCE_WAIT = 400;
var Dragged = /** @class */ (function (_super) {
    __extends(Dragged, _super);
    function Dragged(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            pan: new react_native_1.Animated.ValueXY()
        };
        _this._memoizedCoords = { left: 0, top: 0 };
        _this._value = { x: 0, y: 0 };
        _this._moveOffset = { x: 0, y: 0 };
        _this._dragging = false;
        _this._locked = false;
        _this._debouncedSnap = function () { };
        _this.onMove = function () {
            var offset = _this._moveOffset;
            var delta = _this.state.pan.getLayout();
            var coords = _this._memoizedCoords;
            // @ts-ignore
            coords.left = offset.x + delta.left._value;
            // @ts-ignore
            coords.top = offset.y + delta.top._value;
            //console.log('coords', { x: offset.x, left: coords.left })
            _this._contextUpdateLayout(coords);
            var hit = _this._contextHitTest();
            if (hit) {
                var snap = hit;
                if (_this.props.lockOnHit) {
                    console.log('locking');
                    _this._locked = true;
                }
                if (_this._dragging && snap) {
                    var delta_1 = {
                        x: snap.x - _this._moveOffset.x,
                        y: snap.y - _this._moveOffset.y
                    };
                    _this.state.pan.setValue(delta_1);
                    if (_this._debouncedSnap) {
                        _this._debouncedSnap(snap, _this._dragging);
                    }
                }
            }
        };
        _this._value = { x: 0, y: 0 };
        if (props.onSnap) {
            _this._debouncedSnap = utils_1.debounce(props.onSnap, SNAP_DEBOUNCE_WAIT);
        }
        _this._contextUpdateLayout = _this.props.context.updateLayout(_this.props.provide);
        var hitTest = _this.props.context.hitTest;
        _this._contextHitTest = utils_1.debounce(function () { return hitTest(_this.props.provide); }, utils_1.FPS_60);
        var panResponderMove = react_native_1.Animated.event([
            null,
            {
                dx: _this.state.pan.x,
                dy: _this.state.pan.y
            }
        ], { listener: _this.onMove });
        _this.panResponder = react_native_1.PanResponder.create({
            onMoveShouldSetPanResponder: function (evt, gestureState) { return !_this._locked; },
            onMoveShouldSetPanResponderCapture: function (evt, gestureState) { return !_this._locked; },
            onPanResponderGrant: function (e, gestureState) {
                _this.state.pan.setOffset(_this._value);
                _this._moveOffset = _this._value;
                _this._dragging = true;
            },
            onPanResponderMove: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (_this._locked) {
                    return;
                }
                return panResponderMove.apply(void 0, args);
            },
            onPanResponderRelease: function (e, gestureState) {
                _this.state.pan.flattenOffset();
                var layout = _this.state.pan.getLayout();
                _this._dragging = false;
            }
        });
        return _this;
    }
    Dragged.prototype.componentWillMount = function () {
        var _this = this;
        this.state.pan.addListener(function (c) { return (_this._value = c); });
        var Child = react_1.default.Children.only(this.props.children);
        this._value = { x: Child.props.style.left, y: Child.props.style.top };
        this.state.pan.setValue(this._value);
    };
    Dragged.prototype.componentWillUnmount = function () {
        // @ts-ignore
        this.state.pan.removeAllListeners();
    };
    Dragged.prototype.render = function () {
        var Child = react_1.default.Children.only(this.props.children);
        return (react_1.default.createElement(react_native_1.Animated.View, __assign({}, this.panResponder.panHandlers, { style: [
                {
                    position: 'absolute',
                    zIndex: this.props.zIndex
                },
                this.state.pan.getLayout()
            ] }), react_1.default.cloneElement(Child, {
            style: __assign({}, Child.props.style, { left: 0, top: 0 })
        })));
    };
    return Dragged;
}(react_2.Component));
exports.default = Dragged;
