// src/application/use-cases/RecoverProcessingNotificationUseCase.js


export default class RecoverProcessingNotificationUseCase {


constructor(repository, eventPublisher){

 this.repository = repository;
 this.eventPublisher = eventPublisher;

}



async execute(){


 const notifications =
 await this.repository.findProcessingNotifications();



 const recovered = [];



 for(const notification of notifications){


   const updated =
   notification.retry();



   await this.repository.update(
     updated
   );


   recovered.push(updated);


 }



 return recovered;


}


}