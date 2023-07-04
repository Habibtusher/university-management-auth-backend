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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicDepartmentService = void 0;
const paginationHelper_1 = require('../../../helper/paginationHelper');
const academicDepartment_model_1 = __importDefault(
  require('./academicDepartment.model')
);
const academicDepartment_constant_1 = require('./academicDepartment.constant');
const createDepartmentToDb = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield academicDepartment_model_1.default.create(
      payload
    )).populate('academicFaculty');
    return result;
  });
const getDepartmentFromDb = (pagination, filters) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0,
    paginationHelper_1.calculatePagination)(pagination);
    const { searchTerm } = filters,
      filterData = __rest(filters, ['searchTerm']);
    const andCondition = [];
    if (searchTerm) {
      andCondition.push({
        $or: academicDepartment_constant_1.academicDepartmentsearchFields.map(
          field => ({
            [field]: {
              $regex: searchTerm,
              $options: 'i',
            },
          })
        ),
      });
    }
    if (Object.keys(filterData).length) {
      andCondition.push({
        $and: Object.entries(filterData).map(([fields, value]) => ({
          [fields]: value,
        })),
      });
    }
    const whereCondition =
      andCondition.length > 0
        ? {
            $and: andCondition,
          }
        : {};
    const sortOpt = {};
    if (sortBy && sortOrder) {
      sortOpt[sortBy] = sortOrder;
    }
    const result = yield academicDepartment_model_1.default.find(
      whereCondition
    );
    const total = yield academicDepartment_model_1.default
      .countDocuments()
      .sort(sortOpt)
      .skip(skip)
      .limit(limit)
      .populate('academicFaculty');
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
const deleteDepartmentFromDb = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.default.findByIdAndDelete(
      id
    );
    return result;
  });
const updaterDepartmentInDb = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.default
      .findOneAndUpdate({ _id: id }, payload, {
        new: true,
      })
      .populate('academicFaculty');
    return result;
  });
const getSingleDepartment = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.default
      .findById(id)
      .populate('academicFaculty');
    return result;
  });
exports.AcademicDepartmentService = {
  createDepartmentToDb,
  getDepartmentFromDb,
  deleteDepartmentFromDb,
  updaterDepartmentInDb,
  getSingleDepartment,
};
