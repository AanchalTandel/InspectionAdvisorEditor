import React,{Component} from 'react';
import {
    StyleSheet,
    Image
} from 'react-native';
import { addNavigationHelpers,StackNavigator,TabNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Const from '../helper/constant';
import main from './main'
import login from './login';
import dashboard from './dashboard';
import reportList from './report/reportList';
import webview from './report/previewReport';
import reportdetail from './report/reportDetail';
import editreport from './report/editReport';
import form from './report/inspectionForm';
import reportSubSection from './report/reportSubSection';
import accountPayable from './accountPayables';
import scheduler from './scheduler';
import dashboardtemp from './dashboardtemp';
import setting from './setting';
import accountsetting from './accountSetting';
import generalsetting from './generalSetting';
import updateProfile from './updateProfile';
import propertyInfo from '../screens/report/information/propertyInfo';
import clientInfo from '../screens/report/information/clientInfo';
import agentInfo from '../screens/report/information/agentInfo';
import inspectionReport from '../screens/report/information/inspectionReport';
import invoice from '../screens/report/information/invoice';
import createreport from '../screens/report/createReport';


const StackModalNavigator = (routeConfigs, navigatorConfig) => {
    const CardStackNavigator = StackNavigator(routeConfigs, navigatorConfig);
    const modalRouteConfig = {};
    const routeNames = Object.keys(routeConfigs);

    for (let i = 0; i < routeNames.length; i++) {
        modalRouteConfig[`${routeNames[i]}Modal`] = routeConfigs[routeNames[i]];
    }

    const ModalStackNavigator = StackNavigator({
        CardStackNavigator: { screen: CardStackNavigator },
        ...modalRouteConfig
    }, {
        mode: 'modal',
        headerMode: 'none'
    });

    return ModalStackNavigator;
};


const INSPECTION = StackNavigator({

   ReportList: { screen : reportList,
        navigationOptions: {
            gesturesEnabled: false,
        },
    },

    Preview: {
        screen : webview
    },

    ReportDetail: {screen : reportdetail,
        navigationOptions: {
            gesturesEnabled: false,
        },
    },

    EditReport: {screen : editreport,
        navigationOptions: {
            gesturesEnabled: false,
        },
    },

    ReportSubSection: {screen : reportSubSection,
        navigationOptions: {
            gesturesEnabled: false,
        },

    },

    Form: {screen : form,
        navigationOptions: {
            gesturesEnabled: false,
        },
    },

    PropertyInfo: {screen : propertyInfo,
        navigationOptions: {
            gesturesEnabled: false,
        },

    },

    ClientInfo: {screen : clientInfo,
        navigationOptions: {
            gesturesEnabled: false,
        },

    },

    AgentInfo: {screen : agentInfo,
        navigationOptions: {
            gesturesEnabled: false,
        },

    },

    InspectionReport: {screen : inspectionReport,
        navigationOptions: {
            gesturesEnabled: false,
        },

    },

    Invoice: {screen : invoice,
        navigationOptions: {
            gesturesEnabled: false,
        },

    },

    CreateReport: { screen : createreport,
        navigationOptions: {
            gesturesEnabled: false,
        },
    },
},{
    navigationOptions:{
        tabBarLabel: 'INSPECTION',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../assets/N_Inspectionl.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    }
});

const SCHEDULER = StackNavigator({
    Scheduler: { screen : scheduler,
        gesturesEnabled: false,
        navigationOptions: {
        },
    },
},{
    navigationOptions:{
        tabBarLabel: 'SCHEDULER',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../assets/N_Scheduler.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    }
});

const DASHBOARD = StackNavigator({
    Dashboardtemp: { screen : dashboardtemp,
        gesturesEnabled: false,
        navigationOptions: {
        },
    },
},{
    navigationOptions:{
        tabBarLabel: 'DASHBOARD',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../assets/N_Dashboard.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    }
});


const ACCOUNTPAYABLES = StackNavigator({
    AccountPayable: { screen : accountPayable,
        gesturesEnabled: false,
        navigationOptions: {
        },
    },
},{
    navigationOptions:{
        tabBarLabel: 'ACCOUNT PAYABLES',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../assets/N_AccountPayables.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    }
});

const tabComponent =  TabNavigator({
    TabOne: { screen: SCHEDULER },
    TabTwo: { screen: DASHBOARD },
    TabThree: { screen: INSPECTION},
    TabFour: { screen: ACCOUNTPAYABLES},
},{
    tabBarLabel:'home',
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: Const.appblue,
        inactiveTintColor:'white',
        style: {
            backgroundColor: 'gray',
        },
        labelStyle:{
            fontSize:(Const.OS) && null || 10

        }

    },
});

export const AppNavigator = StackModalNavigator({

    Main: {
        screen : main,
    },
    LogIn: { screen : login,
        navigationOptions: {
            gesturesEnabled: false,
        },
    },
    Dashboard: { screen : dashboard,
        navigationOptions: {
            gesturesEnabled: false,
        },

    },
    Setting: {screen : setting,
        navigationOptions: {
            gesturesEnabled: false,
        },
    },
    AccountSetting:  {screen : accountsetting,
        navigationOptions: {
            gesturesEnabled: false,

        },
    },
    GeneralSetting:  {screen : generalsetting,
        navigationOptions: {
            gesturesEnabled: false,
        },
    },
    UpdateProfile:  {screen : updateProfile,
        navigationOptions: {
            gesturesEnabled: false,
        },

    },
    TabComponent: {
        screen : tabComponent,
    }


},{
    navigationOptions:{
        header: null,
    }
});




const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    },
});


const AppWithNavigationState = ({ dispatch, nav }) => (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);

