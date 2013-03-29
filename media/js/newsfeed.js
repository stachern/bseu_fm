var FeedServiceUrl = 'http://2.bseu-fm.appspot.com/feed';
var FeedOffset = 0;

var _throttleTimer = null;
var _throttleDelay = 100;

$('#loader').hide()
    .ajaxStart(function(){
        $(this).show();
    })
    .ajaxStop(function() {
        $(this).hide();
});

function display_loaded_articles(data){
    var rendered_articles = new EJS({'url':'/js/templates/article.ejs'}).render({articles: data});
    $('#feed').append(rendered_articles);
}

function get_feed(offset){
    $.getJSON(FeedServiceUrl + '?callback=?&offset=' + offset, display_loaded_articles);
}

function scroll_handler(e) {
    clearTimeout(_throttleTimer);
    _throttleTimer = setTimeout(function () {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 50) {
            FeedOffset += 10;
            get_feed(FeedOffset);
        }
    }, _throttleDelay);
}

$(document).ready(function(){
    get_feed(FeedOffset);
    $(window).off('scroll', scroll_handler)
             .on('scroll', scroll_handler);

});

$('#rssdata').ready(function(){
    $.getJSON('http://pipes.yahoo.com/pipes/pipe.run?_id=3f5db5135e0d956c2ef490cd1ae22878&_render=json&_callback=?' ,function(data){
        var rendered_html =  new EJS({'url':'/js/templates/news.ejs'}).render({news: data.value.items});
        $('#rssdata ul.rss-items').append(rendered_html);
        $('#rssdata div.loading').fadeOut();
        $('#rssdata ul.rss-items').slideDown();
    });
});

$('#twitter').ready(function(){
    $.getJSON('http://pipes.yahoo.com/pipes/pipe.run?_id=39cbc56ab57e3e72877c2996bce82259&_render=json&_callback=?', function(data){
        var rendered_html =  new EJS({'url':'/js/templates/twit.ejs'}).render({twits: data.value.items});
        $('#twitter ul.twits').append(rendered_html);
        $('#twitter div.loading').fadeOut();
        $('#twitter ul.twits').slideDown();
    });
});
