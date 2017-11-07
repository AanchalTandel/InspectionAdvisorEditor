import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    ListView,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import Const from '../../helper/constant'
let color = ['#f5f5dc','#f0e68c','#ffff00','#ffd700','#daa520',
    '#fffaf0','#ffa07a','#e9967a','#d2691e','#8b0000',
    '#ffe4e1','#cd5c5c','#dc143c', '#ff0000','#800000',
    '#e0ffff','#87cefa','#add8e6','#4169e1','#191970',
    '#f0ffff','#c0c0c0','#808080','#696969','#000000'
];

export default class ColorPicker extends Component {




    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(color),
        };
    }

    renderColor = (data) => {
        return(
            <TouchableHighlight onPress={()=>alert('color selected')}>
                <View style={{backgroundColor:data,height:22,width:22,margin:1}}/>
            </TouchableHighlight>
        )

    }

    render() {
        return (
            <View style={{flex:1,padding:2}}>
                <ScrollView contentInset={{top: 64, bottom: 49}}
                            removeClippedSubviews={false}
                            contentContainerStyle={style.container}
                            dataSource={this.state.dataSource}
                            renderRow={(data)=>this.renderColor(data)}
                            automaticallyAdjustContentInsets={false}>
                    {
                        color.map((obj,index) => {
                            return (
                                <TouchableHighlight onPress={() => alert('color selected')}>
                                    <View style={{backgroundColor: obj, height: 20, width: 20, margin: 3}}/>
                                </TouchableHighlight>
                            )
                        })
                    }

                </ScrollView>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flexDirection:'row',
        flexWrap: 'wrap',
        width:135,
        backgroundColor:'#dcdcdc'
    },
})