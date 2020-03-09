export const POST = 'POST';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const PUT_USER_INFO = 'PUT_USER_INFO';
export const PUT_HOMEPAGE_BLOG = 'PUT_HOMEPAGE_BLOG';
export const TEST = 'TEST';
export const INSERT_BLOG = 'INSERT_BLOG';

function putHomepageBlog(blog) {
    return {
        type:PUT_HOMEPAGE_BLOG,
        blog // {}
    }
}

function putUserInfo(info) {
    return {
        type:PUT_USER_INFO,
        info //{user,fan,following}
    }
}

function insertBlog(blog) {
    return {
        type:INSERT_BLOG,
        blog
    }
}

export {
    putHomepageBlog,
    putUserInfo,
    insertBlog
}