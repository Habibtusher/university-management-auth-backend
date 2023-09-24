import { RedisClient } from '../../../shared/redis';
import { StudentService } from '../student/student.service';
import { EVENT_STUDENT_DELETE } from './user.constant';

const initStudentEvents = () => {
  RedisClient.subscribe(EVENT_STUDENT_DELETE, async (e: string) => {
    const data = JSON.parse(e);

    await StudentService.deleteStudent(data.studentId);
  });
};

export default initStudentEvents;
