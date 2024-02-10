import {Component, OnInit} from '@angular/core';
import {noop} from 'rxjs';
import {createHttpObservable} from "../common/util";
import {map} from "rxjs/operators";


@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  ngOnInit() {

    // create an  Observable - the definition of http stream
    // transform a Promise-based call (fetch) into an Observable; What's an advantage?
    // The advantage is that we can use all RxJs operators to easily combine our http-stream with other
    // streams such as click-handlers, time-out, other http requests, ...
    const http$ = createHttpObservable('/api/courses');

    // map http$
    // pipe operator allows to chain observables
    // create a new observable courses$ that is the result of taking values of initial observable http$ and passing them
    // through a function inside map (.), namely httpResponse => Object.values(httpResponse["payload"])
    const courses$ = http$
      .pipe(
        map(httpResponse => Object.values(httpResponse["payload"]) )
      );

    courses$.subscribe(
      courses => console.log(courses),
      // () => {},
      noop, // stands for no operation, equivalent to () => {},
      ()  => console.log('completed')
    );
  }

}





