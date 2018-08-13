//main module to rule the bot

require('dotenv').config();

//Importing other modules
const getReadyForPhase = require('./filterSiths.js');
const getCurrentChar = require('./getchars.js');
const arrays = require('./arrays.js');
const fs = require('fs');

const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const guildId = process.env.DEFAULT_ID;
const bot = new TelegramBot(token, {polling: true});

const urlParse = `https://swgoh.gg/api/guilds/${guildId}/units/`;

//bot's commands
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
        case (msg.text === '/guild'):
            console.log('My guild');
            const res = `Your guild ID is ${guildId}`;
            bot.sendMessage(chatId, res, {caption: "It's work!"});
            break;
        case(msg.text.includes('/getphase')):
        //Validate phase number
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
        //Admin's section
        case(msg.text === '/penaltieslist' && msg.from.username === 'vA_Tuor4eg'):
            const getPeenalties = fs.readFileSync('/tmp/penalties.txt').toString();
            console.log('List of penalties is prepared.')
            const penaltiesMessage = (getPeenalties !== '') ? getPeenalties : 'Excellent news, Master! There is no penalties for now!';
            bot.sendMessage(chatId, penaltiesMessage, {caption: "It's work!"});
            break;
        case(msg.text === '/clearpenalties' && msg.from.username === 'vA_Tuor4eg'):
            fs.writeFile('/tmp/penalties.txt', '', () => {
                console.log('List is clear');
                bot.sendMessage(chatId, 'List is clear', {caption: "It's work!"});
            });
            break;
        case(msg.text.includes('/set') && msg.from.username === 'vA_Tuor4eg'):
            const [command, user, raid] = msg.text.split(':');
            console.log(user, raid);
            const writeRes = `${user}: ${raid}\n`;
            fs.appendFile('/tmp/penalties.txt',  writeRes, (err) => {
                if (err) throw err;
                console.log(writeRes);
                console.log('The penalties list has been udated!');
                bot.sendMessage(chatId, 'Update list', {caption: "It's work!"});
              });
            break;
        //End of admin's section
        case(msg.text === '/history'):
            const getChangelog = fs.readFileSync('./changelog.txt').toString();
            console.log('Changelog is prepared.')
            bot.sendMessage(chatId, getChangelog, {caption: "It's work!"});
            break;
        case(msg.text === '/version'):
            const getVersion = fs.readFileSync('./version.txt').toString();
            console.log('Version of bot')
            bot.sendMessage(chatId, `The current version is ${getVersion}.`, {caption: "It's work!"});
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



