import { Injectable } from '@angular/core';

import { getQuickJS, QuickJSAsyncWASMModule, shouldInterruptAfterDeadline } from "quickjs-emscripten"



@Injectable({
  providedIn: 'root'
})
export class EngineService {

  engineContexts = [];

  instanceResults = [];

  private memoryLimitBytes = 30 * 1024; //30mb limit

  constructor() { }


 async createSTEPVM(payload:string,imports?,variables?,functions?){

  const QuickJS = await getQuickJS()
  const vm = QuickJS.newContext()

  //const world = vm.newString("world")
  //vm.setProp(vm.global, "NAME", world)
  //world.dispose()

  const result = vm.evalCode(payload)
  if (result.error) {
    console.log("Execution failed:", vm.dump(result.error))
    result.error.dispose()
  } else {
    console.log("Success:", vm.dump(result['value']))
    result['value'].dispose()
  }

  vm.dispose()
  return result.toString();


}


  initInstanceAndRunProc(payload:string,timeoutInSeconds:number) {

    this.engineContexts.push(getQuickJS().then((QuickJS) => {
     
      let timeout =  Date.now() + (1000 * timeoutInSeconds);

      const result = QuickJS.evalCode(payload, {
        shouldInterrupt: shouldInterruptAfterDeadline(timeout),
        memoryLimitBytes: this.memoryLimitBytes,
      })
      this.instanceResults.push(result);
      
      console.log(result);
    }));
  }
}
