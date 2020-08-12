//import { DynamicObject } from '../../types/interfaces';

// import {
// 	addLinker,
// 	addPending,
// 	removePending,
// 	removePendings
// } from '../actions/pendingActions';
import { Middleware } from 'redux';
 export type DynamicObject<T> = { [key: string]: T };
const findLinkers = (type: string, linkers: DynamicObject<any>) => {
	return Object.keys(linkers).filter(key => linkers[key].includes(type));
};

const getActionName = (actionType: string) => {
	return actionType
		.split('_')
		.slice(0, -1)
		.join('_');
};

export default (): Middleware => store => next => action => {
	const { type, request, meta = {} } = action;
	const state: DynamicObject<any> = store.getState().pending;

	// const relevantLinkers = findLinkers(type, state.linkers)

	return next(action);
};




// export type DynamicObject<T> = { [key: string]: T };
// // import {
// // 	addLinker,
// // 	addPending,
// // 	removePending,
// // 	removePendings
// // } from '../actions/pendingActi;ons'
// import { Middleware } from 'redux';



// export default (): Middleware => store => next => action => {
// 	const { type, request, meta = {} } = action;
// 	const state: DynamicObject<any> = store.getState().pending;
// 	return next(action);
// };
