// tests/unit/application/ProcessNotificationUseCase.test.js

// tests/unit/application/ProcessNotificationUseCase.test.js

import ProcessNotificationUseCase
from "../../../src/application/use-cases/ProcessNotificationUseCase.js";

import Notification
from "../../../src/domain/entities/Notification.js";


class FakeRepository {

  constructor(notification) {
    this.notification = notification;
  }


  async findById() {
    return this.notification;
  }


  async update(notification) {
    this.notification = notification;
    return notification;
  }

}



class FakeProvider {

  constructor() {
    this.calls = [];
    this.shouldFail = false;
  }


  async send(notification) {

    this.calls.push(notification);

    if(this.shouldFail){
      throw new Error("PROVIDER_DOWN");
    }

    return {
      success:true
    };

  }

}



describe(
"ProcessNotificationUseCase",
()=>{


test(
"should process notification and mark SENT",
async()=>{


const notification =
Notification.create({

 id:"1",

 recipient:
 "test@test.com",

 message:
 "hello",

 channel:
 "EMAIL",

 priority:
 "HIGH"

});



const repo =
new FakeRepository(
 notification
);



const provider =
new FakeProvider();



const factory = {

 get(){
   return provider;
 }

};



const useCase =
new ProcessNotificationUseCase(
 repo,
 factory
);



const result =
await useCase.execute("1");



expect(
 result.status.value
)
.toBe(
 "SENT"
);



expect(
 provider.calls.length
)
.toBe(1);



});





test(
"should mark FAILED when provider throws",
async()=>{


const notification =
Notification.create({

 id:"2",

 recipient:
 "fail@test.com",

 message:
 "boom",

 channel:
 "EMAIL",

 priority:
 "HIGH"

});



const repo =
new FakeRepository(
 notification
);



const provider =
new FakeProvider();

provider.shouldFail = true;



const factory = {

 get(){
   return provider;
 }

};



const useCase =
new ProcessNotificationUseCase(
 repo,
 factory
);



const result =
await useCase.execute("2");



expect(
 result.status.value
)
.toBe(
 "FAILED"
);



expect(
 result.lastError
)
.toBe(
 "PROVIDER_DOWN"
);



});





test(
"should throw when notification does not exist",
async()=>{


const repo =
new FakeRepository(null);



const useCase =
new ProcessNotificationUseCase(
 repo,
 {
  get(){
    return new FakeProvider();
  }
 }
);



await expect(
 useCase.execute("missing")
)
.rejects
.toThrow(
 "Notification not found"
);



});





test(
"should be idempotent when already SENT",
async()=>{


const notification =
Notification.create({

 id:"3",

 recipient:
 "sent@test.com",

 message:
 "ok",

 channel:
 "EMAIL",

 priority:
 "HIGH"

})
.markAsProcessing()
.markAsSent();



const repo =
new FakeRepository(
 notification
);



const provider =
new FakeProvider();



const useCase =
new ProcessNotificationUseCase(
 repo,
 {
  get(){
    return provider;
  }
 }
);



const result =
await useCase.execute("3");



expect(
 result.status.value
)
.toBe(
 "SENT"
);



expect(
 provider.calls.length
)
.toBe(0);



});



});