if ($(window).width() < 721) {
  $( ".list-container.manga" ).each(function() {
    $(this).find('.item-container.manga').filter(':odd').addClass('odd');
  });

  $( ".list-related-contents" ).each(function() {
    $(this).find('.item-container.manga').filter(':odd').addClass('odd');
  });
}
else {
  $( ".list-container.manga" ).each(function() {
    $(this).find('.item-container.manga').filter(':odd').removeClass('odd');
  });

  $( ".list-related-contents" ).each(function() {
    $(this).find('.item-container.manga').filter(':odd').removeClass('odd');
  });
}

$(window).on('resize', function() {
  if ($(window).width() < 721) {
    $( ".list-container.manga" ).each(function() {
      $(this).find('.item-container.manga').filter(':odd').addClass('odd');
    });
    $( ".list-related-contents" ).each(function() {
      $(this).find('.item-container.manga').filter(':odd').addClass('odd');
    });
  }
  else {
    $( ".list-container.manga" ).each(function() {
      $(this).find('.item-container.manga').filter(':odd').removeClass('odd');
    });
    $( ".list-related-contents" ).each(function() {
      $(this).find('.item-container.manga').filter(':odd').removeClass('odd');
    });
  }
});