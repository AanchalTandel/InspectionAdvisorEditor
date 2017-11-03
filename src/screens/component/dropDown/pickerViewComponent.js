import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Picker
} from 'react-native';

export default class PickerView extends Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props){
        super(props);
        this.state = {
            pickeritems:props.item,
            view :props.view,
            index:props.index
        }
    }

    updateSlelectedItem = (item) => {
            this.setState({selectedItem: item.option_label});
            this.props.onRemove(item.option_label)
    }

    render(){
        return(

                <View key={this.state.index} style={style.outer}>
                    <View>
                        <Picker style={style.picker}
                                selectedValue={this.state.selectedItem}
                                onValueChange={this.updateSlelectedItem}>
                            {
                                this.state.pickeritems.map(function (data, index) {
                                    return <Picker.Item key={index} label={data.option_label} value={data}/>
                                })
                            }
                        </Picker>
                    </View>
                </View>

        );
    }


}

const style = StyleSheet.create({
    picker:{
        marginBottom:0,
    },
})