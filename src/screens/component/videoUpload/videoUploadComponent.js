import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';
import Const from '../../../helper/constant';
import FontSize from '../../../helper/fontsize';

export default class VideoUpload extends Component {

    constructor(props){
        super(props);
        this.state = {
            text: '',
            title:props.title,
            video: props.videos
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState ({
            video:nextProps.videos
        })
    }

    selectVideoTapped = () => {
        this.props.onVideoUpload();
    };

    selectVideoDelete = () => {
        this.props.onVideoDelete();
    }

    render(){

        return(
            <View style={style.container}>
                <View style={{flexDirection:'row',backgroundColor:Const.lightgray,margin:10,borderRadius:7,padding:10}}>
                    <View style={{height:100,width:130,backgroundColor:Const.darkgray,borderRadius:5,borderWidth:1,borderColor:'rgb(194,209,296)'}}>
                        <Image  style={{flex:1,height:null,width:null}} source={this.state.image}
                                onError={(e) => {
                                    this.setState({
                                        image: require('../../../assets/lane.jpeg')
                                    })
                                }}/>
                    </View>
                    <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <View style={{padding:3,width:'70%'}}>
                            <TouchableHighlight onPress={()=>this.selectVideoDelete()} underlayColor="transparent">
                                <View style={{backgroundColor:'rgb(206,206,206)',justifyContent:'center',alignItems:'center',width:'100%',height:30,borderRadius:15}}>
                                    <Text style={{color:'rgb(226,98,98)'}}>Delete</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={{padding:3,width:'70%'}}>
                            <TouchableHighlight onPress={()=>this.selectVideoTapped()} underlayColor="transparent">
                                <View style={{backgroundColor:'rgb(206,206,206)',justifyContent:'center',alignItems:'center',width:'100%',height:30,borderRadius:15}}>
                                    <Text style={{color:Const.appblue}}>Update</Text>
                                </View>
                            </TouchableHighlight>
                        </View>

                    </View>
                </View>
            </View>

        );

    }

}

const style = StyleSheet.create({

    container: {
        backgroundColor:'white',
        flex:1
    },
    text: {
        padding: 10,
        fontSize: 14,
    },

})

