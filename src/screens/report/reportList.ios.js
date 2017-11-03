import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    StatusBar,
    Image,
    ListView,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    Animated,
    Easing,
    AsyncStorage, Alert
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import ReportListComponent from '../component/report/reportListComponent';
import Loader from '../../helper/loader'
import Const from '../../helper/constant';
import FontSize from '../../helper/fontsize';
import SwipeButton from '../component/report/swipeButton';
import SendReportModal from '../component/sendReportModal';
import { connect } from 'react-redux';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import Modal from 'react-native-modal';
import {
    getReportList,
    deleteReportList
} from "../../actions/reportListAction";
import {
    sendReportData
} from "../../actions/sendReportAction";
const swipeimage = {
    edit:require('../../assets/Edit.png'),
    preview:require('../../assets/Preview.png'),
    delete:require('../../assets/delete.png'),
};
let that;
let isHidden = true;

const navigateAction = NavigationActions.navigate({
    routeName: 'Main',
    params: {},

    // navigate can have a nested navigate action that will be run inside the child router
    action: NavigationActions.navigate({ routeName: 'Main',direction:'back'})
})

class ReportList extends Component{

    static navigationOptions = props => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        return {
            title: 'Inspections',
            headerStyle: {backgroundColor: Const.lbgray},
            headerTitleStyle: {color: 'white',width:Const.width,fontSize:FontSize.header},
            headerTintColor: 'white',
            headerBackTitle: null,
            headerLeft:
                <Image style={style.headerimage} source={require('../../assets/menu.png')}
                       resizeMode="contain"/>,
            headerRight:<TouchableHighlight onPress={()=>{that.animate()}} underlayColor="transparent"><Image style={style.headerimage} source={require('../../assets/user.png')}
                                                                                                              resizeMode="contain"/></TouchableHighlight>,


        }
    };

    constructor(props){
        super(props);
        this.state = {
            reportdata:this.props.reportdata,
            isLoading:true,
            position:'relative',
            visibleModal: null,
            addrecipients:false,
            email:'',
            userdata:this.props.userdata,
            sendreportId:0,
            isReportSent:false,
            validemail:true

        }
        this.animatedvalue = new Animated.Value(0)
    }

    componentWillMount(){
        this.props.getReportList()
            .then(()=>{
                this.setState({
                    reportdata:this.props.reportdata,
                    isLoading:false
                })
            })
            .catch((err)=>{
                if(err.response.data[0] === "Token has expired"){
                    return AsyncStorage.removeItem('user', (err) => {
                        this.props.navigation.dispatch(navigateAction);
                        return Promise.resolve(true)
                    });
                }
            });
    }

    componentWillReceiveProps(nextProps) {
        this.setState ({
            reportdata:nextProps.reportdata,
            userdata:this.props.userdata
        })
    }

    onEdit = (reportid,organizatioid,name) => {
        this.props.navigation.navigate('EditReport',{reportId:reportid,organizationID:organizatioid,sectionTitle:name})
    }

    onPreview = (id,name) => {
        this.props.navigation.navigate('Preview',{reportId:id,sectionTitle:name})
    }

    onDelete = (id) => {

        Alert.alert(
            'Warning',
            'Do you want to delete?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => {
                    this.props.deleteReportList(id)
                        .then((res)=>{
                            alert("Deleted Successfully.")
                        })
                        .catch((err)=>{
                            alert("Something went wrong.")
                        });
                }},
            ]
        )


    };

    onAdd = () => {
        this.props.navigation.navigate('CreateReport')
    }

    onPress = (id,name) => {
        this.props.navigation.navigate('ReportDetail',{reportId:id,sectionTitle:name})
    };

    onSendReport = (reportid) => {
        this.setState({
            visibleModal: 1 ,
            sendreportId:reportid
        })
    }

    onSendReportOk = () => {
        if(this.state.validemail){
            let formdata = new FormData();
            formdata.append("additional_contacts", this.state.email)
            this.props.sendReportData(formdata,this.state.sendreportId)
                .then(() => {
                    this.setState({ isReportSent: true })
                })
                .catch(() => {
                    alert('something went wrong')
                })
        }else{
            alert('Enter Valid Email')
        }

    }

    validateEmail = (email) => {
        this.setState({email:email})
        let re = /^((([^<>()\[\]\\.,;:\s@â€œ]+(\.[^<>()\[\]\\.,;:\s@â€œ]+)*)|(â€œ.+â€œ))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})+([\\,]?)))*$/g;
        return re.test(email);
    };

    renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={style.button}>
                <Text style={{color:'white'}}>{text}</Text>
            </View>
        </TouchableOpacity>
    );



    renderModalContent = () => (
        <View style={style.modalContent}>
            {
                (this.state.isReportSent)
                &&
                <View style={{alignItems:'center',justifyContent:'center'}}>
                <Text style={{marginBottom:10}}>Report successfully sent!</Text>
                    {this.renderButton('OK', () => this.setState({visibleModal:null,isReportSent:false}))}
                </View>
                ||
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <SendReportModal limit={this.state.userdata.organization_setting.report_limit}
                                     client={this.state.userdata.email}/>

                    {
                        (this.state.addrecipients)
                        &&
                        <View style={{alignItems:'center'}}>
                            <TextInput
                                style={{height: 40, borderColor: (this.state.validemail) && 'gray' || 'red', borderWidth: 1,width:300,margin:10,borderRadius:5}}
                                onChangeText={(text) => this.setState({
                                    validemail:this.validateEmail(text)
                                })}
                                placeholder="joi@example.com,mia@example.com"
                                value={this.state.email}
                            />
                            <Text style={{fontSize:12,padding:5}}>
                                Add additional comma (,) separated email address
                            </Text>
                        </View>

                        ||

                        <TouchableHighlight onPress={() => {this.setState({addrecipients:true})}}
                                            underlayColor="transparent">
                            <Text style={{color:Const.appblue,padding:10}}>Add More Recipients?</Text>
                        </TouchableHighlight>

                    }

                    <View style={{flexDirection:'row'}}>
                        {this.renderButton('Cancel', () => this.setState({ visibleModal: null }))}
                        {this.renderButton('OK', () => this.onSendReportOk())}
                    </View>
                </View>


            }


        </View>
    );


    animate = () => {
        this.animatedvalue.setValue(0)
        let toValue = 0;
        this.setState({
            position:'relative'
        })

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
                duration:250,
                Easing:Easing,
                delay:100
            }
        ).start()
        isHidden = !isHidden;
    }


    onLogOut = () => {
        return AsyncStorage.removeItem('user', (err) => {
            this.props.navigation.dispatch(navigateAction);
            return Promise.resolve(true)
        });
    };


    renderRow = (rowData) => {
        return(
            <ReportListComponent key={rowData.id}
                                 reportdata={rowData}
                                 onPress={this.onPress}/>
        );
    };

    render(){
        that = this;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const viewHeight = this.animatedvalue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 100]
        });

        const viewWidth = this.animatedvalue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 150]
        });
        return(

            <View style={{backgroundColor:'white',flex:1,alignItems:'center'}}>


                <ScrollView style={{flex:1}}
                            bounces={false}
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={true}
                          ref="mainScroll">

                    <View>
                        <Text style={style.search}>Search Reports</Text>
                        <View style={style.line}/>
                    </View>



                    <Modal isVisible={this.state.visibleModal === 1}
                           animationIn={'zoomIn'}
                           animationOut={'zoomOut'}
                           animationInTiming={500}
                           animationOutTiming={500}
                           backdropTransitionInTiming={5}
                           backdropTransitionOutTiming={5}>{this.renderModalContent()}</Modal>

                    <SwipeListView
                        style={{marginBottom:35}}
                        dataSource={ds.cloneWithRows(this.props.reportdata)}
                        renderRow={this.renderRow}
                        enableEmptySections={true}
                        renderHiddenRow={ data => (
                            <View style={style.standaloneRowBack}>
                                <View style={[style.hiddenRowComponent,{backgroundColor:'rgb(151,152,154)',}]}>
                                    <TouchableHighlight onPress={() => this.onEdit(data.id,data.organization_id,data.name)}
                                                        style={{flex:1,justifyContent:'center',alignItems:'center'}}
                                                        underlayColor='transparent'>
                                        <View style={{flex:1}}>
                                            <SwipeButton title="Edit" color="'rgb(151,152,154)'"
                                                         image={swipeimage.edit}/>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                                <View style={[style.hiddenRowComponent,{backgroundColor:'rgb(157,177,195)'}]}>
                                    <TouchableHighlight onPress={() => this.onPreview(data.id,data.name)}
                                                        style={{flex:1,justifyContent:'center',alignItems:'center'}}
                                                        underlayColor='transparent'>
                                        <View>
                                            <SwipeButton title="Preview" color="'rgb(157,177,195)'"
                                                         image={swipeimage.preview}/>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                                <View style={[style.hiddenRowComponent,{backgroundColor:'rgb(245,94,87)'}]}>
                                    <TouchableHighlight onPress={() => this.onDelete(data.id)}
                                                        style={{flex:1,justifyContent:'center',alignItems:'center'}}
                                                        underlayColor='transparent'>
                                        <View>
                                            <SwipeButton title="Delete" color="'rgb(245,94,87)'"
                                                         image={swipeimage.delete}/>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                                <View style={[style.hiddenRowComponent,{backgroundColor:'rgb(225,14,87)'}]}>
                                    <TouchableHighlight onPress={() => this.onSendReport(data.id)}
                                                        style={{flex:1,justifyContent:'center',alignItems:'center'}}
                                                        underlayColor='transparent'>
                                        <View>
                                            <SwipeButton title="Send" color="'rgb(225,14,87)'"
                                                         image={swipeimage.delete}/>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        )}
                        leftOpenValue={0}
                        rightOpenValue={-260}
                    />
                </ScrollView>

                <View style={{justifyContent:'flex-end',alignItems:'center',position:'absolute',flex:1,marginTop:Const.height-160}}>
                    <TouchableHighlight onPress={() => this.onAdd()} underlayColor="transparent">
                        <Image style={{height:45,width:45}} source={require('../../assets/add.png')}/>
                    </TouchableHighlight>
                </View>

                <Animated.View style={{width:150,height:viewHeight,position:this.state.position,backgroundColor:'rgb(235,235,235)',marginTop:5,marginLeft:Const.width-160,borderRadius:5}}>

                    <TouchableHighlight onPress={()=>{this.onLogOut()}} underlayColor="transparent">
                        <Text style={{marginTop:2,padding:10}}>Log Out</Text>
                    </TouchableHighlight>

                </Animated.View>
                {
                    this.state.isLoading && <Loader visible="true"/> || null
                }

            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        reportdata: state.reportList.reports,
        userdata: state.userlogin.userdata
    };
};

export default connect(mapStateToProps, {
    getReportList,
    deleteReportList,
    sendReportData
})(ReportList);


const style = StyleSheet.create({
    search: {
        marginLeft:15,
        marginTop:10,
        fontSize:14,
        color:Const.lbgray,
        backgroundColor:'transparent'
    },
    line: {
        backgroundColor:Const.lbgray,
        height:2,
        width:Const.width-30,
        marginLeft:15,
        marginTop:3,
        marginBottom:10
    },
    headerimage: {
        width:30,
        height:30,
        margin:10
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 15
    },
    hiddenRowComponent: {
        width:60,
        flexDirection:'column'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    button: {
        backgroundColor: Const.appblue,
        padding: 12,
        margin: 3,
        height:35,
        width:100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },

});
