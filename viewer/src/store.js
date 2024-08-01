import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import createRootSaga from './sagas/rootSaga';
import initHotkeys from './hotkeys';

const configure = (eventMiddleware = undefined) => {
    const sagaMiddleware = createSagaMiddleware();
    const Store = configureStore({
        reducer: rootReducer,
        middleware: () => {
            return [
                // store => next => action => {
                //     const state = store.getState();
                //     console.log(action);
                //     next(action);
                // },
                thunk,
                sagaMiddleware,
                eventMiddleware
            ];
        }
    });
    sagaMiddleware.run(createRootSaga(Store.dispatch));
    initHotkeys(Store);
    return Store;
};

export default configure;