import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Cell from '../screens/component/settingCell';
import Const from '../helper/constant';
import FontSize from '../helper/fontsize';
import Header from '../screens/component/header';

const navigateAction = NavigationActions.navigate({
    routeName: 'Main',
    params: {},

    // navigate can have a nested navigate action that will be run inside the child router
    action: NavigationActions.navigate({ routeName: 'Main'})
})

export default class Setting extends Component{

    static navigationOptions = props => {
        return {
            title: 'Setting',
            headerStyle: {backgroundColor: Const.lbgray},
            headerTitleStyle: {color: 'white',width:Const.width,fontSize:FontSize.header},
            headerTintColor: 'white',
            headerBackTitle: null,
        }
    }

    constructor(props){
        super(props);
    }




    onBack = () => {
        this.props.navigation.goBack(null);
    }

    onSelect = (title) => {

         if(title == "Log Out"){
             return AsyncStorage.removeItem('user', (err) => {
                 this.props.navigation.dispatch(NavigationActions.reset({
                     index: 0,
                     actions: [
                         NavigationActions.navigate({ routeName: 'LogIn' })
                     ]
                 }))
                 return Promise.resolve(true)
             });
        }
        else if(title == "Update Profile"){
             this.props.navigation.navigate('UpdateProfile');
         }
    }

    render(){
        return(
            <View style={style.container}>
                <Header title="Account Settings" onBackPressed={this.onBack}/>
                <Cell title="Update Profile" onPress={this.onSelect}/>
                <Cell title="Log Out" onPress={this.onSelect}/>


            </View>
        );
    }


}

const style = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white'
    }

});