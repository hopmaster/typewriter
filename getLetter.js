/**
 * Возвращает count случайных букв из тех которые чаще всего встречаются в str
 * @param str {string} - строка
 * @param count {number} - количество букв
 * @returns {{}}
 */
typeWriter.getLetters = function(str,count) {

    'use strict';

    var moreRandom = 2;//захват со смещение для большей случайности.

    str = str.toUpperCase();

    var letters = {};

    //Считаем количество каждого символа в str
    for (var num = 0; str.length > num; num++) {

        letters[str[num]] = letters[str[num]] ? letters[str[num]] + 1 : 1;

    }

    // Переделываем в массив для удобства сортировки
    var sortLetters = [];

    for (var char in letters) {

        if (!letters.hasOwnProperty(char)) continue;

        var charCode = char.charCodeAt(0);

        //только английский и русский алфавит без запятых и прочих элементов todo: переделать в regex
        if (((charCode > 64) && (charCode < 91) || (charCode == 1025) ||
            ((charCode > 1039) && (charCode < 1072)))) {

            sortLetters.push({letter: char, sum: letters[char]});

        }

    }

    // сортируем в порядке убывания
    sortLetters.sort(function (a, b) {
        return b.sum - a.sum;
    });

    // Отрезаем необходимое количество букв + небольшое смещение и сортируем в случайном порядке
    sortLetters = sortLetters.slice(0,count+moreRandom).sort(function(){

        return Math.random() - 0.5;

    });

    // Переделываем в массив букв
    letters = [];
    sortLetters.forEach(function(item){

        letters.push(item.letter);

    });

    //убираем смещение
    letters = letters.slice(0,count);

    return letters;

};