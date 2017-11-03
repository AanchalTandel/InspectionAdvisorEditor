import React from 'react';
import { StatusBar ,View, AsyncStorage} from 'react-native';
import { Provider } from 'react-redux';
import {persistStore, autoRehydrate} from 'redux-persist'
import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppReducer from '../reducers';
import AppWithNavigationState from './navigator';

export default class App extends React.Component {
    store = createStore(AppReducer,applyMiddleware(thunk),autoRehydrate());
    persisstore = persistStore(this.store, {blacklist: ['nav'], storage: AsyncStorage});

    render() {
        return (
            <Provider store={this.store} persistor={this.persisstore}>
                <View style={{flex:1}} >
                    <StatusBar hidden={false} backgroundColor="transparent" barStyle="light-content"/>
                <AppWithNavigationState />
                </View>
            </Provider>
        );
    }
}