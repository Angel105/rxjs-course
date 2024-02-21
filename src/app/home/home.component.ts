import {Component, OnInit} from '@angular/core';
import {createHttpObservable} from "../common/util";
import {catchError, finalize, map, shareReplay, tap} from "rxjs/operators";
import {noop, Observable, of, throwError} from "rxjs";
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
        catchError(err => {
          console.log("Error occurred ", err); // could be a call to an error message service

          return throwError(err);
        }),
        tap(() => console.log("HTTP request has been executed")),
        map(httpResponse => Object.values(httpResponse["payload"])),
        shareReplay(),
        finalize(()=> {
          console.log('Finalize executed...');
        })
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
