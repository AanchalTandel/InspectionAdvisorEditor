import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight
} from 'react-native';
import Const from '../../helper/constant';

export default  class SettingComponet extends Component{

    constructor(props){
        super(props);
    }

    onPress = (title) => {
        debugger
        this.props.onPress(title)
    }

    render(){
        return(
            <View>
                <TouchableHighlight onPress={() => {this.onPress(this.props.title)}}>
                    <View>
                        <View style={{padding:15,backgroundColor:'white'}}>

                            <Text style={{fontSize:16,color:Const.appblue}}>
                                {this.props.title}
                            </Text>

                        </View>
                        <View style={{backgroundColor:'lightgray',height:1,marginLeft:5,marginRight:5,borderRadius:1}}/>
                    </View>
                </TouchableHighlight>

            </View>
        );
    }

}

const style = StyleSheet.create({

});
