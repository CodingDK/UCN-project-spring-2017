import { Lesson } from '../../shared/models/lesson';
import { MeetUp } from '../../shared/models/meetUp';
import { Student } from '../../shared/models/user';
import { CreateLessonViewModel } from '../../shared/viewmodels/createLessonViewModel';
import { DbLesson, LessonDocument, Lessons, DbMeetUp } from './models/dbLesson';
import { DbError } from '../errors/dbError';
import { Types } from 'mongoose';
import { validateObjectId } from './helpers';

import { UserDal } from './userDAL';

/**
 * Class for handling Lessons in database
 */
export class LessonDal {
  private userDal = new UserDal();

  public getAll(user: any): Promise<Lesson[]> {
    return new Promise<Lesson[]>((resolve: any, reject: any) => {
      Lessons.find({}, (err: any, objs: LessonDocument[]) => {
        if (err) {
          return reject(DbError.makeNew(err, "A Database error happened"));
        }
        let retList = new Array<Lesson>();
        if (objs != null) {
          objs.forEach((value: LessonDocument) => {
            retList.push(this.getLessonObj(value));
          });
        }
        return resolve(retList);
      });
    });
  }


  /**
    * Method for find a lesson by the id
    * @param id the id to look for
    */
  public findById(user: any, id: string): Promise<Lesson> {
    return validateObjectId(id)
      .then((objectId: Types.ObjectId) => {
        return new Promise<Lesson>((resolve: any, reject: any) => {
          Lessons.findById(objectId, (err: any, lessonDoc: LessonDocument) => {
            if (err) {
              return reject(DbError.makeNew(err, "A Database error happened"));
            }
            if (lessonDoc != null) {
              return resolve(this.getLessonObj(lessonDoc));
            }
            return resolve(undefined);
          });
        });
      });
  }

  /**
   * Method for creating a new lesson
   * @param newLesson
   */
  public createLesson(user: any, viewModel: CreateLessonViewModel): Promise<Lesson> {
    return this.userDal.findStudentsBySchoolClassName(viewModel.schoolClassName)
      .then((students: Student[]) => {
        let dbLesson = new DbLesson();
        dbLesson.startTime = viewModel.startTime;
        dbLesson.endTime = viewModel.endTime;
        dbLesson.schoolClass = viewModel.schoolClassName;
        dbLesson.teachers = viewModel.teachers;
        dbLesson.meetUps = students.map((value) => {
          let dbMeetUp = new DbMeetUp();
          dbMeetUp.student = value.id;
          return dbMeetUp;
        });
        return dbLesson;
      })
      .catch((err: any) => {
        throw DbError.makeNew(err, `Error happen in finding students and attach them to a dbLesson`);
      })
      .then((dbLesson: DbLesson) => {
        return Lessons.create(dbLesson);
      })
      .then((createdLesson: LessonDocument) => {
        return this.getLessonObj(createdLesson);
      })
      .catch((err: any) => {
        let retError = err;
        if (!(err instanceof DbError)) {
          retError = DbError.makeNew(err, `Error happened in creating a new lesson in database`);
        }
        throw retError;
      });
  }

  /**
   * Delete a lesson from the database by id
   * @param id the id to delete from database
   */
  public deleteById(user: any, id: string): Promise<boolean> {
    return validateObjectId(id)
      .then((objectId: Types.ObjectId) => {
        return new Promise<boolean>((resolve, reject) => {
          Lessons.findByIdAndRemove(objectId, (err: any, lessonDoc: LessonDocument) => {
            if (err) {
              return reject(DbError.makeNew(err, `Database error happened in deleting id: ${id}`));
            }
            let deleted = typeof lessonDoc !== "undefined" && lessonDoc != null;
            return resolve(deleted);
          });
        });
      });
  }

  /**
   * Make a Lesson object from a DbLesson object
   * @param dbLesson - the dbLesson object to convert
   */
  private getLessonObj(dbLesson: LessonDocument): Lesson {
    return dbLesson.toObject() as Lesson;
  }

  /**
   * Method for make MeetUp object to DbMeetUp object
   */
  private getMeetUpsAsDbObjects(meetups: MeetUp[]): DbMeetUp[] {
    return meetups.map((value) => {
      let newDbMeetUp = new DbMeetUp();
      newDbMeetUp.checkIn = value.checkIn;
      newDbMeetUp.checkOut = value.checkOut;
      newDbMeetUp.topic = value.topic;
      newDbMeetUp.student = value.student.id;
      return newDbMeetUp;
    })
  }

}