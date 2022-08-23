import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArkaneREService {


  importsRE = /import(?:[\s*]([\w*{}\n\r\t, ]+)[\s*]from)?[\s*](?:["'](.*[\w]+)["'])?/gmi;

  //create a regular expression to find all variables in a .js file
  findVariablesRE = /(?:var|let|const)[\s*]([\w*{}\n\r\t, ]+)[\s*]=(?:[\s*]function[\s*]\([\s*]\){[\s*]return[\s*]([\w*{}\n\r\t, ]+)[\s*]\})/gmi;

  //create a regular expression to find a javascript functions in a .js file
  funcRE = /(function)[\s*]([\w]+)[\s*]\(([\w\s,]*)\)[\s*]\{([\w\s\n\r\t]*)\}/gmi;


  //create a regular expression to find malicious and suspicious javascript code in a .js file
  //this can include things like:
 
  //-debugger statements
  //-alert statements
  //-prompt statements
  //-eval statements
  //-confirm statements
  //-location statements
  //-history statements
  //-navigator statements
  //-document statements
  //-window statements
  //-screen statements
  //-location.href statements
  //-location.assign statements
  //-location.replace statements
  //-location.reload statements
  //-location.hash statements
  //-location.host statements
  //-location.hostname statements
  //-location.pathname statements
  //-location.port statements
  //-location.protocol statements
  //-location.search statements
  //-location.href statements
  //-location.assign statements
  //-location.replace statements
  //-location.reload statements
  //-location.hash statements
  //-location.host statements
  //-location.hostname statements
  //-location.pathname statements
  //-location.port statements
  //-location.protocol statements
  //-location.search statements
  //-location.href statements
  //-location.assign statements
  //-location.replace statements
  //-location.reload statements
  //-location.hash statements
  //-location.host statements
  //-location.hostname statements
  //-location.pathname statements
  //-location.port statements
  //-location.protocol statements
  //-location.search statements
  //-location.href statements
  //-location.assign statements
  //-location.replace statements
  //-location.reload statements
  //-location.hash statements
  //-location.host statements
  //-location.hostname statements
sussRegex = `(?:alert|prompt|eval|confirm|location|history|navigator|document|window|screen|location\.href|location\.assign|location\.replace|location\.reload|location\.hash|location\.host|location\.hostname|location\.pathname|location\.port|location\.protocol|location\.search|location\.href|location\.assign|location\.replace|location\.reload|location\.hash|location\.host|location\.hostname|location\.pathname|location\.port|location\.protocol|location\.search|location\.href|location\.assign|location\.replace|location\.reload|location\.hash|location\.host|location\.hostname|location\.pathname|location\.port|location\.protocol|location\.search|location\.href|location\.assign|location\.replace|location\.reload|location\.hash|location\.host|location\.hostname|location\.pathname|location\.port|location\.protocol|location\.search|location\.href|location\.assign|location\.replace|location\.reload|location\.hash|location\.host|location\.hostname|location\.pathname|location\.port|location\.protocol|location\.search|location\.href|location\.assign|location\.replace|location\.reload|location\.hash|location\.host|location\.hostname|location\.pathname|location\.port|location\.protocol|location\.search|location\.href|location\.assign|location\.replace|location\.reload|location\.hash|location\.host|location\.hostname|location\.pathname|location\.port|location\.protocol|location\.search|location\.href|location\.assign|location\.replace|location\.reload|location\.hash|location\.host|location\.hostname|location\.pathname|location\.port|location\.protocol|location\.search|location\.href|location\.assign|location\.replace|location\.reload|location\.hash|location\.host|location\.hostname|location\.pathname|location\.port|location\.protocol|location\.search|location\.href|location\.assign|location\.replace|location\.reload|location\.hash|location\.host|location\.hostname|location\.`;

//regular expression to find any network calls, http requests, or other api calls in a js file
httpRegex = /(?:http|https)[\s*]\:[\s*]\/\//gmi;

netRegex = `(?:fetch|fetch\(|fetch\(.*\)|fetch\(.*\).then|fetch\(.*\).then\(.*\)|fetch\(.*\).then\(.*\).catch|fetch\(.*\).then\(.*\).catch\(.*\)|fetch\(.*\).then\(.*\).catch\(.*\).then|fetch\(.*\).then\(.*\).catch\(.*\).then\(.*\)|fetch\(.*\).then\(.*\).catch\(.*\).then\(.*\)|fetch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch|fetch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\)|fetch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then|fetch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\)|fetch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\)|fetch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch|fetch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\)|fetch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then|fetch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\)|fetch\(.*\).then\(.*\).catch`;
 
//a regular expression to find encoded data in a .js file
encodedRegex = /(?:%[0-9a-f]{2})/gmi;

//a regular expression to find obfuscated javascript code in a .js file

obfuscatedRegex = `(?:%[0-9a-f]{2}|\$\w+|\$\w+\(.*\)|\$\w+\(.*\).then|\$\w+\(.*\).then\(.*\)|\$\w+\(.*\).then\(.*\).catch|\$\w+\(.*\).then\(.*\).catch\(.*\)|\$\w+\(.*\).then\(.*\).catch\(.*\).then|\$\w+\(.*\).then\(.*\).catch\(.*\).then\(.*\)|\$\w+\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch|\$\w+\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then|\$\w+\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\)|\$\w+\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\)|\$\w+\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch|\$\w+\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\)|\$\w+\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then|\$\w+\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\)|\$\w+\(`;


//regex to match a javascript variable in code that is behvaing like a string based on the functions used by it in js,  if toString(), valueOf(), join(), etc, it is a string
stringBehaviourRegex = '';

numberBehaviourRegex = '';

booleanBehaviourRegex = '';

//regex to match a javascript object
genericJSOBehaviourRegex = `(?:new\s+Object|new\s+Object\(.*\)|new\s+Object\(.*\).then|new\s+Object\(.*\).then\(.*\)|new\s+Object\(.*\).then\(.*\).catch|new\s+Object\(.*\).then\(.*\).catch\(.*\)|new\s+Object\(.*\).then\(.*\).catch\(.*\).then|new\s+Object\(.*\).then\(.*\).catch\(.*\).then\(.*\)|new\s+Object\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch|new\s+Object\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then|new\s+Object\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\)|new\s+Object\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch|new\s+Object\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then|new\s+Object\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\)|new\s+Object\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch|new\s+Object\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\).then\(.*\).catch\(.*\)|new`;


  constructor() { }
}
