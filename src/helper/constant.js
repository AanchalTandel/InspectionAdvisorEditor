import {
    Dimensions,
    Platform
} from 'react-native';

module.exports = {

    width : Dimensions.get('window').width ,
    height : Dimensions.get('window').height ,
    appblue : 'rgb(29,98,169)',
    lbgray : 'rgb(102,112,124)',
    darkgray : 'rgb(223,223,223)',
    lightgray: 'rgb(231,231,231)',

    //PLATFORM
    OS : Platform.OS === 'ios',

    //API CONSTANT
    baseurl:'http://staging-api.inspectionadvisor.com/api/v1/',
    signin:'signin',
    reports:'report',
    reportDel:'report/',
    reportTemplate:'reporttemplate',
    reportSection:'reportsection/organization/',
    reportsection:'reportsection/',
    subsection:'subsections',
    reportSubSection:'reportsubsection/',
    elements:'elements',
    property:'property',
    client:'client',
    agent:'agent',
    reportProperty:'reportproperty',
    reportFiledata:'reportfiledata',

    mediaBaseUrl : 'https://staging-app.inspectionadvisor.com/api/v1/',
    reportImages : 'reportimage',
    reportVideos : 'reportvideo',
    reportMediaSubSection : 'reportsubsection/',
    deleteImage : 'reportimage/delete/',
    deleteVideo : 'reportvideo/delete/',
    generateReport: 'generatereport/',


    //FONT
    header:'20',

    //IMAGE_VIDEO
    URIIMG: '',
    URIVIDEO: '',

    states: ['Alabama', 'Alaska', 'Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District Of Columbia',
        'Florida','Georgia','Hawaii', 'Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland',
        'Massachusetts','Michigan','Minnesota', 'Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey',
        'New Mexico','New York','North Carolina','North Dakota','Ohio', 'Oklahoma','Oregon','Pennsylvania','Rhode Island',
        'South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont', 'Virginia','Washington','West Virginia','Wisconsin','Wyoming'],
};


