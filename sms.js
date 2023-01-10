const twilio = require('twilio');
const process = require('./process')

const accountSid = process.SID;
const authToken = process.AUTH;

const client = new twilio(accountSid, authToken);

const createSMS = () => {
    client.messages.create( {
        body: '¡Contrataron tus servicios! Revisa tu app FiestOn para conocer los detalles',
        to: '+525513666143',
        // from: '+19702933035'
        from: '+17262042552'
        
    }).then( (message)=> console.log(message.sid));
}

exports.sendSMS = () => createSMS();