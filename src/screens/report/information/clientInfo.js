import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Picker,
    Image,
    ScrollView
} from 'react-native';
import FontSize from '../../../helper/fontsize';
import Const from '../../../helper/constant';
import TextInputInfo from '../../component/textInputInfo';
import DropDown from '../../component/infoDropDown';
import ImageUpload from '../../component/imageUpload/imageUploadComponent';
import SplashScreen from 'react-native-splash-screen'
import { RNS3 } from 'react-native-aws3';
import { connect } from 'react-redux';
import {
    addClientInformation,
    getClientInformation,
    updateClientInformation
} from '../../../actions/clientAction';
import { getImage } from '../../../services/getImageVideoCall';
let views = null;
let clientInfo = {};

class ClientInformation extends Component{

    static navigationOptions = props => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        return {
            title: 'Client Information',
            headerStyle: {backgroundColor: Const.lbgray},
            headerTitleStyle: {color: 'white',width:Const.width,fontSize:FontSize.header},
            headerTintColor: 'white',
            headerBackTitle: null,
        }
    }

    constructor(props){
        super(props);
        this.state = {
            reportid:props.navigation.state.params.reportId,
            client:this.props.client,
            views:[],
            selected:'Select State',
            opened: false,
            isContainMetadata: false
        }
    }

    componentWillMount(){
        this.props.getClientInformation(this.state.reportid)
            .then((response)=>{
                if(response.client){
                    this.setState({
                        client:response.client,
                        id:response.client.id,
                        selected:response.client.state,
                        isContainMetadata:true,
                        image:{uri : (!response.client) ? "http://notavailableimage" : response.client.image_path}
                    })
                }else{
                    this.setState({
                        client:null,
                        id:null,
                        selected:'Select State',
                        isContainMetadata: false,
                        image:{uri : (!this.props.property) ? "http://notavailableimage" : this.props.client.image_path}
                    })
                }

            })
            .catch((err)=>{

            });
    }

    componentDidMount() {
        SplashScreen.hide();
    }

    componentWillReceiveProps(nextProps) {
        this.setState ({
            client:nextProps.client,
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
        if(this.state.client){
            this.state.client[key] = value;
            clientInfo[key] = value;
        }else{
            clientInfo[key] = value;
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
                    clientInfo['image_path'] = response.body.postResponse.location;
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
            clientInfo['report_id'] = this.state.reportid
            this.props.addClientInformation(clientInfo)
                .then(()=>{
                    alert('Client saved successfully')
                })
                .catch((err)=>{

                });

        }else{
            this.props.updateClientInformation(this.state.id,clientInfo)
                .then(()=>{
                    alert('Client updated successfully')
                })
                .catch((err)=>{

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
        clientInfo['image_path'] = '';
        this.setState({
            image: require('../../../assets/lane.jpeg')
        })
    };

    render(){
        views =
            this.state.views.map((view, i) =>
                <View key={i} style={style.outer}>
                    <View>
                        <Picker style={style.picker} selectedValue={this.state.selected} onValueChange={this.updateState}>

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
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{marginTop:10,flex:1}}>
                        <TextInputInfo placeholder="Clients Full Name"
                                       keytext="name"
                                       text={(this.state.client) ? this.state.client.name : clientInfo['name']}
                                       onUpdateData={this.onUpdate}/>
                        <TextInputInfo placeholder="Email"
                                       keytext="email"
                                       text={(this.state.client) ? this.state.client.email : clientInfo['email']}
                                       onUpdateData={this.onUpdate}/>
                        <TextInputInfo placeholder="Main Phone"
                                       keytext="phone"
                                       text={(this.state.client) ? this.state.client.phone : clientInfo['phone']}
                                       onUpdateData={this.onUpdate}/>
                        <TextInputInfo placeholder="Cell"
                                       keytext="cell"
                                       text={(this.state.client) ? this.state.client.cell : clientInfo['cell']}
                                       onUpdateData={this.onUpdate}/>
                        <TextInputInfo placeholder="Fax"
                                       keytext="fax"
                                       text={(this.state.client) ? this.state.client.fax : clientInfo['fax']}
                                       onUpdateData={this.onUpdate}/>
                        <TextInputInfo placeholder="Address"
                                       keytext="address"
                                       text={(this.state.client) ? this.state.client.address : clientInfo['address']}
                                       onUpdateData={this.onUpdate}/>
                        <TextInputInfo placeholder="City"
                                       keytext="city"
                                       text={(this.state.client) ? this.state.client.city : clientInfo['city']}
                                       onUpdateData={this.onUpdate}/>
                        <DropDown onSelectItem={this.onPressSelect}
                                  style={{backgroundColor:Const.darkgray}}
                                  title={this.state.selected}
                                  item={Const.states}
                                  selected={this.state.selected}/>

                        <TextInputInfo placeholder="Zip"
                                       keytext="zip"
                                       text={(this.state.client) ? this.state.client.zip : clientInfo['zip']}
                                       onUpdateData={this.onUpdate}/>

                        <ImageUpload onImageUpload={this.selectPhotoTapped} onImageDelete={this.onImageDeleted} images={this.state.image} />

                        <TouchableHighlight style={style.edit} underlayColor='transparent' onPress={() => {this.onPressSave()}}>
                            <View style={[style.btnview,{backgroundColor:Const.appblue}]}>
                                <Text style={style.editText}>
                                    SAVE
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
        client: state.clientInfo.client,
    };
};

export default connect(mapStateToProps, {
    addClientInformation,
    getClientInformation,
    updateClientInformation,
})(ClientInformation);

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

});