/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
} from 'react-native';
import App from './src/screens/app';
import colorPicker from './src/screens/report/colorPicker';


AppRegistry.registerComponent('TextEditorApp', () => colorPicker);

