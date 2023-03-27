import {confirmationControl, discountCheckboxControl, fileControl,
	formControl, modalTotalPrice, overlayControl} from './control.js';
import {renderCategories} from './render.js';
import {buttonModalClose, modalCategory, modalCheckbox, modalFieldset, modalForm, modalId,
	modalSubmit, modalTitle, overlay, randomId} from './const.js';

export const showError = message => {
	console.log(message);

	const error = document.createElement('div');
	error.className = 'overlay';

	error.innerHTML = `
		<div class="message">
			<button class="overlay__close-button
				overlay__close-button_small"></button>
			<div class="message__content">
				<svg width="94" height="94" viewBox="0 0 94 94"
					fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M2 2L92 92" stroke="#D80101"
						stroke-width="3" stroke-linecap="round" />
					<path d="M2 92L92 2" stroke="#D80101"
						stroke-width="3" stroke-linecap="round" />
				</svg>
				<p class="message__text">
					${message}
				</p>
			</div>
		</div>
	`;

	const close = error.querySelector('.overlay__close-button');

	document.body.append(error);
	overlayControl(error, close);
};

export const showModal = async (err, data, tbody) => {
	if (err) {
		showError(err);
		return;
	}

	overlay.classList.add('active');
	// const img = modalForm.getElement
	// console.log('img: ', img);
	const newId = randomId;
	data && data.discount ? modalCheckbox.checked = true :
	modalCheckbox.checked = false;
	if (data) {
		modalTitle.textContent = 'Изменить товар';
		modalId.textContent = `${data.id}`;
		modalForm.title.value = `${data.title}`;
		modalForm.category.value = `${data.category}`;
		modalForm.units.value = `${data.units}`;
		modalForm.description.value = `${data.description}`;
		modalForm.count.value = `${data.count}`;
		modalForm.price.value = `${data.price}`;
		modalForm.discount.value = `${data.discount}`;
		modalSubmit.textContent = 'Изменить товар';
	} else {
		modalTitle.textContent = 'Добавить товар';
		modalId.textContent = `${newId}`;
		modalForm.title.value = ``;
		modalForm.category.value = ``;
		modalForm.units.value = ``;
		modalForm.description.value = ``;
		modalForm.count.value = ``;
		modalForm.price.value = ``;
		modalForm.discount.value = ``;
		modalSubmit.textContent = 'Добавить товар';
	}
	modalTotalPrice();
	// ${data && data.image && data.image !== 'image/notimage.jpg' ?
	// ${address}/${data.image} : ''}
	// ${(data ?
	modalCategory.setAttribute('list', 'category-list');
	modalCategory.setAttribute('autocomplete', 'off');
	const datalistCategories = document.createElement('datalist');
	datalistCategories.id = 'category-list';
	modalFieldset.append(datalistCategories);


	overlayControl(overlay, buttonModalClose);
	discountCheckboxControl();
	fileControl();
	renderCategories(datalistCategories);

	if (!data) formControl(modalForm, overlay, 'POST', tbody, null, newId);
	else formControl(modalForm, overlay, 'PATCH', null, data.id, null);
};

export const showConfirmation = (id, row, currentTitle) => {
	const overlayDelete = document.createElement('div');
	const modalDelete = document.createElement('div');
	const modalTitle1 = document.createElement('h2');
	const modalTitle2 = document.createElement('h2');
	const modalText = document.createElement('span');
	const modalButtons = document.createElement('div');
	const modalButtonConfirm = document.createElement('button');
	const modalButtonCancel = document.createElement('button');
	const modalButtonClose = document.createElement('button');

	overlayDelete.append(modalDelete);
	overlayDelete.classList.add('overlay', 'active');
	modalDelete.classList.add('modal');
	modalTitle1.classList.add('modal__title');
	modalTitle2.classList.add('modal__title');
	modalText.classList.add('modal__text');
	modalButtons.classList.add('modal__buttotns-wrapper');
	modalButtonConfirm.classList.add('modal__submit');
	modalButtonCancel.classList.add('modal__cancel');
	modalButtonClose.classList.add('modal__close');
	modalButtonClose.innerHTML = `
	<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="m2 2 20 20M2 22 22 2" stroke="currentColor"
		stroke-width="3" stroke-linecap="round" /></svg>
	`;
	modalDelete.style.textAlign = 'center';
	modalTitle1.style.marginBottom = '20px';
	modalTitle2.style.marginBottom = '20px';
	modalText.style.marginBottom = '10px';
	modalText.style.marginBottom = '10px';
	modalButtons.style.display = 'flex';
	modalButtons.style.justifyContent = 'space-around';
	modalTitle1.textContent = `вы уверены`;
	modalTitle2.textContent = `что хотите удалить товар?`;
	modalText.textContent = `${currentTitle}`;
	modalText.style.fontSize = `16px`;
	modalButtonConfirm.textContent = 'Подтверждаю';
	modalButtonCancel.textContent = 'Отмена';
	modalButtonConfirm.setAttribute('type', 'submit');

	modalButtons.append(modalButtonConfirm, modalButtonCancel);
	modalDelete.append(modalButtonClose, modalTitle1, modalTitle2,
		modalText, modalButtons);
	document.body.append(overlayDelete);

	confirmationControl(overlayDelete, id, row);
};
