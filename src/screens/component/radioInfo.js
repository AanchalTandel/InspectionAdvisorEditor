import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import Const from '../../helper/constant';
import FontSize from '../../helper/fontsize';

export default class Radio extends Component {

    constructor(props){
        super(props);
        this.state = {
            text: '',
            title:props.title,
            radioButtonItem:props.item,
            selectedIndex:props.index,
            key:props.keytext
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState ({
            selectedIndex:nextProps.selectedIndex,
        })
    }

    onSelect = (index, value) => {
        this.setState({
            selectedIndex:index,
            text: 'Selected index:' + index + ',  value:' + value
        })
        this.props.onUpdateData(this.state.key,index)
    }

    render(){

        return(
            <View style={style.container}>
                <View style = {{padding:10}}>
                    <Text style={{fontSize:FontSize.regFont}}>{this.state.title}</Text>
                </View>
                <RadioGroup
                    onSelect = {(index, value) => this.onSelect(index, value)}
                    style = {{flexDirection:'row',flexWrap:'wrap'}}
                    color = 'gray'
                    activeColor={Const.appblue}
                    selectedIndex={this.state.selectedIndex}

                >
                    {
                        this.state.radioButtonItem.map((data, index) => {
                            return(
                                <RadioButton key={index} value={'item1'} color={Const.appblue}>
                                    <Text style={{fontSize:FontSize.regFont}}>{data}</Text>
                                </RadioButton>
                            );
                        })
                    }

                </RadioGroup>

            </View>

        );

    }

}

const style = StyleSheet.create({

    container: {
        backgroundColor:'white',
    },
    text: {
        padding: 10,
        fontSize: 14,
    },

})

