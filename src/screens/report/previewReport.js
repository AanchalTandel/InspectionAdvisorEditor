import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    WebView,
    Dimensions,
    AsyncStorage
} from 'react-native';
import Loader from '../../helper/loader';
import Const from '../../helper/constant';
import FontSize from '../../helper/fontsize';

export default class Preview extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoding:false,
            reportId:props.navigation.state.params.reportId,
            token:""
        }
    }

    componentWillMount(){
      AsyncStorage.getItem('user').then((value) => {
        let result = JSON.parse(value);
          this.setState({
              token: result.token
          });
      }).catch((err)=>{
          console.log("123")
      });
    }

    static navigationOptions = props => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        return {
            title: props.navigation.state.params.sectionTitle,
            headerStyle: {backgroundColor: Const.lbgray},
            headerTitleStyle: {color: 'white',width:Const.width,fontSize:FontSize.header},
            headerTintColor: 'white'
        }
    }

    render(){
        return(
            <View style={style.container}>
                <WebView
                    onNavigationStateChange={this._onNavigationStateChange}
                    automaticallyAdjustContentInsets={false}
                    source={{uri: "https://staging-app.inspectionadvisor.com/api/v1/generatereport/web_html_preview/" + this.state.reportId + "?token=" + this.state.token}}
                    style={[style.webview,{height: this.state.webViewHeight}]}
                    onLoadStart={() => {
                        this.setState({
                            isLoding:true
                        })
                    }}
                    onLoadEnd={()=> {
                        this.setState({
                            isLoding:false
                        })
                    }}
                />
                <Loader visible={this.state.isLoding}/>

            </View>
        );
    }

}

const  style = StyleSheet.create({
    container: {
        flex:1
    },
    webview: {
        marginTop:0,
        flex:1,
        width: Dimensions.get('window').width
    }

});
