import './index.html';
import './index.scss';
import './modules/const.js';
import './modules/render.js';
import {buttonAdd, overlay, searchInput, tbody} from './modules/const.js';
import {addButtonControl, modalActivate, rowControl,
	searchControl} from './modules/control.js';
import './modules/render.js';
import {renderGoods} from './modules/render.js';

const init = () => {
	overlay.classList.remove('active');
	renderGoods(tbody);
	rowControl(tbody);
	addButtonControl(buttonAdd, tbody);
	searchControl(searchInput, tbody);
	modalActivate();
};
init();
