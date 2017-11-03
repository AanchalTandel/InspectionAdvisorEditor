/*
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    Text,
    Image,
    View
} from 'react-native';
import Const from '../../../helper/constant';

export default class DashboardComponent extends Component {


    constructor(props){
        super(props)
        this.state = {
            image:props.image,
            title:props.title,
            selectedimage:props.selectedimage,
        }
    }

    onPress  = (selected) => {
       this.setState({
           image:this.state.selectedimage
       })
        this.props.onSelect(selected)
    }

    render() {

        return (
            <TouchableHighlight onPress = {() => this.onPress(this.state.title)} underlayColor = 'transparent'>
            <View style={styles.componentView}>
                <Image source={this.state.image} resizeMode="contain"/>
                <Text style={styles.dashboardTitle}>{this.state.title}</Text>
            </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    componentView: {
        width:Const.width/3.2,
        height:Const.width/3,
        padding:1,
        justifyContent:'space-around',
        alignItems:'center'
    },
    dashboardTitle: {
        fontSize:13,
        color:Const.appblue,
        textAlign:'center'
    }

});

