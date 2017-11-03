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


/*
keyPrefix: prefix is dynamic => orgId/<orgID>/inspections/reportId/<reportId>/section/<sectionID>/subsection/<subsectionId>/<name of file>

- keyPrefix,    <-- this should depend on whats being uploaded
- bucket,   in4staging
- region eg:"us-east-1",    us-west-1
- accessKey,  AKIAIEIOEOULREVVNHUQ
- secretKey.  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
 */


export default class Dashboard extends Component{

    constructor(props){
        super(props);
    }

    static navigationOptions = props => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        return {
            title: 'Dashboard',
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

                <Text>DASHBOARD</Text>

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
    btnview: {
        width:Const.width-40,
        padding:15,
        margin: 7,
        borderRadius:25,
        backgroundColor:'rgba(231,231,231,1)',
        alignItems:'center'
    },
    editText: {
        fontWeight:'bold',
        color:'white',
        textAlign:'center',
    },
    edit: {
        alignItems:'center',
        justifyContent:'center',
    },
});
