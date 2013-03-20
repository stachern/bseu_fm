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


$('#rssdata').ready(function()
{
    var pipe_url = 'http://pipes.yahoo.com/pipes/pipe.run?_id=3f5db5135e0d956c2ef490cd1ae22878&_render=json&_callback=?';
    $.getJSON(pipe_url,function(data)
    {

        $(data.value.items).each(function(index,item)
        {
            var item_html = '<li><a href="'+item.link+'">'+item.title+'</a></li>';
            $('#rssdata ul.rss-items').append(item_html);
        });
        $('#rssdata div.loading').fadeOut();
        $('#rssdata ul.rss-items').slideDown();
    });
});