import { applyMiddleware, createStore, compose, Store } from 'redux'
import { persistStore, persistReducer, Persistor } from 'redux-persist'
import { createBrowserHistory, History } from 'history'
import storage from 'redux-persist/lib/storage'
import { routerMiddleware } from 'connected-react-router'

import rootSaga from './../sagas'
import createRootReducer from './../reducers'
import middleware, { sagaMiddleware } from './middleware'
interface IHotNodeModule extends NodeModule {
  hot: { accept: Function }
}

declare let module: IHotNodeModule
export const history = createBrowserHistory()

const reducer = persistReducer(
  {
    key: 'sean-test',
    storage,
    whitelist: ['cache'],
  },
  createRootReducer(history)
)

const composeEnhancer =
  ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose) ||
  compose

const globalAny: any = global

const configStore = (
  history?: History,
  initialState = {}
): { persistor: Persistor; store: Store } => {
  middleware.push(routerMiddleware(history as History))

  const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(...middleware))
  )

  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    module.hot.accept('./../reducers', () => {
      store.replaceReducer(require('./../reducers').default)
    })
  }

  return {
    persistor: persistStore(store),
    store,
  }
}

const { store, persistor } = configStore()

globalAny.store = store

export { store, persistor }
