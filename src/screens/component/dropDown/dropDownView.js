import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Picker,
    Text,
    TouchableHighlight,
    Image
} from 'react-native';
import Const from '../../../helper/constant';
import FontSize from '../../../helper/fontsize';
let views = null;

export default class DropDown extends Component{

    static navigationOptions = {
        header: null,
    }

    constructor(props){
        super(props);
        this.state = {
            user:'',
            views: [],
            opened: false,
            pickeritems:props.item,
            selectedItem:props.selected,
            title:props.title
        }
    }


    onPresSelect = () => {
        this.props.onSelectItem()
    };

    updateUser= (user) => {
        this.setState({
            user:user
        })
    };

    render(){

        return(
            <View style={{flex:1,padding:10}}>
                <View>
                    <Text style={{fontSize:FontSize.regFont}}>{this.state.title}</Text>
                </View>
                {
                    (Const.OS) &&
                        <View>
                            <TouchableHighlight style={style.genderOp}
                                                onPress={()=>this.onPresSelect()}
                                                underlayColor='transparent'>
                                <View style={{flex:1,flexDirection:'row',borderWidth:1,borderColor:Const.darkgray,borderRadius:5,backgroundColor:Const.darkgray}}>
                                    <View style={{justifyContent:'center',marginLeft:5}}>
                                    <Text>{this.props.selected}</Text>
                                    </View>
                                    <View style={{alignItems:'flex-end',justifyContent:'center',flex:1}}>
                                    <Image source={require('../../../assets/ExpandArrow.png')} style={style.iconDownArrow}/>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </View>
                    ||
                    <View style={{borderWidth:1,borderColor:Const.darkgray,height:40,borderRadius:5,marginTop:5,backgroundColor:Const.darkgray}}>
                        <Picker selectedValue = {this.state.user}
                                style={style.picker}
                                onValueChange = {this.updateUser}
                                mode='dropdown'>
                            {
                                this.state.pickeritems.map(function (data, index) {
                                    return <Picker.Item key={index} label={data.option_label} value={data}/>
                                })
                            }
                        </Picker>
                    </View>
                }
                <View style={style.viewContainer}>
                    {views}
                </View>
            </View>
        );
    }

}



const style = StyleSheet.create({
    text: {
        fontSize: 30,
        alignSelf: 'center',
        color: 'red'
    },
    picker:{
        alignItems:'center',
        flex:1
    },
    outer:{
        flex:1,
        flexDirection:'column',
        justifyContent: 'flex-end',
        width:Const.width

    },
    iconDownArrow: {
        width:15,
        height:30,
        marginRight:10,
        tintColor:Const.appblue
    },
    genderOp: {
        flexDirection: 'row',
        justifyContent: 'center',
        height:40,
        backgroundColor:'transparent',
        marginTop:5,
    },
    viewContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'flex-end',
        flexWrap: 'wrap',
        position: 'absolute',
        marginTop:(Const.OS) ? Const.height-215 : Const.height-70,
        backgroundColor: 'white',
        width:Const.width
    },
    buttonPicker:{
        width:Const.width,
        backgroundColor:'black',
    },
});