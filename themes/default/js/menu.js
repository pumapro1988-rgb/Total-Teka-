//------------------------------------------------------------------------------
// Default click behavior
//------------------------------------------------------------------------------
$(document).on("click touchend", function(e) {
  if($(e.target).is(".mah-nav-right .mah-toggle-menu a i")) {
    $('.extra-menu').toggleClass("active");
  } else {
    $('.extra-menu').removeClass("active");
  }

  if(!$(e.target).is(".mobile-sub") && !$(e.target).is(".search-icon") &&
    $(e.target).parents(".mobile-sub").length === 0 && $(e.target).parents(".search-icon").length === 0) {
    closeSearchBar();
  }
});

//------------------------------------------------------------------------------
// Side menu
//------------------------------------------------------------------------------
var lastClickTimestamp = 0;

function openSideMenu() {
  $('.sidemenu').addClass("active");
  $('.fade').addClass("active");
  $('html').addClass("scroll-disable");
  $('body').addClass("scroll-disable");
  $(document).trigger('sidemenu-opened');
  $(document).on("touchmove", function(evt) { evt.preventDefault(); });
  $(document).on("touchmove", ".sidemenu ul", function(evt) { evt.stopPropagation(); });
}

function closeSideMenu() {
  $('.sidemenu').removeClass("active");
  $('.fade').removeClass("active");
  $('html').removeClass("scroll-disable");
  $('body').removeClass("scroll-disable");
  $(document).trigger('sidemenu-closed');
  $(document).on("touchmove", "html", function(evt) {  evt.stopPropagation(); return true; });
}

$(document).on('touchstart mousedown', '.fade', function(event){
  lastClickTimestamp = (new Date()).getTime();
  
});

$(document).on('touchend mouseup', '.fade', function(event){
  event.stopPropagation();
  event.preventDefault();

  if(event.handled) {
    return false;
  }

  clickDuration = (new Date()).getTime() - lastClickTimestamp;
  var closeMenuWithinMillisecs = 500;

  if (clickDuration < closeMenuWithinMillisecs) {
    closeSideMenu();
  }

  event.handled = true;
});

$(".mah-nav-phone .mah-toggle-menu a i").click(function() {
    var isActive = $('.sidemenu').hasClass('active');
    if (isActive) {
      closeSideMenu();
    } else {
      openSideMenu();
    }
});

// Always close the sidemenu whenever the searchbar is opened
$(document).on('searchbar-opened', function() {
  closeSideMenu();
});

// Prevent scroll on the fade element
$('.fade').on('touchmove', function(e) {
  e.preventDefault();
});

//------------------------------------------------------------------------------
// Search bar
//------------------------------------------------------------------------------
function openSearchBar() {
  $('.mobile-sub').addClass('active');
  $('#main-search').focus();
  if (isSearchPage()) {
    $('.search-push').show();
  }
  $(document).trigger('searchbar-opened');
}

function closeSearchBar() {
  $('#main-search').blur();
  $('.mobile-sub').removeClass('active');
  if (isSearchPage()) {
    $('.search-push').hide();
  }
  $(document).trigger('searchbar-close');
}

$('.search-icon').on("click", function() {
  var isSearchActive =  $('.mobile-sub').hasClass('active');

  // Search bar behavior:
  // 1) whatever happens, if it's closed, we open it.
  if (!isSearchActive) {
    openSearchBar();
    return;
  }
  // Anywhere else we close it.
  closeSearchBar();
});

// Always close the search whenever the side menu is opened
$(document).on('sidemenu-opened', function() {
  closeSearchBar();
});

// On the search page start with the search bar out by default
$(document).ready(function(){
  if (isSearchPage()) {
    $('.mobile-sub').addClass('active');
  }
});

// And re-open the search after we close the menu
$(document).on('sidemenu-closed', function() {
  if (isSearchPage()) {
    openSearchBar();
  }
});

// closes side-menu on iOS Safari when back button is pressed.
$(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) {
      closeSideMenu();
    }
});