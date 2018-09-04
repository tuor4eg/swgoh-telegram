//main module to rule the bot

require('dotenv').config();

//Importing other modules
const getReadyForPhase = require('./filterSiths.js');
const getCurrentChar = require('./getchars.js');
const arrays = require('./arrays.js');
const fs = require('fs');

const TelegramBot = require('node-telegram-bot-api');
const agent = require('socks5-https-client/lib/Agent');
const token = process.env.TOKEN;
const guildId = process.env.DEFAULT_ID;
const bot = new TelegramBot(token, {
    polling: true,
    request: {
        agentClass: agent,
		agentOptions: {
			socksHost: process.env.PROXY_SOCKS5_HOST,
			socksPort: parseInt(process.env.PROXY_SOCKS5_PORT),
			// If authorization is needed:
			socksUsername: process.env.PROXY_SOCKS5_USERNAME,
			socksPassword: process.env.PROXY_SOCKS5_PASSWORD
		}
      }
});

const urlParse = `https://swgoh.gg/api/guilds/${guildId}/units/`;
const firtsDate = new Date(2018, 7, 13);
const beginBank = []

//bot's commands
bot.on('message', function (msg) {
    const readyToWrite = JSON.stringify({ [msg.chat.id]: msg });
    var chatId = msg.chat.id;
    var charName = '';
    var message = msg.text;
    const userName = (msg.chat.username) ? ` ${msg.chat.username}` : '';
    console.log(msg);
    const getLogs = fs.readFileSync('/tmp/logs.txt').toString();
    var parseLog = {};
    if (getLogs) {
        var parseLog = JSON.parse(getLogs);
        const prevCommand = parseLog[msg.chat.id].text;
        var message = `${prevCommand}:${message}`;
    }
    switch (true) {
        case (message === '/start'):
            console.log('Greetings');
            bot.sendMessage(chatId, `Oh dear! Master${userName}, it's so good to see you fully functional again.`, {caption: "Hello!"});
            break;
        case (message.includes('/getchar')):
            var charName = message.split(':')[1];
            if (!charName) {
                fs.appendFile('/tmp/logs.txt',  `${readyToWrite}\n`, (err) => {
                    if (err) throw err;
                    console.log('Log has been updated');
                    bot.sendMessage(chatId, 'Enter character\'s name please!', {caption: "Hello!"});
                });
                break;
            }
            console.log('Prepare char');
            console.log(charName);
            getCurrentChar.getCurrentChar(urlParse, charName).then(res => {
                bot.sendMessage(chatId, res, {caption: "It's work!"});
                fs.writeFile('/tmp/logs.txt', '', () => {
                    console.log('Log is clear');
                    const newLog = Object.keys(parseLog).reduce((acc, element) => {
                        if (element != chatId) {
                            return { ...acc, [element]: parseLog[element] };
                        }
                        return { ...acc }
                    }, {});
                    const prepareLog = (Object.keys(newLog).length === 0) ? '' : JSON.stringify(newLog);
                    fs.appendFile('/tmp/logs.txt', prepareLog, (err) => {
                        if (err) throw err;
                        console.log('Log has been updated');
                    });
                });
            });
            break;
        case (message === '/getallchars'):
            var charName = 'getallchars';
            console.log('List of chars');
            getCurrentChar.getCurrentChar(urlParse, charName).then(res => bot.sendMessage(chatId, res, {caption: "It's work!"}));
            break;
        case (message === '/guild'):
            console.log('My guild');
            const res = `Your guild ID is ${guildId}`;
            bot.sendMessage(chatId, res, {caption: "It's work!"});
            break;
        case(message.includes('/getphase')):
        //Validate phase number
            const parsePhase = Number(message.split(':')[1]);
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
        case(message === '/penaltieslist' && msg.from.username === 'vA_Tuor4eg'):
            const getPeenalties = fs.readFileSync('/tmp/penalties.txt').toString();
            console.log('List of penalties is prepared.')
            const penaltiesMessage = (getPeenalties !== '') ? getPeenalties : 'Excellent news, Master! There is no penalties for now!';
            bot.sendMessage(chatId, penaltiesMessage, {caption: "It's work!"});
            break;
        case(message === '/clearpenalties' && msg.from.username === 'vA_Tuor4eg'):
            fs.writeFile('/tmp/penalties.txt', '', () => {
                console.log('List is clear');
                bot.sendMessage(chatId, 'List is clear', {caption: "It's work!"});
            });
            break;
        case(message.includes('/set') && msg.from.username === 'vA_Tuor4eg'):
            const [command, user, raid] = message.split(':');
            console.log(user, raid);
            const writeRes = `${user}: ${raid}\n`;
            fs.appendFile('/tmp/penalties.txt',  writeRes, (err) => {
                if (err) throw err;
                console.log(writeRes);
                console.log('The penalties list has been updated!');
                bot.sendMessage(chatId, 'Update list', {caption: "It's work!"});
              });
            break;
        case(message === '/makemsg' && msg.from.username === 'vA_Tuor4eg'):
            const currentDate = new Date();
            console.log(firtsDate, currentDate);
            bot.sendMessage(chatId, arrays.raidMessage('14 августа', '15 августа'), {caption: "It's work!"});
            break;
        //End of admin's section
        case(message === '/history'):
            const getChangelog = fs.readFileSync('./changelog.txt').toString();
            console.log('Changelog is prepared.')
            bot.sendMessage(chatId, getChangelog, {caption: "It's work!"});
            break;
        case(message === '/version'):
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
        console.log(JSON.parse(readyToWrite));
    }

});



