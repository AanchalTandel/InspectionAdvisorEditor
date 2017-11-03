import React, { Component } from 'react';
import {
    AsyncStorage
} from 'react-native';
import { CallApi } from '../services/apiCall';
import {
    SET_AGENT
} from './type';
import {
    updateReport
} from './reportAction'
import Constant from '../helper/constant'


export const getAgentInformation = (reportID) => {
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
            return CallApi(Constant.baseurl+Constant.reportDel + reportID + "/" + Constant.agent,'get',{},{"Authorization":header1})
                .then((response)=> {
                    dispatch({
                        type: SET_AGENT,
                        payload: response.agent,
                    });
                    return Promise.resolve(response);
                })
                .catch((error)=>{
                    return Promise.reject(error);
                })
        })
    };
};


export const addAgentInformation = (reportID,agentInfo) => {
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
            debugger
            return CallApi(Constant.baseurl+Constant.agent,'post',agentInfo,{"Authorization":header1})
                .then((response)=> {

                    return dispatch(
                        updateReport(reportID,{'agent_id':response.data.agent.id})
                    );

                    // dispatch(
                    //     getAgentInformation()
                    // );

                    return Promise.resolve(response);
                })
                .catch((error)=>{
                    return Promise.reject(error);
                })
        })
    };
};


export const updateAgentInformation = (reportID,agentID,agentInfo) => {

    debugger

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
            return CallApi(Constant.baseurl+Constant.agent + "/" + agentID,'put',agentInfo,{"Authorization":header1})
                .then((response)=> {

                    dispatch(
                        updateReport(reportID,{'agent_id':response.data.agent.id})
                    );

                    // dispatch(
                    //     getAgentInformation()
                    // );
                    return Promise.resolve(response);
                })
                .catch((error)=>{
                    return Promise.reject(error);
                })
        })
    };
};

export const getAllAgent = () => {
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
            return CallApi(Constant.baseurl+Constant.agent,'get',{},{"Authorization":header1})
                .then((response)=> {
                    return Promise.resolve(response);
                })
                .catch((error)=>{
                    return Promise.reject(error);
                })
        })
    };
};




export const filterAgent = (agentInfo) => {
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
            return CallApi(Constant.baseurl+Constant.agent + "/search?query=" + agentInfo,'get',{},{"Authorization":header1})
                .then((response)=> {
                   debugger
                    return Promise.resolve(response);
                })
                .catch((error)=>{
                debugger
                    return Promise.reject(error);
                })
        })
    };
};
