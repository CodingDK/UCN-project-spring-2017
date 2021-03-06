import { Component } from '@angular/core';
import { LessonService } from "../../services/lesson.service";
import { ToastyService } from "ng2-toasty";
import { ActivatedRoute, Router } from "@angular/router";
import { ILesson, IUser } from "../../../../../shared/interfaces/iModels";
import { AuthService } from "../../../services/auth.service";
import { Roles } from '../../../../../shared/constants/roles';

@Component({
    selector: 'lesson-teacher',
    templateUrl: 'lesson-teacher.component.html',
    styleUrls: ['lesson-teacher.component.scss']
})
export class LessonTeacherComponent {

  constructor(private lessonService: LessonService,
    private authService: AuthService,
    private toastyService: ToastyService,
    private route: ActivatedRoute,
    private router: Router) {
      this.lessonService.refreshAllLessons();
  }

  getAll(): ILesson[] {
    let allLessons = this.lessonService.getAllLessons();
    const user = this.authService.getUser();
    if (user != null && user.roles.indexOf(Roles.admin) !== -1) {
      allLessons = allLessons.filter(lesson => lesson.teachers.findIndex(teacher => teacher.id === user.id) !== -1);
    }
    return allLessons;
  }

  openDetailsModal(lesson: ILesson) {
    this.router.navigate(['details', lesson.id], { relativeTo: this.route });
  }

}
