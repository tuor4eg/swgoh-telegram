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
    const filterWhoReady = {};
    for (const record in findFullPack) {
        if (Object.keys(findFullPack[record]).length >= 5) {
            filterWhoReady[record] = findFullPack[record];
        }
    }
    const totalReady = Object.keys(filterWhoReady).length;
    console.log(totalReady);
    const makeViewSets = Object.keys(filterWhoReady).map(element => {
            const makePlayer = `${element}: `;
            const makeSet = Object.keys(filterWhoReady[element]).map(char => `${char}: ${filterWhoReady[element][char]}`).join(', ');
            return [makePlayer, makeSet].join('\n');
    });
    const page1 = makeViewSets.slice(0, makeViewSets.length / 2).join('\n');
    const page2 = makeViewSets.slice((makeViewSets.length / 2) + 1).join('\n');
    return [page1, page2, totalReady];
  };

  const urlParse = `https://swgoh.gg/api/guilds/${guildId}/units/`;

module.exports.getReadyForPhase = getReadyForPhase;