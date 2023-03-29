import {confirmationControl, discountCheckboxControl, fileControl,
	formControl, modalTotalPrice, overlayControl} from './control.js';
import {renderCategories} from './render.js';
import {apiURL, modalCategory, modalCheckbox,
	modalFieldset, modalFile, modalForm, modalId,
	modalInputDiscount,
	modalSubmit, modalTitle, overlay, wrapperId} from './const.js';

export const showError = message => {
	console.warn(message);

	const error = document.createElement('div');
	error.classList.add('overlay__message', 'active');

	error.innerHTML = `
		<div class="message">
			<button class="overlay__message_close">
			<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="m2 2 20 20M2 22 22 2" stroke="currentColor" stroke-width="3"
					stroke-linecap="round"/></svg>
					</button>
			<div class="message__content">
				<svg width="90" height="90" viewBox="0 0 90 90"
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

	document.body.append(error);
	overlayControl(error);
};

export const showModal = async (err, data, tbody) => {
	if (err) {
		showError(err);
		return;
	}

	overlay.classList.add('active');
	const imageContainer = document.querySelector('.image-container');
	if (imageContainer) {
		imageContainer.remove();
	}
	const datalistCategoriesOld = document.querySelector('#category-list');

	if (datalistCategoriesOld) {
		datalistCategoriesOld.remove();
	}
	if (data) {
		modalTitle.textContent = 'Изменить товар';
		wrapperId.style.display = 'flex';
		modalId.textContent = `${data.id}`;
		modalForm.title.value = `${data.title}`;
		modalForm.category.value = `${data.category}`;
		modalForm.units.value = `${data.units}`;
		modalForm.description.value = `${data.description}`;
		modalForm.count.value = `${data.count}`;
		modalForm.price.value = `${data.price}`;
		modalSubmit.textContent = 'Изменить товар';
		if (data.image && data.image !== 'image/notimage.jpg') {
			const imageContainerNew = document.createElement('div');
			modalFile.textContent = `Изменить изображение`;
			imageContainerNew.classList.add('image-container');
			modalFieldset.append(imageContainerNew);
			const preview = document.createElement('img');
			preview.onload = () => URL.revokeObjectURL(preview.src);
			preview.src = `${apiURL}/${data.image}`;
			imageContainerNew.append(preview);
		}
		if (data && data.discount !== 0) {
			modalCheckbox.checked = true;
			modalInputDiscount.removeAttribute('disabled');
			modalForm.discount.value = `${data.discount}`;
		}
	} else {
		modalTitle.textContent = 'Добавить товар';
		wrapperId.style.display = 'none';
		modalForm.title.value = ``;
		modalForm.category.value = ``;
		modalForm.units.value = ``;
		modalForm.description.value = ``;
		modalForm.count.value = ``;
		modalForm.price.value = ``;
		modalSubmit.textContent = 'Добавить товар';
		modalCheckbox.checked = false;
		modalForm.discount.value = ``;
		modalInputDiscount.textContent = ``;
		modalInputDiscount.setAttribute('disabled', true);
	}
	modalTotalPrice();

	modalCategory.setAttribute('list', 'category-list');
	modalCategory.setAttribute('autocomplete', 'off');
	const datalistCategories = document.createElement('datalist');
	datalistCategories.id = 'category-list';
	modalFieldset.append(datalistCategories);

	overlayControl(overlay);
	discountCheckboxControl();
	fileControl();
	renderCategories(datalistCategories);

	if (!data) formControl(modalForm, overlay, 'POST', tbody);
	else formControl(modalForm, overlay, 'PATCH', null, data.id);
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
