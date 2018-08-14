//Repository for data

//Packs of characters for phases
const packsForSiths = {
    phase1: [
        'REYJEDITRAINING',
        'REY',
        'R2D2_LEGENDARY',
        'BB8',
        'RESISTANCETROOPER'
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

//Replies for unknown commands to bot
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

  //Message for raids

  const raidMessage = (tankBeginDate, tankEndDate, pitBeginDate, pitEndDate, sithsBeginDate, sithsEndDate) => {
return `👉Расписание рейдов на Август!
  ✅ Все даты могут быть изменены! Следите за расписанием.
  
  🚧🚧🚧 ТАНК
  ✳️  ${tankBeginDate} (отметка на 0)
  
  ${tankEndDate}:
  Фаза 1 только для ДВ - 13:00 МСК.
  
  Фаза 2-4 - 20:00 МСК.
  
  🔺Урон свыше 10% закрывать минимум через 15 минут после начала фазы.
  Режим 1 фаза / 1 пачка.
  👮♀Наказания за нарушения:
  
  
  🐷🐷🐷 РАНКОР
  ✳️ ${pitBeginDate}
  
  🔺Соло закрытие - ${pitEndDate}. в 21.15 по МСК (ЗЕРГ)
  
  👉ДВ бьют ф1 ${pitEndDate} в 12:15 по Мск одновременно, закрывают попытку не раньше 12:30 по Мск. Максимальный перенесенный урон с ф1 на ф2 50к.
  Соответственно, в остальных фазах они не принимают участия.
  Kot @265290259
  Fesko
  Erast
  👉Все остальные начинают бить ${pitEndDate} в 21.00 Если ваш отряд(ы) умирает до 21:05, ваш зафиксированный урон в сумме не должен превышать 500к (16-17%)
  👮♀Наказания за нарушения:
   @vA_Dmi3y пропуск
  
  👹👹👹 СИТХИ
  ✳️ ${sithsBeginDate}
  
  🛑Этап 1 (1-2 фаза) - в 19.00 МСК (1 фаза –Рей, 2 фаза – 3 любых профильных пака)
  
  👉Следующий день (${sithsEndDate})
  🛑Этап 2 (3 фаза) - в 11.00 мск
                    (4 фаза) - в 19.30 мск
  
  👮Наказания за нарушения:`;
  };

  module.exports.raidMessage = raidMessage;
  module.exports.replies = replies;
  module.exports.packsForSiths = packsForSiths;