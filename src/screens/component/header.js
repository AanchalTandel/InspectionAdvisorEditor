import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';
import Const from '../../helper/constant'

export default class Header extends Component{

    constructor(props){
        super(props);
    }

    onBack = () => {
        debugger
        this.props.onBackPressed()
    }

    render(){
        return(
            <View style={{
                height:64,
                backgroundColor: Const.lbgray,
            }}>

                <View style={style.outerview}>
                    <TouchableHighlight onPress={()=>this.onBack()}>
                    <Image style={style.headerimage} source={require('../../assets/back.png')}
                           resizeMode="contain"/>
                    </TouchableHighlight>
                <Text style={style.title}>{this.props.title}</Text>
                </View>
            </View>
        );
    }

}

const style = StyleSheet.create({
    headerimage: {
        width:30,
        height:20,
        margin:5,
        marginTop:20
    },
    title: {
        flex:1,color:'white',
        textAlign:'center',
        fontSize:20,
        fontWeight:'500',
        marginRight:30,
        marginTop:20
    },
    outerview: {
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    }

});