import React, { Component } from 'react';
import {

    AsyncStorage

} from 'react-native';
import { CallApi } from '../services/apiCall';
import {
    SET_FORM_ELEMENT
} from './type';
import Constant from '../helper/constant'
var _ = require('lodash');

export const getFormElement = (subSectionID) => {
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

            return CallApi(Constant.baseurl+Constant.reportSubSection+subSectionID+"/"+Constant.elements,'get',{},{"Authorization":header1})
                .then((response)=> {

                    dispatch({
                        type: SET_FORM_ELEMENT,
                        payload: response.elements,
                    });

                    return Promise.resolve(response);
                })
                .catch((error)=>{

                    return Promise.reject(error);
                })
        })
    };
};