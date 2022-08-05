const twilio = require ('twilio');

const accountSid = 'AC2715a13a44593c4c83c9f904721ccb51';
const authToken = '58e24ffdeac632d15832d296b7d626f2';

const client = new twilio(accountSid, authToken);

const createSMS = () => {
    client.messages.create( {
        body: '¡Contrataron tus servicios! Revisa tu app FiestOn para conocer los detalles',
        to: '+525513666143',
        from: '+19702933035'
    }).then( (message)=> console.log(message.sid));
}

exports.sendSMS = () => createSMS();