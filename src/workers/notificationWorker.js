// src/workers/notificationWorker.js

import Redis from "ioredis";


import {
 prisma
}
from "../infrastructure/database/prismaClient.js";


import NotificationRepositoryMySQL
from "../infrastructure/repositories/NotificationRepositoryMySQL.js";


import RedisStreams
from "../infrastructure/messaging/redis/RedisStreams.js";


import ProcessNotificationUseCase
from "../application/use-cases/ProcessNotificationUseCase.js";


import NotificationProviderFactory
from "../infrastructure/providers/NotificationProviderFactory.js";


const GROUP =
"notification-workers";


const CONSUMER =
`worker-${process.pid}`;



async function start(){


const redis =
new Redis(
 process.env.REDIS_URL
);



const repository =
new NotificationRepositoryMySQL(
 prisma
);



const providerFactory =
new NotificationProviderFactory({

 emailApiKey:
 process.env.EMAIL_API_KEY,

 emailFrom:
 process.env.EMAIL_FROM,

 smsApiKey:
 process.env.SMS_API_KEY

});



const useCase =
new ProcessNotificationUseCase(
 repository,
 providerFactory
);



while(true){


const response =
await redis.xreadgroup(
"GROUP",
GROUP,
CONSUMER,
"BLOCK",
5000,
"COUNT",
1,
"STREAMS",
RedisStreams.NOTIFICATION_CREATED,
">"
);



if(!response)
continue;



const messages =
response[0][1];



for(
const [
id,
fields
]
of messages
){



const payload =
JSON.parse(
 fields[1]
);



try{


await useCase.execute(
 payload.id
);



await redis.xack(
 RedisStreams.NOTIFICATION_CREATED,
 GROUP,
 id
);



}

catch(err){

console.error(
err
);

// niente ACK
// Redis redelivera

}


}



}


}



start();