import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Picker,
    ScrollView,
    ListView,
    Image
} from 'react-native';
import FontSize from '../../../helper/fontsize';
import Const from '../../../helper/constant';
import TextInputInfo from '../../component/textInputInfo';
import DropDown from '../../component/infoDropDown';
import ImageUpload from '../../component/imageUpload/imageUploadComponent';
import { SearchBar } from 'react-native-elements'
import { connect } from 'react-redux';
import {
    addAgentInformation,
    getAgentInformation,
    updateAgentInformation,
    getAllAgent,
    filterAgent
} from '../../../actions/agentAction';
import { getImage } from '../../../services/getImageVideoCall';
import { RNS3 } from 'react-native-aws3';
let views = null;
let agentInfo = {};
let searchAgent = []
let _ = require('lodash');


class AgentInformation extends Component{

    static navigationOptions = props => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        return {
            title: 'Agent Information',
            headerStyle: {backgroundColor: Const.lbgray},
            headerTitleStyle: {color: 'white',width:Const.width,fontSize:FontSize.header},
            headerTintColor: 'white',
            headerBackTitle: null,
        }
    }

    constructor(props){
        super(props);

        this.state = {
            agent:this.props.agent,
            reportid:props.navigation.state.params.reportId,
            views:[],
            selected:'Select State',
            opened: false,
            isContainMetadata: false,
            isSearch:false,
            filteredAgent:['1','2'],
            isFromSearch:false
            // dataSource: ds.cloneWithRows(searchAgent),
        }
    }

    componentWillMount(){
        this.props.getAgentInformation(this.state.reportid)
            .then((response)=>{
                debugger
                if(response.agent){
                    this.setState({
                        agent:response.agent,
                        isContainMetadata: true,
                        id:response.agent.id,
                        selected:response.agent.state,
                        image:{uri : (!response.agent) ? "http://notavailableimage" : ((response.agent.image_path) ? response.agent.image_path : "http://notavailableimage")}
                    })
                }else{
                    this.setState({
                        agent:null,
                        id:null,
                        selected:'Select State',
                        isContainMetadata: false,
                        image:{uri : (!this.props.property) ? "http://notavailableimage" : this.props.property.image_path}
                    })
                }

            })
            .catch((err)=>{

            });
    }

    componentWillReceiveProps(nextProps) {
        this.setState ({
            agent:nextProps.agent,
        })
    }

    updateState = (state) => {
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
        if(this.state.agent){
            this.state.agent[key] = value;
            agentInfo[key] = value;
        }else{
            agentInfo[key] = value;
        }
    }

    onImageSave = () => {
        if(this.state.image){
            var rand = Math.floor(1000000000000 + Math.random() * 9000000000000);

            const file = {
                uri: this.state.image.uri,
                name: `agent_org_${rand}.jpg`,
                type: "image/png"
            };
            console.log('file:', file);

            const options = {
                keyPrefix: "orgId/020d8290-ecd5-49c6-84ee-9fdfd7af2f7a/inspections/reportId/" + this.state.reportid + "/section/" + this.state.id + "/",
                bucket: "in4staging",
                region: "us-west-1",
                accessKey: "AKIAIEIOEOULREVVNHUQ",
                secretKey: "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",
                successActionStatus: 201
            };

            RNS3.put(file, options)
                .then(response => {
                    if (response.status !== 201)
                        throw new Error("Failed to upload image to S3");
                    agentInfo['image_path'] = response.body.postResponse.location;
                    this.onSave()
                })
                .progress((e) => console.log(e.loaded / e.total));
        }
        else{
            alert('Select Image')
        }
    };



    onSave = () => {

        if(!this.state.isContainMetadata){
            debugger
            /* if(!(JSON.stringify(agentInfo) === '{}')){

             }else{
                 this.state.agent['report_id'] = this.state.reportid
                 this.props.addAgentInformation(this.state.reportid,this.state.agent)
                     .then(()=>{
                         alert('Agent saved successfully')
                     })
                     .catch((err)=>{
                         alert(err.response.data.msg)
                     });
             }*/


            if(this.state.isFromSearch){
                this.props.updateAgentInformation(this.state.reportid,this.state.agent.id,agentInfo)
                    .then(()=>{
                        alert('Agent updated successfully')
                        agentInfo = {}
                    })
                    .catch((err)=>{
                        alert(err.response.data.msg)
                    });
            }else{
                agentInfo['report_id'] = this.state.reportid
                this.props.addAgentInformation(this.state.reportid,agentInfo)
                    .then(()=>{
                        alert('Agent saved successfully')
                        agentInfo = {}
                    })
                    .catch((err)=>{
                        alert(err.response.data.msg)
                    });
            }





        }else{
            debugger


            this.props.updateAgentInformation(this.state.reportid,this.state.agent.id,agentInfo)
                .then(()=>{
                    alert('Agent updated successfully')
                    agentInfo = {}
                })
                .catch((err)=>{
                    alert(err.response.data.msg)
                });


        }

    }

    onPressSave = () => {
        if(this.state.imageUpdate)
        {
            this.onImageSave()
        }else{
            this.onSave()
        }
    }

    selectPhotoTapped = () => {
        getImage(this.state.isContainMetadata, (error, result) => {
            this.setState({
                imageUpdate:true
            })
            console.log('CONSTANT-URI:', Const.URIIMG,);
            this.setState({image:Const.URIIMG})
        })
    };

    onImageDeleted = () => {
        agentInfo['image_path'] = '';
        this.setState({
            image: require('../../../assets/lane.jpeg')
        })
    };

    updateAgentData = (data) => {
        //let newAgent = _.omit(data,'id');
        debugger
        agentInfo = data
        this.setState({
            agent:data,
            isSearch:false,
            selected:data.state,
            isFromSearch:true
            //isContainMetadata:true
        })
    }


    renderFilterRow = (rowData) => {
        return(
            <TouchableHighlight onPress={() => this.updateAgentData(rowData)} underlayColor='trnsparent'>
                <View style={{borderWidth:0.5,borderColor:'lightgray', flexDirection:'row', padding:5, alignItems:'center'}}>
                    <View>
                        <Image source={(rowData.image_path) ? {uri:(rowData.image_path)} : require('../../../assets/profImage.jpeg')}
                               style={{height:30, width:30, borderRadius:15}} />
                    </View>
                    <View style={{marginLeft:10}}>
                        <View style={{flexDirection:'row'}}>
                            <Text>{rowData.first_name}</Text>
                            <Text> {rowData.last_name}</Text>
                        </View>
                        <View>
                            <Text>{rowData.email}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }


    onFilterAgent = (text) => {
        this.props.filterAgent(text)
            .then((res)=>{
                let filterAgent = res.agents.data
                this.setState({
                    filteredAgent:filterAgent,
                    isFromSearch:true
                })
            })
            .catch((err)=>{

            });
    }

    onSearchPressed = () => {
        this.setState({
            isSearch:true
        })

        this.props.getAllAgent()
            .then((res)=>{
                let agentArr = res.agent
                this.setState({
                    filteredAgent:agentArr
                })
            })
            .catch((err)=>{

            });
    }

    render(){

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        views =
            this.state.views.map((view, i) =>
                <View key={i} style={style.outer}>
                    <View>
                        <Picker style={style.picker}
                                selectedValue={this.state.selected}
                                onValueChange={this.updateState}>

                            {
                                Const.states.map(function (state, index) {
                                    return <Picker.Item key={index} label={state} value={state}/>
                                })
                            }

                        </Picker>
                    </View>

                </View>

            )

        return(
            <View style={style.container}>
                <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={!this.state.isSearch}>
                    <View style={{marginTop:10,flex:1}}>
                        <TouchableHighlight onPress={() => this.onSearchPressed()} underlayColor='transparent'>
                            <View>
                                <SearchBar
                                    noIcon
                                    lightTheme
                                    round
                                    ref={search => this.search = search}
                                    onChangeText={(text)=>this.onFilterAgent(text)}
                                    //onBlur={() => this.setState({isSearch:false})}
                                    onFocus={()=>this.onSearchPressed()}
                                    placeholder='Select Existing Agent' />
                            </View>
                        </TouchableHighlight>

                        <TextInputInfo placeholder="First Name"
                                       keytext="first_name"
                                       text={(this.state.agent) ? this.state.agent.first_name : agentInfo['first_name']}
                                       onUpdateData={this.onUpdate}/>
                        <TextInputInfo placeholder="Last Name"
                                       keytext="last_name"
                                       text={(this.state.agent) ? this.state.agent.last_name : agentInfo['ast_name']}
                                       onUpdateData={this.onUpdate}/>
                        <TextInputInfo placeholder="Email"
                                       keytext="email"
                                       text={(this.state.agent) ? this.state.agent.email : agentInfo['email']}
                                       onUpdateData={this.onUpdate}/>
                        <TextInputInfo placeholder="Office Name"
                                       keytext="office_name"
                                       text={(this.state.agent) ? this.state.agent.office_name : agentInfo['office_name']}
                                       onUpdateData={this.onUpdate}/>
                        <TextInputInfo placeholder="Main Phone"
                                       keytext="phone"
                                       text={(this.state.agent) ? this.state.agent.phone : agentInfo['phone']}
                                       onUpdateData={this.onUpdate}/>
                        <TextInputInfo placeholder="Cell"
                                       keytext="cell"
                                       text={(this.props.agent) ? this.state.agent.cell : agentInfo['cell']}
                                       onUpdateData={this.onUpdate}/>
                        <TextInputInfo placeholder="Address"
                                       keytext="address"
                                       text={(this.props.agent) ? this.state.agent.address : agentInfo['address']}
                                       onUpdateData={this.onUpdate}/>
                        <TextInputInfo placeholder="City"
                                       keytext="city"
                                       text={(this.props.agent) ? this.state.agent.city : agentInfo['city']}
                                       onUpdateData={this.onUpdate}/>
                        <DropDown onSelectItem={this.onPressSelect}
                                  style={{backgroundColor:Const.darkgray}}
                                  title={this.state.selected}
                                  item={Const.states}
                                  selected={this.state.selected}
                                  onUpdateData={this.onUpdate}/>
                        <TextInputInfo placeholder="Zip"
                                       keytext="zip"
                                       text={(this.state.agent) ? this.state.agent.zip : agentInfo['zip']}
                                       onUpdateData={this.onUpdate}/>

                        <ImageUpload onImageUpload={this.selectPhotoTapped} onImageDelete={this.onImageDeleted} images={this.state.image} />

                        <TouchableHighlight style={style.edit} underlayColor='transparent' onPress={()=>this.onPressSave()}>
                            <View style={[style.btnview,{backgroundColor:Const.appblue}]}>
                                <Text style={style.editText}>
                                    SAVE
                                </Text>
                            </View>
                        </TouchableHighlight>
                        {
                            (this.state.isSearch)

                            &&

                            <View style={style.searchView}>
                                <ListView
                                    dataSource={ds.cloneWithRows(this.state.filteredAgent)}
                                    renderRow={(rowData) => this.renderFilterRow(rowData)}
                                />
                            </View>

                            ||

                            null

                        }

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
        agent: state.agentInfo.agent,
    };
};

export default connect(mapStateToProps, {
    addAgentInformation,
    getAgentInformation,
    updateAgentInformation,
    getAllAgent,
    filterAgent
})(AgentInformation);

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
    searchView: {
        height:180,
        width:Const.width-40,
        margin:8,
        marginTop:60,
        borderRadius:5,
        position:'absolute',
        backgroundColor:'white'
    }

});

