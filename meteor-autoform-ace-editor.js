AutoForm.addInputType("ace-editor", {
    template: "afAceEditor",
    valueIn: function (val, atts) {
        _defaults.initialContent = val;
        return val;
    },
    valueOut: function () {
        var editorContent = "";
        var editor = AceEditor.instance(AutoForm.AceEditor.properties.editorId);
        if (editor.loaded===true) {
            editorContent = editor.getValue();
        }
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
    });
};

Template.afAceEditor.onCreated(function() {
    AutoForm.AceEditor.setProperties(this.data.atts);
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
            editor.$blockScrolling = Infinity;
            editor.insert(AutoForm.AceEditor.properties.initialContent);
        }
    });
    var selector = AutoForm.AceEditor.properties.editorId;
    $("#" + selector).css({"height": AutoForm.AceEditor.properties.editorHeight, "width": AutoForm.AceEditor.properties.editorWidth});
});

Template.afAceEditor.onDestroyed = function () {
    var editor = AceEditor.instance(AutoForm.AceEditor.properties.editorId);
    if (editor.loaded===true) {
        editor.destroy();
    }
};

