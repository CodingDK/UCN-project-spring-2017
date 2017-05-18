import { validate, ValidationError } from "class-validator";

// models
import { Lesson } from '../../shared/models/lesson';
import { MeetUp } from '../../shared/models/meetUp';
import { Student } from '../../shared/models/student';

// controllers
import { LessonController } from './LessonController';
import { BaseController } from './baseController';

// Data Access Layer
import { StudentDal } from '../dal/StudentDAL';

/**
 * Controller for handling students' checkin / checkout from lesson
 */
export class StudentController extends BaseController {
    private dal: StudentDal = new StudentDal();

    public studentCheckIn() {
        // TODO:
    }

    public studentCheckOut() {
        // TODO:
    }

    public setStudentTopic() {
        // TODO:
    }

    public getActiveLessons(): any {
        console.log('get active lessons - controller');

        return this.dal.getActiveLessons();
    }
}
