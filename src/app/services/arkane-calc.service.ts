import { Injectable } from '@angular/core';
import { ArkaneREService } from './arkane-re.service';

@Injectable({
  providedIn: 'root'
})
export class ArkaneCalcService {

  constructor(private akre:ArkaneREService) { }

  //lambda equivalent is about 0.000126 cents per hour at O(n)
 getInvocationCost(memoryAlloc,procEstimate,timeEstimate){

  let baseRate = 0.000126;

  let memoryCost = memoryAlloc * baseRate;
  let procCost = procEstimate * baseRate;
  let timeCost = timeEstimate * baseRate;
  let totalCost = memoryCost + procCost + timeCost;
  return (totalCost/3)/3600;

 }
 
  getSusCodeRank(payload:string) {
   
    let rank = payload.match(this.akre.sussRegex);
    if (rank) {
      return rank.length;
    } else {
      return 0;
    }

  }



  //a function to calculate the byte size of a string
  getStringByteSize(str:string) {
    return str.length * 2;
  }

  //a function to calculate the byte size of a string array
  getStringArrayByteSize(strArray:string[]) {
    let byteSize = 0;
    for (let i = 0; i < strArray.length; i++) {
      byteSize += this.getStringByteSize(strArray[i]);
    }
    return byteSize;
  }

  //a function to calculate the byte size of a number array
  getNumberArrayByteSize(numArray:number[]) {
    let byteSize = 0;
    for (let i = 0; i < numArray.length; i++) {
      byteSize += 8;
    }
    return byteSize;
  }

  //a function to calculate the byte size of a boolean array
  getBooleanArrayByteSize(boolArray:boolean[]) {
    let byteSize = 0;
    for (let i = 0; i < boolArray.length; i++) {
      byteSize += 1;
    }
    return byteSize;
  }

  //calculate js object byte size
  getObjectByteSize(obj:any) {
    let byteSize = 0;
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        byteSize += this.getStringByteSize(key);
        byteSize += this.getStringByteSize(obj[key]);
      }
    }
    return byteSize;
  }

  //calculate gas fees for the execution of one payload
  getGasFees(payload:string) {

    let procLoad = this.getBigONotation(payload);

    console.log("PROC LOAD", procLoad);

 

  }

  //calculate the big O notation of a function, taking into account the byte size of input and the for loops, arrays, etc used in the payload of the function
  getBigONotation(payload:string) {

    //find all the for loops in the payload
    let forLoops = payload.match(/for[\s*]\([\s*]\w+[\s*]in[\s*](\w+)/gmi);
    let forLoopByteSize = 0;
    for (let i = 0; i < forLoops.length; i++) {
      forLoopByteSize += this.getStringByteSize(forLoops[i]);
    }
    //find all the arrays in the payload
    let arrays = payload.match(/\w+[\s*]\[[\s*]\w+[\s*]\]/gmi);
    let arrayByteSize = 0;
    for (let i = 0; i < arrays.length; i++) {
      arrayByteSize += this.getStringByteSize(arrays[i]);
    }
    //find all the objects in the payload
    let objects = payload.match(/\w+[\s*]\:{[\s*]\w+[\s*]\:/gmi);
    let objectByteSize = 0;
    for (let i = 0; i < objects.length; i++) {
      objectByteSize += this.getStringByteSize(objects[i]);
    }
    //find all the strings in the payload
    let strings = payload.match(/\w+[\s*]\:[\s*]\"[\s*]\w+[\s*]\"/gmi);
    let stringByteSize = 0;
    for (let i = 0; i < strings.length; i++) {
      stringByteSize += this.getStringByteSize(strings[i]);
    }
    //find all the numbers in the payload
    let numbers = payload.match(/\w+[\s*]\:[\s*]\d+/gmi);
    let numberByteSize = 0;
    for (let i = 0; i < numbers.length; i++) {
      numberByteSize += 8;
    }
    //find all the booleans in the payload
    let booleans = payload.match(/\w+[\s*]\:[\s*]true|false/gmi);
    let booleanByteSize = 0;
    for (let i = 0; i < booleans.length; i++) {
      booleanByteSize += 1;
    }
    //find all the functions in the payload
    let functions = payload.match(/\w+[\s*]\:[\s*]function[\s*]\([\s*]\w+[\s*]\)[\s*]\{[\s*]\w+[\s*]\:/gmi);
    let functionByteSize = 0;
    for (let i = 0; i < functions.length; i++) {
      functionByteSize += this.getStringByteSize(functions[i]);
    }
    //find all the if statements in the payload
    let ifStatements = payload.match(/if[\s*]\([\s*]\w+[\s*]\)[\s*]\{[\s*]\w+[\s*]\:/gmi);
    let ifStatementByteSize = 0;
    for (let i = 0; i < ifStatements.length; i++) {
      ifStatementByteSize += this.getStringByteSize(ifStatements[i]);
    }
    //find all the else statements in the payload
    let elseStatements = payload.match(/else[\s*]\{[\s*]\w+[\s*]\:/gmi);
    let elseStatementByteSize = 0;
    for (let i = 0; i < elseStatements.length; i++) {
      elseStatementByteSize += this.getStringByteSize(elseStatements[i]);
    }
    //find all the return statements in the payload
    let returnStatements = payload.match(/return[\s*]\w+[\s*]\:/gmi);
    let returnStatementByteSize = 0;
    for (let i = 0; i < returnStatements.length; i++) {
      returnStatementByteSize += this.getStringByteSize(returnStatements[i]);
    }
    //find all the break statements in the payload
    let breakStatements = payload.match(/break[\s*]\w+[\s*]\:/gmi);
    let breakStatementByteSize = 0;
    for (let i = 0; i < breakStatements.length; i++) {
      breakStatementByteSize += this.getStringByteSize(breakStatements[i]);
    }
    //find all the continue statements in the payload
    let continueStatements = payload.match(/continue[\s*]\w+[\s*]\:/gmi);
    let continueStatementByteSize = 0;
    for (let i = 0; i < continueStatements.length; i++) {
      continueStatementByteSize += this.getStringByteSize(continueStatements[i]);
    }
    //find all the while statements in the payload
    let whileStatements = payload.match(/while[\s*]\([\s*]\w+[\s*]\)[\s*]\{[\s*]\w+[\s*]\:/gmi);
    let whileStatementByteSize = 0;
    for (let i = 0; i < whileStatements.length; i++) {
      whileStatementByteSize += this.getStringByteSize(whileStatements[i]);
    }
    //find all the do while statements in the payload
    let doWhileStatements = payload.match(/do[\s*]\{[\s*]\w+[\s*]\:/gmi);
    let doWhileStatementByteSize = 0;
    for (let i = 0; i < doWhileStatements.length; i++) {
      doWhileStatementByteSize += this.getStringByteSize(doWhileStatements[i]);
    }
    //find all the switch statements in the payload
    let switchStatements = payload.match(/switch[\s*]\([\s*]\w+[\s*]\)[\s*]\{[\s*]\w+[\s*]\:/gmi);
    let switchStatementByteSize = 0;
    for (let i = 0; i < switchStatements.length; i++) {
      switchStatementByteSize += this.getStringByteSize(switchStatements[i]);
    }
    //find all the case statements in the payload
    let caseStatements = payload.match(/case[\s*]\w+[\s*]\:/gmi);
    let caseStatementByteSize = 0;
    for (let i = 0; i < caseStatements.length; i++) {
      caseStatementByteSize += this.getStringByteSize(caseStatements[i]);
    }
    //find all the default statements in the payload
    let defaultStatements = payload.match(/default[\s*]\:/gmi);
    let defaultStatementByteSize = 0;
    for (let i = 0; i < defaultStatements.length; i++) {
      defaultStatementByteSize += this.getStringByteSize(defaultStatements[i]);
    }
    //find all the for statements in the payload
    let forStatements = payload.match(/for[\s*]\([\s*]\w+[\s*]\)[\s*]\{[\s*]\w+[\s*]\:/gmi);
    let forStatementByteSize = 0;
    for (let i = 0; i < forStatements.length; i++) {
      forStatementByteSize += this.getStringByteSize(forStatements[i]);
    }
    //find all the for in statements in the payload
    let forInStatements = payload.match(/for[\s*]\([\s*]\w+[\s*]\)[\s*]in[\s*]\([\s*]\w+[\s*]\)[\s*]\{[\s*]\w+[\s*]\:/gmi);
    let forInStatementByteSize = 0;
    for (let i = 0; i < forInStatements.length; i++) {
      forInStatementByteSize += this.getStringByteSize(forInStatements[i]);
    }
    //find all the try statements in the payload
    let tryStatements = payload.match(/try[\s*]\{[\s*]\w+[\s*]\:/gmi);
    let tryStatementByteSize = 0;
    for (let i = 0; i < tryStatements.length; i++) {
      tryStatementByteSize += this.getStringByteSize(tryStatements[i]);
    }
    //find all the catch statements in the payload
    let catchStatements = payload.match(/catch[\s*]\([\s*]\w+[\s*]\)[\s*]\{[\s*]\w+[\s*]\:/gmi);
    let catchStatementByteSize = 0;
    for (let i = 0; i < catchStatements.length; i++) {
      catchStatementByteSize += this.getStringByteSize(catchStatements[i]);
    }

    //find all the finally statements in the payload
    let finallyStatements = payload.match(/finally[\s*]\{[\s*]\w+[\s*]\:/gmi);
    let finallyStatementByteSize = 0;
    for (let i = 0; i < finallyStatements.length; i++) {
      finallyStatementByteSize += this.getStringByteSize(finallyStatements[i]);
    }
    //find all the throw statements in the payload
    let throwStatements = payload.match(/throw[\s*]\w+[\s*]\:/gmi);
    let throwStatementByteSize = 0;
    for (let i = 0; i < throwStatements.length; i++) {
      throwStatementByteSize += this.getStringByteSize(throwStatements[i]);
    }
    //find all the try catch statements in the payload


    //derive the estimated processing power, time and memory usage of the payload from the above values
    let estimatedProcessingPower = (functionByteSize + returnStatementByteSize + breakStatementByteSize + continueStatementByteSize + whileStatementByteSize + doWhileStatementByteSize + switchStatementByteSize + caseStatementByteSize + defaultStatementByteSize + forStatementByteSize + forInStatementByteSize + tryStatementByteSize + catchStatementByteSize + finallyStatementByteSize + throwStatementByteSize + catchStatementByteSize) / payload.length;
    let estimatedTime = (functionByteSize + returnStatementByteSize + breakStatementByteSize + continueStatementByteSize + whileStatementByteSize + doWhileStatementByteSize + switchStatementByteSize + caseStatementByteSize + defaultStatementByteSize + forStatementByteSize + forInStatementByteSize + tryStatementByteSize + catchStatementByteSize + finallyStatementByteSize + throwStatementByteSize + catchStatementByteSize) / estimatedProcessingPower;
    let estimatedMemory = (functionByteSize + returnStatementByteSize + breakStatementByteSize + continueStatementByteSize + whileStatementByteSize + doWhileStatementByteSize + switchStatementByteSize + caseStatementByteSize + defaultStatementByteSize + forStatementByteSize + forInStatementByteSize + tryStatementByteSize + catchStatementByteSize + finallyStatementByteSize + throwStatementByteSize + catchStatementByteSize) / estimatedTime;
    let estimatedProcessingPowerPercentage = estimatedProcessingPower / payload.length * 100;
    let estimatedTimePercentage = estimatedTime / payload.length * 100;
    let estimatedMemoryPercentage = estimatedMemory / payload.length * 100;

    return {
      estimatedProcessingPower: estimatedProcessingPower,
      estimatedTime: estimatedTime,
      estimatedMemory: estimatedMemory,
      estimatedProcessingPowerPercentage: estimatedProcessingPowerPercentage,
      estimatedTimePercentage: estimatedTimePercentage,
      estimatedMemoryPercentage: estimatedMemoryPercentage

    }

  }


}
