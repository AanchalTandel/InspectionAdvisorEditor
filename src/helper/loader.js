
import React, { Component } from 'react';
import { ActivityIndicator,
    View, StatusBar }
    from 'react-native';
import Constant from './constant'

export default class Loader extends Component{

    render(){
        return( (this.props.visible) ?
                <View style={{ position:'absolute', backgroundColor: 'transparent',
                    height: Constant.height, width:Constant.width,
                    alignItems:'center', justifyContent:'center'}}>
                    <StatusBar
                        hidden={false}
                        barStyle="light-content"/>
                    <ActivityIndicator
                        animating={true}
                        size="large"
                        color={Constant.appblue}/>
                </View>
                : null
        );
    }
}

