import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    StatusBar,
    Text,
    TouchableHighlight,
    Alert,
    Platform,
    ListView,
    Image
} from 'react-native';
import RNImageTools from "react-native-image-tools";
import Modal from 'react-native-modal';
import findIndex from 'lodash/findIndex';
import MediaModal from '../component/mediaModal';
import Checkbox from '../component/checkbox/checkboxView';
import TextBox from '../component/textview/textbox';
import RadioButton from '../component/radiobutton/radiobuttonView';
import DropDown from '../component/dropDown/dropDownView';
import PickerView from "../component/dropDown/pickerViewComponent";
import Const from '../../helper/constant';
import FontSize from '../../helper/fontsize';
import Loader from '../../helper/loader';
import {connect} from 'react-redux';
import {
    getFormElement
} from '../../actions/formElementAction';
import {
    getReportData,
    addReportData,
    updateReportData,
    addReportImages,
    getReportImages,
    addReportVideo,
    getReportVideo,
    deleteReportImage,
    deleteReportVideo,
    updateReportImage
} from '../../actions/reportFormDataAction';
import {
    getComment
} from '../../actions/commentAction';
import MultipleImageUpload from '../../screens/component/imageUpload/multipleImageUpload';
import MultipleVideoUpload from '../../screens/component/videoUpload/multipleVideoUpload';
import { getImage, getVideo } from '../../services/getImageVideoCall';
import { RNS3 } from 'react-native-aws3';
import TextEditor from '../../screens/component/textEditor'

let views = null;
let form_data = {};
let reportformdata = {};
let _ = require('lodash');


/*var blitline = require('blitline-s3')({
    APPLICATION_ID: '4hByCYytnIuKUcvkLLldQig', // Your Blitline Application ID
    BUCKET: 'in4staging', // Your Amazon S3 Bucket Name
    NAME_PREFIX: 'uploads/' // Prefix for New Images Created By Blitline
});*/

const datas = [{'comment':'Searching'}];
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class InspectionForm extends Component {



    static navigationOptions = props => {
        const {navigation} = props  ;
        const {state, setParams} = navigation;
        const {params} = state;
        return {
            title: props.navigation.state.params.name,
            headerStyle: {backgroundColor: Const.lbgray},
            headerTitleStyle: {color: 'white', width: Const.width, fontSize: FontSize.header},
            headerTintColor: 'white',
            left: null
        }
    };


    constructor(props) {
        super(props);


        this.state = {
            elements: this.props.elements,
            formdata: this.props.formdata,
            reportID:props.navigation.state.params.reportID,
            sectionID:props.navigation.state.params.sectionID,
            organizationID: props.navigation.state.params.organizationid,
            subsectionID: props.navigation.state.params.subSectionID,
            isLoading: true,
            views: [],
            image: [],
            video: [],
            imageAWS: [],
            videoAWS: [],
            imgArr: [],
            thumbnails: [],
            opened: false,
            progress:0,
            visibleModal: null,
            onComment:false,
            commentData:null,
            dataSource:ds.cloneWithRows(datas),
            selectedItem: 'select one option',

        }

        this._openEditor = this._openEditor.bind(this);

    }

    static onSendReport = () => {
        this.setState({ visibleModal: 1 })
    };

    renderFilterRow = (data) => {

        this.props.getComment()
            .then((response)=>{

            let data  = response.comments.data
            let  temp = _.filter(data,{report_subsection_id:this.state.subsectionID});

            if(temp.length > 0){
                let newDataSource = ds.cloneWithRows(temp);
                this.setState({
                    dataSource: newDataSource
                });
            } else{
                let newDataSource = ds.cloneWithRows([{'comment':'No Existing Comment'}]);
                this.setState({
                    dataSource: newDataSource
                });
            }

            })
            .catch((err)=>{
                debugger
            });


        return(
            <TouchableHighlight onPress={() => this.setState({
                commentData:data.comment,
                visibleModal:0,
                onComment:false
            })} underlayColor="transparent">
                <View style={{flex:1,alignItems:'flex-start',padding:10}}>
                    <Text style={{textAlign:'center',flex:1}}>{data.comment}</Text>
                </View>
            </TouchableHighlight>
        );
    };

    renderModalContent = () => (
        <View>
            {
                (this.state.onComment)
                &&
                <View style={{backgroundColor:'#fff', }}>
                    <View style={{ alignItems:'flex-end', justifyContent:'flex-end',}}>
                        <TouchableHighlight onPress={() => this.setState({visibleModal:0,onComment:false})}>
                            <Image source={require('../../assets/cancel.png')} style={{tintColor:'#000', width:20, height:20}} />
                        </TouchableHighlight>
                    </View>
                    <View style={style.commentRow}>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={(rowData) => this.renderFilterRow(rowData)}
                        />
                    </View>
                </View>


                    ||

                <View style={style.modalContent}>
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                    <MediaModal progress={this.state.progress} textSms={this.state.textSms} />

                    <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:12,padding:5}}>
                    </Text>
                    </View>
                    </View>
                </View>
            }
        </View>


    );


    onPresSelect = ({ id, options }) => {
        if (!this.state.opened) {
            this.setState((state) => {
                return ({ views: [...state.views, { id, options }] })
            });
            this.setState({opened: true});
        } else {
            this.setState({opened: false});
            this.setState((state) => {
                return ({views: state.views.slice(0, -1)})
            });
        }
    };

    onPressRemoveView = (selectedItem, id,key) => {
        form_data[key] = selectedItem
        const {elements} = this.state;
        const elementIndex = findIndex(elements, {id});
        elements[elementIndex].selectedItem = selectedItem;
        this.setState({
            opened: false,
            elements
        });
        this.setState((state) => ({views: state.views.slice(0, -1)}));
    };

    selectPhotoTapped = () => {
        getImage(true, (error, result) => {
            //let arrayvar = this.state.image.slice();

            let l = this.state.image.length;

            let arr = {
                alt:"alt",
                aws_key:"https://in4staging.s3.amazonaws.com/orgId%2F020d8290-ecd5-49c6-84ee-9fdfd7af2f7a%2Finspections%2FreportId%2F196%2Fsection%2F131%2Fsubsection%2F1003%2FInformational+Conditions+%2FInformational+Conditions+1087486426445.png",
                original:Const.URIIMG.uri,
                report_id:this.state.reportID,
                report_subsection_id:this.state.subsectionID,
            };

            let arrayvar = this.state.image.slice();
            arrayvar.push(arr);
            this.setState({ image: arrayvar });
            console.log("IMG-STATE:", this.state.image);
            this.onImageSave();
        })
    };

    selectPhotoDelete = (e) => {
        Alert.alert(
            'Are you sure?',
            'This will permanently delete this file selected!',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes, delete it!', onPress: () => {
                    this.props.deleteReportImage(this.state.image[e].id)
                        .then((response) => {
                            let array = this.state.image;
                            array.splice(e, 1);
                            this.setState({image: array });

                            alert(JSON.stringify(response.data.msg))
                        })
                        .catch(() => {
                            alert('something went wrong.')
                        })
                }},
            ]
        );

        console.log("DELETE-IMG-STATE:", this.state.image)
    };

    onImageSave = () => {
        this.setState({visibleModal:1});

        let co = this.state.image.length;
        if(co != 0){
            let rand = Math.floor(1000000000000 + Math.random() * 9000000000000);
            console.log('ONE BY ONE:', this.state.image[co-1].original);

            const file = {
                uri: this.state.image[co-1].original,
                name: `${this.props.navigation.state.params.name}${rand}.png`,
                type: "image/png"
            };
            console.log('File : ', file);

            const options = {
                keyPrefix: "orgId/" + this.state.organizationID + "/inspections/reportId/" + this.state.reportID + "/section/" +
                this.state.sectionID + "/subsection/" + this.state.subsectionID + "/" + this.props.navigation.state.params.name + "/",
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

                    let arrayvar = this.state.imageAWS.slice();
                    const arr = {uri: response.body.postResponse.location};
                    arrayvar.push(arr);
                    this.setState({ imageAWS: arrayvar });
                    console.log("AWS-IMG-STATE:", this.state.imageAWS);

                    this.imageSent(response.body.postResponse.location, response.body.postResponse.key);

                    console.log('response from aws s3 img:', response.body);
                })
                .progress((e) => {
                    this.setState({progress:e.loaded / e.total});
                    if(e.loaded / e.total === 1 ){
                        this.setState({progress:0, textSms:'Media uploading...! '});
                    };
                    console.log(e.loaded / e.total);
                });
        }
        else{
            alert('Select Image')
        }
    };

    imageSent = (uri, key) => {
        const imgData = {
            report_id: this.state.reportID,
            report_subsection_id: this.state.subsectionID,
            alt: 'alt',
            title: this.props.navigation.state.params.name,
            original: uri,
            aws_key: key,
            annotated_image: ''
        };
        console.log(imgData)
        this.props.addReportImages(imgData)
            .then((response) => {
                this.setState({visibleModal:null});

                this.props.getReportImages(this.state.subsectionID, this.state.reportID)
                    .then((response) => {
                        this.setState({image: response.images, isLoading:false,txtSms:''})
                    })
                    .catch(() => {

                    })

            })
            .catch(() => {
                alert('something went wrong.')
            })
    };

    selectPhotoEdit = (e, imgID,  url) => {
        this.setState({isLoading:true})
        this._openEditor(imgID, url);
    };

    async _openEditor(imgID, url) {
        try {
            const uri = await RNImageTools.openEditor({
                imageUri: url,
                outputFormat: 'JPEG',
                quality: parseInt(70, 10),
                preserveMetadata: true,
                saveTo: './img'
            });

            console.log("edited uri", uri);

            if (!uri) {
                this.setState({isLoading:false});
                console.log("editing cancelled");
            } else {
                this.sentInAmazon(imgID, uri);
                console.log("editing url : ", uri);
            }
        } catch (e) {
            console.warn("error", e);
        }
    }

    sentInAmazon = (imgID, url) => {
        this.setState({visibleModal:1});

        let rand = Math.floor(1000000000000 + Math.random() * 9000000000000);

        const file = {
            uri: url,
            name: `${this.props.navigation.state.params.name}${rand}.png`,
            type: "image/png"
        };
        console.log('File : ', file);

        const options = {
            keyPrefix: "orgId/" + this.state.organizationID + "/inspections/reportId/" + this.state.reportID + "/section/" +
            this.state.sectionID + "/subsection/" + this.state.subsectionID + "/" + this.props.navigation.state.params.name + "/",
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

                this.updateSelectedImage(imgID, response.body.postResponse.location);

                console.log('response from aws s3 img:', response.body);
            })
            .progress((e) => {
                this.setState({progress:e.loaded / e.total});
                if(e.loaded / e.total === 1 ){
                    this.setState({progress:0});
                };
                console.log(e.loaded / e.total);
            });
    };

    updateSelectedImage = (imgID, url) => {
        let arr = {
            annotated_image: url,
        };

        this.props.updateReportImage(imgID, arr)
            .then((response) => {
                this.setState({visibleModal:null});


                this.props.getReportImages(this.state.subsectionID, this.state.reportID)
                    .then((response) => {
                        this.setState({image: response.images, isLoading:false})
                    })
                    .catch(() => {

                    })
            })
            .catch(() => {
                alert('something went wrong.')
            })
    };

    selectVideoTapped = () => {
        getVideo(true, (error, result) => {
            let l = this.state.video.length;

            let arr = {
                alt:"alt",
                aws_key:"https://in4staging.s3.amazonaws.com/orgId%2F020d8290-ecd5-49c6-84ee-9fdfd7af2f7a%2Finspections%2FreportId%2F196%2Fsection%2F131%2Fsubsection%2F1003%2FInformational+Conditions+%2FInformational+Conditions+1087486426445.png",
                organization_id:"020d8290-ecd5-49c6-84ee-9fdfd7af2f7a",
                original:Const.URIVIDEO.uri,
                report_id:this.state.reportID,
                report_subsection_id:this.state.subsectionID,
                title:this.props.navigation.state.params.name
            };

            let arrayvar = this.state.video.slice();
            arrayvar.push(arr);
            this.setState({ video: arrayvar });
            console.log("VIDEO-STATE:", this.state.video)
            this.onVideoSave();
        })
    };

    selectVideoDelete = (e) => {
        Alert.alert(
            'Are you sure?',
            'This will permanently delete this file selected!',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes, delete it!', onPress: () => {
                    this.props.deleteReportVideo(this.state.video[e].id)
                        .then((response) => {
                            let array = this.state.video;
                            array.splice(e, 1);
                            this.setState({video: array });

                            alert(JSON.stringify(response.data.msg))
                        })
                        .catch(() => {
                            alert('something went wrong.')
                        })
                }},
            ]
        );

        console.log("DELETE-VIDEO-STATE:", this.state.video)
    };

    onVideoSave = () => {
        this.setState({visibleModal:1});

        let co = this.state.video.length;
        if(co != 0){
            let rand = Math.floor(1000000000000 + Math.random() * 9000000000000);
            console.log('ONE BY ONE:', this.state.video[co-1].original);

            const file = {
                uri: this.state.video[co-1].original,
                name: `${this.props.navigation.state.params.name}${rand}.mp4`,
                type: "video/mp4"
            };
            console.log('File : ', file);

            const options = {
                keyPrefix: "orgId/" + this.state.organizationID + "/inspections/reportId/" + this.state.reportID + "/section/" +
                this.state.sectionID + "/subsection/" + this.state.subsectionID + "/" + this.props.navigation.state.params.name + "/",
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

                    let arrayvar = this.state.videoAWS.slice();
                    const arr = {uri: response.body.postResponse.location};
                    arrayvar.push(arr);
                    this.setState({ videoAWS: arrayvar });
                    console.log("AWS-VIDEO-STATE:", this.state.videoAWS);

                    this.videoSent(response.body.postResponse.location, response.body.postResponse.key);

                    console.log('response from aws s3 video:', response.body);
                })
                .progress((e) => {
                    this.setState({progress:e.loaded / e.total});
                    if(e.loaded / e.total === 1 ){
                        this.setState({progress:0, textSms:'Media uploading..!'});
                    };
                    console.log(e.loaded / e.total);
                });
        }
        else{
            alert('Select Image')
        }
    };

    videoSent = (uri, key) => {
        const imgData = {
            report_id: this.state.reportID,
            report_subsection_id: this.state.subsectionID,
            title: this.props.navigation.state.params.name,
            src_url: uri,
            aws_key: key
        };

        this.props.addReportVideo(imgData)
            .then((response) => {
                this.setState({visibleModal:null});

                this.props.getReportVideo(this.state.subsectionID, this.state.reportID)
                    .then((response) => {
                        this.setState({video: response.videos, isLoading:false})
                    })
                    .catch(() => {

                    })

            })
            .catch(() => {
                alert('something went wrong.')
            })
    };

    componentWillMount() {
        this.props.getFormElement(this.state.subsectionID)
            .then((response) => {
                this.setState({
                    elements: this.props.elements,
                })

                this.props.getReportData(this.state.subsectionID,this.state.reportID)
                    .then((response) => {
                        if(response.filedata.length === 0){
                            this.setState({
                                isContainData:false
                            })
                        }else{
                            this.setState({
                                isContainData:true,
                                filedataid:response.filedata.id,
                                formdata:response.filedata.form_data
                            })
                        }

                        this.props.getReportImages(this.state.subsectionID, this.state.reportID)
                            .then((response) => {
                                this.setState({image: response.images, isLoading:false})

                                this.props.getReportVideo(this.state.subsectionID, this.state.reportID)
                                    .then((response) => {
                                        this.setState({video: response.videos, isLoading:false})
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            });
    }

    async componentDidMount() {
        if (Platform.OS === 'ios') {
            RNImageTools.authorize(
                "f76019cd3cac4779b73273a6bd382e6b",
                "d6e620a1-37dd-4573-9703-fda11e8d1a9e",
                "ams+d21ef0327c71d4d9b67ed1b29cacf0d172a5a7e2://adobeid/f76019cd3cac4779b73273a6bd382e6b"
            );
        } else {
            RNImageTools.authorize(
                "0f422a10a7b6402ba57385aafc1c57b3",
                "40093c0e-d2ce-4f41-8b9d-3f341fc38f89",
                "ams+39c7f83963f692c4e7a5cccbc3dc1a461481169e://adobeid/0f422a10a7b6402ba57385aafc1c57b3"
            );
        }
    }

    onUpdate = (key,value) => {
        if(this.state.filedataid){
            this.state.filedataid[key] = value;
            form_data[key] = value;
        }else{
            form_data[key] = value;
        }
    }

    onUpdateCheckBox = (data) => {
        reportformdata['form_data'] = data;
    }


    onSave = () => {

        reportformdata['report_id'] = this.state.reportID;
        reportformdata['report_subsection_id'] = this.state.subsectionID;
        reportformdata['form_data'] = Object.assign({},  reportformdata['form_data'], form_data);

        if(this.state.isContainData){
            this.props.updateReportData(this.state.filedataid,reportformdata)
                .then((response) => {
                    alert('data updated successfully')
                })
                .catch(() => {
                    alert('something went wrong.')
                })

        }else{
            this.props.addReportData(reportformdata)
                .then((response) => {
                    alert('data saved successfully')
                })
                .catch(() => {
                    alert('something went wrong.')
                })
        }

    }

    onCommentPress = () => {
        this.setState({
            visibleModal: 1,
            onComment:true
        })
    }


    render() {
        return (
            <View style={{backgroundColor: 'white', flex: 1}}>
                <StatusBar
                    backgroundColor='gray'
                    barStyle="default"
                />

                {this.state.isLoading && <Loader visible="true"/> ||
                <ScrollView style={{flex: 1, marginBottom: 5}}
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
                    <View style={{padding: 10}}>
                        {
                            this.state.elements.map((data, index) => {
                                if (data.input_type === 'checkbox') {
                                    return (
                                        <Checkbox key={index}
                                                  title={data.main_label}
                                                  item={data.options}
                                                  keyText={index.toString()}
                                                  selectedValue={(this.state.formdata) ? this.state.formdata : form_data}
                                                  onUpdateData={this.onUpdateCheckBox}/>
                                    );
                                } else if (data.input_type === 'text') {
                                    return (

                                        <TextBox key={index}
                                                 title={data.main_label}
                                                 keyText={data.guid}
                                                 text={(this.state.formdata) ? this.state.formdata[data.guid] : form_data[data.guid]}
                                                 onUpdateData={this.onUpdate}/>
                                    );
                                } else if (data.input_type === 'radio') {
                                    return (
                                        <RadioButton key={index}
                                                     title={data.main_label}
                                                     item={data.options}
                                                     selectedIndex={null}
                                                     keyText={data.guid}
                                                     selectedValue={(this.state.formdata) ? this.state.formdata[data.guid] : form_data[data.guid]}
                                                     onUpdateData={this.onUpdate}/>
                                    );
                                } else if (data.input_type === 'select') {

                                    if (Const.OS) {
                                        views =
                                            this.state.views.map((view, i) =>
                                                <PickerView key={i}
                                                            item={view.options}
                                                            index={i}
                                                            view={view}
                                                            keyText={data.guid}
                                                            selectedValue={(this.state.formdata) ? this.state.formdata : form_data}
                                                            onRemove={(value) => this.onPressRemoveView(value, view.id,data.guid)}/>
                                            )
                                    }
                                    return (
                                        <DropDown key={index}
                                                  title={data.main_label}
                                                  item={data.options}
                                                  onSelectItem={() => this.onPresSelect(data)}
                                                  selected={data.selectedItem || ((this.state.formdata) ? this.state.formdata[data.guid] : 'select one option')}/>
                                    );
                                }

                            })
                        }

                    </View>


                    <TextEditor style={{height:400,margin:4,borderRadius:5,borderColor:'gray',borderWidth:1}} onComment={this.onCommentPress} comment={this.state.commentData}/>


                    <View style={style.btnOuterView}>
                        <TouchableHighlight onPress={() => {this.onSave()}} style={{flex:1,width:'30%'}} underlayColor='transparent'>
                            <View style={style.btnView}>
                                <Text style={{color:'white',fontSize:FontSize.regFont, alignItems:'center'}}>SAVE</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={style.separatorSaveView}>
                    </View>


                    <View style={style.btnOuterView}>
                        <TouchableHighlight onPress={() => {this.selectPhotoTapped()}} style={{flex:1,width:'100%'}} underlayColor='transparent'>
                            <View style={style.btnView}>
                                <Text style={{color:'white',fontSize:FontSize.regFont}}>Add Image</Text>
                            </View>

                        </TouchableHighlight>
                    </View>


                    <MultipleImageUpload onImageUpload={this.selectPhotoTapped} onImageDelete={(e) => this.selectPhotoDelete(e)}
                                         onImageEdit={(id, e, imgID, url) => this.selectPhotoEdit(id, e, imgID, url)} images={this.state.image} />

                    <View style={style.separatorView}>
                    </View>

                    <View style={style.btnOuterView}>
                        <TouchableHighlight onPress={() => {this.selectVideoTapped()}} style={{flex:1,width:'100%'}} underlayColor='transparent'>
                            <View style={style.btnView}>
                                <Text style={{color:'white',fontSize:FontSize.regFont}}>Add Video</Text>
                            </View>
                        </TouchableHighlight>
                    </View>


                    <MultipleVideoUpload onVideoUpload={this.selectVideoTapped} onVideoDelete={(e) => this.selectVideoDelete(e)}
                                         video={this.state.video} />


                </ScrollView>
                }
                <View style={style.viewContainer}>
                    {views}
                </View>
            </View>
        );
    }

}

const mapStateToProps = state => {
    return {
        elements: state.formelement.elements,
        formdata: state.reportformdata.formdata
    };
};

export default connect(mapStateToProps, {
    getFormElement,
    getReportData,
    addReportData,
    updateReportData,
    addReportImages,
    getReportImages,
    addReportVideo,
    getReportVideo,
    deleteReportImage,
    deleteReportVideo,
    updateReportImage,
    getComment
})(InspectionForm);


const style = StyleSheet.create({
    btnOuterView: {
        flex:1,
        justifyContent:'flex-end',
        alignItems:'flex-end',
        padding:15,
        height:70
    },
    btnView: {
        backgroundColor:Const.appblue,
        flex:1,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
    },
    separatorView: {
        width: Const.width,
        height:1,
        backgroundColor:'lightgray'
    },
    separatorSaveView: {
        width: Const.width,
        height:1,
        backgroundColor:'red',
        opacity:0.2
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 30,
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
    commentRow:{
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    }
});


