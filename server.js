//Installing whatsapp-web.js:
// $ npm install whatsapp-web.js

// or

// $ yarn add whatsapp-web.js


// //Installing qr-code-terminal:
// $ npm install qr-code-terminal

// or

// $ yarn add qr-code-terminal


//Create a file called app.js in the project and paste this code into it.
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const client = new Client();

client.initialize();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});


//Then, on the terminal or command prompt, type this command.
//$ node app




//The goal of creating a bot is for it to be able to respond to messages. So, in the project that we created before, paste the following code.
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const client = new Client();

client.initialize();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', (message) => {
  if (message.body === 'hello') {
    message.reply('Hiiiii');
  }
});


//Here is the code to create authentication :
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.initialize();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
  console.log('AUTHENTICATED');
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', (message) => {
  if (message.body === 'hello') {
    message.reply('Hiiiii');
  }
});


//Here is the code to make bot replying with media:
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.initialize();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
  console.log('AUTHENTICATED');
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async (message) => {
  if (message.body === 'meme') {
    //get media from url
    const media = await MessageMedia.fromUrl(
      'https://user-images.githubusercontent.com/41937681/162612030-11575069-33c2-4df2-ab1b-3fb3cb06f4cf.png'
    );

    //replying with media
    client.sendMessage(message.from, media, {
      caption: 'meme',
    });
  }
});


//An extra library called Axios is required for the WhatsApp bot to be able to send requests to the Yu-Gi-Oh! API:
//$ npm install axios




//Here is the complete code of the Yu-Gi-Oh! bot:
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const axios = require('axios');

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.initialize();

client.on('qr', (qr) => {
  console.log('QR RECEIVED', qr);
});

client.on('authenticated', () => {
  console.log('AUTHENTICATED');
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async (msg) => {
  if (msg.body) {
    axios
      .get(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(
          msg.body
        )}`
      )
      .then(async (res) => {
        if (res.data.error) {
          msg.reply('No card matching your query was found in the database.');
        } else {
          const media = await MessageMedia.fromUrl(
            res.data.data[0].card_images[0].image_url
          );
          client.sendMessage(msg.from, media, {
            caption: `Name : ${res.data.data[0].name}\nType : ${res.data.data[0].type}\nDesc : ${res.data.data[0].desc}
            `,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

