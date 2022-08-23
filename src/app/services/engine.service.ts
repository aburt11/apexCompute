import { Injectable } from '@angular/core';

import { getQuickJS, QuickJSAsyncWASMModule, shouldInterruptAfterDeadline } from "quickjs-emscripten"



@Injectable({
  providedIn: 'root'
})
export class EngineService {

  engineContexts = [];

  instanceResults = [];

  private memoryLimitBytes = 1024 * 1024;

  constructor() { }

  initInstanceAndRunProc(payload:string) {

    this.engineContexts.push(getQuickJS().then((QuickJS) => {
     
      let timeout =  Date.now() + 1000

      const result = QuickJS.evalCode(payload, {
        shouldInterrupt: shouldInterruptAfterDeadline(timeout),
        memoryLimitBytes: this.memoryLimitBytes,
      })
      this.instanceResults.push(result);
      console.log(result);
    }));
  }
}
