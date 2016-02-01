AutoForm.addInputType("ace-editor", {
    template: "afAceEditor",
    valueOut: function () {
        return this.getValue();
    }
    // valueConverters: { },
    // contextAdjust: function (context) { return context; }
});

Template.afAceEditor.helpers({
    editorInstance: function(editorName) { return _getAceEditorInstance(editorName); },
    getEditorContent: function(editorName) { return _getEditorContent(editorName); },
    setEditorContent: function(editorName, content) { return _setEditorContent(editorName, content); }
});

Template.afAceEditor.events({
});

Template.afAceEditor.rendered = function () {
};

Template.afAceEditor.destroyed = function () {
};

var _defaults = {
    theme: 'terminal',
    mode: 'json' // todo: find a good generic default
};

AutoForm.AceEditor = {};
AutoForm.AceEditor.setDefaults = function (o) {
    if (_.has(o, 'theme')) {
        _defaults.theme = o.theme;
    }
    if (_.has(o, 'mode')) {
        _defaults.mode = o.mode;
    }
};

var _getAceEditorInstance = function (editorName) {
    var aceEditor;

    if (window.ace) {
        aceEditor = window.ace.edit(editorName);
    }
    if (aceEditor===undefined) {
        aceEditor = AceEditor.instance(editorName, _defaults, function (editor) {
            // editor.setValue('{"myKey": "this is a sample json value"}');
            editor.gotoLine(1);
            editor.$blockScrolling = Infinity;
            editor.session.getLength();
        });
    }
    return aceEditor;
};

var _getEditorContent = function(editorName) {
    var aceEditor = _getAceEditorInstance(editorName);
    if (aceEditor===undefined) {
        console.log("Ace editor instance " + editorName + " was not defined.");
        return "";
    }
    var editorContent = aceEditor.getValue();

    return editorContent;
};

var _setEditorContent = function(editorName, content) {
    var aceEditor = _getAceEditorInstance(editorName);
    if (aceEditor===undefined) {
        console.log("Ace editor instance " + editorName + " was not defined.");
        return "";
    }
    aceEditor.setValue(content);

    return;
};


