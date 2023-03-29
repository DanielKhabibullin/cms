import './index.html';
import './index.scss';
import {tbody} from './modules/const.js';
import {addButtonControl, rowControl,
	searchControl} from './modules/control.js';
import {renderGoods} from './modules/render.js';

const init = () => {
	renderGoods(tbody);
	rowControl(tbody);
	addButtonControl(tbody);
	searchControl(tbody);
};
init();
