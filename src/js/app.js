import * as flsFunctions from "./modules/functions.js";
import "./modules/jquery-3.7.1.min.js";
import { Fancybox } from "./modules/fancybox.esm.js";
import './components.js';

flsFunctions.isWebp();

Fancybox.bind("[data-fancybox]", {
	closeButton: false,
});

// Import swiper
import Swiper, { Navigation, Pagination, Autoplay, Mousewheel, EffectFade, Thumbs, Scrollbar } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay, Mousewheel, EffectFade, Thumbs, Scrollbar]);

$(document).ready(function () {

	// 1. Элементы, которые слушают событие наведения
	var $triggerLink = $('.header li.submenu-1 > a');
	// 2. Сам выпадающий блок
	var $subMenu = $('.header div.submenu-1');

	// --- ПОЯВЛЕНИЕ МЕНЮ (При наведении на ссылку) ---
	$triggerLink.on('mouseenter', function () {
		$subMenu.addClass('active');
	});

	// --- СКРЫТИЕ МЕНЮ (При уходе курсора) ---

	// Скрываем, если курсор уходит со ССЫЛКИ
	$triggerLink.on('mouseleave', function () {
		// Мы не скрываем немедленно, а ждем, пока курсор уйдет с меню
		// Для этого мы используем задержку, чтобы дать курсору время переместиться на меню

		setTimeout(function () {
			// Проверяем, находится ли курсор сейчас над подменю
			if (!$subMenu.is(':hover')) {
				$subMenu.removeClass('active');
			}
		}, 100); // Небольшая задержка 100ms
	});

	// Скрываем, если курсор уходит с САМОГО ПОДМЕНЮ
	$subMenu.on('mouseleave', function () {
		// При уходе с меню немедленно скрываем его
		$subMenu.removeClass('active');
	});
});

$(window).on('load', function () {
	$('.introVideo').each(function () {
		var video = $(this);
		video[0].play();
	});
});

$(document).ready(function () {
	var $searchButton = $('.headerSearchBtn');
	var $searchBlock = $('.header-search');
	var $searchInput = $searchBlock.find('input[type="search"]');

	// 1. Переключение видимости поиска по клику на кнопку
	$searchButton.on('click', function (e) {
		// Предотвращаем всплытие события, чтобы клик на кнопке не сработал
		// как "клик вне поиска" немедленно после переключения видимости
		e.stopPropagation();

		// Переключаем класс .active
		$searchBlock.toggleClass('active');

		// (Опционально) Если вы хотите, чтобы фокус сразу становился на поле ввода
		if ($searchBlock.hasClass('active')) {
			$searchInput.focus();
		}
	});

	// 2. Скрытие поиска по клику вне его области
	$(document).on('click', function (e) {
		// Проверяем, был ли клик сделан:
		// a) Не на самой кнопке-триггере
		// б) Не внутри самого блока поиска

		if (!$(e.target).closest($searchBlock).length &&
			!$(e.target).closest($searchButton).length) {
			// Если клик был снаружи обоих элементов, удаляем класс active
			if ($searchBlock.hasClass('active')) {
				$searchBlock.removeClass('active');
			}
		}
	});
});

// Инициализация слайдера catalogCardSlider
document.querySelectorAll('.catalogCardSlider').forEach(n => {
	const mySwiperCatalogCard = new Swiper(n, {
		slidesPerView: 1,
		spaceBetween: 10,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		speed: 600,
		scrollbar: {
			el: n?.closest('.catalogCard').querySelector('.swiper-scrollbar'),
			// draggable: true,
		},
	});
});

$('.catalogCard').each(function () {
	var $card = $(this);
	var $swiperWrap = $card.find('.swiper-wrapper');
	var swiperEl = $card.find('.swiper')[0];
	var swiper = swiperEl && swiperEl.swiper;
	if (!swiper) return;
	var slidesCount = $swiperWrap.find('.swiper-slide').length;
	if (slidesCount < 2) return;
	var productUrl = $card.find('.productCardLink').attr('href');
	var $overlayContainer = $('<div class="slider-overlays"></div>').css({
		position: 'absolute',
		top: 0, left: 0,
		width: '100%', height: '100%',
		zIndex: 10,
		pointerEvents: 'none'
	});
	$card.find('.catalogCardT').css('position', 'relative').append($overlayContainer);
	var pct = 100 / slidesCount;
	for (var i = 0; i < slidesCount; i++) {
		var $sect = $('<div class="slider-overlay"></div>').css({
			position: 'absolute',
			top: 0,
			left: (pct * i) + '%',
			width: pct + '%',
			height: '100%',
			background: 'transparent',
			pointerEvents: 'auto',
			cursor: 'pointer'
		}).attr('data-slide-index', i);
		(function (index) {
			$sect.on('mouseenter', function () {
				swiper.slideTo(index);
			});
		})(i);
		$sect.on('click', function (e) {
			if (e.ctrlKey || e.metaKey || e.which === 2) {
				window.open(productUrl, '_blank');
			} else {
				window.location.href = productUrl;
			}
		});
		$overlayContainer.append($sect);
	}
});

// Инициализация слайдера product-thumb-slider
const productSliderThumb = document.querySelector('.productThumbSlider');
var mySwiperProductThumb = new Swiper(productSliderThumb, {
	slidesPerView: 'auto',
	spaceBetween: 15,
	direction: "vertical",
	speed: 600,
	freeMode: true,
	watchSlidesProgress: true,
	mousewheel: true,
	breakpoints: {
		0: {
			direction: "vertical",
			spaceBetween: 10,
		},
		1200: {
			direction: "vertical",
			spaceBetween: 15,
		},
	}
});

// Инициализация слайдера productSlider
const productPageSlider = document.querySelector('.productSlider');
var mySwiperProductPage = new Swiper(productPageSlider, {
	slidesPerView: 1,
	spaceBetween: 10,
	speed: 600,
	freeMode: true,
	effect: 'fade',
	pagination: {
		el: document.querySelector('.productSlider .swiper-pagination'),
		clickable: true,
		type: 'bullets',
	},
	fadeEffect: {
		crossFade: true
	},
	thumbs: { // указываем на превью слайдер
		swiper: mySwiperProductThumb // указываем имя превью слайдера
	},
});

// Инициализация слайдера productRelated
document.querySelectorAll('.productRelated').forEach(n => {
	const productRelated = new Swiper(n, {
		slidesPerView: 4,
		spaceBetween: 3,
		speed: 600,
		navigation: {
			prevEl: n.closest('.sliderW').querySelector('.navArrowPrev'),
			nextEl: n.closest('.sliderW').querySelector('.navArrowNext'),
		},
		breakpoints: {
			0: {
				slidesPerView: 2,
			},
			576: {
				slidesPerView: 3,
			},
			992: {
				slidesPerView: 4,
			},
			1400: {
				slidesPerView: 5,
			},
		},
	});
});

// Burger
const btnMenu = document.querySelector('#toggle');
const menu = document.querySelector('.headerNav');
const bodyEl = document.querySelector('body');
const btnClose = document.querySelector('.headerNavCloseBtn');
const mobMenuOverlay = document.querySelector('.mob-menu-overlay');

const toggleMenu = function () {
	menu.classList.toggle('active');
}
const toggleBurger = function () {
	btnMenu.classList.toggle('active');
}
const bodyOverflow = function () {
	bodyEl.classList.toggle('hidden');
}
const overlayToggle = function () {
	mobMenuOverlay.classList.toggle('active');
}
const menuClose = function () {
	toggleBurger();
	bodyOverflow();
	toggleMenu();
	// overlayToggle();
}

btnMenu?.addEventListener('click', function (e) {
	e.stopPropagation();
	toggleMenu();
	toggleBurger();
	bodyOverflow();
	// overlayToggle();
});

btnClose?.addEventListener('click', function (e) {
	menuClose();
});

let headerSubmenuBack = document.querySelectorAll('.header-submenu-back');
headerSubmenuBack.forEach(el => {
	el.addEventListener('click', () => {
		parent = el.closest('.header-submenu');
		parent.classList.remove('active');
	});
});

// document.addEventListener('click', e => {
//   let target = e.target;
//   let its_nav = target == menu || menu.contains(target);
//   let overlay_is_active = mobMenuOverlay.classList.contains('active');

//   if (!its_nav && overlay_is_active) {
//     toggleMenu();
//     toggleBurger();
//     bodyOverflow();
//     overlayToggle();
//   }
// });