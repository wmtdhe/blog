//action
export const PUT_PROFILE_INFO = 'PUT_PROFILE_INFO';
export const PUT_MORE_BLOG = 'PUT_MORE_BLOG';
export const PUT_FOLLOW_FEEDBACK = 'PUT_FOLLOW_FEEDBACK';

function putProfileInfo(profileData) {
    return {
        type:PUT_PROFILE_INFO,
        profileData
    }
}

function putMoreBlog(blog) {
    return {
        type:PUT_MORE_BLOG,
        blog
    }
}

function putFollowFeedback(feedback) {
    return{
        type:PUT_FOLLOW_FEEDBACK,
        feedback
    }
}

export {
    putProfileInfo,
    putMoreBlog,
    putFollowFeedback
}