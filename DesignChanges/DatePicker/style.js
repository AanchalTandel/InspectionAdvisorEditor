import {StyleSheet} from 'react-native';

let style = StyleSheet.create({
    dateTouch: {
        width: 142
    },
    dateTouchBody: {
        flexDirection: 'row',
        height: 45,
        backgroundColor:'rgb(223,223,223)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 45/2
    },
    dateIcon: {
        width: 23,
        height: 23,
        marginLeft: 5,
        marginRight: 10
    },
    dateInput: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        paddingLeft:30,
        paddingRight:30
    },
    dateText: {
        color: '#333'
    },
    placeholderText: {
        color: 'rgb(29,98,169)'
    },
    datePickerMask: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'row',
        backgroundColor: '#00000077'
    },
    datePickerCon: {
        backgroundColor: '#fff',
        height: 0,
        overflow: 'hidden'
    },
    btnText: {
        position: 'absolute',
        top: 0,
        height: 42,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTextText: {
        fontSize: 16,
        color: '#46cf98'
    },
    btnTextCancel: {
        color: '#666'
    },
    btnCancel: {
        left: 0
    },
    btnConfirm: {
        right: 0
    },
    datePicker: {
        marginTop: 42,
        borderTopColor: '#ccc',
        borderTopWidth: 1
    },
    disabled: {
        backgroundColor: '#eee'
    }
});

export default style;
