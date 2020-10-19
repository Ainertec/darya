"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistrictsRoutes = void 0;
var celebrate_1 = require("celebrate");
var DistrictController_1 = __importDefault(require("../app/controllers/DistrictController"));
var Authorization_1 = __importDefault(require("../middlewares/Authorization"));
var Authentication_1 = __importDefault(require("../middlewares/Authentication"));
var DistrictsRoutes = /** @class */ (function () {
    function DistrictsRoutes(routes) {
        this.routes = routes;
    }
    DistrictsRoutes.prototype.getRoutes = function (validations) {
        this.routes.get('/districts', DistrictController_1.default.index);
        this.routes.get('/districts/:name', celebrate_1.celebrate({ params: validations.paramName }), DistrictController_1.default.show);
        this.routes.post('/districts', Authentication_1.default, Authorization_1.default, celebrate_1.celebrate({ body: validations.district }), DistrictController_1.default.store);
        this.routes.put('/districts/:id', Authentication_1.default, Authorization_1.default, celebrate_1.celebrate({ body: validations.district, params: validations.paramId }), DistrictController_1.default.update);
        this.routes.delete('/districts/:id', Authentication_1.default, Authorization_1.default, celebrate_1.celebrate({ params: validations.paramId }), DistrictController_1.default.delete);
    };
    return DistrictsRoutes;
}());
exports.DistrictsRoutes = DistrictsRoutes;
