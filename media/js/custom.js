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

SUBDIR_PREFIX = '/fm';

$(function () {
	$('.date_has_event').each(function () {
		// options
		var distance = 10;
		var time = 250;
		var hideDelay = 500;

		var hideDelayTimer = null;

		// tracker
		var beingShown = false;
		var shown = false;

		var trigger = $(this);
		var popup = $('.events ul', this).css('opacity', 0);

		// set the mouseover and mouseout on both element
		$([trigger.get(0), popup.get(0)]).mouseover(function () {
			// stops the hide event if we move from the trigger to the popup element
			if (hideDelayTimer) clearTimeout(hideDelayTimer);

			// don't trigger the animation again if we're being shown, or already visible
			if (beingShown || shown) {
				return;
			} else {
				beingShown = true;

				// reset position of popup box
				popup.css({
					bottom: 20,
					left: -76,
					display: 'block' // brings the popup back in to view
				})

				// (we're using chaining on the popup) now animate it's opacity and position
				.animate({
					bottom: '+=' + distance + 'px',
					opacity: 1
				}, time, 'swing', function() {
					// once the animation is complete, set the tracker variables
					beingShown = false;
					shown = true;
				});
			}
		}).mouseout(function () {
			// reset the timer if we get fired again - avoids double animations
			if (hideDelayTimer) clearTimeout(hideDelayTimer);

			// store the timer so that it can be cleared in the mouseover if required
			hideDelayTimer = setTimeout(function () {
				hideDelayTimer = null;
				popup.animate({
					bottom: '-=' + distance + 'px',
					opacity: 0
				}, time, 'swing', function () {
					// once the animate is complete, set the tracker variables
					shown = false;
					// hide the popup entirely after the effect (opacity alone doesn't do the job)
					popup.css('display', 'none');
				});
			}, hideDelay);
		});
	});
});

$(document).ready(function(){
$('#tog').click(function(){
var img = $('.my_img');
if(!img.hasClass('_show'))
{
img.show();
img.addClass('_show');
}
else
{
img.hide();
img.removeClass('_show');
}
});
});

$(document).ready(function(){
$('#tog2').click(function(){
var img = $('.my_img2');
if(!img.hasClass('_show'))
{
img.show();
img.addClass('_show');
}
else
{
img.hide();
img.removeClass('_show');
}
});
});

$(document).ready(function(){
$('#tog3').click(function(){
var img = $('.my_img3');
if(!img.hasClass('_show'))
{
img.show();
img.addClass('_show');
}
else
{
img.hide();
img.removeClass('_show');
}
});
});




$(document).ready(function(){
$('#tog11').click(function(){
var img = $('.my_img4');
if(!img.hasClass('_show'))
{
img.show();
img.addClass('_show');
}
else
{
img.hide();
img.removeClass('_show');
}
});
});

$(document).ready(function(){
$('#tog4').click(function(){
var img = $('.my_img5');
if(!img.hasClass('_show'))
{
img.show();
img.addClass('_show');
}
else
{
img.hide();
img.removeClass('_show');
}
});
});

$(document).ready(function(){
$('#tog5').click(function(){
var img = $('.my_img6');
if(!img.hasClass('_show'))
{
img.show();
img.addClass('_show');
}
else
{
img.hide();
img.removeClass('_show');
}
});
});

$(document).ready(function(){
$('#tog6').click(function(){
var img = $('.my_img7');
if(!img.hasClass('_show'))
{
img.show();
img.addClass('_show');
}
else
{
img.hide();
img.removeClass('_show');
}
});
});

$(document).ready(function(){
$('#tog7').click(function(){
var img = $('.my_img8');
if(!img.hasClass('_show'))
{
img.show();
img.addClass('_show');
}
else
{
img.hide();
img.removeClass('_show');
}
});
});

$(document).ready(function(){
$('#tog12').click(function(){
var img = $('.my_img9');
if(!img.hasClass('_show'))
{
img.show();
img.addClass('_show');
}
else
{
img.hide();
img.removeClass('_show');
}
});
});

$(document).ready(function(){
$('#tog8').click(function(){
var img = $('.my_img10');
if(!img.hasClass('_show'))
{
img.show();
img.addClass('_show');
}
else
{
img.hide();
img.removeClass('_show');
}
});
});

$(document).ready(function(){
$('#tog9').click(function(){
var img = $('.my_img11');
if(!img.hasClass('_show'))
{
img.show();
img.addClass('_show');
}
else
{
img.hide();
img.removeClass('_show');
}
});
});

$(document).ready(function(){
$('#tog10').click(function(){
var img = $('.my_img12');
if(!img.hasClass('_show'))
{
img.show();
img.addClass('_show');
}
else
{
img.hide();
img.removeClass('_show');
}
});
});