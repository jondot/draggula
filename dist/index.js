"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var drag_provider_1 = __importDefault(require("./drag-provider"));
var drag_target_1 = __importDefault(require("./drag-target"));
var draggable_1 = __importDefault(require("./draggable"));
var context_1 = __importDefault(require("./context"));
//@ts-ignore
var draggula = function () {
    var _a = context_1.default(), Provider = _a.Provider, Consumer = _a.Consumer;
    var DragProvider = drag_provider_1.default(Provider);
    var Draggable = draggable_1.default(Consumer);
    var DragTarget = drag_target_1.default(Consumer);
    return { DragProvider: DragProvider, Draggable: Draggable, DragTarget: DragTarget };
};
exports.default = draggula;
