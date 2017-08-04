/**
 * этот скрипт должен выполняться последним после загрузки
 * TODO: загружать стих целиком после окончания + автор + название
 */

(function () {

    "use strict";

    var stopAnimations =
        '-moz-transition: 0s;' +
        '-o-transition: 0s;' +
        '-webkit-transition: 0s;' +
        'transition : 0s;';

    var startAnimations =
        '-moz-transition: all 2s linear;' +
        '-o-transition: all 2s linear;' +
        '-webkit-transition: all 2s linear;' +
        'transition : all 2s linear;';

    uploadPoemAndStartMainMenu();

    /**
     * Главное меню с текущим уровнем
     * @param level
     */
    function mainMenu(level) {

        level = level || 1;

        var wr = window.onresize;

        window.onresize = '';

        typeWriter.text.style = stopAnimations;

        typeWriter.text.style.fontSize = '0';

        window.onresize = wr;

        setTimeout(function () {

            typeWriter.text.style = startAnimations;

            typeWriter.animate.style.webkitTransform = "translate(-1500px,500px)";

        }, 10);

        typeWriter.say(typeWriter.allText[level].replace(/&/g, ''));

        //раскомментировать для тестирования произношения стиха целиком
        //typeWriter.say(typeWriter.allText.join(" ").replace(/&/g,''));


        //пробелы и амперсанды служащие для удаления ударения в словах, заменяем на спецсимвол пробела
        typeWriter.text.innerHTML = typeWriter.allText[level].replace(/[+]/g, '')
            .replace(/[&\s]/g, '&nbsp;');

        setTimeout(function () {

            if(typeWriter.spaceEnable) typeWriter.letter.innerHTML = typeWriter.myLetters.slice(0,-1);
            else typeWriter.letter.innerHTML = typeWriter.myLetters;

            typeWriter.letter.style.color = 'rgba(33, 8, 5, 0.8)';

            typeWriter.letter.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';

            typeWriter.titleLetters.style.color = 'rgba(33, 8, 5, 0.8)';

            typeWriter.metronome.style.visibility = 'hidden';

            typeWriter.animate.style.visibility = 'hidden';

            typeWriter.text.style.visibility = 'visible';

            typeWriter.info.style.visibility = 'visible';

            window.onresize(); //адаптируем под размер экрана

            document.onmousedown = document.onkeydown = '';

            setTimeout(function () {

                document.onmousedown = document.onkeydown = function () {

                    if (typeWriter.allText.length > level + 1) {

                        startPractice(level);

                    } else {

                        uploadPoemAndStartMainMenu();

                    }

                };

            }, 1000);

        }, 1000);

    }

    /**
     * Начать упражнение со скоростью speed и уровнем level
     * @param level
     */
    function startPractice(level) {

        //запрет нажатий
        document.onmousedown = document.onkeydown = '';

        typeWriter.metronome.style.visibility = 'visible';

        var letter = 0;

        typeWriter.info.style.visibility = 'hidden';
        typeWriter.text.style.fontSize = '0px';
        typeWriter.text.style.color = 'rgba(0,0,0,0)';
        typeWriter.text.style.backgroundColor = 'rgba(0,0,0,0)';
        typeWriter.titleLetters.style.color = 'rgba(0,0,0,0)';
        typeWriter.titleLetters.style.fontSize = '0px';

        typeWriter.letter.innerHTML = 'Приготовьтесь';
        setTimeout(function () {
            typeWriter.letter.innerHTML = 'Внимание';
        }, 1000);
        setTimeout(function () {
            typeWriter.letter.innerHTML = 'Начали!';
        }, 2000);
        var timer;
        setTimeout(function () {

            timer = setInterval(waitPress, typeWriter.speed);

        }, 2000);
        //Игнорировать не-буквы, исключать повторные пробелы.
        var text = (typeWriter.allText[level]
            .toUpperCase()
            .replace(/[^A-Z\sА-ЯЁ\d&]/g, '') + ' ')
            .replace(/[\s]{2,}|[&]/g, ' ');//лишние пробелы

        var currentLetter = text[0];

        //Определям что делать при нажатии

        setTimeout(function () {

            document.onmousedown = document.onkeydown = function () {

                if (currentLetter === ' ') {

                    //звук пробела который нажимает юзер
                    typeWriter.space.play();

                    //Если это последний пробел раздаётся звоночек
                    if (letter == text.length) {

                        setTimeout(function () {

                            typeWriter.bell.play();

                        }, 100);

                    }

                } else {

                    //звук клавиши которую нажимает юзер
                    typeWriter.letters[1].play();

                }

                if (!~typeWriter.myLetters.indexOf(currentLetter)) {

                    error();

                } else {

                    currentLetter = '';//правильно нажал

                }
            };
        }, 2000);

        function waitPress() {

            currentLetter = text[letter++];

            typeWriter.letter.style = stopAnimations;
            typeWriter.letter.style.backgroundColor = "rgba(138, 255, 60, 0.6)";

            //Успешно достигли конца строки
            if (letter > text.length) {

                clearInterval(timer);

                typeWriter.letter.style.backgroundColor = "";
                document.onmousedown = document.onkeydown = '';

                typeWriter.return.play();

                setTimeout(function () {

                    mainMenu(++level);

                }, 1000);

                return;

            }

            if (!~typeWriter.myLetters.indexOf(currentLetter)) {

                setTimeout(function () {

                    //сама 'нажимает'
                    if (currentLetter === ' ') {

                        //звук пробела
                        typeWriter.space.play();

                        //Если это последний пробел раздаётся звоночек
                        if (letter == text.length) {

                            setTimeout(function () {

                                typeWriter.bell.play();

                            }, 100);

                        }

                    } else {

                        //случайный звук нажатия клавиши (0 или 1)
                        typeWriter.letters[Math.round(Math.random())].play();

                    }

                }, 200);

            }


            setTimeout(function () {

                typeWriter.letter.style.backgroundColor = "";

                if (~typeWriter.myLetters.indexOf(currentLetter)) {

                    error(true);

                }

                currentLetter = 'late';// запоздалое нажатие

            }, typeWriter.speed / 2);

        }

        /**
         * Окошко с ошибкой
         * @param miss - пропущена буква
         */
        function error(miss) {

            typeWriter.metronome.style.visibility = 'hidden';

            typeWriter.animate.style.backgroundColor = 'red';

            if (miss) {

                if (currentLetter == ' ') {

                    currentLetter = "Вы пропустили конец слова.";

                } else {

                    currentLetter = "Вы пропустили букву " + currentLetter + ".";

                }

            } else {

                if (currentLetter == 'late') {

                    currentLetter = "Следующей была буква " + text[letter] + ".";

                    if (~typeWriter.myLetters.indexOf(text[letter])) {

                        currentLetter = 'Не соблюдаете интервалы. Поспешили.';

                    }

                } else {

                    if (currentLetter === ' ') {

                        currentLetter = "Это был пробел.";

                    } else {

                        currentLetter = "Это была буква " + currentLetter + ".";

                    }


                }

            }
            typeWriter.animate.style.webkitTransform = "translate(0,0)";

            typeWriter.animate.innerHTML =
                "ОШИБКА!<br>" +
                currentLetter + "<br>" +
                "<sub style='color:lightsalmon'>Нажмите для продолжения</sub>";

            typeWriter.animate.style.visibility = 'visible';

            clearInterval(timer);

            document.onmousedown = document.onkeydown = '';

            setTimeout(function () {

                document.onmousedown = document.onkeydown = function () {

                    typeWriter.letters[0].play();

                    typeWriter.animate.style.backgroundColor = '';

                    mainMenu(level);

                };

            }, 1000);

        }

    }


    /**
     * Загружает js со стихом и начинаем
     * TODO: необходимо решить проблему с возможным повторением стихов и ошибкой загрузки
     */
    function uploadPoemAndStartMainMenu() {

        var script = document.createElement('script');

        script.type = 'application/javascript';
        script.id = 'allText';
        script.src = "index.php?js=" + typeWriter.poemNumber + "&seed=" + Math.random() * 100000;
        
        script.onload = function () {

            typeWriter.letter.innerHTML = typeWriter.myLetters = typeWriter.getLetters(
                window.typeWriter.allText.join(''), typeWriter.howMachLetters
            );

            if (typeWriter.myLetters.length > 1) {

                typeWriter.titleLetters.innerHTML = 'ваши буквы:';

            }

            if (typeWriter.spaceEnable) {

                typeWriter.myLetters.push(" ");//нажимать пробелы

            }


            mainMenu();

        };

        var aText = document.getElementById('allText');

        if (aText) {

            document.head.replaceChild(script, aText);

        } else {

            document.head.appendChild(script);

        }
    }

})();