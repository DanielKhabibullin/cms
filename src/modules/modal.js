import {apiURL} from './const.js';
import {confirmationControl, discountCheckboxControl, fileControl, formControl, modalActivate,
	overlayControl} from './control.js';
import {renderCategories} from './render.js';

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

	const overlay = document.createElement('div');
	overlay.className = 'overlay';
	overlay.classList.add('active');

	const imageContainer = document.querySelector('.image-container');
	if (imageContainer) {
		imageContainer.remove();
	}
	const datalistCategoriesOld = document.querySelector('#category-list');
	if (datalistCategoriesOld) {
		datalistCategoriesOld.remove();
	}

	const modalWrapper = document.createElement('div');
	modalWrapper.classList.add('overlay__modal', 'modal');
	modalWrapper.innerHTML = `
		<button class="modal__close">
			<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="m2 2 20 20M2 22 22 2" stroke="currentColor" stroke-width="3"
				stroke-linecap="round"/></svg>
		</button>
	`;

	const modalTop = document.createElement('div');
	modalTop.className = 'modal_top';

	const modalTitle = document.createElement('h2');
	modalTitle.classList.add('modal__title');
	modalTitle.textContent = data ? 'Изменить товар' : 'Добавить товар';

	modalTop.append(modalTitle);

	if (data) {
		const idWrapper = document.createElement('div');
		idWrapper.classList.add('modal__vendor-code', 'vendor-code');
		idWrapper.textContent = `ID: ${data.id}`;
		modalTop.append(idWrapper);
	}

	const form = document.createElement('form');
	form.classList.add('modal__form');
	form.innerHTML = `
	<fieldset class="modal__fieldset">
		<label class="modal__label modal__label_name" for="title">
			<span class="modal__text">Наименование</span>
			<input class="modal__input" type="text" name="title" id="title"
			autocomplete="off" ${data ? `value="${data.title}"` : ''} required>
		</label>


		<label class="modal__label modal__label_category" for="category">
			<span class="modal__text">Категория</span>
			<input class="modal__input" type="text" name="category" id="category"
			list= "category-list" autocomplete="off" 
			${data ? `value="${data.category}"` : ''} required>
		</label>

		<label class="modal__label modal__label_description" for="description">
			<span class="modal__text">Описание</span>
			<textarea class="modal__input modal__input_textarea" name="description"
			id="description" required>${data ? data.description : ''}</textarea>
		</label>

		<label class="modal__label modal__label_units" for="units">
			<span class="modal__text">Единицы измерения</span>
			<input class="modal__input" type="text" name="units" id="units"
			autocomplete="off" ${data ? `value="${data.units}"` : ''} required>
		</label>

		<div class="modal__label modal__label_discount">
			<label class="modal__text" for="discount">Дисконт</label>
			<div class="modal__checkbox-wrapper">
				<input class="modal__checkbox" type="checkbox" name="discount_check"
				id="discount_check" ${data && data.discount ? 'checked' : ''}>
				<input class="modal__input modal__input_discount" type="number"
				autocomplete="off" name="discount" id="discount"
				${data && data.discount ? `value="${data.discount}"` : `value="0"`}
				${data && data.discount ? '' : 'disabled'}>
			</div>
		</div>


		<label class="modal__label modal__label_count" for="count">
			<span class="modal__text">Количество</span>
			<input class="modal__input  modal__input_count"
			type="number" name="count" id="count"
			autocomplete="off" ${data ? `value="${data.count}"` : ''} required>
		</label>

		<label class="modal__label modal__label_price" for="price">
			<span class="modal__text">Цена</span>
			<input class="modal__input  modal__input_price"
			type="number" name="price" id="price"
			autocomplete="off" ${data ? `value="${data.price}"` : ''} required>
		</label>

		<label tabindex="0" for="image" class="modal__label modal__label_file">
		Добавить изображение</label>
		<input class="modal__file visually-hidden" tabindex="-1" type="file"
		name="image" id="image">
	</fieldset>


	<div class="modal__footer">
		<label class="modal__total">Итоговая стоимость:
			<output class="modal__total-price" name="total">$&nbsp;${(data ?
				data.count * (data.price - data.price *
					data.discount / 100) : 0).toFixed(2)}</output>
		</label>

		<button class="modal__submit" type="submit">
		${data ? 'Изменить товар' : 'Добавить товар'}</button>
	</div>
	`;

	document.body.append(overlay);
	overlay.append(modalWrapper);
	modalWrapper.append(modalTop, form);

	const modalFile = document.querySelector('.modal__label_file');
	const modalFieldset = document.querySelector('.modal__fieldset');
	const modalForm = document.querySelector('.modal__form');
	const modalInputPrice = document.querySelector('.modal__input_price');
	const modalInputCount = document.querySelector('.modal__input_count');
	const modalCheckbox = document.querySelector('.modal__checkbox');
	const modalInputDiscount = document
		.querySelector('.modal__input_discount');
	const buttonAddImage = document.querySelector('.modal__file');
	const datalistCategories = document.createElement('datalist');
	datalistCategories.id = 'category-list';
	modalFieldset.append(datalistCategories);

	const totalPrice = modalForm.querySelector('.modal__total-price');

	if (data && data.image !== 'image/notimage.jpg') {
		const imageContainerNew = document.createElement('div');

		modalFile.textContent = `Изменить изображение`;
		imageContainerNew.classList.add('image-container');
		modalFieldset.append(imageContainerNew);
		const preview = document.createElement('img');
		preview.onload = () => URL.revokeObjectURL(preview.src);
		preview.src = `${apiURL}/${data.image}`;
		imageContainerNew.append(preview);
	}

	modalActivate(modalForm, modalCheckbox, modalInputPrice, modalInputCount,
		modalInputDiscount, totalPrice);
	overlayControl(overlay);
	discountCheckboxControl(modalCheckbox, modalInputDiscount);
	fileControl(buttonAddImage, modalFieldset);
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
