function display_loaded_albums(feed) {
  var rendered_albums = new EJS({ 'url': SUBDIR_PREFIX + '/js/templates/album.ejs' }).render({ albums: feed.value.items });
  $('#photo-feed').append(rendered_albums);
}

$(document).ready(function() {
  $.getJSON('http://pipes.yahoo.com/pipes/pipe.run?_id=170598225d63d1ee30236fb35f4bafa0&_render=json&_callback=?', display_loaded_albums);
});
