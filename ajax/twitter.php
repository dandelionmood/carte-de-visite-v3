<?php

include('../vendor/autoload.php');
include('../configuration.php');

Twitter::$cacheDir = 'cache/';

$twitter = new Twitter(
    TWITTER_API_KEY,
    TWITTER_API_SECRET,
    TWITTER_API_AT,
    TWITTER_API_AT_SECRET
);

$statuses = $twitter->load(Twitter::ME, 1, [
    'include_entities' => 'false',
    'include_rts'      => 'false',
    'exclude_replies'  => 'true',
]);

header('Content-Type: text/javascript; charset=utf8');
echo json_encode($statuses);