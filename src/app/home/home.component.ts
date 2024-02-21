import {Component, OnInit} from '@angular/core';
import {createHttpObservable} from "../common/util";
import {catchError, map, shareReplay, tap} from "rxjs/operators";
import {noop, Observable, of} from "rxjs";
import {Course} from "../model/course";


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor() {

  }

  ngOnInit() {

    const http$ = createHttpObservable('/api/courses');

    const courses$: Observable<Course[]> = http$ // first mapping operation
      .pipe(
        tap(() => console.log("HTTP request has been executed")),
        map(httpResponse => Object.values(httpResponse["payload"])),
        shareReplay(),
        catchError(err => of([
          {
            id: 0,
            description: "RxJs In Practice Course",
            iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png',
            courseListIcon: 'https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png',
            longDescription: "Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples",
            category: 'BEGINNER',
            lessonsCount: 10
          }
        ]))
      );

    courses$.subscribe();

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
