import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import Const from '../../../helper/constant';
import FontSize from '../../../helper/fontsize';
import _ from 'lodash';

export default class Radio extends Component {

    constructor(props){
        super(props);
        this.state = {
            text: '',
            title:props.title,
            radioButtonItem:props.item,
            selectedIndex:props.selectedIndex,
            key:props.keyText,
            selectedValue:props.selectedValue
        }
    }

    componentWillReceiveProps(nextProps) {
        let tempobj = _.find(this.state.radioButtonItem,{"option_label":nextProps.selectedValue});
        let selectedIndex = this.state.radioButtonItem.indexOf(tempobj);
        this.setState({
            selectedIndex:selectedIndex
        })
    }

    onSelect = (index, value) => {
        this.setState({
            selectedIndex:index
        })
        this.props.onUpdateData(this.state.key,value)
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
                                <RadioButton key={index} value={data.option_label} color={Const.appblue}>
                                    <Text style={{color:Const.appblue,fontSize:FontSize.regFont}}>{data.option_label}</Text>
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
        flex:1
    },
    text: {
        padding: 10,
        fontSize: 14,
    },

})

