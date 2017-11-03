import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';
import Const from '../helper/constant';


export default class ReportListComponent extends Component{

    constructor(props){
        super(props);
        that = this;
        this.state = {
            data:props.reportdata,
            image:{uri : (!props.reportdata.property) ? "http://notavailableimage" : props.reportdata.property.optimized_img},
            index:props.reportdata.index,
            openRow:0,
            previous:-1,
            flag:false,
            rowID: null,
        }
    }


    onPress  = (selected,name) => {
        this.props.onPress(selected,name)
    };

    render(){
        return(

            <View style={style.cellview}>

                    <TouchableHighlight style={{backgroundColor:'white'}}
                                        underlayColor="transparent"
                                        onPress = {() => this.onPress(this.state.data.id,this.state.data.name)}>
                        <View style={style.cellInnerview}>
                            <View>
                                <Image style={style.contentimage}
                                       source={this.state.image}
                                       onError={(e) => {
                                           this.setState({
                                               image: require('./lane.jpeg')
                                           })
                                       }}
                                       resizeMode='cover'/>
                            </View>
                            <View style={{flex:1,justifyContent:'center'}}>
                                <View style={{marginTop:15}}>
                                    <Text style={style.celltitle}>
                                        {this.state.data.name}
                                    </Text>
                                </View>
                                <View style={{flex:1,padding:5}}>
                                    <View style={{flexDirection:'row',flex:1}}>

                                        <View style={{flex:1}}>

                                            <View style={{flexDirection:'row'}}>
                                                <Text style={style.titletext}>
                                                    Add:
                                                </Text>
                                                <Text style={style.infotext}>
                                                    { (this.state.data.property) ? this.state.data.property.address : ''}
                                                </Text>
                                            </View>

                                            <View style={{flexDirection:'row'}}>
                                                <Text style={style.titletext}>
                                                    City:
                                                </Text>
                                                <Text style={style.infotext}>
                                                    { (this.state.data.property) ? this.state.data.property.city : ''}
                                                </Text>
                                            </View>

                                            <View style={{flexDirection:'row'}}>
                                                <Text style={style.titletext}>
                                                    State:
                                                </Text>
                                                <Text style={style.infotext}>
                                                    { (this.state.data.property) ? this.state.data.property.state : ''}
                                                </Text>
                                            </View>

                                            <View style={{flexDirection:'row'}}>
                                                <Text style={style.titletext}>
                                                    Zip:
                                                </Text>
                                                <Text style={style.infotext}>
                                                    { (this.state.data.property) ? this.state.data.property.zip : ''}
                                                </Text>
                                            </View>
                                        </View>


                                    </View>
                                </View>
                            </View>
                            <View style={{width:30,flexDirection:'column',marginRight:10,justifyContent:'space-around'}}>
                                <View style={{alignItems:'flex-end'}}>
                                    <TouchableHighlight underlayColor="transparent"
                                                        onPress={() => this.onEdit(this.state.data.id,this.state.data.organization_id,this.state.data.name)}>
                                        <Image style={style.image} source={require('../../../assets/swipe.png')}
                                               resizeMode="contain"/>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </TouchableHighlight>
            </View>

        );
    }

}


const style = StyleSheet.create({
    cellview: {
        flex:1,
        backgroundColor:'white',
        height:Const.height/4.5,
        width:Const.width,
        marginTop:10,
        marginBottom:10,
    },
    cellInnerview: {
        flexDirection:'row',
        backgroundColor:'rgb(185,208,230)',
        marginLeft:15,
        marginRight:15
    },
    contentimage: {
        width:Const.width/2.5,
        marginTop:15,
        marginBottom:15,
        marginLeft:5,
        height:(Const.height/4.5)-30,
        borderWidth:2,
        borderColor:'rgb(125,170,209)'
    },
    celltitle: {
        fontWeight:'bold',
        textAlign:'center',
        fontSize:15,
        color:'rgb(27,108,174)'
    },
    titletext: {
        fontWeight:'400',
        fontSize:12,
        color:'rgb(27,108,174)',
        marginLeft:10,
    },
    infotext: {
        fontSize:12,
        marginLeft:5,
        color:Const.lbgray
    },
    image: {
        width:18,
        height:18,
    },

});
