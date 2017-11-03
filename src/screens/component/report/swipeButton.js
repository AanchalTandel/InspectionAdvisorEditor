import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

export default class SwipeButton extends Component{

    constructor(props){
        super(props);
        this.state = {
            title:props.title,
            color:props.color,
            image:props.image
        }
    }

    render(){
        return(
            <View style={{
                flex:1,
                backgroundColor: this.state.color,
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center',

            }}>
                <View style={{flex:1,alignItems:'center',
                    justifyContent:'center'}}>
                    <Text style={style.title}>{this.state.title}</Text>
                    <Image style={style.image} source={this.state.image}
                           resizeMode="contain"/>
            </View>

            </View>
        );
    }

}

const style = StyleSheet.create({
    image: {
        width:15,
        height:15,
        marginTop:5
    },
    title: {
        color:'white',
        textAlign:'center',
        fontSize:14,
    },

});