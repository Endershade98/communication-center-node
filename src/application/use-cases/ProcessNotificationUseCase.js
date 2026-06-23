// src/application/use-cases/ProcessNotificationUseCase.js


import NotificationDomainService
from "../../domain/services/NotificationDomainService.js";

import DomainEventDispatcher
from "../services/DomainEventDispatcher.js";


export default class ProcessNotificationUseCase {


constructor(
  repository,
  providerFactory,
  eventPublisher
){

  this.repository =
    repository;


  this.providerFactory =
    providerFactory;


  this.domain =
    new NotificationDomainService();


  this.dispatcher =
    new DomainEventDispatcher(
      eventPublisher
    );

}



async execute(id){


  if(!id){
    throw new Error(
      "id is required"
    );
  }



  let notification =
    await this.repository.findById(id);



  if(!notification){

    throw new Error(
      "Notification not found"
    );

  }



  /*
    IDEMPOTENZA

    stati terminali:
    non processiamo più
  */

  if(
    notification.status.value === "SENT" ||
    notification.status.value === "FAILED" ||
    notification.status.value === "DEAD"
  ){

    return notification;

  }



  /*
    stato PROCESSING già preso
    da un altro worker

    evitiamo doppio invio
  */

  if(
    notification.status.value === "PROCESSING"
  ){

    return notification;

  }



  /*
    PENDING -> PROCESSING

    checkpoint persistente
  */

  notification =
    this.domain.process(
      notification
    );


  await this.repository.update(
    notification
  );


  await this.dispatcher.dispatch(
    notification.domainEvents
  );


  notification.clearEvents();



  try {



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



  await this.dispatcher.dispatch(
    notification.domainEvents
  );


  notification.clearEvents();



  return notification;


}


}