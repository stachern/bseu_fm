var GOOGLE_CALENDAR_API_KEY = 'AIzaSyAjNlouztahjz5-YKiKfBPIEwVYV-FZnYo'
var GOOGLE_CALENDAR_ID = 'petrichenko_e@bseu.by'

var eventClicked = function(e) {
  window.open(e.url, 'gcalevent', 'width=700,height=600');
  return false;
};

var calendar = {
  header: {
    left:   'prev,next today',
    center: 'title',
    right:  'month,agendaWeek,agendaDay'
  },
  views: {
    month: {
      timeFormat: 'H:mm'
    }
  },
  googleCalendarApiKey: GOOGLE_CALENDAR_API_KEY,
  events: {
    googleCalendarId: GOOGLE_CALENDAR_ID
  },
  eventClick:  eventClicked,
  defaultDate: moment(),
  editable:    false
}

$(document).ready(function() {
  $('#calendar').fullCalendar(calendar);
});
