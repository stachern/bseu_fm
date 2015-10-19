var display_loaded_albums = function(feed) {
    var template_path = SUBDIR_PREFIX + "/js/templates/album.ejs",
        rendered_albums = new EJS({ url: template_path }).render({ albums: feed.query.results.item });
    $('#photo-feed').append(rendered_albums);
};

$(function() {
    $.getJSON("http://query.yahooapis.com/v1/public/yql/bseu_fm/photos?format=json", display_loaded_albums);
});
