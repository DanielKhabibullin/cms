import './index.html';
import './index.scss';
import {modalActivate} from './modules/control.js';
import {getTotalPrice} from './modules/render.js';
import './modules/const.js';
import {getGoods} from './modules/fetchRequest.js';

const init = () => {
	// renderGoods(data);
	getGoods();
	getTotalPrice();
	modalActivate();
};
init();
