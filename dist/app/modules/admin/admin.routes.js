'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require('express'));
const admin_controller_1 = require('./admin.controller');
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const admin_validation_1 = require('./admin.validation');
const router = express_1.default.Router();
router.get('/', admin_controller_1.AdminControllers.getAllAdmin);
router.get('/:id', admin_controller_1.AdminControllers.getSingleAdmin);
router.delete('/:id', admin_controller_1.AdminControllers.deleteAdmin);
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    admin_validation_1.AdminZodValidationSchema.updateAdminZodSchema
  ),
  admin_controller_1.AdminControllers.updateAdmin
);
exports.AdminRoutes = router;
