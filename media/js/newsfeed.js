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

function show_comments(article_id) {
  $('#vk-comments').html('');
  VK.Widgets.Comments('vk-comments', { limit: 10, width: '530', attach: '*' }, article_id);
  $('#commentModal').modal('show');
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
        maxDate: '31/12/2014',
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
});

$('#rssdata').ready(function(){
    $.getJSON('http://pipes.yahoo.com/pipes/pipe.run?_id=3f5db5135e0d956c2ef490cd1ae22878&_render=json&_callback=?' ,function(data){
        var rendered_html =  new EJS({'url': SUBDIR_PREFIX + '/js/templates/news.ejs'}).render({news: data.value.items});
        $('#rssdata ul.rss-items').append(rendered_html);
        $('#rssdata div.loading').fadeOut();
        $('#rssdata ul.rss-items').slideDown();
    });
});
