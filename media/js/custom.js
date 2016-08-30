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

// student council
$(function() {
  collapse();
});

var collapse = function() {
  $('.i2style').click(function() {
    $(this).parent().find('img').toggleClass('hide');
  });
};

$(function() {
    $('#partners').tinycarousel({
        animation: true,
        animationTime: 500,
        interval: true,
        intervalTime: 2000,
        infinite: true
    });
});

$(function() {
    $('.academics-alphabet').find('ul').find('li').click(function() {
        $('.academics-container').find('div').hide();
        var thisItem = $(this).attr('class');
        $('.academics-' + thisItem).show();
    });
});

$(function () {
    function setCurrentYear(currentYear) {
        $('[data-toggle="tab"]').each(function () {
			var baseAttr = $(this)
					.attr('href')
					.replace(/[0-9]/g, '') + currentYear;
			$(this).attr('href', baseAttr);
		});
	}
	var date = new Date();
	var thisYear = date.getFullYear();
	setCurrentYear(thisYear);
	$('.board-' + thisYear).show();
	$('.honour-board-select').val(thisYear).change(function () {
		var currentYear = $(this).val();
		$('#honours-board-tab li').removeClass('active');
		$('.default-tab').addClass('active');
		$('.tab-pane').removeClass('active');
		$('#staff' + currentYear).addClass('active');
		$('.tab-content').hide();
		$('.board-' + currentYear).fadeIn(500);
		setCurrentYear(currentYear);
	});
});
