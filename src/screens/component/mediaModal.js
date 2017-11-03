import React,{ Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View
} from 'react-native';
import * as Progress from 'react-native-progress';
import Const from '../../helper/constant';

export default class MediaModal extends Component {

    constructor(props){
        super(props)
        debugger
        this.state = {
            textSms:props.textSms,
            progress:props.progress
        }
    }

    componentWillReceiveProps(nextProps) {
        this.state = {
            textSms:nextProps.textSms,
            progress:nextProps.progress
        }
    }



    render(){
        return(
            <View style={{alignItems:'center',}}>
                <View style={{alignItems:'center'}}>
                    <Progress.Bar progress={this.state.progress} width={Const.width-50}
                                  height={this.state.progress === 1 || this.state.progress === 0 ? 0 : 6}
                                  borderColor={this.state.progress === 1 || this.state.progress === 0 ? 'white' : 'rgba(0, 122, 255, 1)'}
                    />
                </View>
                <Text style={style.title}>{this.state.textSms}</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        alignItems:'center',
    },
    title: {
        color:'black',
        fontWeight:'500',
        fontSize:20
    },
    subtitle: {
        color:'gray',
        fontWeight:'500',
        fontSize:16
    },
    content: {
        color:'gray',
        fontSize:14
    }
})