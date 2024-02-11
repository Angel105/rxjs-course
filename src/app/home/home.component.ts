import {Component, OnInit} from '@angular/core';
import {createHttpObservable} from "../common/util";
import {map} from "rxjs/operators";
import {noop, Observable} from "rxjs";
import {Course} from "../model/course";


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(/*private store:Store*/) {

  }

  ngOnInit() {

    /*const courses$ = this.store.courses$;
    this.beginnerCourses$ = this.store.selectBeginnerCourses();
    this.advancedCourses$ = this.store.selectAdvancedCourses();*/

    const http$ = createHttpObservable('/api/courses');

    const courses$: Observable<Course[]> = http$ // first mapping operation
      .pipe(
        map(httpResponse => Object.values(httpResponse["payload"]))
      );

    this.beginnerCourses$ = courses$ // second mapping operation
      .pipe(
        map(courses => courses.filter(course => course.category === 'BEGINNER'))
      );
    this.advancedCourses$ = courses$ // second mapping operation
      .pipe(
        map(courses => courses.filter(course => course.category === 'ADVANCED'))
      );

  }

}
