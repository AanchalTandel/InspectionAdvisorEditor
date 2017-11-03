
import React, { Component } from 'react';
import {

    AsyncStorage

} from 'react-native';
import { CallApi } from '../services/apiCall';
import {
    APP_SET_USER_DATA,
    START_LOADING,
    STOP_LOADING,
    USER_EMAIL_CHANGED,
    USER_PASS_CHANGED
} from './type';
import Constant from '../helper/constant'


export const loginUser = (email, password) => {
    return (dispatch, getState) => {

        dispatch({
            type: START_LOADING,
            payload: true,
        });
        debugger

        return CallApi(Constant.baseurl+Constant.signin,'post',{"email":email,"password":password,"isMobile":true},{})
            .then((response)=> {
                let user = {
                    email:email,
                    password:password,
                    token:response.data.token,
                    username:response.data.user.username,
                    profileimage:response.data.user.image_path,
                };
                AsyncStorage.setItem('user',JSON.stringify(user),(res)=>{

                });

                dispatch({
                    type: APP_SET_USER_DATA,
                    payload: response.data,
                });

                return Promise.resolve(response);

            })
            .catch((error)=>{
                return Promise.reject(error);
            })
    };
};

export const emailChanged = (text) => {
    return { type: USER_EMAIL_CHANGED, payload: text };
};

export const startLoading = (text) => {
    return { type: START_LOADING, payload: text };
};

export const stopLoading = (text) => {
    return { type: STOP_LOADING, payload: text };
};

export const passChanged = (text) => {
    return { type: USER_PASS_CHANGED, payload: text };
};