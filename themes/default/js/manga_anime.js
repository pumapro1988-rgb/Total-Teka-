function removeActiveClass(selectedElement) {
  selectedElement.removeClass('active');
}

function getSlickOptions() {
  return {
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 3,
    variableWidth: true,
    responsive: [{
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        variableWidth: true,
      }
    },{
      breakpoint: 721,
      settings: "unslick"
    }]
  };
}

function masonryReInit() {
  var $grid = $('.grid').masonry({
    gutter: ".gutter-sizer",
    isFitWidth: true,
    columnWidth: '.item'
  });

  $grid.imagesLoaded().progress(function() {
    if (masonryIsInitialized) {
      $grid.masonry('layout');
    }
  });
}

function slickReInit() {
  if ($('.slick.anime').length) $('.slick.anime').slick(getSlickOptions);
  if ($('.slick.manga').length) $('.slick.manga').slick(getSlickOptions);
}

var targetUrl = window.location.href;

function destroyInfiniteScroll() {
  $('.manga-anime-container').infinitescroll('destroy');
}

function filterOdds(){
  if ($(window).width() < 721) {
    $( ".list-container.manga" ).each(function() {
      $(this).find('.item-container.manga').filter(':odd').addClass('odd');
    });
  }
  else {
    $( ".list-container.manga" ).each(function() {
      $(this).find('.item-container.manga').filter(':odd').removeClass('odd');
    });
  }

  $(window).on('resize', function() {
    if ($(window).width() < 721) {
      $( ".list-container.manga" ).each(function() {
        $(this).find('.item-container.manga').filter(':odd').addClass('odd');
      });
    }
    else {
      $( ".list-container.manga" ).each(function() {
        $(this).find('.item-container.manga').filter(':odd').removeClass('odd');
      });
    }
  });
}

function infiniteScrollInit() {
  $container = $('.manga-anime-container');

  $container.infinitescroll({
    navSelector: '.pager',
    nextSelector: '.pager #next a',
    itemSelector: '.item-container',
    loading: {
        selector: '#load-more',
        finishedMsg: lang[0],
        img: '/themes/default/images/loading.gif',
        msgText: ''
      },
    path: function (currentPageNumber) {
        var queryString = targetUrl.split('?')[1];
        var pageQueryString;
        if (queryString) {
          pageQueryString = '&p=';
        } else {
          pageQueryString = '?p=';
        }
        var customPage = targetUrl + pageQueryString + currentPageNumber;
        return customPage;
      }
    },
    function( newElements ) {
      showOrHideEmptyMessage();
      var $newElems = $( newElements ).css({ opacity: 0 });
      $newElems.imagesLoaded(function(){
        $newElems.animate({ opacity: 1 });
        if (masonryIsInitialized) {
          $('.grid').masonry( 'appended', $newElems );
        }
        filterOdds();
      });
    }
  );
}

function showOrHideEmptyMessage()
{
  if ($('.manga-anime-container').find('.item').length === 0) {
    $('#empty-contents-text').show();
  } else {
    $('#empty-contents-text').hide();
  }
}

$(document).ready(function() {
  showOrHideEmptyMessage();
  if ($(window).width() > 720) {
    masonryReInit();
  }

  // infinity scroll
  //infiniteScrollInit();

  $('.manga-anime-sort').click(function(event) {
    event.preventDefault();

    var baseUrl = $(this).attr('href');
    targetUrl = baseUrl;
    removeActiveClass($('.manga-anime-sort'));
    removeActiveClass($('.alphabet'));
    destroyInfiniteScroll();
    $(this).addClass('active');

    $.get(targetUrl, function(htmlData) {
      $('.list-container.grid').replaceWith(htmlData);
      showOrHideEmptyMessage();

      //infiniteScrollInit();
      if ($(window).width() > 720) {
        masonryReInit();
        slickReInit();
      }
      filterOdds();
    });
  });

});