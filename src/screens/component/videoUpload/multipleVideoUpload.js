import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    ListView
} from 'react-native'
import VideoPlayer from 'react-native-video-player';
import Const from '../../../helper/constant';


export default class MultipleVideoUpload extends Component {

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            video: props.video,
            count: 0,
            dataSource: ds.cloneWithRows(props.video),
        };
    }

    componentWillReceiveProps(nextProps) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.setState ({
            video:nextProps.video,
            count: this.state.count + 1,
            dataSource: ds.cloneWithRows(nextProps.video),
        })
    }

    selectVideoDelete = (rowID, sectionID) => {
        this.props.onVideoDelete(sectionID);
    };

    render(){
        return(
            <View style={{flex:1}}>
                <ListView
                    contentContainerStyle={[style.container, {height: this.state.video.length <= 2 ? Const.width/2.5+12 : null}]}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderVideos}
                />
            </View>
        );
    }

    renderVideos = (data, sectionID, rowID) => {
        return (
            <View style={{justifyContent:'space-between', margin:4, alignItems:'center'}}>
                <View style={{height: Const.width/2.5, width: Const.width/2.2, backgroundColor:Const.darkgray, borderRadius:3}}>
                    <View>
                        <VideoPlayer
                            thumbnail={require('../../../assets/logo.png')}
                            endWithThumbnail
                            video={{uri: data.src_url}}
                            videoWidth={Const.width/2.4}
                            resizeMode="contain"
                            videoHeight={Const.width/3.4}/>
                    </View>
                    <View style={{padding:1,width:'100%', alignSelf:'center', alignItems:'center'}}>
                        <TouchableHighlight onPress={() => this.selectVideoDelete(sectionID, rowID )} underlayColor="transparent">
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
        backgroundColor: Const.lightgray,
    },
    text: {
        padding: 10,
        fontSize: 14,
    },
});

