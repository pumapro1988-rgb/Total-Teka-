$(document).ready(function () {
  $(".slick.manga").slick({
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 6,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          infinite: false,
          slidesToShow: 5,
          slidesToScroll: 5,
          variableWidth: true,
        },
      },
      {
        breakpoint: 721,
        settings: "unslick",
      },
    ],
  });
  $(".slick.anime").slick({
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          infinite: false,
          slidesToShow: 3,
          slidesToScroll: 3,
          variableWidth: true,
        },
      },
      {
        breakpoint: 721,
        settings: "unslick",
      },
    ],
  });
  qtip_item();
});
