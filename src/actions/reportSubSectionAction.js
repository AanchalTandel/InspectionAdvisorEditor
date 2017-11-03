import React, { Component } from 'react';
import {

    AsyncStorage

} from 'react-native';
import { CallApi } from '../services/apiCall';
import {
    SET_REPORT_SUBSECTION
} from './type';
import Constant from '../helper/constant'
var _ = require('lodash');

export const getReportSubSection = (reportID) => {
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
            return CallApi(Constant.baseurl+Constant.reportsection+reportID+"/"+Constant.subsection,'get',{},{"Authorization":header1})
                .then((response)=> {
                    dispatch({
                        type: SET_REPORT_SUBSECTION,
                        payload: response.report_subsection,
                    });

                    return Promise.resolve(response);
                })
                .catch((error)=>{

                    return Promise.reject(error);
                })
        })
    };
};