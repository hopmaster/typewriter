/**
 * загружается первым и создаёт глобальную переменную typeWriter
 */
var typeWriter = {

    version: '0.0.0',//текущая версия сборки

    allText: null,//массив со строками стиха

    speed: 1000,//0 - testMode, скорость по умолчанию.

    howMachLetters: Math.round(1+Math.random()*3),//0 - testMode, количество букв.

    spaceEnable: 1,//0 - testMode, без пробела.

    poemNumber: 'rand',//номер стиха

    header: document.getElementById("header"),

    logo: document.getElementById('logo'),

    titleLetters: document.getElementById('title-letters'),

    animate: document.getElementById("animate"),

    soundOn: document.getElementById("soundOn"),

    range: document.getElementsByClassName('range')[0],

    rangeValue: document.getElementById('rangeValue'),

    metronome: document.getElementById('metronome'),

    text: document.getElementById('text'),

    letter: document.getElementsByClassName('letter')[0],

    info: document.getElementById('info'),

    information: document.getElementById('information'),

    secondsId: document.getElementById('seconds'),

    letters:      [document.getElementsByTagName('audio')[0],
                   document.getElementsByTagName('audio')[1]],
    capitalLetter: document.getElementsByTagName('audio')[2],
    space:         document.getElementsByTagName('audio')[3],
    bell:          document.getElementsByTagName('audio')[4],
    return:        document.getElementsByTagName('audio')[5]

};

document.getElementById("version").innerText = typeWriter.version;