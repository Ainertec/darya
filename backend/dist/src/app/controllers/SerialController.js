"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SerialController = /** @class */ (function () {
    function SerialController() {
    }
    SerialController.prototype.exit = function (req, res) {
        var password = req.query.password;
        if (Number(password) === 52164521655455362) {
            process.exit(0);
        }
        else {
            return res.json({ alert: 'invalid access!' });
        }
    };
    return SerialController;
}());
exports.default = new SerialController();
