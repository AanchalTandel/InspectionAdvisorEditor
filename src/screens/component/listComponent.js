import React,{ Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight
} from 'react-native';
import Const from '../../helper/constant';

export default class ListComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            data:this.props.data
        }
    }

    onPress = (id,name) => {
        this.props.onSelect(id,name)
    }

    render(){
        return(
            <View style={style.container}>
                <TouchableHighlight onPress = {() => this.onPress(this.state.data.id,this.state.data.name)} underlayColor='transparent'>
                <View style={style.outerView}>
                    <View style={style.backgroundView}>
                    <View style={style.lineView}/>
                    <View style={{padding:5}}>
                        <Text style={style.headerText}>{this.state.data.name}</Text>
                    </View>
                        <View style={style.imageOuterView}>
                            <Image style={style.image}
                                   source={require('../../assets/button-arrow.png')}
                                   resizeMode="contain"/>
                        </View>
                    </View>
                </View>
                </TouchableHighlight>
            </View>
        );
    }


}

const style = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'transparent'
    },
    headerText: {
        fontWeight:"300",
        color:Const.appblue,
        fontSize:17,
    },
    outerView: {
        paddingLeft:15,
        paddingRight:15,
        paddingTop:2,
        paddingBottom:2
    },
    backgroundView: {
        flexDirection:'row',
        flex:1,
        backgroundColor:'rgb(235,235,235)'
    },
    lineView: {
        backgroundColor:Const.appblue,
        width:1
    },
    imageOuterView: {
        flex:1,
        alignItems:'flex-end',
        justifyContent:'center',
        paddingRight:5
    },
    image: {
        backgroundColor:'transparent',
        height:15,
        width:9,
        tintColor:Const.appblue
    }

})