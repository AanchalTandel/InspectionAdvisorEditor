import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Switch,
    Image,
    ToastAndroid,
    Alert,
} from 'react-native';
import Const from '../helper/constant';
import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux';
import { loginUser,
    emailChanged,
    passChanged
} from "../actions/loginAction"

class Login extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);
        this.state = {
            email:this.props.email || '',
            password:this.props.password || '',
            isLoading: false
        }
    }

    componentDidMount() {
        SplashScreen.hide();
    }

    validate = () =>
    {
        let flag = false;
        if(this.props.email.length <=0 || this.props.password.length<=0 )
        {
            if(Const.OS){
                this.showAlert("Username Or Password can not be null.");
            }else{
                ToastAndroid.show("Username Or Password can not be null.", ToastAndroid.SHORT);
            }

        }else{
            flag = true
        }
        return flag;
    };


    onSignIn = () =>
    {

        if(this.validate()) {
            this.props.loginUser(this.props.email, this.props.password)
                .then(() => {
                    this.props.navigation.navigate('Dashboard');
                })
                .catch((err) => {
                    if (Const.OS) {
                        this.showAlert("Invalid username or password.");
                    } else {
                        ToastAndroid.show("Invalid username or password.", ToastAndroid.SHORT);
                    }
                });
        }
    };

    showAlert(textToMsg){
        Alert.alert('',textToMsg,[{text: 'OK', onPress: () => console.log('OK Pressed')},],{ cancelable: false })
    }

    focusNextField = (nextField) => {
        this.refs[nextField].focus();
    };

    render() {

        return (
            <View style={styles.container}>
                <View style={{alignItems:'center'}}>
                    <View style={styles.logo}>
                        <Image style={{height:null,width:null,flex:1}} source={require('../assets/logo.png')}
                               resizeMode="contain"/>
                    </View>

                    <View style={styles.inputview}>

                        <View style={(Const.OS)? [styles.textview,{flexDirection:'row',}]:[{flexDirection:'row',
                            width:Const.width-80,
                            margin: 10,
                            borderRadius:25,
                            backgroundColor:'rgba(231,231,231,1)'
                        }]}>
                            <Image style={{height:20,width:20, alignSelf: 'center', marginLeft: (Const.OS)?0:20}} source={require('../assets/username.png')}
                                   resizeMode="stretch"/>

                            <TextInput
                                ref = "1"
                                style={{borderRadius:25,fontSize:12,paddingLeft:15,flex:1,justifyContent:'flex-end',backgroundColor: 'transparent',}}
                                onChangeText={(text) => {this.props.emailChanged(text)}}
                                placeholder="Username"
                                placeholderTextColor={Const.appblue}
                                underlineColorAndroid="transparent"
                                onSubmitEditing={() => this.focusNextField('2')}
                                value={this.props.email}
                            />

                        </View>

                        <View style={(Const.OS)? [styles.textview,{flexDirection:'row',}]:[{flexDirection:'row',
                            width:Const.width-80,
                            margin: 10,
                            borderRadius:25,
                            backgroundColor:'rgba(231,231,231,1)'
                        }]}>
                            <Image style={{height:20,width:20, alignSelf: 'center',marginLeft: (Const.OS)?0:20}} source={require('../assets/password.png')}
                                   resizeMode="stretch"/>
                            <TextInput
                                ref = "2"
                                style={{borderRadius:25,fontSize:12,paddingLeft:15,flex:1,justifyContent:'flex-end',backgroundColor: 'transparent'}}
                                onChangeText={(text) => {this.props.passChanged(text);}}
                                placeholder="Password"
                                placeholderTextColor={Const.appblue}
                                underlineColorAndroid="transparent"
                                secureTextEntry={true}
                                value={this.props.password}
                            />
                        </View>

                            <TouchableHighlight style={styles.signIn} underlayColor='transparent' onPress = {() => this.onSignIn()}>
                                <View style={[styles.textview,{backgroundColor:Const.appblue}]}>
                                <Text style={styles.signInText}>
                                    SIGN IN
                                </Text>
                                </View>
                            </TouchableHighlight>

                    </View>
                    <View style={styles.rememberView}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Switch thumbTintColor={Const.appblue}/>
                            <View style={{justifyContent:'center'}}>
                                <TouchableHighlight>
                                    <Text style={{fontSize:12}}>
                                        {" Remember me"}
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={{justifyContent:'center'}}>
                            <TouchableHighlight>
                                <Text style={{fontSize:12}}>
                                    Forgot Password?
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <View style={{flex:1,justifyContent:'flex-end'}}>
                        <Image style={{height:null,width:null,flex:1}} source={require('../assets/waws.png')}
                               resizeMode="stretch"/>
                    </View>
                    <View style={{top:0,bottom:0,left:0,right:0,position:'absolute',backgroundColor:'transparent',alignItems:'center'}}>
                        <Text style={{paddingTop:40,color:Const.appblue}}>
                            or
                        </Text>
                        <Text style={{paddingTop:10}}>
                            Login With
                        </Text>
                        <View style={{flexDirection:'row',marginTop:10}}>
                            <TouchableHighlight>
                                <Image style={{height:(Const.height*50)/736,width:(Const.height*50)/736}} source={require('../assets/facebook.png')}
                                       resizeMode="stretch"/>
                            </TouchableHighlight>
                            <TouchableHighlight style={{marginLeft:20,marginRight:20}}>
                                <Image style={{height:(Const.height*50)/736,width:(Const.height*50)/736}} source={require('../assets/tw.png')}
                                       resizeMode="stretch"/>
                            </TouchableHighlight>
                            <TouchableHighlight>
                                <Image style={{height:(Const.height*50)/736,width:(Const.height*50)/736}} source={require('../assets/google.png')}
                                       resizeMode="stretch"/>
                            </TouchableHighlight>
                        </View>
                        <View style={{flex:1,justifyContent:'flex-end'}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{paddingBottom:15,fontSize:12}}>
                                    Don't have an account?
                                </Text>
                                <Text style={{paddingBottom:15,fontSize:12,color:Const.appblue,textDecorationLine:"underline"}}>
                                    {" Sign up here"}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        email: state.userlogin.email,
        password: state.userlogin.password,
        isLoading: state.userlogin.isLoading,
    };
};

export default connect(mapStateToProps, {
    loginUser,
    emailChanged,
    passChanged,
})(Login);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    logo: {
        width:Const.width-80,
        height:Const.height/6,
        marginTop:50
    },
    textview: {
        width:Const.width-80,
        padding:15,
        margin: 10,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(231,231,231,1)'
    },
    inputview: {
        marginTop:10
    },
    signIn: {
        alignItems:'center',
        justifyContent:'center'
    },
    signInText: {
        fontWeight:'bold',
        color:'white',
    },
    rememberView: {
        marginTop: 10,
        width: Const.width - 80,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    bottomView: {
        flex:1
    }
});



