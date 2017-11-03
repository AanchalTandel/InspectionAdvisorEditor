import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    ListView
} from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import Const from '../../../helper/constant';

export default class MultipleImageUpload extends Component {

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            image: props.images,
            count: 0,
            dataSource: ds.cloneWithRows(props.images),
        };
    }

    componentWillReceiveProps(nextProps) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.setState ({
            image:nextProps.images,
            count: this.state.count + 1,
            dataSource: ds.cloneWithRows(nextProps.images),
        })
    }

    selectPhotoTapped = () => {
        this.props.onImageUpload();
    };

    selectPhotoDelete = (rowID, sectionID) => {
        this.props.onImageDelete(sectionID);
    };

    selectPhotoEdit = (rowID, sectionID, imgID, url) => {
        this.props.onImageEdit(sectionID, imgID, url);
    };

    render(){
        return(
            <View style={{flex:1}}>
                <ListView
                    contentContainerStyle={[style.container, {height: this.state.image.length <= 3 ? Const.width/2.5+12 : null}]}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderImages}
                />
            </View>
        );
    }

    renderImages = (data, sectionID, rowID) => {
        return (
            <View style={{justifyContent:'space-between', margin:4}}>
                <View style={{height: Const.width/2.5, width: Const.width/3.4, backgroundColor:Const.darkgray, borderRadius:3}}>
                    <Image style={{flex:1,height:null,width:null}} source={{uri : data.annotated_image ? data.annotated_image : data.original}}
                           indicator={ProgressBar.Circle}
                           indicatorProps={{
                               borderWidth: 0,
                               color: '#fff',
                               unfilledColor: '#fff'
                           }}
                           onError={(e) => {
                               this.setState({
                                   image: require('../../../assets/lane.jpeg')
                               })
                           }}/>
                    <View style={{padding:1,width:'80%', alignSelf:'center'}}>
                        <TouchableHighlight onPress={() => this.selectPhotoEdit(sectionID, rowID, data.id, data.original )} underlayColor="transparent">
                            <View style={{backgroundColor:'#fff', flexDirection:'row',justifyContent:'center',alignItems:'center', padding:5, borderRadius:6, borderColor:'lightgray', borderWidth:1}}>
                                <Image style={{width:16, height:16, tintColor:'#000'}} source={require('../../../assets/editImg.png')} />
                                <Text style={{fontSize:13}}> Edit</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{padding:1,width:'80%', alignSelf:'center'}}>
                        <TouchableHighlight onPress={() => this.selectPhotoDelete(sectionID, rowID )} underlayColor="transparent">
                            <View style={{backgroundColor:'#fff', flexDirection:'row',justifyContent:'center',alignItems:'center', padding:5, borderRadius:6, borderColor:'lightgray', borderWidth:1}}>
                                <Image style={{width:14, height:14, tintColor:'#000'}} source={require('../../../assets/delete1.png')} />
                                <Text style={{fontSize:13}}> Delete</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    };
}

const style = StyleSheet.create({

    container: {
        flex:1,
        flexDirection:'row',
        flexWrap: 'wrap',
        borderWidth:1,
        borderColor:'lightgray',
        margin:8,
        borderRadius:6,
        width: Const.width-16,
        backgroundColor: Const.lightgray,},
    text: {
        padding: 10,
        fontSize: 14,
    },
});

