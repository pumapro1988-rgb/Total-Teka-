var masonryIsInitialized = false;

$(document).ready(function() {

  if ($(window).width() > 720) {
    init();
  }
});

$(window).resize(function() {

  if (($(window).width() < 721) && masonryIsInitialized) {
    if('.grid') {
      $('.grid').masonry('destroy');
    }
    if('.product-list'){
      $('.product-list').masonry('destroy');
    }
    if('.news-list'){
      $('.news-list').masonry('destroy');
    }
    if('.staff-grid'){
      $('.staff-grid').masonry('destroy');
    }
    masonryIsInitialized = false;
  }
  else if ($(window).width() > 720) {
    init();
  }
});


function init() {
    // NEWS
    var $grid = $('.news-list').masonry({
      gutter: 24,
      columnWidth: '.feed-item'
    });

    $grid.imagesLoaded().progress( function() {
      if (masonryIsInitialized) {
        $grid.masonry('layout');
      }
    });

    // COMMON GRID
    // var $columnElement = $('.item').sort(function(a, b){
    //   return $(a).width() > $(b).width();
    // }).first();

    var $grid2 = $('.grid').masonry({
      gutter: ".gutter-sizer",
      columnWidth: '.item-container'
    });

    $grid2.imagesLoaded().progress(function() {
      if (masonryIsInitialized) {
        $grid2.masonry('layout');
      }
    });

    // PRODUCTS
    var $grid3 = $('.product-list').masonry({
      gutter: '.product-list .gutter-sizer',
      columnWidth: '.product-item'
    });
    $grid3.imagesLoaded().progress(function() {
      if (masonryIsInitialized) {
        $grid3.masonry('layout');
      }
    });

    // STAFF
    var $grid4 = $('.staff-grid').masonry({
      gutter: ".gutter-sizer",
      columnWidth: 1,
    });

    $grid4.imagesLoaded().progress(function() {
      if (masonryIsInitialized) {
        $grid4.masonry('layout');
      }
    });

    // SEARCH
    var $gridManga = $('.grid.manga.search').masonry({
      gutter: ".gutter-sizer",
      columnWidth: '.search-manga'
    });

    $gridManga.imagesLoaded().progress(function() {
      if (masonryIsInitialized) {
        $gridManga.masonry('layout');
      }
    });

    var $gridAnime = $('.grid.anime.search').masonry({
      gutter: ".gutter-sizer",
      columnWidth: '.search-anime'
    });

    $gridAnime.imagesLoaded().progress(function() {
      if (masonryIsInitialized) {
        $gridAnime.masonry('layout');
      }
    });

    masonryIsInitialized = true;
}
