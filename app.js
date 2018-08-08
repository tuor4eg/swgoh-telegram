require('dotenv').config();

const getReadyForPhase = require('./filterSiths.js');
const getCurrentChar = require('./getchars.js');
const arrays = require('./arrays.js');

var TelegramBot = require('node-telegram-bot-api');
var fetch = require('node-fetch');
var token = process.env.TOKEN;
var guildId = process.env.DEFAULT_ID;
var bot = new TelegramBot(token, {polling: true});

const urlParse = `https://swgoh.gg/api/guilds/${guildId}/units/`;

bot.on('message', function (msg) {
    let chatId = msg.chat.id;
    var charName = '';
    const userName = (msg.chat.username) ? ` ${msg.chat.username}` : '';
    console.log(msg);
    switch (true) {
        case (msg.text === '/start'):
            console.log('Greetings');
            bot.sendMessage(chatId, `Oh dear! Master${userName}, it's so good to see you fully functional again.`, {caption: "Hello!"});
            break;
        case (msg.text.includes('/getchar')):
            console.log('Prepare char');
            var charName = msg.text.split(':')[1];
            console.log(charName);
            getCurrentChar.getCurrentChar(urlParse, charName).then(res => bot.sendMessage(chatId, res, {caption: "It's work!"}));
            break;
        case (msg.text === '/getallchars'):
            var charName = 'getallchars';
            console.log('List of chars');
            getCurrentChar.getCurrentChar(urlParse, charName).then(res => bot.sendMessage(chatId, res, {caption: "It's work!"}));
            break;
        case (msg.text === 'guild' || msg.text === '/guild'):
            console.log('My guild');
            const res = `Your guild ID is ${guildId}`;
            bot.sendMessage(chatId, res, {caption: "It's work!"});
            break;
        case(msg.text.includes('/getphase')):
            const parsePhase = Number(msg.text.split(':')[1]);
            if (isNaN(parsePhase)) {
                console.log('Wrong declaration of phase');
                bot.sendMessage(chatId, 'This is not phase you are looking for!', {caption: "You do it wrong!"});
                break;
            }
            const phaseNum = Math.round(parsePhase);
            console.log(phaseNum);
            if (phaseNum < 1 || phaseNum > 4 ) {
                console.log('Wrong number of phase');
                bot.sendMessage(chatId, 'This is not phase you are looking for!', {caption: "You do it wrong!"});
                break;
            }
            console.log('Packs for Phase');
            getReadyForPhase.getReadyForPhase(urlParse, `phase${phaseNum}`).then(res => {
                bot.sendMessage(chatId, res[0], {caption: "It's work!"});
                bot.sendMessage(chatId, res[1], {caption: "It's work!"});
                bot.sendMessage(chatId, `TOTAL READY: ${res[2]}`, {caption: "It's work!"});
            });
            break;
        default:
            console.log('something wrong');
            const genRandom = Math.floor(Math.random() * arrays.replies.length);
            const result = arrays.replies[genRandom];
            bot.sendMessage(chatId, result, {caption: "You do it wrong!"});
            break;
    }
    if (msg.from.username) {
        const readyToWrite = JSON.stringify({ from: msg.from, guild: guildId });
        console.log(JSON.parse(readyToWrite));
    }

});



