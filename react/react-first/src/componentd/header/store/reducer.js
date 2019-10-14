import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	data: []
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_LIST:
			return state.set('data', action.data);
		default:
			return state;
	}
}