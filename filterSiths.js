//Module to calculate user who are ready for every phase

require('dotenv').config();

const fetch = require('node-fetch');

const arrays = require('./arrays.js');

var guildId = process.env.DEFAULT_ID;

const getReadyForPhase = async (url, phase) => {
    const getData = await fetch(urlParse);
    console.log(getData.status);
    const data = await getData.text();
    const dataToJson = JSON.parse(data);
    const arrayPhase = arrays.packsForSiths[phase];
    //Filter data to select only 7-stars characters in phase's array and sort by user
    const findFullPack = arrayPhase.reduce((acc, element) => {
        const getPlayers = dataToJson[element].reduce((counter, entry) => {
            if (entry['rarity'] === 7) {
                const { player, gear_level } = entry;
                const findPlayer = Object.keys(acc).filter(user => user === entry['player']);
                if (findPlayer.length === 0) {
                    return { ...counter, [player]: { [element]: gear_level } };
                }
                counter[player] = {...acc[player], [element]: gear_level };
                return counter;
            }
            return counter;
        }, acc);
        return getPlayers;
    }, {});
    //Filter result to select users with mininum 5 characters in pack.
    const filterWhoReady = {};
    for (const record in findFullPack) {
        if (Object.keys(findFullPack[record]).length >= 5) {
            filterWhoReady[record] = findFullPack[record];
        }
    }
    const totalReady = Object.keys(filterWhoReady).length;
    console.log(totalReady);
    //Change view to print for bot's user.
    const makeViewSets = Object.keys(filterWhoReady).map(element => {
            const makePlayer = `${element}: `;
            const makeSet = Object.keys(filterWhoReady[element]).map(char => `${char}: ${filterWhoReady[element][char]}`).join(', ');
            return [makePlayer, makeSet].join('\n');
    });
    //Paging result to reduce size of data
    const page1 = makeViewSets.slice(0, makeViewSets.length / 2).join('\n');
    const page2 = makeViewSets.slice((makeViewSets.length / 2) + 1).join('\n');
    return [page1, page2, totalReady];
  };

module.exports.getReadyForPhase = getReadyForPhase;