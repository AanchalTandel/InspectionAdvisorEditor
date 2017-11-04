import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Platform
} from 'react-native';
import Const from '../../helper/constant';
import FontSize from '../../helper/fontsize';


export default class TextInputInfo extends Component{


    constructor(props){
        super(props);
        this.state = {
            placeHolder:props.placeholder,
            textValue:props.text,
            key:props.keytext
        }
    }

    componentWillMount(){

    }

    componentWillReceiveProps(nextProps) {
        this.setState ({
            textValue:nextProps.text,
            key:nextProps.keytext
        })
    }

    updateData = (key,value) => {
        this.props.onUpdateData(key,value)
    }


    render(){
        return(
            <View style={style.container}>
                <View style={(Const.OS)? [style.textview,{flexDirection:'row',}]:[{flexDirection:'row',
                    width:Const.width-40,
                    margin: 10,
                    borderRadius:25,
                    backgroundColor:Const.darkgray
                }]}>
                    <TextInput
                        ref = "2"
                        style={{borderRadius:25,fontSize:FontSize.regFont,paddingLeft:15,flex:1,justifyContent:'flex-end',
                            backgroundColor: 'transparent',
                            height: Platform.OS === 'ios' ? 15 : null,
                            margin: Platform.OS === 'ios' ? null : 2 }}
                        placeholder={this.state.placeHolder}
                        placeholderTextColor={Const.appblue}
                        underlineColorAndroid="transparent"
                        secureTextEntry={false}
                        onChangeText={(text) => {
                            this.setState({
                                textValue:text
                            })
                            this.updateData(this.state.key,text)
                        }
                        }
                        value={this.state.textValue}
                    />
                </View>
            </View>
        );
    }

}


const style = StyleSheet.create({
    container: {
        alignItems:'center',
        backgroundColor:'transparent'
    },
    textview: {
        width:Const.width-40,
        padding:15,
        margin:7,
        borderRadius:25,
        backgroundColor:Const.darkgray
    },

});