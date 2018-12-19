<?php

include('../configuration.php');

$ch = curl_init('https://api.github.com/users/dandelionmood/events?' . http_build_query([
        'client_id'     => GITHUB_CLIENT_ID,
        'client_secret' => GITHUB_CLIENT_SECRET,
    ]));
curl_setopt_array($ch, [
    CURLOPT_TIMEOUT        => 2,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_USERAGENT      => 'dandelionmood',
]);
$r = curl_exec($ch);
//$i = curl_getinfo($ch); var_dump( $i );
curl_close($ch);
echo $r;