import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import * as storage from 'redux-storage'
import debounce from 'redux-storage-decorator-debounce'

/* *
const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware,
	loggerMiddleware
)(createStore);

function configureStore(initialState) {
	return createStoreWithMiddleware(combineReducers(reducers), initialState);
}

const store = configureStore();
export default store;
/* */

// We need to wrap the base reducer, as this is the place where the loaded
// state will be injected.
//
// Note: The reducer does nothing special! It just listens for the LOAD
//       action and merge in the provided state :)
// Note: A custom merger function can be passed as second argument
const reducer = storage.reducer(rootReducer);

// Now it's time to decide which storage engine should be used
//
// Note: The arguments to `createEngine` are different for every engine!
import createEngine from 'redux-storage-engine-localstorage';
let engine = createEngine('exafolio');

// nicht jedesmal gleich state in session speichern, sondern erst nach 500ms inaktivität
engine = debounce(engine, 500);

// And with the engine we can create our middleware function. The middleware
// is responsible for calling `engine.save` with the current state afer
// every dispatched action.
//
// Note: You can provide a list of action types as second argument, those
//       actions will be filtered and WON'T trigger calls to `engine.save`!
const middleware = storage.createMiddleware(engine);

let middlewares = [
	thunkMiddleware,
	middleware,
];

if (process.env.NODE_ENV !== 'production') {
	let createLogger = require('redux-logger');
	middlewares.push(createLogger());
}

// As everything is prepared, we can go ahead and combine all parts as usual
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// At this stage the whole system is in place and every action will trigger
// a save operation.
//
// BUT (!) an existing old state HAS NOT been restored yet! It's up to you to
// decide when this should happen. Most of the times you can/should do this
// right after the store object has been created.

// To load the previous state we create a loader function with our prepared
// engine. The result is a function that can be used on any store object you
// have at hand :)
const load = storage.createLoader(engine);
load(store);

// Notice that our load function will return a promise that can also be used
// to respond to the restore event.
load(store)
// .then((newState) => console.log('Loaded state:', newState))
	.then(() => console.log('Loaded last app state'))
	.catch(() => console.log('Failed to load previous state'));

export default store;
/* */