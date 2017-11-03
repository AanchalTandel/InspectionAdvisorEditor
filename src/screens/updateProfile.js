import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Picker,
    ScrollView
} from 'react-native';
import Const from '../helper/constant';
import FontSize from '../helper/fontsize';
import TextInputInfo from '../screens/component/textInputInfo';
let views = null;
let data = ['1','2','3','4','5','6','7']

export default class UpdateProfile extends Component{

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
            views:[],
            selected:'',
            opened: false,
        }
    }

    componentWillMount(){

    }

    componentDidMount() {

    }


    render(){

        return(
            <View style={style.container}>
                <ScrollView style={{flex:1}}
                            showsVerticalScrollIndicator={false}>
                    <View style={{marginTop:10,flex:1}}>
                        <TextInputInfo placeholder="First Name"/>
                        <TextInputInfo placeholder="Last Name"/>
                        <TextInputInfo placeholder="Organizatoin Name"/>
                        <TextInputInfo placeholder="Email"/>
                        <TextInputInfo placeholder="Username"/>
                        <TextInputInfo placeholder="Password"/>
                        <TextInputInfo placeholder="Confirm Password"/>
                        <TextInputInfo placeholder="Certification Snippet"/>
                        <TextInputInfo placeholder="Certification Description" multiline={true}/>
                        <View style={{flexDirection:'row'}}>
                            <View style={{height:130,width:130,backgroundColor:'rgb(231,231,231)',margin:7,borderRadius:5,borderWidth:1,borderColor:'rgb(194,209,296)'}}>

                            </View>
                            <View style={{flex:1,flexDirection:'column',justifyContent:'center'}}>
                                <View style={{padding:3}}>
                                    <TouchableHighlight>
                                        <View style={style.btndelete}>
                                            <Text style={{color:'rgb(226,98,98)'}}>Delete</Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                                <View style={{padding:3}}>
                                    <TouchableHighlight>
                                        <View style={style.btndelete}>
                                            <Text style={{color:Const.appblue}}>Update</Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>

                            </View>
                        </View>
                        <View style={[style.btnview,{backgroundColor:Const.appblue}]}>
                            <TouchableHighlight style={style.edit} underlayColor='transparent'>
                                <Text style={style.editText}>
                                    UPDATE PROFILE
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

}

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
    btndelete: {
        backgroundColor:'rgb(231,231,231)',
        justifyContent:'center',
        alignItems:'center',
        width:'60%',
        height:30,
        borderRadius:15
    },
    editText: {
        fontWeight:'bold',
        color:'white',
        width:150,
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
        marginTop:Const.height-230+10,
        backgroundColor: 'white'
    },
    outer:{
        flex:1,
        flexDirection:'column',
        marginBottom:5,
        justifyContent: 'flex-end'

    },
    picker:{
        marginBottom:0,
    },

});