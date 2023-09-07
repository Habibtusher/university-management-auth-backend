'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ManagementDepartmentRoutes = void 0;
const express_1 = __importDefault(require('express'));
const managementDepartment_validation_1 = require('./managementDepartment.validation');
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const managementDepartment_controllers_1 = require('./managementDepartment.controllers');
const router = express_1.default.Router();
router.post(
  '/create-management',
  (0, validateRequest_1.default)(
    managementDepartment_validation_1.ManagementDepartmentValidation
      .createManagementDepartmentZodSchema
  ),
  managementDepartment_controllers_1.ManagementDepartmentController
    .createManagementDepartment
);
router.get(
  '/',
  managementDepartment_controllers_1.ManagementDepartmentController
    .getAllManagementDepartment
);
router.get(
  '/:id',
  managementDepartment_controllers_1.ManagementDepartmentController
    .getSingleManagementDepartment
);
router.delete(
  '/:id',
  managementDepartment_controllers_1.ManagementDepartmentController
    .deleteManagementDepartment
);
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    managementDepartment_validation_1.ManagementDepartmentValidation
      .updateManagementDepartmentZodSchema
  ),
  managementDepartment_controllers_1.ManagementDepartmentController
    .updateManagementDepartment
);
exports.ManagementDepartmentRoutes = router;
