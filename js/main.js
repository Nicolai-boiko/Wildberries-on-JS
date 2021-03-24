const mySwiper = new Swiper('.swiper-container', {
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.slider-button-next',
		prevEl: '.slider-button-prev',
	},
});

const buttonCart = document.querySelector('.button-cart');
const modalCart = document.querySelector('#modal-cart');
const modalClose = document.querySelector('.modal-close');

const openModal = () => {
	modalCart.classList.add('show')
};

const closeModal = () =>  {
	modalCart.classList.remove('show')
}

modalCart.addEventListener('click', (e) => {
	if (e.target.classList.contains('overlay') || e.target.classList.contains('modal-close')) {
		closeModal()
	};
});
buttonCart.addEventListener('click', openModal);

//scroll smooth

{
	const scrollLinks = document.querySelectorAll('a.scroll-link');
	scrollLinks.forEach(link => 
		link.addEventListener('click', function (e) {
			e.preventDefault();
			const id = link.getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}));
}

const more = document.querySelector('.more');
const navigationLink = document.querySelectorAll('.navigation-link');
const longGoodsList = document.querySelector('.long-goods-list');

const getGoods = async function () {
	const result = await fetch('db/db.json');
	if (!result.ok) {
		throw "Ошибка 100500"
	}
	return result.json();
};

const createCard = function (objCard) {
	const card = document.createElement('div');
	card.className = 'col-lg-3 col-sm-6';
	card.innerHTML = `
		<div class="goods-card">
			${objCard.label ? `<span class="label">${objCard.label}</span>` : ''}
			<img src="db/${objCard.img}" alt="${objCard.name}" class="goods-image">
			<h3 class="goods-title"${objCard.name}</h3>
			<p class="goods-description">${objCard.description}</p>
			<button class="button goods-card-btn add-to-cart" data-id="${objCard.id}">
			<span class="button-price">$${objCard.price}</span>
			</button>
		</div>
		`;

		return card;
}

const renderCards = function(data) {
	longGoodsList.textContent = '';
	const cards = data.map(createCard);
	longGoodsList.append(...cards);
	document.body.classList.add('show-goods');
};

more.addEventListener('click', function(e) {
	e.preventDefault();
	getGoods().then(renderCards);
	body.scrollIntoView({
		behavior: 'smooth',
		block: 'start',
	});
});

const filterCards = function(field, value) {
	getGoods()
		.then(data => data.filter(good => good[field] === value))
		.then(renderCards)
};

navigationLink.forEach(link => link.addEventListener('click', function (e) {
	e.preventDefault();
	const field = link.dataset.field;
	const value = link.textContent;
	filterCards(field, value);
}));