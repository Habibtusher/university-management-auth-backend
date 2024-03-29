'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicFacultyRoutes = void 0;
const express_1 = __importDefault(require('express'));
const academicFaculty_controllers_1 = require('./academicFaculty.controllers');
const academicFaculty_validation_1 = require('./academicFaculty.validation');
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const auth_1 = __importDefault(require('../../middlewares/auth'));
const user_1 = require('../../../enums/user');
const router = express_1.default.Router();
router.post(
  '/create-faculty',
  (0, validateRequest_1.default)(
    academicFaculty_validation_1.AcademicFacultyValidation
      .createAcademicFacultyZodSchema
  ),
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN
  ),
  academicFaculty_controllers_1.AcademicFacultyController.createAcademicFaculty
);
router.get(
  '/',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.FACULTY,
    user_1.ENUM_USER_ROLE.STUDENT
  ),
  academicFaculty_controllers_1.AcademicFacultyController.getAcademicFaculty
);
router.get(
  '/:id',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.FACULTY
  ),
  academicFaculty_controllers_1.AcademicFacultyController
    .getSingleAcademicFaculty
);
router.delete(
  '/:id',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN
  ),
  academicFaculty_controllers_1.AcademicFacultyController.deleteAcademicFaculty
);
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    academicFaculty_validation_1.AcademicFacultyValidation
      .createAcademicFacultyZodSchema
  ),
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.FACULTY
  ),
  academicFaculty_controllers_1.AcademicFacultyController.updateAcademicFaculty
);
exports.AcademicFacultyRoutes = router;
