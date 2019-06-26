let gulp = require('gulp')
import {targetFlat} from '../src/plugin'
export { targetFlat, TransformCallback } from '../src/plugin';
import * as loglevel from 'loglevel'
const log = loglevel.getLogger('gulpfile')
log.setLevel((process.env.DEBUG_LEVEL || 'warn') as log.LogLevelDesc)
const errorHandler = require('gulp-error-handle'); // handle all errors in one handler, but still stop the stream if there are errors
import Vinyl = require('vinyl') 
const PLUGIN_NAME = module.exports.name;
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
//This is a sample parser that can be used through transform call back and it creates a log 
const targetLog = (lineObj: any): string | null => {
    let finalLine
    var date = new Date(lineObj.date)
    var formattedDate = monthNames[date.getMonth()] + " " + ('0'+date.getDate()).slice(-2) + " " + ('0'+date.getHours()).slice(-2)+":"+('0'+date.getMinutes()).slice(-2) + ":" 
    + ('0'+date.getSeconds()).slice(-2) + " " + date.getFullYear();
    
    if(lineObj.propertyType=="Undefined")
    {
        finalLine = lineObj.dayOfWeek + " " + formattedDate + " " + lineObj.description
        return finalLine;
    }
   
    finalLine = lineObj.dayOfWeek + " " + formattedDate + " " + lineObj.propertyType + ":" + lineObj.description
    return finalLine;
  }

 

function demonstrateTapFlat(callback: any) {
  log.info('gulp starting for ' + PLUGIN_NAME)
  return gulp.src('../testdata/*.ndjson',{buffer:false})
      .pipe(errorHandler(function(err:any) {
        log.error('oops: ' + err)
        callback(err)
      }))
      .on('data', function (file:Vinyl) {
        log.info('Starting processing on ' + file.basename)
      })
      //pipe in tapFlat plugin    
      // call logParse function above for each line
      .pipe(targetFlat({},{transformCallback:targetLog}))
     
      //The default file type for this plugin is .log but a user can easily change it by replacing their desired file extension with '.log'
      .on('data', function (file:Vinyl) {
        file.extname='.log';
        log.info('Finished processing on ' + file.basename)
       })  

       .pipe(gulp.dest('../testdata/processed'))
      .on('end', function () {
        log.info('end')
        callback()
      })
    }



    function test(callback: any) {
      log.info('This seems to run only after a successful run of demonstrateTapFlat! Do deletions here?')
      callback()
    }

exports.default = gulp.series(demonstrateTapFlat, test)
