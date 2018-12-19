var $ = require("jquery");

var moment = require('moment');
require('moment/locale/fr.js');

require('typeface-pt-serif');
require('typeface-ibm-plex-sans');

const FeedMe = require('feedme');
const http = require('http');

(function () {
    charger_dernier_commit();
    charger_dernier_tweet();
    charger_derniers_posts();
})();

function charger_dernier_commit() {
    $.ajax({
        url: '/ajax/github.php',
        type: 'GET',
        data: {},
        dataType: 'json',
        success: function (events) {
            let contexte = $('#boite-dernier-commit');
            let evt = events.find(e => {
                return e.type === 'PushEvent'
            });
            var evt_date = new moment(evt.created_at),
                evt_texte = evt.payload.commits.pop().message,
                rep_texte = evt.repo.name;
            $('.card-body', contexte).append(
                $('<code></code>').html(evt_texte)
            );
            $('.card-footer', contexte)
                .html('publié sur <code>' + rep_texte
                    + '</code> ' + evt_date.fromNow());
            contexte.slideDown('fast');
        }
    });
}

function charger_dernier_tweet() {
    $.ajax({
        url: '/ajax/twitter.php',
        type: 'GET',
        dataType: 'json',
        success: function (d) {
            let contexte = $('#boite-dernier-tweet');
            if (d) {
                let evt_date = moment(new Date(d[0].created_at));
                // Récupération des infos et formatage.
                $('.card-body', contexte).html(replaceURLWithHTMLLinks(d[0].text));
                $('.card-footer', contexte).html('publié ' + evt_date.fromNow());
                contexte.slideDown('fast');
            }
        }
    });
}

function charger_derniers_posts() {
    http.get('/ajax/blog.php', (res) => {
        let contexte = $('#boite-derniers-posts');
        if (res.statusCode !== 200) {
            return;
        }
        let parser = new FeedMe(true);
        res.pipe(parser);
        parser.on('end', () => {
            let data = parser.done(), last_items = data.items.slice(0, 3);
            for (last_item of last_items) {
                // console.log(last_item);
                $('.card-body > ul', contexte).append(
                    $('<li></li>')
                        .attr('class', 'list-group-item')
                        .append([
                            $('<a></a>')
                                .attr('href', last_item.link)
                                .attr('target', '_blank')
                                .html(last_item.title),
                            $('<div></div>')
                                .attr('class', 'text-muted')
                                .html(moment(new Date(last_item.pubdate)).fromNow())
                        ]));
            }
            contexte.slideDown('fast');
        });
    });
}


function replaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp, "<a href='$1' target='_blank'>$1</a>");
}