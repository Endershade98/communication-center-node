// src/infrastructure/providers/sms/SmsProvider.js

import NotificationProvider
from "../NotificationProvider.js";


export default class SmsProvider
extends NotificationProvider {


 constructor(config){
   super();
   this.config=config;
 }



 async send(notification){


   if(!this.config.apiKey){
     throw new Error(
       "SMS provider missing config"
     );
   }


   console.log(
    "[SMS]",
    notification.recipient,
    notification.message
   );


   return {
     success:true
   };

 }


}