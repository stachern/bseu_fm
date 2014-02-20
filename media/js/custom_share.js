$(window).load(function() {
  $('.b-share').find('a[data-service="vkontakte"]')
               .html('<i class="fa fa-vk fa-2x"></i>');
  $('.b-share').find('a[data-service="facebook"]')
               .html('<i class="fa fa-facebook-square fa-2x"></i>');
  $('.b-share').find('a[data-service="twitter"]')
               .html('<i class="fa fa-twitter-square fa-2x"></i>');
  $('.b-share').find('a[data-service="gplus"]')
               .html('<i class="fa fa-google-plus-square fa-2x"></i>');
});
