"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiresAuth = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const requiresAuth = (req, res, next) => {
    console.log(" auth.ts req.session.userId is ", req.session.userId);
    if (req.session.userId) {
        next();
    }
    else {
        next((0, http_errors_1.default)(401, "User not authenticated"));
    }
};
exports.requiresAuth = requiresAuth;
