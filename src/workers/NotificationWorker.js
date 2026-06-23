// src/workers/NotificationWorker.js

import Redis from "ioredis";

import { RedisStreams }
from "../infrastructure/messaging/redis/RedisStreams.js";


export default class NotificationWorker {


constructor({
  redis,
  group,
  consumer,
  processNotificationUseCase
}) {

  this.redis = redis;

  this.group = group;

  this.consumer = consumer;

  this.useCase =
    processNotificationUseCase;

  this.running = false;

}



async start(){


this.running = true;


console.log(
 `[WORKER] started ${this.consumer}`
);



while(this.running){


 const response =
 await this.redis.xreadgroup(
   "GROUP",
   this.group,
   this.consumer,
   "BLOCK",
   5000,
   "COUNT",
   1,
   "STREAMS",
   RedisStreams.NOTIFICATION_CREATED,
   ">"
 );


 if(!response){
   continue;
 }



 const messages =
 response[0][1];



 for(
 const [
   messageId,
   fields
 ]
 of messages
 ){


   const payload =
   JSON.parse(
     fields[1]
   );



   try{


     await this.useCase.execute(
       payload.id
     );



     await this.redis.xack(
       RedisStreams.NOTIFICATION_CREATED,
       this.group,
       messageId
     );


     console.log(
       `[WORKER] processed ${payload.id}`
     );



   }
   catch(error){


     console.error(
       "[WORKER ERROR]",
       error.message
     );


     // niente ACK
     // redis farà retry


   }


 }


}


}



async stop(){

 this.running=false;

 await this.redis.quit();

}



}