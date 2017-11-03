import React,{ Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View
} from 'react-native';

export default class SendReportModal extends Component {

    constructor(props){
        super(props)
        debugger
        this.state = {
            limit:this.props.limit,
            client:this.props.client
        }
    }

    componentWillReceiveProps(nextProps) {
        this.state = {
            limit:nextProps.limit,
            client:nextProps.client
        }
    }



    render(){
        return(
            <View style={{alignItems:'center',}}>
                <Image source={require('..//../assets/attention.png')}
                       style={{height:30,width:30}}/>
                <Text style={style.title}>Your about to send a report.</Text>
                <Text style={style.subtitle}>You have {this.state.limit} report(s) left to send.</Text>
                <Text style={style.content}>Your sending this report to the following recipients:</Text>
                <Text>Agent:No agent assigned.</Text>
                <Text>Client:{this.state.client}</Text>
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