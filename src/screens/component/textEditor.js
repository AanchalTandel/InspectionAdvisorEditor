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
import FontSize from '../../helper/fontsize';

export default class RichTextExample extends Component {

    constructor(props) {
        super(props);
        this.getHTML = this.getHTML.bind(this);
        this.setFocusHandlers = this.setFocusHandlers.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.btnOuterView}>
                    <TouchableHighlight onPress={() => {alert('get')}} style={{width:'9%'}} underlayColor='transparent'>
                        <View style={styles.btnView}>
                            <Image style={{width:23, height:23}} source={require('../../assets/comments.png')} />
                        </View>
                    </TouchableHighlight>
                </View>

                <RichTextEditor
                    ref={(r)=>this.richtext = r}
                    style={styles.richText}
                    initialTitleHTML={'Title!!'}
                    editorInitializedCallback={() => this.onEditorInitialized()}
                />
                <RichTextToolbar
                    getEditor={() => this.richtext}
                />
                {Platform.OS === 'ios' && <KeyboardSpacer/>}
            </View>
        );
    }

    onEditorInitialized() {
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
    },
    btnView: {
        height:26,
        borderRadius:6,
        alignItems:'center',
        justifyContent:'center'
    },
});