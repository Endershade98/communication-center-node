// src/infrastructure/providers/email/EmailProvider.js

import NotificationProvider
from "../NotificationProvider.js";


export default class EmailProvider
extends NotificationProvider {


  constructor({
    apiKey,
    from
  }) {

    super();

    this.apiKey = apiKey;
    this.from = from;

  }



  async send(notification) {


    if(!this.apiKey){
      throw new Error(
        "EMAIL_PROVIDER_API_KEY missing"
      );
    }


    console.log(
      "[EMAIL]",
      {
        from:this.from,
        to:notification.recipient,
        message:notification.message
      }
    );


    return {
      success:true
    };

  }

}