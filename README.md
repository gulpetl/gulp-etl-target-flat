# gulp-etl-target-flat #


The job of this plugin is to take an JSON message stream from a user and emit out a flat file of any kind the user desires. The plugin works in both buffer mode and stream mode. The plugin allows the user to create their own custom parser by using transform call back or they can simply use the default parser by using default call back

This is a **[gulp-etl](https://gulpetl.com/)** plugin, and as such it is a [gulp](https://gulpjs.com/) plugin. **data-etl** plugins processes [ndjson](http://ndjson.org/) data streams/files which we call **Message Streams** and which are compliant with the [Singer specification](https://github.com/singer-io/getting-started/blob/master/docs/SPEC.md#output). Message Streams look like this:

```
{"type": "SCHEMA", "stream": "users", "key_properties": ["id"], "schema": {"required": ["id"], "type": "object", "properties": {"id": {"type": "integer"}}}}
{"type": "RECORD", "stream": "users", "record": {"id": 1, "name": "Chris"}}
{"type": "RECORD", "stream": "users", "record": {"id": 2, "name": "Mike"}}
{"type": "SCHEMA", "stream": "locations", "key_properties": ["id"], "schema": {"required": ["id"], "type": "object", "properties": {"id": {"type": "integer"}}}}
{"type": "RECORD", "stream": "locations", "record": {"id": 1, "name": "Philadelphia"}}
{"type": "STATE", "value": {"users": 2, "locations": 1}}
```

### Usage
**data-etl** plugins accept a configObj as its first parameter. The configObj
will contain any info the plugin needs.

As stated above, this plugin takes a trasnform call back function. That function will receive a 
Singer message object (a [RECORD](https://github.com/singer-io/getting-started/blob/master/docs/SPEC.md#record-message), [SCHEMA](https://github.com/singer-io/getting-started/blob/master/docs/SPEC.md#schema-message) or [STATE](https://github.com/singer-io/getting-started/blob/master/docs/SPEC.md#state-message)) and is expected to return either string to be passed downstream, or ```null``` to remove the message from the stream).

This plugin also accepts a FinishCallback and StartCallback, which are functions that are executed before and after the TransformCallback. The FinishCallback can be used to manage data stored collected from the stream. 

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
var handleLines = require('gulp-etl-tap-flat').tapFlat
// for TypeScript use this line instead:
// import { tapFlat } from 'gulp-etl-tap-flat'

const targettxt = (lineObj: any): string | null => {
 
    let tempString1 = lineObj.propertyA
    let tempString2 = lineObj.propertyB
    let tempString3 = lineObj.propertyC
    let finalString = tempString1 + " " + tempString2 + " " + tempString3 
    return finalString;
}

exports.default = function() {
    return src('data/*.ndjson')
    // pipe the files through our handlelines plugin
    .pipe(targetFlat({}, {transformCallback: targetLog}))
    .on('data', function (file:Vinyl) {
        file.extname='.txt';
        log.info('Finished processing on ' + file.basename)
       }) 
    .pipe(dest('output/'));
}
```

### Changing the extension of the destination file
Considering there are many kinds of flat file, this plugin by default provides a .txt file but users can also set their own file extensions by adding this simply chunk of code inside the Gulp File. For example, in this chunk of code, the file extension is set to one of the most common types of flat files, CSV file. .txt extension.
```
.on('data', function (file:Vinyl) {
     file.extname='.csv';
     log.info('Finished processing on ' + file.basename)
    })  
```

### Model Plugin
This plugin is intended to be a model **gulp-etl** plugin, usable as a template to be forked to create new plugins for other uses. It is compliant with [best practices for gulp plugins](https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/guidelines.md#what-does-a-good-plugin-look-like), and it properly handles both [buffers](https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/using-buffers.md) and [streams](https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/dealing-with-streams.md).



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



