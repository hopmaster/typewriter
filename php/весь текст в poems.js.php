<?php

$poems = file('poems.txt');

$fp = fopen('poems.js', 'w');

fwrite($fp, 'var allText = ['."\n".'["'.          str_replace('"','\"',trim($poems[0]))           .'"');

$poems[0]='';

foreach ($poems as $str) {



    $str = trim($str);

    if (!$str) continue;

    $str = str_replace('"','\"', $str);



    if (mb_strtoupper($str, 'utf-8') === $str) {


        fwrite($fp, '],'."\n".'["' . $str . '"');


    }else{

        fwrite($fp, ',"'.$str.'"');

    }

}

fwrite($fp, ']'."\n".'];');

fclose($fp);

include_once "index.html";

?>

