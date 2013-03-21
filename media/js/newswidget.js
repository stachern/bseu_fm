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