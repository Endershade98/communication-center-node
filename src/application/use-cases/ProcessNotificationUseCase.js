// src/application/use-cases/ProcessNotificationUseCase.js

import NotificationDomainService
from "../../domain/services/NotificationDomainService.js";


export default class ProcessNotificationUseCase {


constructor(
 repository,
 providerFactory
){

this.repository =
repository;


this.providerFactory =
providerFactory;


this.domain =
new NotificationDomainService();


}



async execute(id){



let notification =
await this.repository.findById(id);



if(!notification){
 throw new Error(
  "Notification not found"
 );
}



// idempotenza

if(
 notification.status.value==="SENT" ||
 notification.status.value==="FAILED" ||
 notification.status.value==="DEAD"
){

return notification;

}




notification =
this.domain.process(
 notification
);



await this.repository.update(
 notification
);



try{


const provider =
this.providerFactory.get(
 notification.channel.value
);



await provider.send(
 notification
);



notification =
this.domain.sent(
 notification
);



}

catch(error){


notification =
this.domain.failed(
 notification,
 error.message
);


}



await this.repository.update(
 notification
);



return notification;


}



}