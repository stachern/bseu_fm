var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-22509903-1']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();


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