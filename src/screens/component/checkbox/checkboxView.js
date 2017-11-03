import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import Checkbox from './checkbox';
import FontSize from '../../../helper/fontsize';
let checked = {};

const checkboximage = {
    checked:require('../../../assets/CheckedCheckbox.png'),
    unchecked:require('../../../assets/UncheckedCheckbox.png'),
}

export default class CheckboxView extends Component {

    constructor(props){
        super(props);
        this.state = {
            title:props.title,
            checkboxname:props.item,
            key:props.keyText,
            selectedValue:props.selectedValue
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedValue:nextProps.selectedValue
        })
    }

    onGettingStatus(key,value,state){
        let object = checked.hasOwnProperty(key);
        if(object){
           if(!state){
               delete checked[key];
           }
        }else{
            if(state){
                checked[key] = value;
            }
        }
        this.props.onUpdateData(checked)
    }

    render(){
        return(
            <View style={style.container}>

                <Text style={{fontSize:FontSize.regFont}}>{this.state.title}</Text>
                <View style={style.checkboxView}>
                    {
                        this.state.checkboxname.map((data, index) => {
                            let checkedstatus = this.state.selectedValue.hasOwnProperty(data.guid);
                            return(
                                <Checkbox key={index} title={data.option_label}
                                          image={checkboximage.unchecked}
                                          checkedimage={checkboximage.checked}
                                          keyText={data.guid}
                                          checkedStatus={checkedstatus}
                                          status={this.onGettingStatus.bind(this)}/>
                            );
                        })
                    }
                </View>
            </View>
        );
    }

}

const style = StyleSheet.create({
    container: {
        backgroundColor:'white',
        padding:10
    },
    checkboxView: {
        flexDirection:'row',
        flexWrap:'wrap'
    }

});