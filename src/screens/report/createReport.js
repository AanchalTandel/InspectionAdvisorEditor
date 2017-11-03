
import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Picker,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import FontSize from '../../helper/fontsize';
import Const from '../../helper/constant';
import TextInputInfo from '../component/textInputInfo';
import DropDown from '../component/infoDropDown';
import DatePicker from 'react-native-datepicker';

import { connect } from 'react-redux';
import {
    addReport
} from '../../actions/reportAction';
import {
    getReportTemplate
} from '../../actions/reportTemplateAction';
let _ = require('lodash');

let views = null;
let reportInfo = {};


class CreateReport extends Component{

    static navigationOptions = props => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        return {
            title: 'Create Report',
            headerStyle: {backgroundColor: Const.lbgray},
            headerTitleStyle: {color: 'white',width:Const.width,fontSize:FontSize.header},
            headerTintColor: 'white',
            headerBackTitle: null,
        }
    }

    constructor(props){
        super(props);
        this.state = {
            views: [],
            selected: 'Select Template',
            opened: false,
            date: '',
            isDateChanged: false,
            template: this.props.template,
            templateItem:[]
        }

        reportInfo = {}
    }

    componentWillMount(){
        this.props.getReportTemplate()
            .then((res)=>{
            debugger
               this.setState({
                    template:res.templates
               })
                let temparr;
                for(let i=0;i<res.templates.length;i++){
                    temparr.push(res.templates[i].name)
                }
                this.setState({
                    templateItem:temparr
                })

                debugger

            })
            .catch((err)=>{

            });
    }

    componentWillReceiveProps(nextProps) {

    }

    updateState = (state,index) => {
        this.setState({selected: state});
        this.onUpdate('state',state)
        this.onPressRemoveView()
    }

    onPressSelect = () => {
        if (this.state.opened === false) {
            this.setState((state) => ({views: [...state.views, {}]}));
            this.setState({opened: true});
        }else{
            this.setState({opened: false});
            this.setState((state) => ({views: state.views.slice(0, -1)}));
        }
    };

    onPressRemoveView = () => {
        this.setState({opened: false});
        this.setState((state) => ({views: state.views.slice(0, -1)}));
    };


    onUpdate = (key,value) => {

        let template = _.find(this.state.template, {name:value});
        if(key == 'state'){
           this.state.selected = value;
            reportInfo['template_id'] = template.id;
        }else{
            reportInfo[key] = value;
        }

    }


    onSave = () => {
        let info = {
            "name": "Test Report",
            "inspection_date": "1/26/2014",
            "inspection_time": "12pm",
            "template_id": "1",
        }

        debugger
        this.props.addReport(reportInfo)
            .then(()=>{
                alert('Report saved successfully')
            })
            .catch((err)=>{
                alert('Something went wrong.')
            });


    }


    render(){

        views =
            this.state.views.map((view, i) =>
                <View key={i} style={style.outer}>
                    <View>
                        <Picker style={style.picker}
                                selectedValue={this.state.selected}
                                onValueChange={this.updateState}>

                            {
                                this.state.template.map(function (state, index) {
                                    return <Picker.Item key={index} label={state.name} value={state.name}/>
                                })
                            }

                        </Picker>
                    </View>

                </View>

            )

        return(
            <View style={style.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{marginTop:10,flex:1}}>
                        <TextInputInfo placeholder="Report Name"
                                       keytext="name"
                                       text={reportInfo['name']}
                                       onUpdateData={this.onUpdate}/>
                        <View style={style.dateTimePickerView}>
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
                        <View style={style.dateTimePickerView}>
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
                        <View style={{paddingLeft:12,paddingRight:12}}>
                        <DropDown onSelectItem={this.onPressSelect}
                                  style={{backgroundColor:Const.darkgray}}
                                  title={this.state.selected}
                                  item={this.state.templateItem}
                                  selected={this.state.selected}
                                  onUpdateData={this.onUpdate}/>
                        </View>

                    </View>
                    <View style={{flex:1,paddingRight:20,marginTop:5,flexDirection:'row',alignItems:'flex-end',justifyContent:'flex-end'}}>
                        <TouchableHighlight onPress={() => this.props.navigation.goBack(null)} underlayColor='transparent'>
                            <View style={style.btn}>
                                <Text style={{color:'white'}}>
                                    Cancel
                                </Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.onSave()} underlayColor='transparent'>
                            <View style={style.btn}>
                                <Text style={{color:'white'}}>
                                    Save Changes
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
                <View style={style.viewContainer}>
                    {views}
                </View>
            </View>
        );
    }

}

const mapStateToProps = state => {
    return {
        template:state.reportTemplate.template
    };
};

export default connect(mapStateToProps, {
    addReport,
    getReportTemplate
})(CreateReport);


const style = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
        alignItems:'center'
    },
    textview: {
        width:Const.width-60,
        padding:15,
        margin: 10,
        borderRadius:25,
        backgroundColor:'rgba(231,231,231,1)'
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
    viewContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'absolute',
        marginTop:Const.height-230-65,
        backgroundColor: 'white'
    },
    outer:{
        flex:1,
        flexDirection:'column',
        marginBottom:70,
        justifyContent: 'flex-end'

    },
    picker:{
        marginBottom:0,
    },
    dateTimePickerView: {
        padding:5,
        paddingLeft:20,
        paddingRight:20
    },
    btn: {
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Const.appblue,
        borderRadius:18,
        height:36,
        width:120,
        margin:3
    }

});



