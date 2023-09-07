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
exports.AcademicFacultyService = void 0;
const paginationHelper_1 = require('../../../helper/paginationHelper');
const academicFaculty_model_1 = __importDefault(
  require('./academicFaculty.model')
);
const academicFaculty_constant_1 = require('./academicFaculty.constant');
const createAcademicFacultyToDb = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.default.create(payload);
    return result;
  });
const getAcademicFacultyFromDb = (filters, pagination) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    const andCondition = [];
    if (searchTerm) {
      andCondition.push({
        $or: academicFaculty_constant_1.academicFacultysearchFields.map(
          field => ({
            [field]: {
              $regex: searchTerm,
              $options: 'i',
            },
          })
        ),
      });
    }
    if (Object.keys(filtersData).length) {
      andCondition.push({
        $and: Object.entries(filtersData).map(([fields, value]) => ({
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
    const { page, limit, skip, sortBy, sortOrder } = (0,
    paginationHelper_1.calculatePagination)(pagination);
    const sortOpts = {};
    if (sortBy && sortOrder) {
      sortOpts[sortBy] = sortOrder;
    }
    const result = yield academicFaculty_model_1.default
      .find(whereCondition)
      .sort(sortOpts)
      .skip(skip)
      .limit(limit);
    const total = yield academicFaculty_model_1.default.countDocuments();
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
const getSingleAcademicFacultyFromDb = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.default.findById(id);
    return result;
  });
const deleteAcademicFacultyFromDb = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.default.findByIdAndDelete(id);
    return result;
  });
const updateAcademicFacultyFromDb = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.default.findOneAndUpdate(
      { _id: id },
      payload,
      {
        new: true,
      }
    );
    return result;
  });
exports.AcademicFacultyService = {
  createAcademicFacultyToDb,
  getAcademicFacultyFromDb,
  getSingleAcademicFacultyFromDb,
  deleteAcademicFacultyFromDb,
  updateAcademicFacultyFromDb,
};
