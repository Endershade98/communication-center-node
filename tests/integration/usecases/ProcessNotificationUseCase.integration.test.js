// tests/integration/usecases/ProcessNotificationUseCase.integration.test.js

// tests/integration/usecases/ProcessNotificationUseCase.integration.test.js


import ProcessNotificationUseCase
from "../../../src/application/use-cases/ProcessNotificationUseCase.js";


import NotificationRepositoryMySQL
from "../../../src/infrastructure/repositories/NotificationRepositoryMySQL.js";


import Notification
from "../../../src/domain/entities/Notification.js";


import { prismaTest }
from "../../setup/prismaTestClient.js";


import { truncateAll }
from "../../setup/dbCleanup.js";



class FakeProvider {


constructor(){

 this.fail=false;
 this.calls=[];

}



async send(notification){

 this.calls.push(notification);


 if(this.fail){
   throw new Error(
    "PROVIDER_DOWN"
   );
 }


 return {
  success:true
 };

}

}



describe(
"ProcessNotificationUseCase integration",
()=>{


afterEach(async()=>{

 await truncateAll(
  prismaTest
 );

});





test(
"should persist SENT status",
async()=>{


const repo =
new NotificationRepositoryMySQL(
 prismaTest
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



await repo.save(

 Notification.create({

  id:"integration-1",

  recipient:
  "test@test.com",

  message:
  "hello",

  channel:
  "EMAIL",

  priority:
  "HIGH"

 })

);



const result =
await useCase.execute(
 "integration-1"
);



expect(
 result.status.value
)
.toBe(
 "SENT"
);



const saved =
await repo.findById(
 "integration-1"
);



expect(
 saved.status.value
)
.toBe(
 "SENT"
);



});







test(
"should persist FAILED status",
async()=>{


const repo =
new NotificationRepositoryMySQL(
 prismaTest
);



const provider =
new FakeProvider();


provider.fail=true;



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



await repo.save(

 Notification.create({

  id:"integration-2",

  recipient:
  "fail@test.com",

  message:
  "boom",

  channel:
  "EMAIL",

  priority:
  "HIGH"

 })

);



const result =
await useCase.execute(
 "integration-2"
);



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



});