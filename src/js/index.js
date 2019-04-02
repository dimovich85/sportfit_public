import $ from 'jquery';

$(function(){

/* Scroll ease */

let $links = $('.navigation .navigation__ul_nav, .banner__link');

$links.on('click', scroll);

function scroll(e){
	e.preventDefault();
	let offset = 50;
	let href = $(e.target).attr('href') ? $(e.target).attr('href') : $(e.target).parents('a').attr('href');
	let $scrollTo = $(href);

	$('html, body').animate({
		scrollTop: $scrollTo.offset().top - offset
	}, 500);
	return false;
}

/* End Scroll ease */

/* Modal */

// Text variables
let prefixSelector = '.modal-';
let noScroll = 'body_stop_scroll';

// jQ objects
let $modalBtns = $('.btn_modal');
let $closer = $('.controls__btn_closer, .modals, .controls__btn_closer svg, .controls__btn_closer svg path, #close');
let $modalContainer = $('.modals');


	$modalBtns.on('click', function(e){
		$modalContainer.removeClass('d-n');
		$('.modals.active, .modal-content.active').removeClass('active');
		
		let $target = $(e.target);
		let base = ($target.attr('data-target') === undefined)
					? $target.parents('.btn_modal').attr('data-target') 
					: $target.attr('data-target');
		if(base !== 'humb') $('body').addClass(noScroll);
		$(prefixSelector + base).addClass('active');

	});

	$closer.on('click', function(e){
		let $target = $(e.target);
		if( $target.is('.modals') || 
			$target.is('#close, .controls__btn_closer, .controls__btn_closer svg, .controls__btn_closer svg path') || 
			$target.is('.navigation__link, .navigation__li') || 
			$target.is('.modals__h') ){

				$('.modals.active, .modal-content.active').removeClass('active');
				$('body').removeClass(noScroll);
				$modalContainer.addClass('d-n');
		}
		if( $target.is('.navigation__link, .navigation__li') ){
			scroll(e);
		}
		
	});

/* End Modal */

/* Tabs */

let $tabs = $('.modal-schedule__style .tab__head a');

	/*$tabs.on('click', function(e){
		let $target = $(e.target);
		let active = $target.attr('href');
		console.log(active);
		let $tabLi = $('.modal-schedule__style.active .tab__head a').parent('.tab__li');

		$tabLi.each(function(ind, item){
			$(item).removeClass('active');
		});
		$target.parent('.tab__li').addClass('active');

		$('.modal-schedule__style.active .tab__content').each(function(ind, item){
			$(item).removeClass('active');
		});

		let $content = $('.modal-schedule__style.active .tab__content' + active);
		console.log($content);
		if($content.length === 1){
			$content.addClass('active');
		} else{
			$('.modal-schedule__style.active .tab__content')[0].addClass('active');
		}
	});*/

	$tabs.on('click', function(e){
		let $target = $(e.target);
		let whatToShow = $target.attr('href');

		// Ищем верхнюю обертку над табами и потом все табы внутри
		let $tabsLi = $target.parents('.tab__head')
							.find('.tab__li');
		// Убираем все активные табы
		$tabsLi.each(function(ind, item){
			$(item).removeClass('active');
		});

		// Делаем активным таб по которому кликнули
		$target.parent('.tab__li').addClass('active');

		// Проделываем тоже удаление во всем контенте табов
		$('.modal-schedule__style.active .tab__content').each(function(ind, item){
			$(item).removeClass('active');
		});

		// Ищем наш контент
		let $contentActive = $('.modal-schedule__style.active ul' + whatToShow + '.tab__content');
		// Открываем его
		$contentActive.addClass('active');
	});


/* End Tabs */


	
});