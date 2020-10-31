"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordUseCase = exports.forgotPasswordController = void 0;
const ForgotPasswordController_1 = require("./ForgotPasswordController");
const ForgotPasswordUseCase_1 = require("./ForgotPasswordUseCase");
const forgotPasswordUseCase = new ForgotPasswordUseCase_1.ForgotPasswordUseCase();
exports.forgotPasswordUseCase = forgotPasswordUseCase;
const forgotPasswordController = new ForgotPasswordController_1.ForgotPasswordController(forgotPasswordUseCase);
exports.forgotPasswordController = forgotPasswordController;
