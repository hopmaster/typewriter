/**
 * Проговаривает вслух text. Yandex.api
 * @param text {string}
 */
typeWriter.say = function (text) {

    "use strict";

    //Если не загружен фреймворк - загрузить
    if (typeof window.ya === 'undefined') {
        loadWebSpeechKit();
    } else {
        if(typeof window.ya.speechkit.settings === 'undefined'){

            loadWebSpeechKit();

        } else {

            justDoIt();

        }
    }

    function justDoIt() {

        typeWriter.tts.speak(
            text

            // Переопределяем настройки синтеза.
            /*,{
                stopCallback: function () {
                    //действия по окончанию озвучивания текста
                }
            }*/
        );
    }

    function loadWebSpeechKit() {

        var script = document.createElement('script');
        script.src = "js/webspeechkit.js";//"https://webasr.yandex.net/jsapi/v1/webspeechkit.js";

        //ошибка загрузки фреймворка webspeechkit.js
        script.onerror = function () {

            script.remove();
            console.log('ашипка');

        };

        //создаём декоратор для функции createElement
        document.createElement = decorator(document.createElement);

        function decorator(f) {

            return function () {

                var result = f.apply(this, arguments);

                //ошибка загрузки settings
                result.onerror = function () {

                    script.remove();
                    result.remove();

                    //убираем декоратор
                    document.createElement = f;

                };

                //settings удачно загружены
                result.onload = function () {

                    if (typeof window.ya.speechkit.settings !== 'undefined') {

                        typeWriter.tts = new ya.speechkit.Tts(
                            {

                                apikey: 'd1f7efa5-05c4-4c4a-a1b5-ae0c348daf7c',

                                emotion: 'good',//evil,good,neutral

                                //emotions: undefined,

                                speaker: 'zahar',//jane,omazh,ermil,zahar

                                //speakers: undefined,

                                //genders: undefined,

                                fast: true,

                                lang: 'ru-RU',

                                speed: 0.7

                            });

                        justDoIt();

                    }

                    //убираем декоратор
                    document.createElement = f;

                };

                result.onreadystatechange = function () {
                    var self = this;
                    if (this.readyState === "complete" || this.readyState === "loaded") {
                        setTimeout(function () {
                            self.onload();
                        }, 0);
                    }
                };

                return result;
            };
        }

        document.documentElement.appendChild(script);

    }

};