export default function getUserByCookie() {
    let cookies = document.cookie;
    let arr = cookies.split('; ');
    let userName;
    let nickname;
    let picture;
    for(let i=0;i<arr.length;i++){
        let ret = arr[i].split('=');
        if(ret[0]=='user'){
            userName = ret[1];
        }
        if(ret[0]=='nick'){
            nickname = ret[1];
        }
        if(ret[0]=='pic'){
            picture = ret[1];
        }
    }
    return {userName,nickname,picture};
}