<?php
$ch = curl_init('https://blog.quillery.fr/feed/');
curl_setopt_array($ch, [
    CURLOPT_TIMEOUT        => 2,
    CURLOPT_RETURNTRANSFER => true,
]);
$r = curl_exec($ch);
//$i = curl_getinfo($ch); var_dump( $i );
curl_close($ch);
echo $r;