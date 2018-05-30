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
var utils_1 = require("./utils");
var SNAP_THRESH = 10;
function createDragProvider(Provider) {
    return /** @class */ (function (_super) {
        __extends(DragProvider, _super);
        function DragProvider() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.updateLayout = function (comp) { return function (_a) {
                var left = _a.left, top = _a.top;
                var pos = {
                    x: left,
                    y: top
                };
                var hit = _this.computeHitTest(pos, _this.state.targets[comp]);
                var hits = _this.state.hits;
                if (hit) {
                    hits[comp] = hit;
                }
                else {
                    delete hits[comp];
                }
                _this.onUpdateHits(comp, hit, hits, _this.state);
                _this.setState({
                    draggables: __assign({}, _this.state.draggables, (_b = {}, _b[comp] = pos, _b)),
                    hits: hits
                });
                var _b;
            }; };
            _this.onUpdateHits = utils_1.debounce(function (comp, hit, hits, state) {
                _this.props.onUpdateHits(comp, hit, hits, state);
            }, utils_1.FPS_60);
            _this.computeHitTest = function (d, t) {
                if (d &&
                    t &&
                    Math.abs(d.x - t.x) < SNAP_THRESH &&
                    Math.abs(d.y - t.y) < SNAP_THRESH) {
                    return t;
                }
                return false;
            };
            _this.hitTest = function (target) {
                return _this.state.hits[target];
            };
            _this.onTargetLayout = function (target) { return function (_a) {
                var layout = _a.nativeEvent.layout;
                console.log('target: laying out', { target: target, layout: layout });
                _this.setState({ targets: __assign({}, _this.state.targets, (_b = {}, _b[target] = layout, _b)) });
                var _b;
            }; };
            _this.state = {
                draggables: {},
                targets: {},
                hits: {},
                updateLayout: _this.updateLayout,
                hitTest: _this.hitTest,
                onTargetLayout: _this.onTargetLayout
            };
            return _this;
        }
        DragProvider.prototype.render = function () {
            return react_1.default.createElement(Provider, { value: this.state }, this.props.children);
        };
        return DragProvider;
    }(react_2.Component));
}
exports.default = createDragProvider;
