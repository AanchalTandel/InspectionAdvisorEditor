import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight
} from 'react-native';
import {
    getReport,
    updateReport
} from '../../../actions/reportAction';
import TextBox from '../../component/textInputInfo';
import DatePicker from 'react-native-datepicker';
import FontSize from '../../../helper/fontsize';
import Const from '../../../helper/constant';
import RadioButton from '../../component/radioInfo';
import { connect } from 'react-redux';
import Moment from 'moment';
let DeviceInfo = require('react-native-device-info');
let data = ['no','yes'];
let inspectionReport = {};

class InspectionReport extends Component{

    static navigationOptions = props => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        return {
            title: 'Inspection Report',
            headerStyle: {backgroundColor: Const.lbgray},
            headerTitleStyle: {color: 'white',width:Const.width,fontSize:FontSize.header},
            headerTintColor: 'white',
            headerBackTitle: null,
        }
    }

    constructor(props){
        super(props)
        this.state = {
            date:'',
            reportid:props.navigation.state.params.reportId,
            report:this.props.report,
            isDateChanged:false
        }
    }

    componentWillMount(){
        this.props.getReport(this.state.reportid)
            .then((response)=>{
                if(response.report){
                    debugger
                    this.setState({
                        report:response.report,
                        date:response.report.inspection_date,
                        time:response.report.inspection_time
                    })
                }else{
                    this.setState({
                        report:null,
                        date:'select inspection date',
                        time:'select inspection time'
                    })
                }

            })
            .catch((err)=>{

            });
    }

    componentWillReceiveProps(nextProps) {
        this.setState ({
            report:nextProps.report,
        })
    }

    onUpdate = (key,value) => {
        if(this.state.report){
            this.state.report[key] = value;
            inspectionReport[key] = value;
        }else{
            inspectionReport[key] = value;
        }
    }

    onSave = () => {

       let formattedDate = Moment(this.state.date+ " "+this.state.time, "DD_MM_YYYY hh:mm a").format("YYYY-MM-DD HH:mm:ss")

        if(this.state.isDateChanged){
            let timeZone = DeviceInfo.getTimezone();
            inspectionReport['time_zone'] = timeZone
            inspectionReport['inspection_date_time'] = formattedDate
        }
        debugger

            this.props.updateReport(this.state.reportid,inspectionReport)
                .then(()=>{
                    alert('Report saved successfully')
                })
                .catch((err)=>{
                   alert('Something went wrong.')
                });

    }


    render(){
        return(
            <View style={style.container}>
                <TextBox style={{marginTop:5}}
                         placeholder="Inspection File Name"
                         keytext="name"
                         text={(this.state.report) ? this.state.report.name : inspectionReport['name']}
                         onUpdateData={this.onUpdate}/>
                <View style={{padding:10}}>
                    <DatePicker
                        style={{width: Const.width-40}}
                        date={this.state.date}
                        mode="date"
                        placeholder="Inspection date"
                        placeholderTextColor={Const.appblue}
                        format="DD-MM-YYYY"
                        minDate="01-01-2012"
                        maxDate="01-01-2018"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{

                            dateInput: {
                                marginLeft: 0
                            },
                        }}
                        onDateChange={(date) => {
                            this.setState({
                                date: date,
                                isDateChanged:true
                            })
                            let tempdate = date.replace(/-/g, "/");
                            this.onUpdate('inspection_date',tempdate)
                        }}
                    />
                </View>
                <View style={{padding:10}}>
                    <DatePicker
                        style={{width: Const.width-40}}
                        date={this.state.time}
                        mode="time"
                        placeholder="Inspection time"
                        placeholderTextColor={Const.appblue}
                        format="HH:mm a"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{

                            dateInput: {
                                marginLeft: 0
                            },
                        }}
                        onDateChange={(time) => {
                            this.setState({
                                time: time,
                                isDateChanged:true
                            })
                            this.onUpdate('inspection_time',time)
                        }}
                    />
                </View>
                <View style={{padding:10}}>
                <RadioButton title="Send a copy of report to the client"
                             item={data}
                             keytext="send_to_client"
                             selectedIndex={(this.state.report) ? this.state.report.send_to_client : null}
                             onUpdateData={this.onUpdate}/>
                <RadioButton title="Send a copy of report to the agent"
                             item={data}
                             keytext="send_to_agent"
                             selectedIndex={(this.state.report) ? this.state.report.send_to_agent : null}
                             onUpdateData={this.onUpdate}/>
                </View>
                <TouchableHighlight style={style.edit} underlayColor='transparent' onPress={() => {this.onSave()}}>
                    <View style={[style.btnview,{backgroundColor:Const.appblue}]}>
                        <Text style={style.editText}>
                            SAVE
                        </Text>
                    </View>
                </TouchableHighlight>

            </View>
        );
    }

}

const mapStateToProps = state => {
    return {
        report: state.reportList.report,
    };
};

export default connect(mapStateToProps, {
    getReport,
    updateReport
})(InspectionReport);

const style = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
        padding:10
    },
    btnview: {
        width:Const.width-40,
        padding:15,
        margin: 7,
        borderRadius:25,
        backgroundColor:'rgba(231,231,231,1)',
        alignItems:'center'
    },
    editText: {
        fontWeight:'bold',
        color:'white',
        width:70,
        textAlign:'center',
    },
    edit: {
        alignItems:'center',
        justifyContent:'center',
    },
})
