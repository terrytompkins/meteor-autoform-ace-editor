AutoForm.addInputType("ace-editor", {
    template: "afAceEditor",
    valueIn: function (val, atts) {
        // todo: this needs to be wired up to load editor content
        return val;
    },
    valueOut: function () {
        // todo: this needs to be wired to fetch editor content
        return this.getValue();
    }
    // valueConverters: { },
    // contextAdjust: function (context) { return context; }
});

Template.afAceEditor.helpers({
    /* ToDo: these are defaults which should come first from autoform properties for the field */
    editorWidth: function() { return "600px"; },
    editorHeight: function() { return "400px"; },
    headerColor: function() { return "purple"; },
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
            // editor.insert("Initial text here...");
        }
    });
    var selector = AutoForm.AceEditor.properties.editorId;
    $("#" + selector).css({"height": AutoForm.AceEditor.properties.editorHeight, "width": AutoForm.AceEditor.properties.editorWidth});
});

Template.afAceEditor.onDestroyed = function () {
};



