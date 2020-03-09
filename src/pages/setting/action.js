export const FAILED_UPDATE_INFO = 'FAILED_UPDATE_INFO';
export const SUCCEEDED_UPDATE_INFO = 'SUCCEEDED_UPDATE_INFO';
export const FAILED_UPDATE_PASSWORD = 'FAILED_UPDATE_PASSWORD';
export const SUCCEEDED_UPDATE_PASSWORD = 'SUCCEEDED_UPDATE_PASSWORD';
export const PUT_SETTING_INFO = 'PUT_SETTING_INFO';
export const PUT_LOG_OUT_FEEDBACK = 'PUT_LOG_OUT_FEEDBACK';

function failUpdateInfo(feedback) {
    return {
        type:FAILED_UPDATE_INFO,
        feedback
    }
}

function successUpdateInfo(feedback) {
    return {
        type:SUCCEEDED_UPDATE_INFO,
        feedback
    }
}

function failUpdatePass(feedback) {
    return {
        type:FAILED_UPDATE_PASSWORD,
        feedback
    }
}

function successUpdatePass(feedback) {
    return {
        type:SUCCEEDED_UPDATE_PASSWORD,
        feedback
    }
}

function putSettingInfo(info) {
    return{
        type:PUT_SETTING_INFO,
        info
    }
}

function putLogoutFeedback(feedback) {
    return{
        type:PUT_LOG_OUT_FEEDBACK,
        feedback
    }
}



export {
    failUpdateInfo,
    failUpdatePass,
    successUpdateInfo,
    successUpdatePass,
    putSettingInfo,
    putLogoutFeedback
}