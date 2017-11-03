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
import { connect } from 'react-redux';
import TextBox from '../../component/textInputInfo';
import FontSize from '../../../helper/fontsize';
import Const from '../../../helper/constant';
import RadioButton from '../../component/radioInfo';
let data = ['no','yes'];
let invoice = {};

class Invoice extends Component{

    static navigationOptions = props => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        return {
            title: 'Invoice',
            headerStyle: {backgroundColor: Const.lbgray},
            headerTitleStyle: {color: 'white',width:Const.width,fontSize:FontSize.header},
            headerTintColor: 'white',
            headerBackTitle: null,
        }
    }

    constructor(props){
        super(props)
        this.state = {
            reportid:props.navigation.state.params.reportId,
            report:this.props.report,
        }
    }

    componentWillMount(){
        this.props.getReport(this.state.reportid)
            .then((response)=>{
                if(response.report){
                    debugger
                    this.setState({
                        report:response.report
                    })
                }else{

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
            invoice[key] = value;
        }else{
            invoice[key] = value;
        }
    }

    onSave = () => {
        this.props.updateReport(this.state.reportid,invoice)
            .then(()=>{
                alert('Invoice saved successfully')
            })
            .catch((err)=>{
                alert('Something went wrong.')
            });

    }


    render(){
        return(
            <View style={style.container}>
                <TextBox placeholder="Inspection Fee"
                               keytext="inspection_fee"
                               text={(this.state.report) ? this.state.report.inspection_fee : invoice['inspection_fee']}
                                onUpdateData={this.onUpdate}/>
                <View style={{padding:10}}>
                <RadioButton title="Has the inspection been paid?"
                             item={data}
                             keytext="inspection_fee_paid"
                             selectedIndex={(this.state.report) ? this.state.report.inspection_fee_paid : null}
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
})(Invoice);


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
