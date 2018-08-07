require('dotenv').config();

var TelegramBot = require('node-telegram-bot-api');
var fetch = require('node-fetch');
var token = process.env.TOKEN;
var guildId = process.env.DEFAULT_ID;
var bot = new TelegramBot(token, {polling: true});

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
        case (msg.text.includes('getchar')):
            console.log('Prepare char');
            var charName = msg.text.split(':')[1];
            console.log(charName);
            parceSwgoh(urlParse, charName).then(res => bot.sendMessage(chatId, res, {caption: "It's work!"}));
            break;
        case (msg.text === '/getallchars'):
            var charName = 'getallchars';
            console.log('List of chars');
            parceSwgoh(urlParse, charName).then(res => bot.sendMessage(chatId, res, {caption: "It's work!"}));
            break;
        case (msg.text === '/guild'):
            console.log('My guild');
            const res = `Your guild ID is ${guildId}`;
            bot.sendMessage(chatId, res, {caption: "It's work!"});
            break;
        default:
            console.log('something wrong');
            const genRandom = Math.floor(Math.random() * replies.length);
            const result = replies[genRandom];
            bot.sendMessage(chatId, result, {caption: "You do it wrong!"});
            break;
    }
});

const urlParse = `https://swgoh.gg/api/guilds/${guildId}/units/`;

const parceSwgoh = async (url, char) => {
    const getData = await fetch(urlParse);
    console.log(getData.status);
    const data = await getData.text();
    const dataToJson = JSON.parse(data);
    const getKeys = Object.keys(dataToJson);
    if (!char) {
        return 'Enter character name, please! Format: getchar:CHARNAME'
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
        console.log('Character is ready');
        return makeView.join('\n');
    }
  };

  const replies = [
    "Sorry, Master, I know languages of 6,000,000 life forms but I don't understand you! Please try again.",
    "I have a bad felling about this...",
    "It's a trap!",
    "Help me, Obi-Wan Kenobi. You’re my only hope.",
    "I find your lack of faith disturbing.",
    "Do. Or do not. There is no try.",
    "Pew-pew-pew",
    "I’m one with the Force. The Force is with me.",
    "May the force be with you.",
    "Use the force, Luke.",
    "Fear is the path to the dark side.",
    "It was said that you would destroy the Sith, not join them."
  ];