// tests/unit/application/RetryNotification.test.js

// tests/unit/application/RetryNotification.test.js


import RetryNotification
from "../../../src/application/use-cases/RetryNotification.js";


import Notification
from "../../../src/domain/entities/Notification.js";



class FakeRepository {


constructor(notification){

 this.notification =
 notification;

}



async findById(){

 return this.notification;

}



async update(notification){

 this.notification =
 notification;

 return notification;

}


}



class FakePublisher {


constructor(){

 this.events=[];

}



async publish(stream,payload){

 this.events.push({
  stream,
  payload
 });

}


}



describe(
"RetryNotification",
()=>{



test(
"should move FAILED notification to RETRYING",
async()=>{


const notification =
Notification.create({

 id:"1",

 recipient:
 "retry@test.com",

 message:
 "fail",

 channel:
 "EMAIL",

 priority:
 "HIGH"

})
.markAsProcessing()
.markAsFailed(
 "SMTP_DOWN"
);



const repo =
new FakeRepository(
 notification
);



const publisher =
new FakePublisher();



const useCase =
new RetryNotification(
 repo,
 publisher
);



const result =
await useCase.execute(
 "1"
);



expect(
 result.status.value
)
.toBe(
 "RETRYING"
);



expect(
 publisher.events.length
)
.toBe(1);



});







test(
"should throw if notification missing",
async()=>{


const useCase =
new RetryNotification(
 new FakeRepository(null),
 new FakePublisher()
);



await expect(
 useCase.execute("404")
)
.rejects
.toThrow(
 "Notification not found"
);



});



});