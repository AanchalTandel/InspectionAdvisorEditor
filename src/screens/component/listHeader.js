import React,{ Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class ListHeader extends Component {

    constructor(props){
        super(props);
        this.state = {
            title:this.props.title
        }
    }

    render(){
        return(
            <View style={style.container}>
                <Text style={style.headerText}>{this.state.title}</Text>
            </View>
        );
    }


}

const style = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'transparent',
        paddingLeft:15,
        paddingRight:15,
        marginTop:5
    },
    headerText: {
        fontWeight:'bold',
        color:'rgb(167,147,82)',
        fontSize:20
    }

})

