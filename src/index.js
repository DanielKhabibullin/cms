import './index.html';
import './index.scss';
import {overlay, tbody} from './modules/const.js';
import {addButtonControl, modalActivate, rowControl,
	searchControl} from './modules/control.js';
import {renderGoods} from './modules/render.js';

const init = () => {
	overlay.classList.remove('active');
	renderGoods(tbody);
	rowControl(tbody);
	addButtonControl(tbody);
	searchControl(tbody);
	modalActivate();
};
init();
