$(document).ready(function () {
  $('.nav__icon').on('click', function () {
    $('.nav__list').removeClass('hide');
    $('.nav__list').addClass('show');
  });

  $('.nav__close').on('click', function () {
    $('.nav__list').removeClass('show');
    $('.nav__list').addClass('hide');
  });
});