import {Component, OnInit} from '@angular/core';
import {noop, Observable} from 'rxjs';


@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  ngOnInit() {

    // create an  Observable - the definition of http stream
    const http$ = Observable.create(observer => {
      fetch('/api/courses')
        .then(response => {
          return response.json();
        })
        .then(jsonBody => {
          observer.next(jsonBody);

          observer.complete(); // terminate http stream by this method

          // observer.next(); // this line would break the observable contract
        })
        .catch(error => {
          observer.error(error); // we are respecting the observable contract: either we are completing or catching an error
        });
    });

    http$.subscribe(
      courses => console.log(courses),
      // () => {},
      noop, // stands for no operation, equivalent to () => {},
      ()  => console.log('completed')
    );
  }


}






