// src/application/use-cases/RecoverProcessingNotificationUseCase.js

export default class RecoverProcessingNotificationUseCase {


constructor(repository){
 this.repository = repository;
}



async execute(id){

 const notification =
 await this.repository.findById(id);


 if(!notification){
   return null;
 }


 if(
 notification.status.value !== "PROCESSING"
 ){
   return notification;
 }



 const recovered =
 notification.markAsPending();


 await this.repository.update(
   recovered
 );


 return recovered;

}


}