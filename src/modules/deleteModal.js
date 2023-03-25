import {apiURL} from './const.js';
import {fetchRequest} from './fetchRequest.js';

export const modalShow = (err, currentId, currentTitle) => {
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
	modalButtonCancel.classList.add('modal__submit');
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
	return new Promise(resolve => {
		modalButtonConfirm.addEventListener('click', () => {
			fetchRequest(`${apiURL}/${currentId}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);

			overlayDelete.remove();
			document.body.style.overflow = 'auto';
			// TODO update render
		});
		overlayDelete.addEventListener('click', e => {
			const target = e.target;
			if (target === overlayDelete || target.closest('.modal__close')) {
				overlayDelete.remove();
				document.body.style.overflow = 'auto';
				resolve(false);
			}
		});
		modalButtonCancel.addEventListener('click', () => {
			overlayDelete.remove();
			document.body.style.overflow = 'auto';
			resolve(false);
		});
	});
};
