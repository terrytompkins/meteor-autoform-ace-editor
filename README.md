recreationalcoding:autoform-ace-editor
======================================

An add-on Meteor package for [aldeed:autoform](https://github.com/aldeed/meteor-autoform). Provides a custom input type, "ace-editor", which renders an instance of [ace-editor](https://github.com/ajaxorg/ace).

## Prerequisites

The plugin library must be installed separately.

In a Meteor app directory, enter:

```bash
$ meteor add arch:ace-editor
$ meteor add aldeed:autoform
```


## Installation

In a Meteor app directory, enter:

```bash
$ meteor add recreationalcoding:autoform-ace-editor
```

## Usage

Specify "ace-editor" for the `type` attribute of any input. The editor configuration can be specified through afFieldInput options in the field schema:

In the schema, which will then work with a `quickForm` or `afQuickFields`:

```js
{
  description: {
    type: String,
    label: "Description",
    autoform: {
      type: "ace-editor",
      afFieldInput: {
                      type: "ace-editor",
                      editorWidth: "600px",
                      editorHeight: "250px",
                      theme: "twilight",
                      mode: "text"
                    }
    }
  }
}
```



## Demo

[Live](http://autoform.meteor.com/types)

## Limitations

None

## Contributing

Anyone is welcome to contribute. Fork, make your changes, and then submit a pull request.

## See also


