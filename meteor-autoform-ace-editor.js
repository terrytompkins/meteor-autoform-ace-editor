AutoForm.addInputType("ace-editor", {
    template: "afAceEditor",
    valueIn: function (val, atts) {
        console.log("IN VALUEIN.  INPUT VAL: " + val + ", INIT CONTENT: " + _defaults.initialContent);
        _defaults.initialContent = val;
        return val;
    },
    valueOut: function () {
        // todo: this needs to be wired to fetch editor content
        var editorContent = "";
        var editor = AceEditor.instance(AutoForm.AceEditor.properties.editorId);
        if (editor.loaded===true) {
            editorContent = editor.getValue();
        }
        console.log("IN VALUEOUT: " + editorContent);
        return editorContent;
    }
    // valueConverters: { },
    // contextAdjust: function (context) { return context; }
});

Template.afAceEditor.helpers({
    editorId: function() { return AutoForm.AceEditor.properties.editorId; }
});

Template.afAceEditor.events({
});

AutoForm.AceEditor = {};
AutoForm.AceEditor.properties = {};

var _defaults = {
    editorId: "myEditor",
    theme: 'dawn',
    mode: 'text',
    editorWidth: '400px',
    editorHeight: '250px'
};

AutoForm.AceEditor.setProperties = function (autoformAtts) {
    Object.keys(_defaults).forEach(function(key,index) {
        if (key==="editorId") {
            // If the user specifies an editorId, use it. Otherwise, use the field name from atts
            AutoForm.AceEditor.properties[key] = (autoformAtts && autoformAtts.editorId) || (autoformAtts && autoformAtts.name) || _defaults.editorId;
        } else {
            if (autoformAtts && autoformAtts[key]) {
                AutoForm.AceEditor.properties[key] = autoformAtts[key];
            } else {
                AutoForm.AceEditor.properties[key] = _defaults[key];
            }
        }
        // console.log("KEY: " + key + ", VALUE: " + AutoForm.AceEditor.properties[key])
    });
    console.log("IN ACEEDITOR.SETPROPERTIES.  init content: " + _defaults.initialContent);
};

Template.afAceEditor.onCreated(function() {
    AutoForm.AceEditor.setProperties(this.data.atts);
    console.log("IN ONCREATED");
});


Template.afAceEditor.onRendered(function () {
    var editor;

    Tracker.autorun(function (e) {
        editor = AceEditor.instance(AutoForm.AceEditor.properties.editorId, {
            theme: AutoForm.AceEditor.properties.theme,
            mode: AutoForm.AceEditor.properties.mode
        });
        if(editor.loaded===true){
            e.stop();
            editor.insert(AutoForm.AceEditor.properties.initialContent);
        }
    });
    var selector = AutoForm.AceEditor.properties.editorId;
    $("#" + selector).css({"height": AutoForm.AceEditor.properties.editorHeight, "width": AutoForm.AceEditor.properties.editorWidth});
    console.log("IN ONRENDERED");
});

Template.afAceEditor.onDestroyed = function () {
    var editor = AceEditor.instance(AutoForm.AceEditor.properties.editorId);
    if (editor.loaded===true) {
        editor.destroy();
    }
};

