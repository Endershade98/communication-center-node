// tests/unit/domain/NotificationRetryScheduled.test.js

// tests/unit/domain/NotificationRetryScheduled.test.js


import NotificationRetryScheduled
from "../../../src/domain/events/NotificationRetryScheduled.js";



describe(
"NotificationRetryScheduled",
()=>{



test(
"should expose stream",
()=>{


const event =
new NotificationRetryScheduled(
 "123"
);



expect(
 event.stream
)
.toBe(
 "notifications:retry"
);



});





test(
"should serialize correctly",
()=>{


const event =
new NotificationRetryScheduled(
 "123"
);



const json =
event.toJSON();



expect(
 json.notificationId
)
.toBe(
 "123"
);



expect(
 json.eventCode
)
.toBeDefined();



expect(
 json.occurredAt
)
.toBeDefined();



});





test(
"should throw without id",
()=>{


expect(
 ()=>new NotificationRetryScheduled()
)
.toThrow();



});



});