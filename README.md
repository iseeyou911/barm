# grunt-barm

> JavaScript, HTML, CSS preprocessor

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-barm --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-barm');
```

## The "barm" task

### Overview
In your project's Gruntfile, add a section named `barm` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  barm: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.globalParams
Type: `Object`
Default value: `{}`

A parameters, that can be used in all files.

Attention! If you don't specify _dest_ parameter in _files_, then changes will be made in original file!

### Usage Example

```js
grunt.initConfig({
  barm: {
    options: {
      globalParams: {
        debug : true
      }
    },
    files: {
      'src': ['src/testing', 'src/123'],
    }
  }
});
```

##Placeholders
###Syntax
${paramName[:transformFunction]}

You can use placholders for params in _insert_ directive, in _to_ attribute. There is one tansform function that available at this moment: _removeQuotes_.

###Example
```js
//define test='test'

/*insert
var test = ${test};
/insert*/

-----result-----

var test = 'test';
```
```html
<!--define test='test'-->
<!--replace to=^${test:removeQuotes}^ pattern=^vendors^-->
<script type="text/javascript" src="vendors" ></script>
<!--/replace-->

-----result-----
<script type="text/javascript" src="test" ></script>
```
##Directives
###define paramName=paramValue
Defining of local param with _name_ - _paramName_ and _value_ - _paramValue_, that visible only in current file, this param will overwrite global param with same name for current file.
####html
```html
<!--define key=value-->
```
####js
```js
//define key=value
```

###insert [if=^_condition statement_^]
Inserting of commented text to file
#####if 
condition statement, must be a simple equality, such as _paramName_=_condition_ (note both value of parameter with name _paramName_ and condition will be converted to String), or simple _paramName_, at this case condition will be true if parameter exists.

####html
```html
<!--insert
<script type="text/javascript" src="vendors/release/dojo/dojo-mini.js" ></script>
<script type="text/javascript" src="vendors/release/dijit/dijit-mini.js" ></script>
<script type="text/javascript" src="vendors/release/dojox/dojox-mini.js" ></script>
/insert-->

-----result-----

<script type="text/javascript" src="vendors/release/dojo/dojo-mini.js" ></script>
<script type="text/javascript" src="vendors/release/dijit/dijit-mini.js" ></script>
<script type="text/javascript" src="vendors/release/dojox/dojox-mini.js" ></script>
```
####js
```js
/*insert
var mode = 'dev'
/insert*/

-----result-----

var mode = 'dev'

```

###replace to=^_text to replacement_^ [pattern=^_regular expression_^] [if=^_condition statement_^]
Replacing of all text or substrings of text between open and close tags to text, that is specified at _to_ attribute.

####attributes (order of attributes is important, but you can skip one or more optional params!)
#####to 
text to replacement
#####pattern 
search regexp. If attribute is specified, then all substrings, found by regexp, will be replaced to text from _to_ attribute.
#####if 
condition statement, must be a simple equality, such as _paramName_=_condition_ (note both value of parameter with name _paramName_ and condition will be converted to String), or simple _paramName_, at this case condition will be true if parameter exists.


###html
```html
<!--replace to=^<script type="text/javascript" src="vendors/release/dojox/dojox-mini.js" ></script>^-->
<script type="text/javascript" src="vendors/release/dojox/dojox-mini.js" ></script>
<!--/replace-->

-----result-----

<script type="text/javascript" src="vendors/release/dojox/dojox-mini.js" ></script>

```

###js
```js
/*replace to=^dojo.require("dijit.form.TextBox");^*/
dojo.require("dijit.layout.LayoutContainer");
dojo.require("dijit.layout.ContentPane");
/*/replace*/

-----result-----

dojo.require("dijit.form.TextBox");

----------------

/*replace to=^dojo^ pattern=^dijit^*/
dojo.require("dijit.layout.LayoutContainer");
/*/replace*/

-----result-----

dojo.require("dojo.layout.LayoutContainer");

----------------
//define reportServerUrl='_reportServerUrl1_'

window.restReportService = /*replace to=^${reportServerUrl}^*/'http://localhost:28080/tes-report/'/*/replace*/;

-----result-----

window.restReportService = '_reportServerUrl1_';

----------------
//define debug=true

window.restReportService1 = /*replace to=^'test1'^ if=^debug^*/'http://localhost:28080/tes-report/'/*/replace*/;
window.restReportService2 = /*replace to=^'test2'^ if=^debug=true^*/'http://localhost:28080/tes-report/'/*/replace*/;
window.restReportService3 = /*replace to=^'test3'^ if=^debug=false^*/'http://localhost:28080/tes-report/'/*/replace*/;

-----result-----

window.restReportService1 = 'test1';
window.restReportService2 = 'test2';
window.restReportService3 = /*replace to=^'test3'^ if=^debug=false^*/'http://localhost:28080/tes-report/'/*/replace*/;

```
## Contributing


## Release History
_(Nothing yet)_
