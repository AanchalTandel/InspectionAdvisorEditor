import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    StatusBar,
    Image,
    TouchableHighlight,
    Alert
} from 'react-native';
import ReportListComponent from '../component/report/reportListComponent';
import Loader from '../../helper/loader'
import Const from '../../helper/constant';
import FontSize from '../../helper/fontsize';
import { connect } from 'react-redux';
import {
    getReportList,
    deleteReportList
} from "../../actions/reportListAction"


class ReportList extends Component{

    static navigationOptions = props => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        return {
            title: 'Inspections',
            headerStyle: {backgroundColor: Const.lbgray,justifyContent:'space-between'},
            headerTitleStyle: {color: 'white',width:Const.width-90,fontSize:FontSize.header,alignItems:'center',textAlign:'center',marginLeft:8},
            headerTintColor: 'white',
            headerBackTitle: null,
            headerLeft:<Image style={style.headerimage} source={require('../../assets/menu.png')}
                              resizeMode="contain"/>,
            headerRight:<Image style={style.headerimage} source={require('../../assets/user.png')}
                               resizeMode="contain"/>

        }
    }

    constructor(props){
        super(props);
        this.state = {
            reportdata:this.props.reportdata,
            isLoading:true
        }
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
                    alert('Token Expired')

                    // this.props.navigation.goBack(null);
                    // this.props.navigation.goBack(null);
                }
            });
    }

    componentWillReceiveProps(nextProps) {
        this.setState ({
            reportdata:nextProps.reportdata
        })
    }


    onAdd = () => {
        this.props.navigation.navigate('CreateReport')
    }

    onEdit = (reportid,organizatioid,name) => {
        this.props.navigation.navigate('EditReport',{reportId:reportid,organizationID:organizatioid,sectionTitle:name})
    };

    onPreview = (id,name) => {
        this.props.navigation.navigate('Preview',{reportId:id,sectionTitle:name})
    };

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

    onPress = (id,name) => {
            this.props.navigation.navigate('ReportDetail',{reportId:id,sectionTitle:name})
    };

    render(){
        return(

            <View style={{backgroundColor:'white',flex:1,alignItems:'center'}}>

                <ScrollView style={{flex:1}}
                            bounces={false}
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={true}
                            ref="mainScroll">
                    <Text style={style.search}>Search Reports</Text>
                    <View style={style.line}/>
                    {
                        this.props.reportdata.map((data, index) => {
                            return(
                                <ReportListComponent key={index}
                                                     reportdata={data}
                                                     index={index}
                                                     onPress={this.onPress}
                                                     onPreview={this.onPreview}
                                                     onEdit={this.onEdit}
                                                     onDelete={this.onDelete}/>
                            );
                        })
                    }

                </ScrollView>
                <View style={{justifyContent:'flex-end',alignItems:'center',position:'absolute',flex:1,marginTop:Const.height-180}}>
                    <TouchableHighlight onPress={() => this.onAdd()} underlayColor="transparent">
                        <Image style={{height:45,width:45}} source={require('../../assets/add.png')}/>
                    </TouchableHighlight>
                </View>
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
    };
};

export default connect(mapStateToProps, {
    getReportList,
    deleteReportList
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
        margin:10,
    },


});
