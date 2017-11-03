import React, { Component } from 'react';
import {

    AsyncStorage

} from 'react-native';
import { CallApi } from '../services/apiCall';
import {
    SET_REPORT_LIST,
    DELETE_REPORT
} from './type';
import Constant from '../helper/constant'
var _ = require('lodash');

export const getReportList = () => {
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
            return CallApi(Constant.baseurl+Constant.reports,'get',{},{"Authorization":header1})
                .then((response)=> {
                    dispatch({
                        type: SET_REPORT_LIST,
                        payload: response.reports.data,
                    });

                    return Promise.resolve(response);

                })
                .catch((error)=>{
                    return Promise.reject(error);
                })
        })
    };
};


export const deleteReportList = (reportid) => {
  return (dispatch, getState) => {
    let token = "";
    let header1 = "";

      let reportList = _.cloneDeep(getState().reportList.reports);
      let deleteReport = _.find(reportList, {id:reportid});
      let newReportList = _.without(reportList, deleteReport);

      dispatch({
          type: SET_REPORT_LIST,
          payload: newReportList,
      });


    return AsyncStorage.getItem('user').then((value) => {

        if(value != null) {
            let parsedValue = JSON.parse(value);
            token = parsedValue.token;
        }

        header1 = "Bearer " + token

    }).then(()=>{
        return CallApi(Constant.baseurl+Constant.reportDel+reportid,'delete',{},{"Authorization":header1})
            .then((response)=> {
                return Promise.resolve(response);

            })
            .catch((error)=>{
                return Promise.reject(error);
            })
    })


  };
};
