FEED = {
  feedServiceUrl: 'http://bseu-fm.appspot.com/',
  feedOffset: 0,
  feedDateStart: null,
  feedDateEnd: null,
  _throttleDelay: 100,
  _throttleTimer: null,

  get_feed: function() {
    $.ajax({
      url: this.feedServiceUrl + 'feed?callback=?&' + $.param({
        offset: this.feedOffset,
        start: this.feedDateStart,
        end: this.feedDateEnd
      }),
      dataType: 'json',
      beforeSend: function() {
        $('#loader').attr('disabled', 'disabled');
        $('#spinner').show();
      },
      complete: function() {
        $('#loader').removeAttr('disabled');
        $('#spinner').hide();
      },
      success: this.display_loaded_articles
    });
  },

  display_loaded_articles: function (data) {
    var rendered_articles =
        new EJS({ 'url': SUBDIR_PREFIX + '/js/templates/article.ejs' })
              .render({ articles: data, service: FEED.feedServiceUrl });
    $('#feed').append(rendered_articles);
  }
};

function scroll_handler(e) {
  clearTimeout(FEED._throttleTimer);
    FEED._throttleTimer = setTimeout(function () {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 50) {
      FEED.feedOffset += 10;
      FEED.get_feed();
    }
  }, FEED._throttleDelay);
}

$(document).ready(function(){
    FEED.get_feed();

    $('#loader').on('click', function(e) {
      e.preventDefault();
      scroll_handler();
    });

    $('#feed-range').daterangepicker({
      ranges: {
        'Сегодня': [new Date(), new Date()],
        'Вчера': [moment().subtract('days', 1), moment().subtract('days', 1)],
        'Последние 7 дней': [moment().subtract('days', 6), new Date()],
        'Последние 30 дней': [moment().subtract('days', 29), new Date()],
        'За этот месяц': [moment().startOf('month'), moment().endOf('month')],
        'За прошлый месяц': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
      },
      opens: 'left',
      format: 'DD/MM/YYYY',
      separator: ' по ',
      minDate: '01/01/2011',
      maxDate: moment().endOf('month'),
      locale: {
        applyLabel: 'Применить',
        clearLabel: 'Очистить',
        fromLabel: 'С',
        toLabel: 'По',
        customRangeLabel: 'Произвольный промежуток',
        daysOfWeek: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт','Сб'],
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        firstDay: 1
      }
    },
    function(start, end) {
      $('#feed-range span').html(start.format('D/M/YYYY') + ' - ' + end.format('D/M/YYYY'));
      $('#feed').html('');
      FEED.feedOffset = 0;
      FEED.feedDateStart = start.format('DD/MM/YYYY');
      FEED.feedDateEnd = end.format('DD/MM/YYYY');
      FEED.get_feed();
    });

    $.getJSON("http://query.yahooapis.com/v1/public/yql/bseu_fm/news?format=json")
        .done(function(data) {
            if (!data.query.count) {
                var err = $('<li><p>Не удалось загрузить ленту новостей...</p></li>');
                $('#rssdata ul.rss-items').append(err).show();
                return;
            }
            var template_path = SUBDIR_PREFIX + "/js/templates/news.ejs",
                rendered_html = new EJS({ url: template_path }).render({ news: data.query.results.item });
            $('#rssdata ul.rss-items').append(rendered_html);
            $('#rssdata ul.rss-items').slideDown();
        });
});
