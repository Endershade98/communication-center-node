// src/domain/value-objects/NotificationStatus.js

import { NotificationCodes }
from "../constants/NotificationCodes.js";


const VALID_STATUSES = Object.freeze([

  "PENDING",
  "PROCESSING",
  "SENT",
  "FAILED",
  "RETRYING",
  "DEAD",

]);


const ALLOWED_TRANSITIONS = Object.freeze({

  PENDING: [
    "PROCESSING"
  ],


  PROCESSING: [
    "SENT",
    "FAILED",
    "RETRYING"
  ],


  FAILED: [
    "RETRYING",
    "DEAD"
  ],


  RETRYING: [
    "PROCESSING"
  ],


  SENT: [],


  DEAD: []

});



export default class NotificationStatus {


  #value;



  constructor(value){


    if(
      !VALID_STATUSES.includes(value)
    ){

      throw new Error(
        `Invalid NotificationStatus: ${value}`
      );

    }


    this.#value =
      value;

  }



  get value(){

    return this.#value;

  }



  get code(){

    return NotificationCodes[
      this.#value
    ];

  }




  canTransitionTo(targetStatus){


    const target =
      targetStatus instanceof NotificationStatus
        ? targetStatus.value
        : targetStatus;



    return ALLOWED_TRANSITIONS[
      this.#value
    ]?.includes(target);


  }




  equals(other){

    return (

      other instanceof NotificationStatus &&
      other.value === this.#value

    );

  }




  static pending(){

    return new NotificationStatus(
      "PENDING"
    );

  }



  static processing(){

    return new NotificationStatus(
      "PROCESSING"
    );

  }



  static sent(){

    return new NotificationStatus(
      "SENT"
    );

  }



  static failed(){

    return new NotificationStatus(
      "FAILED"
    );

  }



  static retrying(){

    return new NotificationStatus(
      "RETRYING"
    );

  }



  static dead(){

    return new NotificationStatus(
      "DEAD"
    );

  }




  static canTransition(from,to){


    const source =
      from instanceof NotificationStatus
        ? from.value
        : from;



    const target =
      to instanceof NotificationStatus
        ? to.value
        : to;



    return (
      ALLOWED_TRANSITIONS[source]
      ?.includes(target)
    );

  }


}