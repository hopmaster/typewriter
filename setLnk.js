/**
 * lnk элементы кликабельны и не запускают упражнение.
 */
(function () {

    "use strict";

    var stopPropagation = function (event) {

        if (event.stopPropagation) event.stopPropagation();
        else event.cancelBubble = true;

    };

    var lnk = document.getElementsByClassName('lnk');

    for (var i = 0; i < lnk.length; i++) {

        lnk[i].onmousedown = stopPropagation;

    }

})();

/**
 * нажали на "СЕКУНДЫ"
 * @param the
 */
typeWriter.seconds = function (the) {

    "use strict";

    if (the) {

        switch (typeWriter.speed) {

            case 2000 :
                typeWriter.speed = 1000;
                the.innerHTML = "секунду";
                break;
            case 1000 :
                typeWriter.speed = 500;
                the.innerHTML = "полсекунды";
                break;
            case 500  :
                typeWriter.speed = 2000;
                the.innerHTML = "две секунды";
                break;
            default :
                typeWriter.speed = 2000;
                the.innerHTML = "две секунды";


        }

    }else{

        switch (typeWriter.speed) {

            case 2000 :
                typeWriter.secondsId.innerHTML = "две секунды";
                break;
            case 1000 :
                typeWriter.secondsId.innerHTML = "секунду";
                break;
            case 500  :
                typeWriter.secondsId.innerHTML = "полсекунды";
                break;
            case 1500 :
                typeWriter.secondsId.innerHTML = "полторы секунды";
                break;
            case 333 :
                typeWriter.secondsId.innerHTML = "трети секунды";
                break;
            default :
                typeWriter.secondsId.innerHTML = (typeWriter.speed/1000)+" секунд";

        }

    }

};
typeWriter.seconds();
/**
 * нажали на "НАЖМИТЕ/ХЛОПНИТЕ"
 * @param the
 */
typeWriter.soundOn = function (the) {

    "use strict";

    /**
     * если скрипт не загружен - загрузить
     */
    if (typeof window.whistle === 'undefined') {

        var script = document.createElement('script');
        script.src = "js/whistle.js";

        script.onload = function () {

            setWhistleEvent();

        };

        document.documentElement.appendChild(script);

    } else {

        setWhistleEvent();

    }

    function setWhistleEvent() {

        if (typeof whistle.whistleEventName === 'undefined') {

            var decorator = function (f) {

                return function () {

                    arguments[2] = function (/*error*/) {

                        alert("К сожалению сейчас Ваш браузер не поддерживает данную функцию.\n" +
                            "Мне очень жаль. ^-^\n");
                        navigator.getUserMedia = f;
                        whistle.whistleEventName = undefined;

                    };
                    return f.apply(this, arguments);
                };
            };
            navigator.getUserMedia = decorator(navigator.getUserMedia);
            window.whistle.init();
            /**
             * событие готовности микрофона к прослушиванию
             */
            document.addEventListener('whistleReady', function () {


                changeModeWhistle();


            }, false);

        } else {
            changeModeWhistle();
        }

    }

    function changeModeWhistle() {

        /**
         * утановить настройки с хлопками
         */
        if (typeof window.whistle.ev === 'undefined') {

            the.innerHTML = 'хлопайте';

            typeWriter.soundOn.innerHTML = 'ХЛОПНИТЕ';

            typeWriter.range.style.visibility = 'inherit';

            document.addEventListener("whistle", window.whistle.ev = function () {

                    /**
                     * Если хлопнули - нажать на клавиатуру
                     */
                    document.removeEventListener('whistle', window.whistle.ev, false);
                    if (document.onkeydown) {

                        document.onkeydown();
                    }

                    //TODO: поковыряться с интенсивностью звука (самонастройка чувствительности)
                    //console.log("whistled!" + whistle.intensity);
                    setTimeout(function () {

                        document.addEventListener('whistle', window.whistle.ev, false);

                    }, 250);

                }, false
            );

        } else {

            /**
             * вернуть к настройкам без хлопков
             */
            document.removeEventListener('whistle', window.whistle.ev, false);

            window.whistle.ev = undefined;

            the.innerHTML = 'нажимайте';

            typeWriter.soundOn.innerHTML = 'НАЖМИТЕ';

            typeWriter.range.style.visibility = 'hidden';

        }

    }

};
/**
 * изменили чувствительность микрофона
 * @param the
 */
typeWriter.rangeChange = function (the) {

    window.whistle.precision = (100 - the.value) * 3;

    typeWriter.rangeValue.innerHTML = the.value;

};

typeWriter.about = function () {

    'use strict';

    alert(
        'Версия ' + typeWriter.version + '\n' +
        'Изменения и дополнения:\n' +
        '\n' +

        '0.6 - Случайное количество букв, исправлены ошибки произношения.\n'+

        '0.5 - Озвучивание текста.(api.yandex)\n' +

        '0.4 - Реакция на хлопки (не работает без SSL). Адаптация под размеры экрана.\n' +

        '0.3 - можно менять скорость упражнения, исправлена ошибка лишних пробелов.\n' +

        '0.2 - добавлены случайные стихи Пушкина А.С, случайные буквы.\n' +

        '0.1 - проба пера, один стих, одна единственная буква.\n'
    );

};
