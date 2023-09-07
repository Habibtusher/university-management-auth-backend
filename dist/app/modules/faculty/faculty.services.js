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
exports.FacultyService = void 0;
const mongoose_1 = __importDefault(require('mongoose'));
const paginationHelper_1 = require('../../../helper/paginationHelper');
const faculty_model_1 = require('./faculty.model');
const faculty_const_1 = require('./faculty.const');
const user_model_1 = __importDefault(require('../user/user.model'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const http_status_1 = __importDefault(require('http-status'));
const getFacutiesFromDb = (filters, paginationOpt) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const andCondition = [];
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    // const andConditions = [
    //   {
    //     $or: [
    //       {
    //         title: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //       {
    //         code: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //       {
    //         year: {
    //           $regex: searchTerm,
    //           $options: 'i',
    //         },
    //       },
    //     ],
    //   },
    // ];
    if (searchTerm) {
      andCondition.push({
        $or: faculty_const_1.facultySearchableFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
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
    paginationHelper_1.calculatePagination)(paginationOpt);
    const sortOpts = {};
    if (sortBy && sortOrder) {
      sortOpts[sortBy] = sortOrder;
    }
    const result = yield faculty_model_1.Faculty.find(whereCondition)
      .populate('department')
      .populate('faculty')
      .sort(sortOpts)
      .skip(skip)
      .limit(limit);
    const total = yield faculty_model_1.Faculty.countDocuments();
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
const getSingleFacultyFromDb = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.Faculty.findOne({ id })
      .populate('department')
      .populate('faculty');
    return result;
  });
const deleteFacultyFromDb = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      const deleteFaculty = yield faculty_model_1.Faculty.findOneAndDelete(
        { id },
        { session }
      )
        .populate('department')
        .populate('faculty');
      if (!deleteFaculty) {
        throw new Error('No faculty found with this id');
      }
      const deleteUser = yield user_model_1.default.findOneAndDelete(
        { id },
        { session }
      );
      if (!deleteUser) {
        throw new Error('Faield to delete user');
      }
      yield session.commitTransaction();
      session.endSession();
      return deleteFaculty;
    } catch (error) {
      session.abortTransaction();
      throw error;
    }
    // return result;
  });
const updateFacultyDb = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield faculty_model_1.Faculty.findOne({ id });
    if (!isExist) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Faculty not found!'
      );
    }
    const { name } = payload,
      facultyData = __rest(payload, ['name']);
    const updatedFacultytData = Object.assign({}, facultyData);
    if (name && Object.keys(name).length > 0) {
      Object.keys(name).forEach(key => {
        const nameKey = `name.${key}`;
        updatedFacultytData[nameKey] = name[key];
      });
    }
    const result = faculty_model_1.Faculty.findOneAndUpdate(
      { id },
      updatedFacultytData,
      {
        new: true,
      }
    )
      .populate('department')
      .populate('faculty');
    return result;
  });
exports.FacultyService = {
  getFacutiesFromDb,
  getSingleFacultyFromDb,
  deleteFacultyFromDb,
  updateFacultyDb,
};
