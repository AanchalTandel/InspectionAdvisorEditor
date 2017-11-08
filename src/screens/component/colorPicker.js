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
let color1 = ['#f5f5dc','#f0e68c','#ffff00','#ffd700','#daa520',
    '#fffaf0','#ffa07a','#e9967a','#d2691e','#8b0000',
    '#ffe4e1','#cd5c5c','#dc143c', '#ff0000','#800000',
    '#e0ffff','#87cefa','#add8e6','#4169e1','#191970',
    '#f0ffff','#c0c0c0','#808080','#696969','#000000'
];

let color = ['#000000','#696969',,'#800000','#ff0000','#ff8c00','#cd853f','#ffff00','#556b2f','#008000','#006400','#87ceeb','#000080',
    '#808080','#c0c0c0','#dc143c','#ff6347','#f4a460','#daa520','#f0e68c','#808000','#90ee90','#8fbc8f','#87cefa','#0000cd']

export default class ColorPicker extends Component {

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(color),
        };
    }

    onSelect = (color) => {
        this.props.onColorSelect(color)
    }


    render() {
        return (
            <View style={{backgroundColor:'yellow',width:280}}>
                <View style={style.container}>
                    {
                        color.map((obj,index) => {
                            return (
                                <TouchableHighlight onPress={() => this.onSelect(obj)}>
                                    <View style={{backgroundColor: obj, height: 20, width: 20, margin:1.5}}/>
                                </TouchableHighlight>
                            )
                        })
                    }

                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flexDirection:'row',
        flexWrap: 'wrap',
        width:280,
        backgroundColor:'#dcdcdc',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:0.5,
        borderColor:'black',
        borderRadius:3
    },
})