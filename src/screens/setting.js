import React,{ Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { NavigationActions,Transitioner } from 'react-navigation';
import Cell from '../screens/component/settingCell';
import Const from '../helper/constant';
import FontSize from '../helper/fontsize';
import Header from '../screens/component/header';

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
        this.props.navigation.dispatch(NavigationActions.back({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'LogIn' })
            ]
        }))
        // this.props.navigation.go
    }

    onSelect = (title) => {
        //alert(title)
        if(title == "Profile/Account"){
            this.props.navigation.navigate('AccountSetting');
        }else if(title == "General"){
            this.props.navigation.navigate('GeneralSetting');
        }
    }


    render(){
        return (
            <View style={style.container}>

                <Header title="Settings" onBackPressed={this.onBack}/>
                <Cell title="General" onPress={this.onSelect}/>
                <Cell title="Profile/Account" onPress={this.onSelect}/>
            </View>
        )
    }

}

const style = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white'
    }

});