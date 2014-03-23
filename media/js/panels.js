$(function() {
  function showPanel(panel) {
    panel.slideToggle("slow");
    $(this).toggleClass("active");
  }

  $(".btn-slide").click(function(e) {
    e.preventDefault();
    showPanel($("#panel1"));
  });
  $(".btn-slide2").click(function(e) {
    e.preventDefault();
    showPanel($("#panel2"));
  });
  $(".btn-slide3").click(function(e) {
    e.preventDefault();
    showPanel($("#panel3"));
  });
});
