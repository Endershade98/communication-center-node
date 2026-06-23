// src/infrastructure/providers/NotificationProviderFactory.js

import EmailProvider
from "./email/EmailProvider.js";

import SmsProvider
from "./sms/SmsProvider.js";

import PushProvider
from "./push/PushProvider.js";


export default class NotificationProviderFactory {


 constructor(config={}) {


 this.providers={


 EMAIL:
 new EmailProvider({
   apiKey:
   config.emailApiKey,
   from:
   config.emailFrom
 }),


 SMS:
 new SmsProvider({
   apiKey:
   config.smsApiKey
 }),


 PUSH:
 new PushProvider({
   key:
   config.pushKey
 })


 };


 }



 get(channel){


 const provider =
 this.providers[channel];


 if(!provider){
   throw new Error(
    `Provider ${channel} not found`
   );
 }


 return provider;


 }


}