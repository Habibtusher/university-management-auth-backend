import initAcademicDepartmentEvents from '../modules/academicDepartment/academicDepartment.events';
import initAcademicFacultyEvents from '../modules/academicFaculty/academicFaculty.events';
import initAcademicSemesterEvents from '../modules/academicSemester/academicSemester.event';
import initStudentEvents from '../modules/user/student.event';

const subscribeToEvents = () => {
  initAcademicSemesterEvents();
  initAcademicDepartmentEvents();
  initAcademicFacultyEvents();
  initStudentEvents();
};

export default subscribeToEvents;
