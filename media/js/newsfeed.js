var progress = setInterval(function() {
    var bar = $('.bar');    
    if (bar.width()==400) {
        clearInterval(progress);
        $('.progress').removeClass('active');
    } else {
        bar.width(bar.width()+40);
    }    
}, 800);

var FeedServiceUrl = 'http://2.bseu-fm.appspot.com/feed';
var FeedOffset = 0;

function display_loaded_articles(data){
    $('.progress').addClass('hidden');
    var rendered_articles = new EJS({'url':'/js/templates/article.ejs'}).render({articles: data});
    $('#feed').append(rendered_articles);
}

function get_feed(offset){
    $('.progress').removeClass('hidden');
    $.getJSON(FeedServiceUrl + '?offset='+offset, display_loaded_articles);
}

$(document).ready(function(){
    get_feed(FeedOffset);
});

$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
       FeedOffset += 10;
       get_feed(FeedOffset);
    }
});

