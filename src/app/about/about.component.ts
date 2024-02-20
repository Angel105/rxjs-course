import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {Component, OnInit} from '@angular/core';
import {interval, merge} from 'rxjs';
import {map} from "rxjs/operators";
import {createHttpObservable} from "../common/util";


@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  ngOnInit() {

    const http$  = createHttpObservable('/api/courses');

    const sub = http$.subscribe(console.log);

    setTimeout(() => sub.unsubscribe(), 0);

  }

}





