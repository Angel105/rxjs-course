import {Component, OnInit} from '@angular/core';
import {createHttpObservable} from "../common/util";
import {map} from "rxjs/operators";
import {noop} from "rxjs";
import {Course} from "../model/course";


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /*beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;*/

  beginnerCourses: Course[];
  advancedCourses: Course[];

  constructor(/*private store:Store*/) {

  }

  ngOnInit() {

    /*const courses$ = this.store.courses$;
    this.beginnerCourses$ = this.store.selectBeginnerCourses();
    this.advancedCourses$ = this.store.selectAdvancedCourses();*/

    const http$ = createHttpObservable('/api/courses');

    const courses$ = http$
      .pipe(
        map(httpResponse => Object.values(httpResponse["payload"]))
      );

    courses$.subscribe(
      courses => {
        console.log(courses);
        this.beginnerCourses = courses.filter(course => course.category === 'BEGINNER');
        this.advancedCourses = courses.filter(course => course.category === 'ADVANCED');
      },
      noop,
      () => console.log('completed')
    );

  }

}
