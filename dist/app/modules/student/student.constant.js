'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.studentFilterableFields =
  exports.studentSearchableFields =
  exports.bloodGroup =
  exports.gender =
    void 0;
exports.gender = ['male', 'female'];
exports.bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
exports.studentSearchableFields = [
  'id',
  'email',
  'contactNo',
  'name.firsttName',
  'name.middleName',
  'name.lastName',
];
exports.studentFilterableFields = [
  'searchTerm',
  'id',
  'bloodGroup',
  'email',
  'contactNo',
  'emergencyContactNo',
];
