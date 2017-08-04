<?php
/** TODO: куки нужны (пока достижения будем хранить на стороне клиента, но в будущем на сервере)
 * TODO: режим обучения для тех у кого нет куки
 * Скрипт проверяет входящие данные и реагирует на них соответственно:
 * 1. если пришел с домена без ssl - показывает описание и редерект на домен с ssl
 * 2. если пришел с get запросом - отдаёт js файл со стихом внутри
 * 3. в остальных случаях загружает содержимое.
 */

/**
 * Для передачи описания сайта и перехода на защищённый сайт с https
 * временная заглушка из-из отсутствия ssl сертификата
 */
if ($_SERVER["HTTP_HOST"] == "typewriter.hmelenko.of.by") {
    echo "<HTML>
  <HEAD>
    <meta charset=\"utf-8\">
    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
    <title>Машинка</title>
    <link rel=\"shortcut icon\" href=\"favicon.ico\">
    <link href=\"style.css\" rel=\"stylesheet\" type=\"text/css\">
    <meta name=\"title\" content='Тренажер внимания \"Машинка\"'>
    <meta name=\"description\" content=\"Классическое упражнение по актёрскому мастерству, для тренировки внимания.\">
    <link rel=\"image_src\" href=\"image.jpg\"/>
    <script defer src=\"script.js\"></script>
    <META HTTP-EQUIV=\"REFRESH\" CONTENT=\"1; URL=https://typewriter.000webhostapp.com\">
  </HEAD>
  <BODY>
  </BODY>
</HTML>";
    exit();
};


if (isset($_GET['js'])) {

    $js = $_GET['js'];

    if (is_numeric($js)) {

        $js = intval($js);

    } else {

        $js = -2;

    }

    /**
     * создаем $arr массив из данных файла poems.txt
     */
    $poems = file('poems.txt');
    $i = -1;
    $arr = [];

    foreach ($poems as $str) {

        $str = trim($str);

        if (!$str) continue;

        $str = str_replace('"', '\"', $str);

        if (mb_strtoupper($str, 'utf-8') === $str) {

            $arr[++$i][] = $str;

            if ($i === $js + 1) {

                $poems = $arr[$js];

                $arr = [];
                $arr[0] = $poems;

                break;

            }

        } else {

            $arr[$i][] = $str;

        }

    }
    /**
     * находим случайный стих
     */
    $poems = $arr[rand(0, count($arr) - 1)];

    /**
     * формируем JS строку и вставляем его в нашу машинку
     */
    $allText = 'window.typeWriter.allText = [';

    foreach ($poems as $str) {

        $allText .= '"' . $str . '",';

    }

    $allText .= '"Поздравляю! Вы справились! :)"];';
    /**
     * выдать javascript файл вместе с указанием на тип данных для строгого режима
     *
     */

    header('Content-Type: application/javascript');

    echo $allText;

    exit();
}

?>
