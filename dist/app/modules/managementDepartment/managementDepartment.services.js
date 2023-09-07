'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ManagementDepartmentService = void 0;
const managementDepartment_model_1 = require('./managementDepartment.model');
const createManagementDepartmentDb = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield managementDepartment_model_1.ManagementDepartment.create(payload);
    return result;
  });
const getManagementDepartmentDb = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield managementDepartment_model_1.ManagementDepartment.find();
    return result;
  });
const getSingleManagementDepartmentDb = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield managementDepartment_model_1.ManagementDepartment.findOne({
        _id: id,
      });
    return result;
  });
const updateManagementDepartmentDb = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-console
    console.log(payload);
    const result =
      yield managementDepartment_model_1.ManagementDepartment.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
      );
    return result;
  });
const deleteManagementDepartmentDb = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield managementDepartment_model_1.ManagementDepartment.findOneAndDelete({
        _id: id,
      });
    return result;
  });
exports.ManagementDepartmentService = {
  createManagementDepartmentDb,
  getManagementDepartmentDb,
  getSingleManagementDepartmentDb,
  updateManagementDepartmentDb,
  deleteManagementDepartmentDb,
};
