import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';
import Const from '../../helper/constant';
import FontSize from '../../helper/fontsize';
import MapView from 'react-native-maps';
import SplashScreen from 'react-native-splash-screen'

export default class ReportDetail extends Component{

    static navigationOptions= props => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        return {
            title: props.navigation.state.params.sectionTitle,
            headerStyle: {backgroundColor: Const.lbgray},
            headerTitleStyle: {color: 'white',width:Const.width,fontSize:FontSize.header},
            headerTintColor: 'white',
            headerBackTitle: null,
        }
    }

    componentWillMount(){
        SplashScreen.hide();
    }

    constructor(props){
        super(props);
        this.state = {
            isLoding:false,
            reportId:props.navigation.state.params.reportId,
            title:props.navigation.state.params.reportId,
            token:""
        }
    }

    render(){
        return(
            <View style={style.container}>
                <ScrollView style={{flex:1,marginBottom:5}}
                            bounces={false}
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={true}
                            ref="mainScroll">

                    <View>
                        <Text style={{alignSelf:'center',textAlign:'center'}}>Report Initial Summary Page</Text>
                    </View>
                    <View>
                        <Image style={style.propertyimage}
                               source={require('../../assets/lane.jpeg')}
                               resizeMode='cover'/>
                    </View>
                    <View>
                        <Text style={{alignSelf:'center',textAlign:'center'}}>Client Read only info</Text>
                    </View>
                    <View>
                        <Text style={{alignSelf:'center',textAlign:'center'}}>Agent Read only info</Text>
                    </View>
                    <View style={style.propertyimage}>
                        <MapView
                            initialRegion={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            style={style.map}
                        />
                    </View>
                    <View style={{alignItems:'center'}}>
                        <View style={[style.btnview,{backgroundColor:Const.appblue}]}>
                            <TouchableHighlight style={style.edit} underlayColor='transparent' onPress = {() => this.onSignIn()}>
                                <Text style={style.editText}>
                                    SEND
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <View style={[style.btnview,{backgroundColor:Const.appblue}]}>
                            <TouchableHighlight style={style.edit} underlayColor='transparent' onPress = {() => this.onSignIn()}>
                                <Text style={style.editText}>
                                    EDIT
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <View style={[style.btnview,{backgroundColor:Const.appblue}]}>
                            <TouchableHighlight style={style.edit} underlayColor='transparent' onPress = {() => this.onSignIn()}>
                                <Text style={style.editText}>
                                    PREVIEW
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

}

const style = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',

    },
    propertyimage: {
        flex:1,
        margin:20,
        width:null,
        height:Const.height/3
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    edit: {
        alignItems:'center',
        justifyContent:'center'
    },
    editText: {
        fontWeight:'bold',
        color:'white',
    },
    btnview: {
        width:Const.width-40,
        padding:15,
        margin: 5,
        borderRadius:25,
        backgroundColor:'rgba(231,231,231,1)'
    },
});



