import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableHighlight,
    Text,
    TouchableOpacity,
    TextInput
} from 'react-native';
import ListHeader from'../component/listHeader';
import ListComponent from '../component/listComponent';
import Loader from '../../helper/loader';
import Const from '../../helper/constant';
import FontSize from '../../helper/fontsize';
import Modal from 'react-native-modal';
import SendReportModal from '../component/sendReportModal';
import { connect } from 'react-redux';
import {
    getReportSection
} from '../../actions/reportSectionAction';
import {
    sendReportData
} from "../../actions/sendReportAction";
let that;


class ReportSection extends Component{

    static navigationOptions = props => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        return {
            title: props.navigation.state.params.sectionTitle,
            headerStyle: {backgroundColor: Const.lbgray},
            headerTitleStyle: {color: 'white',width:Const.width,fontSize:FontSize.header},
            headerTintColor: 'white',
            headerBackTitle: null,
            headerRight:<TouchableHighlight onPress={()=>{ReportSection.onSendReport(this)}}
                            underlayColor="transparent">
                            <Text style={{color:'white',fontSize:12,flexWrap:'wrap',width:70,textAlign:'center'}}>
                                SEND REPORT
                            </Text>
                        </TouchableHighlight>,
        }
    }

    constructor(props){
        super(props)
        this.state = {
            reportid:props.navigation.state.params.reportId,
            organizationid:props.navigation.state.params.organizationID,
            reportsection:this.props.reportsection,
            isLoading:true,
            reposrtSectionData:[],
            isSubSection:false,
            visibleModal: null,
            email:'',
            userdata:this.props.userdata,
            sendreportId:0,
            isReportSent:false,
            validemail:true

        }
    }

    componentWillMount(){
        this.props.getReportSection(this.state.reportid,this.state.organizationid)
            .then(()=>{
                this.setState({
                    reportsection:this.props.reportsection,
                    isLoading:false,
                    reposrtSectionData:[{"Information":[{"name":"Property Information"},{"name":"Client Information"},{"name":"Agent Information"},{"name":"Inspection Report Options"},{"name":"Invoice"}]},{"Inspection":this.props.reportsection}]
                })

            })
            .catch((err)=>{

            });
    }

    onSelect = (selectedId,name) => {
        if(name === 'Property Information'){
            this.props.navigation.navigate('PropertyInfo',{reportId:this.state.reportid,subSectionTitle:name});
        }else if(name === 'Client Information'){
            this.props.navigation.navigate('ClientInfo',{reportId:this.state.reportid,subSectionTitle:name});
        }else if(name === 'Agent Information'){
            this.props.navigation.navigate('AgentInfo',{reportId:this.state.reportid,subSectionTitle:name});
        }else if(name === 'Inspection Report Options'){
            this.props.navigation.navigate('InspectionReport',{reportId:this.state.reportid});
        }else if(name === 'Invoice'){
            this.props.navigation.navigate('Invoice',{reportId:this.state.reportid});
        }else{
            this.props.navigation.navigate('ReportSubSection',{reportId:this.state.reportid,reportsubsectionid:selectedId,subSectionTitle:name, organizationid: this.state.organizationid});
        }
    };


    static onSendReport = () => {
        that.setState({ visibleModal: 1 })
    }

    validateEmail = (email) => {
        this.setState({email:email})
        let re = /^((([^<>()\[\]\\.,;:\s@â€œ]+(\.[^<>()\[\]\\.,;:\s@â€œ]+)*)|(â€œ.+â€œ))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})+([\\,]?)))*$/g;
        return re.test(email);
    };

    onSendReportOk = () => {
        if(this.state.validemail){
            let formdata = new FormData();
            formdata.append("additional_contacts", this.state.email)
            this.props.sendReportData(formdata,this.state.reportid)
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
                        (this.state.addRecipients)
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

                        <TouchableHighlight onPress={() => {this.setState({addRecipients: true})}}
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



    render(){
        that = this;
        return(
            <View style={style.container}>
                {
                    this.state.isLoading && <Loader visible="true"/> || null

                }
                <ScrollView style={{flex:1,marginBottom:5,marginTop:10}}
                            bounces={false}
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={true}
                            ref="mainScroll">
                    <Modal isVisible={this.state.visibleModal === 1}
                           animationIn={'zoomIn'}
                           animationOut={'zoomOut'}
                           animationInTiming={500}
                           animationOutTiming={500}
                           backdropTransitionInTiming={5}
                           backdropTransitionOutTiming={5}
                           avoidKeyboard={true}>{this.renderModalContent()}</Modal>
                    {
                        this.state.reposrtSectionData.map((data, index) => {
                            let keyStr = Object.keys(data);
                            return(
                                <View key={index}>
                                <ListHeader key={index} title={keyStr[0]}/>
                            {
                                data[keyStr[0]].map((obj, i) => {

                                        return(
                                            <ListComponent key={i} data={obj} onSelect={this.onSelect}/>
                                        );
                                })
                            }
                                </View>
                            );
                        })
                    }
                </ScrollView>

            </View>
        );
    }

}

const mapStateToProps = state => {
    return {
        reportsection: state.reportSection.reportsection,
        userdata: state.userlogin.userdata
    };
};

export default connect(mapStateToProps, {
    getReportSection,
    sendReportData
})(ReportSection);

const style = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white'
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