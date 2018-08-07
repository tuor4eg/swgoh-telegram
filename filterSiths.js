require('dotenv').config();

var fetch = require('node-fetch');
var guildId = process.env.DEFAULT_ID;

const getReadyForPhase = async (url) => {
    const getData = await fetch(urlParse);
    console.log(getData.status);
    const data = await getData.text();
    const dataToJson = JSON.parse(data);
    const array = ['REYJEDITRAINING'];
    const findFullPack = array.map(element => {
        const getPlayers = dataToJson[element].map(entry => {
            if (entry['rarity'] === 7) {
                const { player, gear_level } = entry;
                return { [player]: { [element]: gear_level } };
            }
            return;
            console.log(entry);
        });
        console.log(getPlayers);
    });
  };

  const urlParse = `https://swgoh.gg/api/guilds/${guildId}/units/`;

  const packsForSiths = {
    phase1: [
        'REYJEDITRAINING',
        'R2D2_LEGENDARY',
        'BB8',
        'RESISTANCETROOPER',
        'REY'
    ],
    phase2: [
        'VEERS',
        'COLONELSTARCK',
        'SNOWTROOPER',
        'MAGMATROOPER',
        'SHORETROOPER',
        'STORMTROOPER',
        'GRANDADMIRALTHRAWN'
    ],
    phase3: [
        'COMMANDERLUKESKYWALKER',
        'HANSOLO',
        'PAO',
        'DEATHTROOPER',
        'CHIRRUTIMWE'
    ],
    phase4: [
        'ASAJVENTRESS',
        'DAKA',
        'MOTHERTALZIN',
        'NIGHTSISTERZOMBIE',
        'TALIA',
        'NIGHTSISTERINITIATE',
        'NIGHTSISTERACOLYTE'
    ]
};

getReadyForPhase(urlParse);
