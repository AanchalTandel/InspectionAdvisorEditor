import React,{ Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native';
import Const from '../helper/constant';
import FontSize from '../helper/fontsize';

export default class AccountPayable extends Component{

    static navigationOptions = props => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        return {
            title: 'Account Payables',
            headerStyle: {backgroundColor: Const.lbgray,justifyContent:'space-between'},
            headerTitleStyle: {color: 'white',width:Const.width-90,fontSize:FontSize.header,alignItems:'center',textAlign:'center',marginLeft:10},
            headerTintColor: 'white',
            headerBackTitle: null,
            headerLeft:
                <Image style={style.headerimage} source={require('../assets/menu.png')}
                       resizeMode="contain"/>,
            headerRight:<TouchableHighlight onPress={()=>{that.animate()}} underlayColor="transparent"><Image style={style.headerimage} source={require('../assets/user.png')}
                                                                                                              resizeMode="contain"/></TouchableHighlight>,


        }
    };

    render(){
        return(
            <View style={style.container}>
                <Text>ACCOUNT PAYABLE</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    headerimage: {
        width:30,
        height:30,
        margin:10,
    },

});
