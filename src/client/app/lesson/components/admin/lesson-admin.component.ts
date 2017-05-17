import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { Lesson } from '../../../../../shared/models/lesson';

import { LessonService } from '../../../services/lesson.service';

@Component({
  selector: 'lesson-admin',
  templateUrl: './lesson-admin.component.html',
  styleUrls: ['./lesson-admin.component.scss']
})
export class LessonAdminComponent implements AfterViewInit {
  

  activeItem: Lesson;
  
  constructor(private lessonService: LessonService, private toastyService: ToastyService,
    private route: ActivatedRoute,
    private router: Router) {
  }
  
  ngAfterViewInit() {
    //this.addModal.showModal();
  }

  getAll(): Lesson[] {
    return this.lessonService.getAllLessons();
  }

  openAddModal() {
    this.router.navigate(['add'], { relativeTo: this.route });
    
    //console.log("viewChild", );
    //this.toastyService.default('Hi there');
  }
  
  openDeleteModal(lesson: Lesson) {
    this.router.navigate(['delete', lesson.id], { relativeTo: this.route });
  }

  
}
