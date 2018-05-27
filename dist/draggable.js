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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var context_1 = require("./context");
var dragged_1 = __importDefault(require("./dragged"));
var Draggable = /** @class */ (function (_super) {
    __extends(Draggable, _super);
    function Draggable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Draggable.prototype.render = function () {
        var _this = this;
        var Child = react_1.default.Children.only(this.props.children);
        return (react_1.default.createElement(context_1.Consumer, null, function (context) { return (react_1.default.createElement(dragged_1.default, { context: context, provide: _this.props.provide, 
            //optimize: move these two inside dragged and only pass context and props
            onSnap: _this.props.onSnap, zIndex: Child.props.style.zIndex || 0 }, Child)); }));
    };
    return Draggable;
}(react_2.Component));
exports.default = Draggable;
