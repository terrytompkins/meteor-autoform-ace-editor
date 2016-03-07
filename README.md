terrytompkins:autoform-ace-editor
=================================

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
$ meteor add terrytompkins:autoform-ace-editor
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


## Limitations

Unit tests are still pending

## Contributing

Anyone is welcome to contribute. Fork, make your changes, and then submit a pull request.

## See also

When I first looked for a similar package, there wasn't one available.  Since creating my own Ace Editor Autoform custom field package I found that there is now another one available.
It can be found here: [bshamblen:autoform-ace](https://github.com/bshamblen/autoform-ace)
They function similarly but the options and how they're applied is a bit different.
