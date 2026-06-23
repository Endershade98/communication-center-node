// src/infrastructure/providers/push/PushProvider.js

import NotificationProvider
from "../NotificationProvider.js";


export default class PushProvider
extends NotificationProvider {


 constructor(config){
   super();
   this.config=config;
 }


 async send(notification){


   console.log(
    "[PUSH]",
    notification.recipient
   );


   return {
    success:true
   };

 }

}