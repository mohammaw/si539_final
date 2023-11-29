$(function() {
  var elem = $("#settings");

  $(document).on("click", function(e) {
    if (!$(e.target).hasClass('start-button')) {
      elem.slideUp();
    }
  });

  function openSettings() {
    if (elem.is(":visible")) {
      elem.slideUp();
    } else {
      const zIndex = findMaxZIndex() + 1;
      elem.css("z-index", zIndex);
      elem.slideDown();
    }
  }

  // Set title for the settings button
  $("#settings-button").attr("title", "Open Settings").on("click", openSettings);

  elem.click(function(e) {
    e.stopPropagation();
  });

  // Set title for the slide toggle button
  $(".slide-toggle").attr("title", "Toggle Slide").click(function() {
    $("#settings1").animate({
      width: "toggle"
    });
  });

  // Set title for another slide toggle button
  $(".slide-toggle1").attr("title", "Toggle Another Slide").click(function() {
    $("#settings2").animate({
      width: "toggle"
    });
  });

});

function closeStart() {
  const $elem = $("#settings");
  $elem.slideUp();
}
