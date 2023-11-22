//const { userCookie } = require("express-session");
//const { userCookie  } = require("cookie-parser");

document.addEventListener('DOMContentLoaded', function() {
    const loginbtn = document.getElementById("login-form");
    const logoutbtn = document.getElementById("logout-form");
    const profilebtn = document.getElementById("profile-form");

    
   // 쿠키에서 user 정보를 가져오는 함수
   function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

// 쿠키에서 user 정보를 확인하고 상태에 따라 버튼을 표시하거나 숨깁니다.
const userCookie = getCookie("user");

if (userCookie) {
    // user 쿠키가 있으면 로그인 상태
    loginbtn.style.display = "none";
    logoutbtn.style.display = "inline";
    profilebtn.style.display = "inline";
} else {
    // user 쿠키가 없으면 로그아웃 상태
    loginbtn.style.display = "inline";
    logoutbtn.style.display = "none";
    profilebtn.style.display = "none";
}
// 쿠키 만료 시간을 설정 (예: 3600 초)
const expirationTime = 3600;
document.cookie = `user=; max-age=${expirationTime}`;
});