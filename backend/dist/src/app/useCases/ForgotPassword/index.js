"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordUseCase = exports.forgotPasswordController = void 0;
var ForgotPasswordController_1 = require("./ForgotPasswordController");
var ForgotPasswordUseCase_1 = require("./ForgotPasswordUseCase");
var forgotPasswordUseCase = new ForgotPasswordUseCase_1.ForgotPasswordUseCase();
exports.forgotPasswordUseCase = forgotPasswordUseCase;
var forgotPasswordController = new ForgotPasswordController_1.ForgotPasswordController(forgotPasswordUseCase);
exports.forgotPasswordController = forgotPasswordController;
