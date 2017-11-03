import React, { Component } from 'react';
import {
    AsyncStorage
} from 'react-native';
import { CallApi } from '../services/apiCall';
import {
    SET_REPORT
} from './type';
import {
    getReportList
} from './reportListAction'
import Constant from '../helper/constant'


export const getReport = (reportID) => {
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
            return CallApi(Constant.baseurl+Constant.reportDel + reportID ,'get',{},{"Authorization":header1})
                .then((response)=> {
                    dispatch({
                        type: SET_REPORT,
                        payload: response.report,
                    });

                    return Promise.resolve(response);
                })
                .catch((error)=>{

                    return Promise.reject(error);
                })
        })
    };
};


export const updateReport = (reportID,data) => {
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
            return CallApi(Constant.baseurl+Constant.reportDel + reportID ,'put',data,{"Authorization":header1})
                .then((response)=> {
                    dispatch(
                        getReportList()
                    );
                    return Promise.resolve(response);
                })
                .catch((error)=>{
                    return Promise.reject(error);
                })
        })
    };
};



export const addReport = (reportInfo) => {
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
            return CallApi(Constant.baseurl+Constant.reports,'post',reportInfo,{"Authorization":header1})
                .then((response)=> {

                    dispatch(
                        getReportList()
                    );

                    return Promise.resolve(response);
                })
                .catch((error)=>{

                    return Promise.reject(error);
                })
        })
    };
};