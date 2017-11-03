import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Picker,
    ScrollView
} from 'react-native';
import Const from '../../../helper/constant';
import FontSize from '../../../helper/fontsize';
import TextInputInfo from '../../component/textInputInfo';
import ImageUpload from '../../component/imageUpload/imageUploadComponent';
import DropDown from '../../component/infoDropDown';
import { connect } from 'react-redux';
import {
    addPropertyInformation,
    getPropertyInformation,
    updatePropertyInformation
} from '../../../actions/propertyAction';
import { getImage } from '../../../services/getImageVideoCall';
import { RNS3 } from 'react-native-aws3';
let views = null;
let propertyInfo = {};
class PropertyInformation extends Component{

    static navigationOptions = props => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        return {
            title: 'Property Information',
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
            property:this.props.property,
            views:[],
            selected:'Select State',
            opened: false,
            isContainMetadata: false

        }
    }

    componentWillMount(){
        this.props.getPropertyInformation(this.state.reportid)
            .then((response)=>{
                if(response.property){
                    this.setState({
                        property:response.property,
                        id:response.property.id,
                        selected:response.property.state,
                        isContainMetadata: true,
                        image:{uri : (!response.property) ? "http://notavailableimage" : response.property.image_path}
                    })
                }else{
                    this.setState({
                        property:null,
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
            property:nextProps.property,
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

    onImageSave = () => {
        if(this.state.image){
            var rand = Math.floor(1000000000000 + Math.random() * 9000000000000);

            const file = {
                uri: this.state.image.uri,
                name: `property_org_${rand}.jpg`,
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
                    propertyInfo['image_path'] = response.body.postResponse.location;
                    this.onSave()
                })
                .progress((e) => console.log(e.loaded / e.total));
        }
        else{
            alert('Select Image')
        }
    };


    onPressSave = () => {
        if(this.state.imageUpdate)
        {
            this.onImageSave()
        }else{
            this.onSave()
        }
    }

    onUpdate = (key,value) => {
        if(key == 'state'){
            this.state.selected = value
        }
        if(this.state.property){
            this.state.property[key] = value;
            propertyInfo[key] = value;
        }else{
            propertyInfo[key] = value;
        }
    }

    onSave = () => {

        if(!this.state.isContainMetadata){
            propertyInfo['report_id'] = this.state.reportid
            this.props.addPropertyInformation(propertyInfo)
                .then(()=>{

                   alert('Peoperty saved successfully')
                })
                .catch((err)=>{

                });

        }else{
            this.props.updatePropertyInformation(this.state.id,propertyInfo)
                .then(()=>{
                    alert('Property updated successfully')
                })
                .catch((err)=>{

                });

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
        propertyInfo['image_path'] = '';
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
                        <TextInputInfo placeholder="Address"
                                       keytext="address"
                                       text={(this.state.property) ? this.state.property.address : propertyInfo['address']}
                                       onUpdateData={this.onUpdate}/>
                        <DropDown onSelectItem={this.onPressSelect}
                                  style={{backgroundColor:Const.darkgray}}
                                  title={this.state.selected}
                                  item={Const.states}
                                  selected={this.state.selected}
                                  onUpdateData={this.onUpdate}/>
                        <TextInputInfo placeholder="City"
                                       keytext="city"
                                       text={(this.state.property) ? this.state.property.city : propertyInfo['city']}
                                       onUpdateData={this.onUpdate}/>
                        <TextInputInfo placeholder="Zip"
                                       keytext="zip"
                                       text={(this.state.property) ? this.state.property.zip : propertyInfo['zip']}
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
        property: state.propertyInfo.property,
    };
};

export default connect(mapStateToProps, {
    addPropertyInformation,
    getPropertyInformation,
    updatePropertyInformation,
})(PropertyInformation);

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