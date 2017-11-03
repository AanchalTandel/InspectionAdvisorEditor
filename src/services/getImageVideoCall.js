import ImagePicker from 'react-native-image-picker';
import Const from '../helper/constant';

export function getImage(isContainMetadata, callback) {

    const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
            skipBackup: true
        }
    };

    if(isContainMetadata){
        ImagePicker.showImagePicker(options, (response) => {


            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                //console.log('URI:', JSON.stringify(source));
                Const.URIIMG = source;
                callback();
                return source;
            }
        })
    }
    else{
        alert("Please save the property information before uploading image.")
    }
}

export function getVideo(isContainMetadata, callback) {

    const options = {
        title: 'Video Picker',
        takePhotoButtonTitle: 'Take Video...',
        mediaType: 'video',
        videoQuality: 'medium'
    };

    if(isContainMetadata){
        ImagePicker.showImagePicker(options, (response) => {


            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                //console.log('URI:', JSON.stringify(source));
                Const.URIVIDEO = source;
                callback();
                return source;
            }
        })
    }
    else{
        alert("Please save the property information before uploading video.")
    }
}
