var FeedServiceUrl = 'http://2.bseu-fm.appspot.com/feed';
var FeedOffset = 0;

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

$('#twitter').ready(function()
{
    var pipe_url = 'http://pipes.yahoo.com/pipes/pipe.run?_id=ca64fc1563fcf96ef51ec38da7ca3cfc&_render=json&_callback=?';
    $.getJSON(pipe_url,function(data)
    {
      
      $(data.value.items).each(function(index,item)
        {
            var item_id=item.link.substring(35);           
            var item_html = '<li><p class="pull-right"><a href="https://twitter.com/intent/tweet?in_reply_to='+item_id+'"><img src="/img/logos/twitter/reply.png"></a>&nbsp;<a href="https://twitter.com/intent/retweet?tweet_id='+item_id+'"><img src="/img/logos/twitter/rt.png"></a>&nbsp;<a href="https://twitter.com/intent/favorite?tweet_id='+item_id+'"><img src="/img/logos/twitter/fv.png"></a>&nbsp;</p><p><a class="tw" href="'+item.link+'">'+item.title.substring(8)+'</a></p></li>';
            $('#twitter ul.twits').append(item_html);
        });
        $('#twitter div.loading').fadeOut();
        $('#twitter ul.twits').slideDown();
    });
});
