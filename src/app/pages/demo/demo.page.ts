import { EngineService } from './../../services/engine.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss'],
})
export class DemoPage implements OnInit {


  procResult;

  payload = `console.log("Hello World"); alert("did it work?");`;

  constructor(private engine:EngineService) { }

  ngOnInit() {
  }

  runDemo(){

  this.procResult =  this.engine.createSTEPVM(this.payload)
console.log(this.procResult);
  }

}
