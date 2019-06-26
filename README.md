# gulp-etl-target-flat #


Takes a JSON Message Stream and emits a flat file of any kind, including fixed width or formats with special delimiters. The plugin works in both buffer mode and stream mode, and allows the user to create their own custom parser by using the transformCallback function.

This is a **[gulp-etl](https://gulpetl.com/)** plugin, and as such it is a [gulp](https://gulpjs.com/) plugin. **gulp-etl** plugins processes [ndjson](http://ndjson.org/) data streams/files which we call **Message Streams** and which are compliant with the [Singer specification](https://github.com/singer-io/getting-started/blob/master/docs/SPEC.md#output). Message Streams look like this:

```
{"type": "SCHEMA", "stream": "users", "key_properties": ["id"], "schema": {"required": ["id"], "type": "object", "properties": {"id": {"type": "integer"}}}}
{"type": "RECORD", "stream": "users", "record": {"id": 1, "name": "Chris"}}
{"type": "RECORD", "stream": "users", "record": {"id": 2, "name": "Mike"}}
{"type": "SCHEMA", "stream": "locations", "key_properties": ["id"], "schema": {"required": ["id"], "type": "object", "properties": {"id": {"type": "integer"}}}}
{"type": "RECORD", "stream": "locations", "record": {"id": 1, "name": "Philadelphia"}}
{"type": "STATE", "value": {"users": 2, "locations": 1}}
```

### Usage
**gulp-etl** plugins accept a configObj as the first parameter, but for **gulp-etl-target-flat**  the work is mainly done by the transformCallback, so it has no options to set and it ignores the configObj.

The user-provided transformCallback function will receive a Singer message object (a [RECORD](https://github.com/singer-io/getting-started/blob/master/docs/SPEC.md#record-message), [SCHEMA](https://github.com/singer-io/getting-started/blob/master/docs/SPEC.md#schema-message) or [STATE](https://github.com/singer-io/getting-started/blob/master/docs/SPEC.md#state-message)) and is expected to return either a string to be passed downstream, or ```null``` to remove the message from the stream).

This plugin also accepts finishCallback and startCallback, which are functions that are executed before and after transformCallback. The finishCallback can be used to manage data stored collected from the stream. 

Send in callbacks as a second parameter in the form: 

```
{
    transformCallback: tranformFunction,
    finishCallback: finishFunction,
    startCallback: startFunction
}
```

##### Sample gulpfile.js
```
/* Create a flat file that is delimited by a custom string */

var handleLines = require('gulp-etl-tap-flat').tapFlat
// for TypeScript use this line instead:
// import { tapFlat } from 'gulp-etl-tap-flat'

var delimiter = '~~~' 
const targetlog = (lineObj: any): string | null => {
    var flatString = lineObj.propertyA + delimiter + lineObj.propertyB + delimiter + lineObj.propertyC
    return flatString;
}

exports.default = function() {
    return src('data/*.ndjson')
    // pipe the files through our handlelines plugin
    .pipe(targetFlat({}, {transformCallback: targetLog}))
    .on('data', function (file:Vinyl) {
        file.extname='.log';
        log.info('Finished processing on ' + file.basename)
       }) 
    .pipe(dest('output/'));
}
```

### Changing the extension of the destination file
Considering there are many kinds of flat file, this plugin by default uses a .txt file extension but users can also set their own file extensions by adding this simple chunk of code inside the gulpfile.
```
.on('data', function (file:Vinyl) {
     file.extname='.log';
     log.info('Finished processing on ' + file.basename)
    })  
```

### Quick Start
* Dependencies: 
    * [git](https://git-scm.com/downloads)
    * [nodejs](https://nodejs.org/en/download/releases/) - At least v6.3 (6.9 for Windows) required for TypeScript debugging
    * npm (installs with Node)
    * typescript - installed as a development dependency
* Clone this repo and run `npm install` to install npm packages
* Debug: with [VScode](https://code.visualstudio.com/download) use `Open Folder` to open the project folder, then hit F5 to debug. This runs without compiling to javascript using [ts-node](https://www.npmjs.com/package/ts-node)
* Test: `npm test` or `npm t`
* Compile to javascript: `npm run build`

### Testing

We are using [Jest](https://facebook.github.io/jest/docs/en/getting-started.html) for our testing. Each of our tests are in the `test` folder.

- Run `npm test` to run the test suites



Note: This document is written in [Markdown](https://daringfireball.net/projects/markdown/). We like to use [Typora](https://typora.io/) and [Markdown Preview Plus](https://chrome.google.com/webstore/detail/markdown-preview-plus/febilkbfcbhebfnokafefeacimjdckgl?hl=en-US) for our Markdown work..



