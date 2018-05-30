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
function createDragTarget(Consumer) {
    return /** @class */ (function (_super) {
        __extends(DragTarget, _super);
        function DragTarget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DragTarget.prototype.render = function () {
            var _this = this;
            var Child = react_1.default.Children.only(this.props.children);
            return (react_1.default.createElement(Consumer, null, function (context) {
                return react_1.default.cloneElement(Child, {
                    style: __assign({}, Child.props.style, { position: 'absolute' }),
                    onLayout: context.onTargetLayout(_this.props.accept)
                });
            }));
        };
        return DragTarget;
    }(react_2.Component));
}
exports.default = createDragTarget;
