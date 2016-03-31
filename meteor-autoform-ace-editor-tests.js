// ToDo: Write unit tests here
if (Meteor.isServer) {
    Meteor.methods({
        'test/method': function() {
            return true;
        }
    });
}

if (Meteor.isClient) {
    testAsyncMulti("meteor-autoform-ace-editor - Test Method", [
        function(test, expect) {
            Meteor.call('test/method', expect(function(err, res) {
                test.isTrue(res);
            }));
        }
    ]);
}
