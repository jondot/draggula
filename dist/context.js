"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var defaultContext = {
    onTargetLayout: function (target) { return function () { }; },
    updateLayout: function () { return function () { }; },
    hitTest: function () { return undefined; },
    draggables: {},
    targets: {},
    hits: {}
};
var _a = react_1.default.createContext(defaultContext), Consumer = _a.Consumer, Provider = _a.Provider;
exports.Consumer = Consumer;
exports.Provider = Provider;
