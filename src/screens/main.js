import React, { Component } from 'react';
import {
    AsyncStorage
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import LocalAuth from 'react-native-local-auth';
import Login from './login';
import Dashboard from './dashboard';
import Loader from '../helper/loader';
let logging = false;

export default  class Main extends Component {

    constructor(props){
        super(props);
        this.state={
            isLoding:true
        }
    }

    static navigationOptions = {
        header: null,
    };


    pressHandler() {
        LocalAuth.authenticate({
            reason: 'this is a secure area, please authenticate yourself',
            falbackToPasscode: true,    // fallback to passcode on cancel
            suppressEnterPassword: true // disallow Enter Password fallback
        })
            .then(success => {
                debugger
               // alert('Authenticated Successfully')
                AsyncStorage.getItem('user').then((value) => {

                    debugger
                    if(value) {
                        logging = true;
                    }
                    this.setState({
                        isLoding: false
                    });
                }).catch((err)=>{
                    debugger
                    logging = false;
                });
            })
            .catch(error => {
                debugger
                alert('Authentication Failed', error.message)
            })
    }

    componentWillMount(){
        SplashScreen.hide();
        AsyncStorage.getItem('user').then((value) => {
            if(value) {
                logging = true;
            }
            this.setState({
                isLoding: false
            });
        }).catch((err)=>{
            logging = false;
        });
      //  this.pressHandler()
    }

    render() {
        if(this.state.isLoding){
            return<Loader visible="true"/>
        }else{
            if(logging) {
                return(<Dashboard {...this.props}/>)
            }else{
                return(<Login  {...this.props}/>)
            }
        }
    }

}