import {data} from '../script.js';
import {modalCheckbox, modalForm, modalInputDiscount,
	overlay,
	spanId, tbody} from './const.js';
import {createRow} from './createElements.js';
import {getTotalPrice, goodNumberChange} from './render.js';

export const addItemData = item => {
	data.push(item);
	console.log('data: ', data);
};
overlay.classList.remove('active');
export const modalControl = (buttonAdd, overlay, randomId) => {
	const openModal = () => {
		overlay.classList.add('active');
		spanId.textContent = `${randomId}`;
	};

	const closeModal = () => {
		overlay.classList.remove('active');
	};

	buttonAdd.addEventListener('click', openModal);

	overlay.addEventListener('click', e => {
		const target = e.target;
		if (target === overlay || target.closest('.modal__close')) {
			closeModal();
		}
	});
	return {
		closeModal,
	};
};

export const addItemPage = (item, tbody) => {
	tbody.append(createRow(item));
};

export const formControl = (form, tbody, closeModal, randomId) => {
	form.addEventListener('submit', e => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const newItem = Object.fromEntries(formData);
		newItem.id = randomId;
		console.log('newItem: ', newItem);
		addItemPage(newItem, tbody);
		addItemData(newItem);
		form.reset();
		closeModal();
		getTotalPrice();
		goodNumberChange();
	});
};

modalForm.price.addEventListener('blur', () => {
	modalForm.total.value = `$ ${modalForm.price.value * modalForm.count.value}`;
});
modalForm.count.addEventListener('blur', () => {
	modalForm.total.value = `$ ${modalForm.price.value * modalForm.count.value}`;
});

tbody.addEventListener('click', e => {
	const target = e.target;
	if (target.closest('.table__btn_del')) {
		// target.closest('.table__body tr').remove();
		const row = target.closest('tr');
		const currentId = +row.querySelector('td').textContent;
		data.splice(data.findIndex(item => item.id === currentId), 1);
		console.log(data);
		row.remove();
		getTotalPrice();
		goodNumberChange();
	}
});

modalCheckbox.addEventListener('change', () => {
	if (modalCheckbox.checked) {
		modalInputDiscount.removeAttribute('disabled');
		modalInputDiscount.setAttribute('required', true);
	} else {
		modalInputDiscount.value = '';
		modalInputDiscount.setAttribute('disabled', true);
	}
});

