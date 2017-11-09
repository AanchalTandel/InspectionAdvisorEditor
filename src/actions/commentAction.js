import React, { Component } from 'react';
import {
    AsyncStorage
} from 'react-native';
import { CallApi } from '../services/apiCall';
import {
    SET_COMMENT
} from './type';
import Constant from '../helper/constant'


export const getComment = (subSectionID) => {
    return (dispatch, getState) => {

        let token = "";
        let header1 = "";
        return AsyncStorage.getItem('user').then((value) => {

            if(value != null) {
                let parsedValue = JSON.parse(value);
                token = parsedValue.token;
            }

            header1 = "Bearer " + token

        }).then(()=>{
            return CallApi(Constant.baseurl+Constant.comments+ subSectionID,'get',{},{"Authorization":header1})
                .then((response)=> {
                debugger
                    // dispatch({
                    //     type: SET_CLIENT,
                    //     payload: response.client,
                    // });

                    return Promise.resolve(response);
                })
                .catch((error)=>{
                    return Promise.reject(error);
                })
        })
    };
};