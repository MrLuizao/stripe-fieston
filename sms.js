const twilio = require('twilio');
const process = require('./process')

const accountSid = process.SID;
const authToken = process.AUTH;

const client = new twilio(accountSid, authToken);

const createSMS = (phone_sms) => {
    client.messages.create( {
        body: '¡Contrataron tus servicios! Revisa tu app FiestOn para conocer los detalles',
        to: `+52${phone_sms}`,
        from: '+17262042552'
    }).then( (message)=> console.log(message.sid));
}

exports.sendSMS = (phone_sms) => createSMS(phone_sms);