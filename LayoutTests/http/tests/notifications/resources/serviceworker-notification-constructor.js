importScripts('../../serviceworker/resources/worker-testharness.js');
importScripts('../../resources/testharness-helpers.js');

test(function() {
    assert_true('Notification' in self);

    assert_throws({ name: 'TypeError' }, function() {
        new Notification();
    });

}, 'Constructing a Notification object in a Service Worker throws.');
