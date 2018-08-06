require('dotenv').config();

var TelegramBot = require('node-telegram-bot-api');
var fetch = require('node-fetch');
var token = process.env.TOKEN;
var bot = new TelegramBot(token, {polling: true});

bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    console.log(msg);
    if (msg.text.includes('getchar')) {
        console.log('Prepare char');
        const charName = msg.text.split(':')[1];
        console.log(charName);
        parceSwgoh(urlParse, charName).then(res => bot.sendMessage(chatId, res, {caption: "It's work!"}));
        return;
    }
    if (msg.text === '/getallchars') {
        const charName = 'getallchars';
        console.log('List of chars');
        parceSwgoh(urlParse, charName).then(res => bot.sendMessage(chatId, res, {caption: "It's work!"}));
        return;
    }
    else {
        console.log('something wrong');
        bot.sendMessage(chatId, "Sorry, Master, I know languages of 6,000,000 life forms but didn't understand you! Please try again.", {caption: "You do in wrong!"});
    }
});

const urlParse = 'https://swgoh.gg/api/guilds/14744/units/';

const parceSwgoh = async (url, char) => {
    const getData = await fetch(urlParse);
    console.log(getData.status);
    const data = await getData.text();
    const dataToJson = JSON.parse(data);
    const getKeys = Object.keys(dataToJson);
    if (!char) {
        return 'Enter character name, please!'
    }
    if (char === 'getallchars') {
        return getKeys.join('\n');
    }
    else {
        const findChar = getKeys.filter(element => element === char);
        if (findChar.length === 0) {
            return 'No characters found!'
        }
        const currentChar = dataToJson[findChar];
        const makeView = currentChar.map(element => {
            const { player, gear_level, level, rarity } = element;
            return [`Player: ${player}`, ` stars: ${rarity} `, ` gear level: ${gear_level}`];
        });
        console.log('Char ready');
        return makeView.join('\n');
    }
  };