import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    BackHandler,
    Animated,
    Easing,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Const from '../helper/constant';
import DashboardComponent from './component/dashboard/dashboardComponent'

let isHidden = true;
const dashboardnonselectedimage = {
    scheduler:require('../assets/Schedulenoselected.png'),
    dashboard:require('../assets/Dashboard_noselected.png'),
    inspection:require('../assets/Inspection_Noselected.png'),
    documents:require('../assets/Documents_Noselected.png'),
    companydata:require('../assets/CompanyData_Noselected.png'),
    account:require('../assets/Account_Noselected.png')
}

const dashboardselectedimage = {
    scheduler:require('../assets/Schedule_selected.png'),
    dashboard:require('../assets/Dashboard_selected.png'),
    inspection:require('../assets/Inspection_Selected.png'),
    documents:require('../assets/Documents_Selected.png'),
    companydata:require('../assets/CompanyData_Selected.png'),
    account:require('../assets/Account_Selected.png')
}


const backAction = NavigationActions.back({
    key: null
})

export default class Dashboard extends Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.animatedvalue = new Animated.Value(0)
        this.state = {
            position:'relative',
            username:'',
            email:'',
            profileimage:"http://notavailableimage",
        }

         AsyncStorage.getItem('user').then((value) => {
            if(value != null) {
                let data = JSON.parse(value)
               this.setState ( {
                   username:data.username,
                   email:data.email,
                   profileimage:{uri : (data.profileimage) ? ((data.profileimage) ? data.profileimage : "http://notavailableimage"): "http://notavailableimage" }


               })
            }
        })
    }


    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', function() {
            return true
        });
    }

    onPress = (selected) => {
        if(selected === "INSPECTION"){
            this.props.navigation.navigate('ReportList');
        }
    }

    animate(){
        this.animatedvalue.setValue(0)
        this.setState({
            position:'relative'
        })
        let toValue = 0;

        if(isHidden) {
            toValue = 1;
            this.setState({
                position:'absolute'
            })
        }
        Animated.timing(
            this.animatedvalue,
            {
                toValue:toValue,
                duration:200,
                Easing:Easing,
                delay:100
            }
        ).start()
        isHidden = !isHidden;
    }

    onSetting = () => {
        this.props.navigation.navigate('Setting');
    }


    onLogOut = () => {
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'LogIn' })
            ]
        }))
       // this.props.navigation.goBack(null);
        return AsyncStorage.removeItem('user')



    }

    render() {

        const viewHeight = this.animatedvalue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 100]
        });

        const viewWidth = this.animatedvalue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 150]
        });


        return (
            <View style={styles.container}>
                <View style={{
                    height:Const.height/2.5,
                    width:Const.width,
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                    <Image style={{
                        position:'absolute',
                        height:Const.height/2.5,
                        width:Const.width,
                        backgroundColor:'rgb(16,31,50)',
                        borderColor:'white'
                    }}
                           source={this.state.profileimage}
                           onError={(e) => {
                               this.setState({
                                   image: require('../assets/profImage.jpeg')
                               })
                           }}
                           resizeMode={'cover'}/>
                    <View style={{
                        position:'absolute',
                        height:Const.height/2.5,
                        width:Const.width,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'rgba(16,31,50,0.9)',
                    }}>
                        <Image style={{
                            height:Const.width/3,
                            width:Const.width/3,
                            borderRadius:Const.width/6,
                            backgroundColor:'transparent',
                            borderWidth:2,
                            borderColor:'white'
                        }}
                               source={this.state.profileimage}
                               onError={(e) => {
                                   this.setState({
                                       image: require('../assets/profImage.jpeg')
                                   })
                               }}
                               resizeMode={'cover'}
                        />
                        <Text style={{marginTop:20,color:'white',fontSize:17,fontWeight:'600',width:Const.width,textAlign:'center'}}>Welcome {this.state.username}</Text>
                        <Text style={{color:'white',fontSize:12,fontWeight:'400', paddingTop:5}}>{this.state.email}</Text>
                    </View>

                </View>

                <View style={{flex:1,margin:2,backgroundColor:'white'}}>
                    <View style={{paddingTop:15,width:Const.width,flexDirection:'row',
                        justifyContent:'space-between',alignItems:'center',paddingLeft:10,paddingRight:10}}>
                        <TouchableHighlight onPress={()=> {this.onSetting()}} underlayColor='transparent'>
                        <Image style={{height:Const.width/8,width:Const.width/8}} source={require('../assets/setting.png')}
                               resizeMode="contain"/></TouchableHighlight>
                        <Text style={{fontWeight:'600',flex:1,textAlign:'center',color:'black',fontSize:16}}>Home Screen</Text>
                        <Image style={{height:Const.width/10,width:Const.width/10}} source={require('../assets/notification.png')}
                               resizeMode="contain"/>
                    </View>
                    <View style={{flex:1,justifyContent:'center',paddingBottom:5}}>
                        <View style={{flexWrap:'wrap',flexDirection:'row',justifyContent:'center',alignItems:'flex-end'}}>
                            <DashboardComponent image={dashboardnonselectedimage.scheduler}
                                                selectedimage={dashboardselectedimage.scheduler}
                                                title="SCHEDULER"
                                                onSelect={this.onPress}/>
                            <DashboardComponent image={dashboardnonselectedimage.dashboard}
                                                selectedimage={dashboardselectedimage.dashboard}
                                                title="DASHBOARD"
                                                onSelect={this.onPress}/>
                            <DashboardComponent image={dashboardnonselectedimage.inspection}
                                                selectedimage={dashboardselectedimage.inspection}
                                                title="INSPECTION"
                                                onSelect={this.onPress}/>
                            <DashboardComponent image={dashboardnonselectedimage.documents}
                                                selectedimage={dashboardselectedimage.documents}
                                                title="DOCUMENTS"
                                                onSelect={this.onPress}/>
                            <DashboardComponent image={dashboardnonselectedimage.companydata}
                                                selectedimage={dashboardselectedimage.companydata}
                                                title="COMPANY DATA"
                                                onSelect={this.onPress}/>
                            <DashboardComponent image={dashboardnonselectedimage.account}
                                                selectedimage={dashboardselectedimage.account}
                                                title="ACCOUNT PAYABLES"
                                                onSelect={this.onPress}/>
                        </View>
                    </View>

                    <Animated.View style={{width:150,height:viewHeight,position:this.state.position,
                        backgroundColor:'rgb(235,235,235)',top:50,left:20,borderRadius:5}}>

                        <TouchableHighlight onPress={()=>{this.onLogOut()}} underlayColor="transparent">
                            <Text style={{marginTop:2,padding:10}}>Log Out</Text>
                        </TouchableHighlight>

                    </Animated.View>


                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(17,19,50)'
    },
});



