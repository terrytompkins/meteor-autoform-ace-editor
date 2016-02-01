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

Specify "ace-editor" for the `type` attribute of any input. This can be done in a number of ways:

In the schema, which will then work with a `quickForm` or `afQuickFields`:

```js
{
  tags: {
    type: [String],
    autoform: {
      type: "ace-editor",
      afFieldInput: {
        multiple: true,
        aceEditorOptions: {}
      }
    }
  }
}
```

Or on the `afFieldInput` component or any component that passes along attributes to `afFieldInput`:

```js
{{> afQuickField name="tags" type="ace-editor" multiple=true}}

{{> afFormGroup name="tags" type="ace-editor" multiple=true}}

{{> afFieldInput name="tags" type="ace-editor" multiple=true}}
```

To provide ace-editor options, set a `aceEditorOptions` attribute equal to a helper that returns the options object. Most of the `data-` attributes that the plugin recognizes should also work.

## Demo

[Live](http://autoform.meteor.com/types)

## Limitations

None

## Contributing

Anyone is welcome to contribute. Fork, make your changes, and then submit a pull request.

## See also


