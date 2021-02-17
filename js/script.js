window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        })
    })
})

$(document).ready(function () {



	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tabs_active)', function () {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});



	function toggleSlide(item) {
		$(item).each(function (i) {
			$(this).on('click', function (e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		})
	};
	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');

	
	// modal

	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn('slow');
	});
	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #thanks, #order').fadeOut('slow');
	});
	$('.button_mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		})
	});



	function validateForms(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				  },
				phone: "required",
				email: {
					required: true,
					email: true,
				}
			},
			messages: {
				name: {
					required: "Пожалуйсто введите своё имя",
					minlength: jQuery.validator.format("Веедите {0} символ!")
				},
				phone: "Пожалуйста введите свой номер телефона",
				email: {
				  required: "Пожалуйсто введите свою почту",
				  email: "Неправильно введён адрес почты"
				}
			}
		});
	}
	validateForms('#consultation form');
	validateForms('#order form');

	$('input[name=phone]').mask("+7 (999) 999-99-99");

	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');


			
			$('form').trigger('reset');
		});
		return false;
	});


	//scroll

	$(window).scroll(function() {
		if ($(this).scrollTop() > 2600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	$("a[href=#catalog], a[href=#up], a[href=#footer], a[href=#portners]").click(function(){
		const _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
	});
});


