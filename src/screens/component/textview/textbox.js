import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text
} from 'react-native';
import Const from '../../../helper/constant';
import FontSize from '../../../helper/fontsize';

export default class TextBox extends Component {

    constructor(props){
        super(props);
        this.state = {
            title:props.title,
            key:props.keyText,
            textValue:props.text
        }
    }

    updateData = (key,value) => {
        this.props.onUpdateData(key,value)
    }

    componentWillReceiveProps(nextProps) {
        this.setState ({
            textValue:nextProps.text,
            key:nextProps.keyText
        })
    }


    render(){
        return(
            <View style={style.outerView}>
                <View style={{justifyContent:'center'}}>
                <Text style={{fontSize:FontSize.regFont}}>{this.state.title}</Text>
                </View>
                <View style={{justifyContent:'center',marginTop:5}}>
                <TextInput  underlineColorAndroid='transparent'
                            style={style.input}
                            value={this.state.textValue}
                            onChangeText={(text) => {
                                this.setState({
                                    textValue:text
                                })
                                this.updateData(this.state.key,text)
                            }}/>
                </View>
            </View>
        );
    }

}

const style = StyleSheet.create({
    outerView: {
        backgroundColor:'white',
        padding:10
    },
    input: {
        width:Const.width-40,
        marginRight:10,
        minHeight: 40,
        borderColor: Const.darkgray,
        borderWidth: 1,
        borderRadius:5,
        backgroundColor:Const.darkgray,
        fontSize:FontSize.regFont,
        padding:5
    }

});