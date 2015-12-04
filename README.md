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

A params, that can be used in all files.

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

###insert ?if
Inserting of commented text to file
#####if 
condition statement, must be a simple equolity, such as _paramName_=_condition_ (note both value of param with name _paramName_ and condition will be converted to String), or simple _paramName_, at this case condition will be true if param exists.

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

###replase to? pattern? if?
Replacing of all text or substrings of text between open and close tags to text, that is specified at _to_ attribute.

####attributes
#####to 
text to replacement
#####pattern 
search regexp. If attribute is specified, then all substrings, found by regexp, will be replaced to text at _to_ attribute.
#####if 
condition statement, must be a simple equolity, such as _paramName_=_condition _(note both value of param with name _paramName_ and condition will be converted to String), or simple _paramName_, at this case condition will be true if param exists.


###html
```html
<!--replace to=^<script type="text/javascript" src="vendors/release/dojox/dojox-mini.js" ></script>^-->
<script type="text/javascript" src="vendors/release/dojox/dojox-mini.js" ></script>
<!--/replace-->

-----result-----

<script type="text/javascript" src="vendors/release/dojox/dojox-mini.js" ></script>

```
## Contributing


## Release History
_(Nothing yet)_
