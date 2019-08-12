import * as constants from './constants';
import { fromJS } from 'immutable';
import axios from 'axios';

export const changeList = (data) => ({
  type: constants.CHANGE_LIST,
  data: fromJS(data)
});

export const getHeaderList = () => {
	return (dispatch) => {
		axios.get('/api/header.json').then((res) => {
			const data = res.data;
			dispatch(changeList(data.data));
		}).catch(() => {
			console.log('error');
		})
	}
};