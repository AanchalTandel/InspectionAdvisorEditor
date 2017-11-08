import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableHighlight,
    Image
} from 'react-native';
import {RichTextEditor, RichTextToolbar} from 'react-native-zss-rich-text-editor';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Const from '../../helper/constant';
import ColorPicker from './colorPicker';

export default class RichTextExample extends Component {

    constructor(props) {
        debugger
        super(props);
        this.getHTML = this.getHTML.bind(this);
        this.setFocusHandlers = this.setFocusHandlers.bind(this);
        this.state = {
            comment:props.comment,
            colorPicker:false
        }
    }


    componentDidMount() {
        if (this.richtext) {
            this.richtext.registerContentChangeListener(this.handleChange);
        }
    }

    componentWillReceiveProps(nextProps) {
        debugger
        this.setState({
            comment:nextProps.comment
        })
        this.richtext.setContentHTML(nextProps.comment)
    }

    handleChange = (message) => {
        debugger
        this.setState({comment:message})
    };

    setData = (comment) => {
        //const payload = {"type":"CONTENT_CHANGE","data":{"content":"send data"}};
       // this.richtext.onBridgeMessage(JSON.stringify(payload));
        this.richtext.setContentHTML(comment)
    };


    changeTextColor = (color) => {
        this.setState({
            colorPicker:false
        })
        this.richtext.setTextColor(color);
    }

    onComment = () => {
        this.props.comment()
    }

    render() {
        return (
            <View style={styles.container}>


                <RichTextEditor
                    ref={(r)=>this.richtext = r}
                    style={styles.richText}
                    enableOnChange
                    onChange={()=>this.handleChange()}
                    hiddenTitle={true}
                    contentPlaceholder="Enter Comments Here...."
                    initialContentHTML={this.state.comment}
                    editorInitializedCallback={() => this.onEditorInitialized()}
                />

                <RichTextToolbar
                    getEditor={() => this.richtext}
                />

                <View style={{position:'absolute',marginTop:120,marginLeft:15}}>
                    <TouchableHighlight onPress={() => this.setState({colorPicker:true})} style={{width:'9%'}} underlayColor='transparent'>
                        <View>
                            <Image style={{width:23, height:23}} source={require('../../assets/textcolor.png')} />
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={{position:'absolute',marginTop:120,marginLeft:Const.width-55}}>
                    <TouchableHighlight onPress={() => this.props.onComment()} style={{width:'9%'}} underlayColor='transparent'>
                        <View>
                            <Image style={{width:23, height:23}} source={require('../../assets/comments.png')} />
                        </View>
                    </TouchableHighlight>
                </View>
                {
                    (this.state.colorPicker)

                    &&

                    <View style={{position:'absolute',marginTop:70,marginLeft:10}}>
                        <ColorPicker onColorSelect={this.changeTextColor}/>
                    </View>

                    ||

                     null

                }




                {Platform.OS === 'ios' && <KeyboardSpacer/>}
            </View>
        );


    }

    onEditorInitialized() {``
        this.setFocusHandlers();
        this.getHTML();
    }

    async getHTML() {
        const titleHtml = await this.richtext.getTitleHtml();
        const contentHtml = await this.richtext.getContentHtml();
        //alert(titleHtml + ' ' + contentHtml)
    }

    setFocusHandlers() {
        this.richtext.setTitleFocusHandler(() => {
            //alert('title focus');
        });
        this.richtext.setContentFocusHandler(() => {
            //alert('content focus');
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        paddingTop: 5,
        borderColor:'lightgray',
        margin:4,
        borderRadius:5,
        borderWidth:2
    },
    richText: {
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        height:100
    },
    btnOuterView: {
        paddingRight:5,
        justifyContent:'flex-end',
        alignItems:'flex-end',
        backgroundColor:'yellow',
        position:'absolute'
    },
    btnView: {
        height:26,
        borderRadius:6,
        alignItems:'center',
        justifyContent:'center',
    },
});