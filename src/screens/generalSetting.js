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
import DropDown from '../screens/component/infoDropDown';
import SplashScreen from 'react-native-splash-screen'
let views = null;
let data = ['1','2','3','4','5','6','7']

export default class GeneralSetting extends Component{

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
        SplashScreen.hide();
    }


    updateState = (state) => {
        this.setState({selected: state});
        this.onPressRemoveView()
    }

    onPressSelect = () => {
        if (this.state.opened === false) {
            this.setState((state) => ({views: [...state.views, {}]}));
            this.setState({opened: true});
            temp = data;
        }else{
            this.setState({opened: false});
            this.setState((state) => ({views: state.views.slice(0, -1)}));
        }
    };

    onPressRemoveView = () => {
        this.setState({opened: false});
        this.setState((state) => ({views: state.views.slice(0, -1)}));
    };



    render(){

        views =
            this.state.views.map((view, i) =>
                <View key={i} style={style.outer}>
                    <View>
                        <Picker style={style.picker} selectedValue={this.state.selected} onValueChange={this.updateState}>

                            {
                                temp.map(function (state, index) {
                                    return <Picker.Item key={index} label={state} value={state}/>
                                })
                            }

                        </Picker>
                    </View>

                </View>

            )

        return(
            <View style={style.container}>
                <ScrollView style={{flex:1}}
                            showsVerticalScrollIndicator={false}>
                <View style={{marginTop:10,flex:1}}>
                    <TextInputInfo placeholder="Organization Name"/>
                    <TextInputInfo placeholder="Email"/>
                    <TextInputInfo placeholder="Website"/>
                    <TextInputInfo placeholder="Address"/>
                    <TextInputInfo placeholder="City"/>
                    <DropDown onSelectItem={this.onPressSelect} style={{backgroundColor:'red'}} title={data.main_label} item={data}
                              selected='State'/>
                    <TextInputInfo placeholder="Zip"/>
                    <TextInputInfo placeholder="Phone"/>
                    <TextInputInfo placeholder="Fax"/>
                    <View style={{flexDirection:'row'}}>
                        <View style={{height:130,width:130,backgroundColor:'rgb(231,231,231)',margin:7,borderRadius:5,borderWidth:1,borderColor:'rgb(194,209,296)'}}>

                        </View>
                        <View style={{flex:1,flexDirection:'column',justifyContent:'center'}}>
                            <View style={{padding:3}}>
                                <TouchableHighlight>
                                    <View style={{backgroundColor:'rgb(231,231,231)',justifyContent:'center',alignItems:'center',width:'60%',height:30,borderRadius:15}}>
                                        <Text style={{color:'rgb(226,98,98)'}}>Delete</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View style={{padding:3}}>
                                <TouchableHighlight>
                                    <View style={{backgroundColor:'rgb(231,231,231)',justifyContent:'center',alignItems:'center',width:'60%',height:30,borderRadius:15}}>
                                        <Text style={{color:Const.appblue}}>Update</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>

                        </View>
                    </View>
                    <View style={[style.btnview,{backgroundColor:Const.appblue}]}>
                        <TouchableHighlight style={style.edit} underlayColor='transparent'>
                            <Text style={style.editText}>
                                SAVE
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={style.viewContainer}>
                    {views}
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