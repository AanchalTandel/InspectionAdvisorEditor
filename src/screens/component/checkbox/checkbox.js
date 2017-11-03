import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight
} from 'react-native';
import Const from '../../../helper/constant';
import FontSize from '../../../helper/fontsize';

export default class Checkbox extends Component {

    constructor(props){
        super(props)
        this.state={
            uncheckedimage:props.image,
            checkedimage:props.checkedimage,
            title:props.title,
            key:props.keyText,
            flag:false,
            image:props.image
        }

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            flag:nextProps.checkedStatus
        })
    }


    onCheckboxSelect = (data) => {
        if(!this.state.flag){
            this.setState({
                image:this.state.checkedimage,
                flag: !this.state.flag,
            })
            this.props.status(this.state.key,data,true)
        }else{
            this.setState({
                image:this.state.uncheckedimage,
                flag: !this.state.flag,
            })
            this.props.status(this.state.key,data,false)
        }
    }


    render(){
        return(
            <View style={style.container}>
                <View style={{flexDirection:'row'}}>
                    <View>
                        <TouchableHighlight style={style.checkbox} onPress={()=>this.onCheckboxSelect(this.state.title)} underlayColor='transparent'>
                            <Image style={(this.state.flag) && style.checkimage || style.uncheckimage} resizeMode='contain'
                                   source={(this.state.flag) && this.state.checkedimage || this.state.uncheckedimage}/>
                        </TouchableHighlight>
                    </View>
                    <View style={style.textView}>
                        <Text style={style.texttitle}>{this.state.title}</Text>
                    </View>
                </View>

            </View>
        );
    }

}

const style = StyleSheet.create({
    container: {
        backgroundColor:'white',
        paddingRight:30
    },
    checkbox: {
        height: 20,
        width:20,
        marginTop:10
    },
    uncheckimage: {
        height: null,
        width: null,
        flex: 1,
        tintColor:'gray'
    },
    checkimage: {
        height: null,
        width: null,
        flex: 1,
        tintColor:Const.appblue
    },
    textView: {
        justifyContent:'center',
        alignItems:'center'
    },
    texttitle: {
        marginTop:10,
        marginLeft:5,
        color:Const.appblue,
        fontSize:FontSize.regFont
    }


});


