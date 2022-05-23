// Constants for the functions to use

const question = document.getElementById('text-content');
const choices = Array.from(document.querySelectorAll('.option'));
const progressText = document.getElementById('progress-text');
const progressBar = document.getElementById('progress-bar');
const musicToggle = document.getElementById('background-slider');
const soundToggle = document.getElementById('sounds-slider');
const op1Btn = document.getElementById('op1');
const op3Btn = document.getElementById('op3');
const difficulty = document.getElementById('difficulty');
const maxQuestions = 10

//Event listeners for music controls

musicToggle.addEventListener('click', function () {
    toggleMusic();
})

soundToggle.addEventListener('click', function () {
    toggleSound();
})

// Variables for the quiz functions

let level = 0;
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Easy Question Roster

let easyQuestions = [{
        question: 'Who fought at the Battle of Actium in 31BC?',
        choice1: 'Octavian vs Mark Anthony and Cleopatra',
        choice2: 'Julius Caesar and Mark Anthony vs Cleopatra',
        choice3: 'Julius Caesar vs Cleopatra and Mark Antony',
        answer: 1,
        answerText: 'Octavian vs Mark Anthony and Cleopatra'
    },
    {
        question: 'What is the name of the Native American woman who helped the Lewis and Clark Expedition?',
        choice1: 'Zitkala-Sa',
        choice2: 'Sacagawea',
        choice3: 'Pocahontas',
        answer: 2,
        answerText: 'Sacagawea'
    },
    {
        question: 'What was Christopher Columbus looking for when he discovered America?',
        choice1: 'El Dorado',
        choice2: 'Proof of sea monsters',
        choice3: 'Passage to Asia',
        answer: 3,
        answerText: 'Passage to Asia'
    },
    {
        question: "Who was the founder of the Women's Social and Political Union, which was established to fight for women's suffrage in Britain?",
        choice1: 'Emmeline Pankhurst',
        choice2: 'Emily Wilding Davison',
        choice3: 'Constance Bryer',
        answer: 1,
        answerText: 'Emmeline Pankhurst'
    },
    {
        question: 'In what year did the Battle of Hastings take place?',
        choice1: '1036',
        choice2: '1066',
        choice3: '1096',
        answer: 2,
        answerText: '1066'
    },
    {
        question: 'Which two English counties fought against each other in the War of the Roses?',
        choice1: 'Hertfordshire and Bedfordshire',
        choice2: 'Yorkshire and Gloucestershire',
        choice3: 'Yorkshire and Lancashire',
        answer: 3,
        answerText: 'Yorkshire and Lancashire'
    },
    {
        question: 'During the War of the Roses, which other conflict broke out?',
        choice1: 'The One Hundred Years War',
        choice2: 'The Pretenders War',
        choice3: 'The French and Indian War',
        answer: 1,
        answerText: 'The One Hundred Years War'
    },
    {
        question: "During the War of the Roses, what were the colours of the opposing sides' rose emblems?",
        choice1: 'Yellow & Pink',
        choice2: 'Red & White',
        choice3: 'Gold & Blue',
        answer: 2,
        answerText: 'Red & White'
    },
    {
        question: 'Which King is said to have had the last words “A Horse, a horse, my kingdom for a horse”?',
        choice1: 'Richard I',
        choice2: 'Richard II',
        choice3: 'Richard III',
        answer: 3,
        answerText: 'Richard III'
    },
    {
        question: 'How many years did the Hundred Years War last for?',
        choice1: '116 years',
        choice2: '100 years',
        choice3: '84 years',
        answer: 1,
        answerText: '116 years'
    },
    {
        question: "Who is the world's longest-reigning monarch?",
        choice1: 'Bhumibol Adulyadej of Thailand',
        choice2: 'Louis XIV of France',
        choice3: 'Queen Elizabeth II of England',
        answer: 2,
        answerText: 'Louis XIV of France'
    },
    {
        question: "Which was the first of Henry VIII of England's six wives?",
        choice1: 'Catherine Parr',
        choice2: 'Catherine Howard',
        choice3: 'Catherine of Aragon',
        answer: 3,
        answerText: 'Catherine of Aragon'
    },
    {
        question: 'Who was the first President of the United States of America?',
        choice1: 'George Washington',
        choice2: 'John Adams',
        choice3: 'Thomas Jefferson',
        answer: 1,
        answerText: 'George Washington'
    },
    {
        question: 'Who unified the Mongol Steppe and became the first Great Khan of the Mongolian Empire?',
        choice1: 'Kublai Khan',
        choice2: 'Genghis Khan',
        choice3: 'Batu Khan',
        answer: 2,
        answerText: 'Genghis Khan'
    },
    {
        question: 'Who built the citadel of Machu Picchu?',
        choice1: 'The Mayans',
        choice2: 'The Olmecs',
        choice3: 'The Incas',
        answer: 3,
        answerText: 'The Incas'
    },
    {
        question: 'Which African American woman is considered to be "the mother of the civil rights movement" after refusing to give up her bus seat to a white man?',
        choice1: 'Rosa Parks',
        choice2: 'Ella Baker',
        choice3: 'Harriet Tubman',
        answer: 1,
        answerText: 'Rosa Parks'
    },
    {
        question: 'When did Modern Humans first arrive in Australia?',
        choice1: '45,000 years ago',
        choice2: '65,000 years ago',
        choice3: '30,000 years ago',
        answer: 2,
        answerText: '65,000 years ago'
    },
    {
        question: 'The tablet of Ea-nasir, dated to over 4000 years old, is the oldest written example of what?',
        choice1: 'Knock-knock joke',
        choice2: 'Party invitation',
        choice3: 'Customer complaint',
        answer: 3,
        answerText: 'Customer complaint'
    },
    {
        question: 'Who was the last Emperor of Russia?',
        choice1: 'Tsar Nicholas II',
        choice2: 'Tsar Alexander III',
        choice3: 'Tsar Nicholas III',
        answer: 1,
        answerText: 'Tsar Nicholas II'
    },
    {
        question: 'The title "King of Kings" was used first by the ruler of which Empire?',
        choice1: 'Roman',
        choice2: 'Persian',
        choice3: 'Assyrian',
        answer: 2,
        answerText: 'Persian'
    },
    {
        question: 'Which Macedonian king conquered the Persian Empire and is said to have never lost a battle?',
        choice1: 'Alexander the Bold',
        choice2: 'Alexander the Just',
        choice3: 'Alexander the Great',
        answer: 3,
        answerText: 'Alexander the Great'
    },
    {
        question: 'Which Roman city was destoryed during the eruption of Mount Vesuvius in 79CE?',
        choice1: 'Pompeii',
        choice2: 'Napoli',
        choice3: 'Milano',
        answer: 1,
        answerText: 'Pompeii'
    },
    {
        question: 'Who was the first European explorer to discover the Americas?',
        choice1: 'Christopher Columbus',
        choice2: 'Leif Erikson',
        choice3: 'Sir Francis Drake',
        answer: 2,
        answerText: 'Leif Erikson'
    },
    {
        question: 'The Silk Road was a trade route that supplied goods to Europe and the Middle East from where?',
        choice1: 'North America',
        choice2: 'West Africa',
        choice3: 'China',
        answer: 3,
        answerText: 'China'
    },
    {
        question: 'Who is the richest person to ever live?',
        choice1: 'Mansa Musa',
        choice2: 'Carlos Slim',
        choice3: 'Bill Gates',
        answer: 1,
        answerText: 'Mansa Musa'
    },
    {
        question: 'What is the name of the opulent tomb built by the Mughal emperor Shah Jahan for his wife, Mumtaz Mahal?',
        choice1: 'The Humayun Tomb',
        choice2: 'The Taj Mahal',
        choice3: 'The Mariam Tomb',
        answer: 2,
        answerText: 'The Taj Mahal'
    },
    {
        question: 'During which conflict did Kaiser Wilhelm II abdicate the throne?',
        choice1: 'World War Two',
        choice2: 'The Franco-Prussian War',
        choice3: 'World War One',
        answer: 3,
        answerText: 'World War One'
    },
    {
        question: 'The "Triangle Trade" of the Atlantic Ocean is most notorious for the trade of which good?',
        choice1: 'Slaves',
        choice2: 'Coffee',
        choice3: 'Tobacco',
        answer: 1,
        answerText: 'Slaves'
    },
    {
        question: 'Starting in the mid 17th Century, what was the name of the philosophical movement that promoted rationalism and religious toleration amongst it thinkers?',
        choice1: 'The Liberation',
        choice2: 'The Enlightenment',
        choice3: 'The Illumination',
        answer: 2,
        answerText: 'The Enlightenment'
    },
    {
        question: 'When did the global population first reach one billion people?',
        choice1: '1706',
        choice2: '1902',
        choice3: '1804',
        answer: 3,
        answerText: '1804'
    }
]

// Medium Question Roster

let mediumQuestions = [{
        question: 'What is the name of the woman-shaped columns which famously hold up the Erectheion on the Acropolis in Athens?',
        choice1: 'Caryatids',
        choice2: 'Atheneiids',
        choice3: 'Caroliniads',
        answer: 1,
        answerText: 'Caryatids'
    },
    {
        question: 'The Stonewall Riots of 1969 were important for establishing the rights of which community in the United States of America?',
        choice1: 'African Americans',
        choice2: 'LGBTQIA+',
        choice3: 'Mexican immigrants',
        answer: 2,
        answerText: 'LGBTQIA+'
    },
    {
        question: "Who was the founder of the Women's Social and Political Union, which was established to fight for women's suffrage in Britain?",
        choice1: 'Constance Bryer',
        choice2: 'Emily Wilding Davison',
        choice3: 'Emmeline Pankhurst',
        answer: 3,
        answerText: 'Emmeline Pankhurst'
    },
    {
        question: 'In which historical period did Leonardo da Vinci live?',
        choice1: 'The Renaissance',
        choice2: 'Middle Ages',
        choice3: 'Victorian Era',
        answer: 1,
        answerText: 'The Renaissance'
    },
    {
        question: "How long is the Roman fortification of Hadrian's Wall?",
        choice1: '143 miles',
        choice2: '73 miles',
        choice3: '103 miles',
        answer: 2,
        answerText: '73 miles'
    },
    {
        question: 'Why did the War of the Roses begin?',
        choice1: "A marriage crisis where the king didn't marry who he was supposed to",
        choice2: 'The murder of the true heir followed by a hostile takeover',
        choice3: 'A succession crisis where the child of an heir took over from the king',
        answer: 3,
        answerText: 'A succession crisis where the child of an heir took over from the king'
    },
    {
        question: 'Which French national hero was captured and executed by Richard of York?',
        choice1: 'Joan of Arc',
        choice2: 'Charles the Victorious',
        choice3: 'John of Burgundy',
        answer: 1,
        answerText: 'Joan of Arc'
    },
    {
        question: 'Which man won the Battle of Bosworth Field and started the Tudor Dynasty?',
        choice1: 'Arthur Tudor',
        choice2: 'Henry Tudor',
        choice3: 'Edward Tudor',
        answer: 2,
        answerText: 'Henry Tudor'
    },
    {
        question: 'What is the name of the 70m long embroidery that depicts the Battle of Hastings?',
        choice1: 'The Nimes Needlework',
        choice2: 'The Normandy Embroidery',
        choice3: 'The Bayeux Tapestry',
        answer: 3,
        answerText: 'The Bayeux Tapestry'
    },
    {
        question: 'In Japanese history, which historical period came directly after the Sengoku Period?',
        choice1: 'Edo Period',
        choice2: 'Meiji Period',
        choice3: 'Asuka Period',
        answer: 1,
        answerText: 'Edo Period'
    },
    {
        question: 'The Great Pyramid of Giza contains the tomb of which Egyptian Pharaoh?',
        choice1: 'Nefertiti',
        choice2: 'Khufu',
        choice3: 'Tutankhamun',
        answer: 2,
        answerText: 'Khufu'
    },
    {
        question: 'On which continent did the earliest humans emerge?',
        choice1: 'Asia',
        choice2: 'Europe',
        choice3: 'Africa',
        answer: 3,
        answerText: 'Africa'
    },
    {
        question: 'Which of the following is NOT considered to be one of the Seven Wonders of the Ancient World?',
        choice1: 'Stonehenge',
        choice2: 'Hanging Gardens of Babylon',
        choice3: 'Pharos of Alexandria',
        answer: 1,
        answerText: 'Stonehenge'
    },
    {
        question: 'What is the name of the strait that Modern Humans travelled over to reach the Americas?',
        choice1: 'Hormuz Strait',
        choice2: 'Beiring Strait',
        choice3: 'Bosphorus Strait',
        answer: 2,
        answerText: 'Beiring Strait'
    },
    {
        question: 'The tablet of Ea-nasir, dated to over 4000 years old, is the oldest written example of what?',
        choice1: 'Knock-knock joke',
        choice2: 'Party invitation',
        choice3: 'Customer complaint',
        answer: 3,
        answerText: 'Customer complaint'
    },
    {
        question: 'Which of these domesticated animals is native to the New World (North and South America)?',
        choice1: 'Turkeys',
        choice2: 'Chickens',
        choice3: 'Geese',
        answer: 1,
        answerText: 'Turkeys'
    },
    {
        question: 'Which of the following was NOT the name of a famous female pirate?',
        choice1: 'Anne Bonny',
        choice2: 'Amelia Edwards',
        choice3: 'Zheng Yi Sao',
        answer: 2,
        answerText: 'Amelia Edwards'
    },
    {
        question: 'In what year did Amelia Earhart become the first woman to fly solo across the Atlantic Ocean?',
        choice1: '1928',
        choice2: '1936',
        choice3: '1932',
        answer: 3,
        answerText: '1932'
    },
    {
        question: 'The Qin Dynasty was the first dynasty to establish an empire in China, how long did it last?',
        choice1: '15 years',
        choice2: '150 years',
        choice3: '350 years',
        answer: 1,
        answerText: '15 years'
    },
    {
        question: "The Byzantine Empire reached it's greatest extent under the rule of which emperor?",
        choice1: 'Basil II',
        choice2: 'Justinian',
        choice3: 'Diogenes',
        answer: 2,
        answerText: 'Justinian'
    },
    {
        question: 'Which two African nations are the only ones to avoid being colonised by European powers?',
        choice1: 'Senegal and Mali',
        choice2: 'Zimbabwe and Botswana',
        choice3: 'Ethiopia and Liberia',
        answer: 3,
        answerText: 'Ethiopia and Liberia'
    },
    {
        question: 'The Columbian Exchange saw movement of flora and fauna around the world. Which of these first arrived in Europe during this exchange?',
        choice1: 'Tomatoes',
        choice2: 'Pigs',
        choice3: 'Rice',
        answer: 1,
        answerText: 'Tomatoes'
    },
    {
        question: 'Which colonial power dominated the Asian spice trade during the 17th and 18th centuries?',
        choice1: 'The British',
        choice2: 'The Dutch',
        choice3: 'The Portuguese',
        answer: 2,
        answerText: 'The Dutch'
    },
    {
        question: 'Which German priest used the printing press to spread the protestant reformation throughout the Christian world?',
        choice1: 'Henry Tudor',
        choice2: 'Johannes Gutenberg',
        choice3: 'Martin Luther',
        answer: 3,
        answerText: 'Martin Luther'
    },
    {
        question: 'Who was declared “Lord Protector” of England in 1653 following the English Civil War?',
        choice1: 'Oliver Cromwell',
        choice2: 'Sir Ralph Hopton',
        choice3: 'Charles II',
        answer: 1,
        answerText: 'Oliver Cromwell'
    },
    {
        question: 'The Ottoman Empire took the city of Constantinople from the Byzantines in which year?',
        choice1: '1492',
        choice2: '1453',
        choice3: '1512',
        answer: 2,
        answerText: '1453'
    },
    {
        question: 'Which commercial good were the Ming Dynasty famous for exporting to Europe and the Middle East?',
        choice1: 'Rice Wine',
        choice2: 'Fireworks',
        choice3: 'Porcelain Pottery',
        answer: 3,
        answerText: 'Porcelain Pottery'
    },
    {
        question: 'What was the name given to first tank, developed in 1915?',
        choice1: 'Little Willie',
        choice2: 'Big Willie',
        choice3: 'Floppy Willie',
        answer: 1,
        answerText: 'Little Willie'
    },
    {
        question: 'The Commonwealth of Australia was establish in 1901 and united the disparate colonies into one nation. Which coloney rejected unification and established an independent dominion in 1907?',
        choice1: 'Fiji',
        choice2: 'New Zealand',
        choice3: 'Tasmania',
        answer: 2,
        answerText: 'New Zealand'
    },
    {
        question: 'Following the independence of the United States of America, which nation was next to declare indendence in the New World?',
        choice1: 'Brazil',
        choice2: 'Gran Colombia',
        choice3: 'Haiti',
        answer: 3,
        answerText: 'Haiti'
    }
]

// Hard Question Roster

let hardQuestions = [{
    question: 'Approximately how long did the Stone Age last?',
    choice1: '2.5 million years',
    choice2: '4.5 million years',
    choice3: '3.5 million years',
    answer: 1,
    answerText: '2.5 million years'
},
{
    question: 'During the War of the Roses, who became know for as the "Kingmaker" for his role in crowning two seperate kings during the conflict?',
    choice1: 'Edward Plantagenet of Middlesex',
    choice2: 'Richard Neville of Warwick',
    choice3: 'Henry Welles of Salisbury ',
    answer: 2,
    answerText: 'Richard Neville of Warwick'
},
{
    question: 'What is the first battle of the War of the Roses?',
    choice1: 'Battle of Northampton',
    choice2: 'Battle of Wakefield',
    choice3: 'Battle of St. Albans',
    answer: 3,
    answerText: 'Battle of St. Albans'
},
{
    question: 'Which queen, who led troops to battle during the War of the Roses, was known by Shakespeare as "The She-Wolf of France"?',
    choice1: 'Margaret of Anjou',
    choice2: 'Mary of Brittany',
    choice3: 'Elisabeth of Paris',
    answer: 1,
    answerText: 'Margaret of Anjou'
},
{
    question: 'What is the name for the series of plays written by William Shakespeare which depict the War of the Roses?',
    choice1: 'The Kingly Wars',
    choice2: 'The Henriad',
    choice3: 'The Civil Wars',
    answer: 2,
    answerText: 'The Henriad'
},
{
    question: "What is the name of China's first (and only) woman emperor, who ruled during the Tang Dynasty?",
    choice1: 'Lin Siniang',
    choice2: 'Song Qingling',
    choice3: 'Wu Zetian',
    answer: 3,
    answerText: 'Wu Zetian'
},
{
    question: 'By what name did the Romans call London?',
    choice1: 'Londinium',
    choice2: 'Londinus',
    choice3: 'Londiniate',
    answer: 1,
    answerText: 'Londinium'
},
{
    question: '"The Cradle of Humankind" refers to one of the largest sites of early homonid fossils in which modern day country?',
    choice1: 'Ethiopia',
    choice2: 'South Africa',
    choice3: 'Kenya',
    answer: 2,
    answerText: 'South Africa'
},
{
    question: 'Which was the last Homonid species to live alongside Modern Humans before going extinct?',
    choice1: 'Homo Erectus',
    choice2: 'Homo Habalis',
    choice3: 'Homo Neanderthalensis',
    answer: 3,
    answerText: 'Homo Neanderthalensis'
},
{
    question: 'Which of the following is NOT an origin site for early agriculture?',
    choice1: 'The Pannonian Basin',
    choice2: 'The Yellow River Basin',
    choice3: 'The Ganges Delta',
    answer: 1,
    answerText: 'The Pannonian Basin'
},
{
    question: 'The tablet of Ea-nasir, dated to over 4000 years old, is the oldest written example of what?',
    choice1: 'Knock-knock joke',
    choice2: 'Customer complaint',
    choice3: 'Party invitation',
    answer: 2,
    answerText: 'Customer complaint'
},
{
    question: 'What is the name of the youngest person (only 5 years old at the time) jailed for witchcraft during the Salem Witch Trials?',
    choice1: 'Bridget Bishop',
    choice2: 'Martha Corey',
    choice3: 'Dorcas Good',
    answer: 3,
    answerText: 'Dorcas Good'
},
{
    question: 'Following the Persian Wars (492-480 BCE), the Greek city states formed an alliance known as what?',
    choice1: 'The Delian League',
    choice2: 'The Athenian Compact',
    choice3: 'The Theban Alliance',
    answer: 1,
    answerText: 'The Delian League'
},
{
    question: 'Ashoka the Great is credited with spreading which world religon to the people of the Indian subcontinent?',
    choice1: 'Islam',
    choice2: 'Buddhism',
    choice3: 'Hinduism',
    answer: 2,
    answerText: 'Buddhism'
},
{
    question: 'Mexico city is built on the site of which Aztec settlement?',
    choice1: 'Tanganhuato',
    choice2: 'Teotihuacan',
    choice3: 'Tenochtitlan',
    answer: 3,
    answerText: 'Tenochtitlan'
},
{
    question: 'Which institution, established in 632 CE, was abolished in 1924 by the Republic of Turkey?',
    choice1: 'The Islamic Caliphate',
    choice2: 'The Ottoman Empire',
    choice3: 'The Muslim Brotherhood',
    answer: 1,
    answerText: 'The Islamic Caliphate'
},
{
    question: 'The viking leader Rollo is credited with establishing which group of people in Western Europe?',
    choice1: 'The Saxons',
    choice2: 'The Normans',
    choice3: 'The Avars',
    answer: 2,
    answerText: 'The Normans'
},
{
    question: 'The Black Death of 1347 killed approximately one third of the world population, how many people died to the disease?',
    choice1: '1.2 billion',
    choice2: '9 million',
    choice3: '150 million',
    answer: 3,
    answerText: '150 million'
},
{
    question: 'Korean admiral Yi Sun-sin, defended his homeland from Japanese invasion from 1592 - 1598 with the help of which innovative ship design?',
    choice1: 'The Turtle Ship',
    choice2: 'The Tiger Ship',
    choice3: 'The Whale Ship',
    answer: 1,
    answerText: 'The Turtle Ship'
},
{
    question: 'The maritime empire of Srivijaya dominated the seas from the 7th to 11th centuries CE around which modern day island nation?',
    choice1: 'Japan',
    choice2: 'Indonesia',
    choice3: 'Australia',
    answer: 2,
    answerText: 'Indonesia'
},
{
    question: 'The Thirty Years War, fought between protestants and catholics, came to an end with what peace agreement?',
    choice1: 'Peace of Augsburg',
    choice2: 'Peace of Amiens',
    choice3: 'Peace of Westphalia',
    answer: 3,
    answerText: 'Peace of Westphalia'
},
{
    question: 'What is the name of the Japanese port city where Europeans were permitted to trade  during the era of isolation?',
    choice1: 'Nagasaki',
    choice2: 'Hiroshima',
    choice3: 'Kyoto',
    answer: 1,
    answerText: 'Nagasaki'
},
{
    question: 'What was the name of the economic bubble that occurred in the Netherlands during the 1700s?',
    choice1: 'Rose Euphoria',
    choice2: 'Tulip Mania',
    choice3: 'Carnation Craze',
    answer: 2,
    answerText: 'Tulip Mania'
},
{
    question: 'The "Great Game" was a contest between the British and Russian Empires for control of which region?',
    choice1: 'Northern China',
    choice2: 'The Mediterranean Sea',
    choice3: 'Central Asia',
    answer: 3,
    answerText: 'Central Asia'
},
{
    question: 'The last Chinese Emperor "Puyi" was placed in control of which Japanese puppet state in 1934?',
    choice1: 'Manchukuo',
    choice2: 'Mengjiang',
    choice3: 'Provisional Government of China',
    answer: 1,
    answerText: 'Manchukuo'
},
{
    question: 'The naval arms race of the early 20th century began following the laying down of which ship?',
    choice1: 'SMS Kronprinz',
    choice2: 'HMS Dreadnought',
    choice3: 'USS Michigan',
    answer: 2,
    answerText: 'HMS Dreadnought'
},
{
    question: 'What was the name of the allied operation that included the D-day landings on June 6th 1944?',
    choice1: 'Operation Paperclip',
    choice2: 'Operation Market Garden',
    choice3: 'Operation Overlord',
    answer: 3,
    answerText: 'Operation Overlord'
},
{
    question: '"The declaration of the rights of man and citizen" is the founding document of which revolutionary nation-state?',
    choice1: 'The French Republic',
    choice2: 'The United States of America',
    choice3: 'Gran Colombia',
    answer: 1,
    answerText: 'The French Republic'
},
{
    question: "The Holy Roman Empire was dissolved following Austria's defeat defeat to France at which battle?",
    choice1: 'The battle of Jena Auertadt',
    choice2: 'The battle of Austerlitz',
    choice3: 'The battle of Friedland',
    answer: 2,
    answerText: 'The battle of Austerlitz'
},
{
    question: 'The "South Sea Company" was the central factor in a major economic and political crisis in which 18th century country?',
    choice1: 'The Chinese Empire',
    choice2: 'The United States of America',
    choice3: 'The United Kingdom',
    answer: 3,
    answerText: 'The United Kingdom'
}
]

// Start Game Function

function startGame() {
    questionCounter = 0;
    score = 0;
    level = difficulty.dataset.number;
    if (level === '1') {
        availableQuestions = [...easyQuestions];
        getNewQuestion();
    } else if (level === '2') {
        availableQuestions = [...mediumQuestions];
        getNewQuestion();
    } else if (level === '3') {
        availableQuestions = [...hardQuestions];
        getNewQuestion();
    } else {
        let url = 'https://youtu.be/dQw4w9WgXcQ';
        window.open(url, '_blank');
    }
}

// Move to next question function

function getNewQuestion() {
    // Code to execute when the user has answered all the available questions
    if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        question.innerText = `Congratulations! You answered ${score} out of ${maxQuestions} correctly!`;
        progressText.innerText = `That's all the questions this time!`;
        choices.forEach(choice => {
            choice.innerHTML = `<a href="index.html" class="return">Try Again!</a>`
        })
        op1Btn.classList.add('hide');
        op3Btn.classList.add('hide');
    } else {

        // Code to execute until all questions are answered

        // Increments the question counter and updates progress bar
        questionCounter++;
        progressText.innerText = `You are on question ${questionCounter} out of ${maxQuestions}`;
        progressBar.style.width = `${(questionCounter/maxQuestions) * 100}%`

        // Randomises the question list

        const questionIndex = Math.floor(Math.random() * availableQuestions.length);

        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.question;

        // Applies answer choices to the option buttons

        choices.forEach(choice => {
            const number = choice.dataset['number']
            choice.innerText = currentQuestion['choice' + number]
        })

        availableQuestions.splice(questionIndex, 1);

        acceptingAnswers = true;
    }
}

// Adds event listeners to the option buttons

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        playSound();
        if (!acceptingAnswers) return;
        // Checks if selected answer is correct
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            score++;
            question.innerText = `Great Job! The correct answer was ${currentQuestion.answerText}`;
        } else if (classToApply !== 'correct') {
            question.innerText = `Afraid not! the correct answer was ${currentQuestion.answerText}`;
        }
        // Applies correct or incorrect class to the selected option
        selectedChoice.classList.add(classToApply);

        setTimeout(function () {
            selectedChoice.classList.remove(classToApply);
            getNewQuestion();
        }, 2000);
    })
});

startGame();

// Functions to control background music and answer sounds

function toggleMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        backgroundMusic.volume = 0.25;
    } else {
        backgroundMusic.pause();
    }
}

function toggleSound() {
    if (answerSound.muted === true) {
        answerSound.muted = false;
    } else {
        answerSound.muted = true;
    }
}

function playSound() {
    answerSound.play()
}