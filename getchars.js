//Module for listing progress of character

const fetch = require('node-fetch');

const getCurrentChar = async (url, char) => {
    const getData = await fetch(url);
    console.log(getData.status);
    const data = await getData.text();
    const dataToJson = JSON.parse(data);
    const getKeys = Object.keys(dataToJson);
    if (!char) {
        return 'Enter character name, please! Format: getchar:CHARNAME'
    }
    if (char === 'getallchars') {
        //Return list of all characters
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

module.exports.getCurrentChar = getCurrentChar;