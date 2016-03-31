AutoForm.addInputType("ace-editor", {
    template: "afAceEditor",
    valueIn: function (val, atts) {
        _defaults.initialContent = val;
        return val;
    },
    valueOut: function () {
        var editorContent = "";
        AutoForm.AceEditor.currentEditorId = this.attr("data-schema-key");
        var editor = AceEditor.instance(AutoForm.AceEditor.currentEditorId);
        if (editor.loaded===true) {
            editorContent = editor.getValue();
        }
        return editorContent;
    }
    // valueConverters: { },
    // contextAdjust: function (context) { return context; }
});

Template.afAceEditor.helpers({
    // editorId: function() { return AutoForm.AceEditor.properties.editorId; }
    editorId: function() { return AutoForm.AceEditor.currentEditorId; }
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
    var currentEditorKey = (autoformAtts && autoformAtts.editorId) || (autoformAtts && autoformAtts.name) || _defaults.editorId;
    AutoForm.AceEditor.currentEditorId = currentEditorKey;
    AutoForm.AceEditor.properties[currentEditorKey] = {};
    Object.keys(_defaults).forEach(function(key,index) {
        if (key==="editorId") {
            // If the user specifies an editorId, use it. Otherwise, use the field name from atts
            AutoForm.AceEditor.properties[currentEditorKey][key] = currentEditorKey;
        } else {
            if (autoformAtts && autoformAtts[key]) {
                AutoForm.AceEditor.properties[currentEditorKey][key] = autoformAtts[key];
            } else {
                AutoForm.AceEditor.properties[currentEditorKey][key] = _defaults[key];
            }
        }
    });
};

Template.afAceEditor.onCreated(function() {
    AutoForm.AceEditor.setProperties(this.data.atts);
});


Template.afAceEditor.onRendered(function () {
    var editor;
    var currentEditorKey = AutoForm.AceEditor.currentEditorId;
    Object.keys(AutoForm.AceEditor.properties).forEach(function(key, index) {
        Tracker.autorun(function (e) {
            editor = AceEditor.instance(key, {
                theme: AutoForm.AceEditor.properties[key].theme,
                mode: AutoForm.AceEditor.properties[key].mode
            });
            if (editor.loaded === true) {
                e.stop();
                editor.$blockScrolling = Infinity;
                editor.setValue(AutoForm.AceEditor.properties[key].initialContent, 0);
            }
        });
        $("#" + key).css({
            "height": AutoForm.AceEditor.properties[key].editorHeight,
            "width": AutoForm.AceEditor.properties[key].editorWidth
        });
    });
});

Template.afAceEditor.onDestroyed = function () {
    var editor = AceEditor.instance(AutoForm.AceEditor.currentEditorId);
    if (editor.loaded===true) {
        editor.destroy();
    }
};

