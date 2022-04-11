class Kakao{

    async createAccessToken(AUTHORIZE_CODE) {
        const res = await fetch("https://kauth.kakao.com/oauth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=authorization_code&client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&code=${AUTHORIZE_CODE}`,
        })
        
        return await res.json();
    }

    getAccessToken() {
        return window.Kakao.Auth.getAccessToken();
    }

    setAccessToken(ACCESS_TOKEN) {
        window.Kakao.Auth.setAccessToken(ACCESS_TOKEN);
    }

    signIn() {
        window.Kakao.Auth.authorize({
            redirectUri: `${process.env.REACT_APP_REDIRECT_URI}`,
        });
    }

    signOut() {
        if (!window.Kakao.Auth.getAccessToken()) {
            console.log("Not logged in.");
            return;
        }
        window.Kakao.Auth.logout(function () {
            console.log("Logged out");
        });
    }

    async getUser() {
        
        const res = await window.Kakao.API.request({
            url: "/v2/user/me",
            data: {
                property_keys: ["kakao_account.profile", "kakao_account.email"],
            },
            // fail: function (error) {
            //     throw new Error("1",error);
            // },
        })
            .then(res => ({
                "email": res.kakao_account.email.split(".")[0],
                "name": res.kakao_account.profile.nickname,
                "imgae": res.kakao_account.profile.profile_image_url,
                "img": res.kakao_account.profile.thumbnail_image_url,
            }))
        return await res;
    }
    
}
export default Kakao;

