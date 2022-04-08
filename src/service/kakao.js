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

    getUser(setUser) {
        let ret;
        return window.Kakao.API.request({
            url: "/v2/user/me",
            data: {
                property_keys: ["kakao_account.profile", "kakao_account.email"],
            },
            success: function (response) {
                const nickname = response.kakao_account.profile.nickname;
                const thumbnail = response.kakao_account.profile.thumbnail_image_url;
                const email = response.kakao_account.email.split('.')[0];
                setUser({ nickname, thumbnail, email });
                ret = email;
            },
            fail: function (error) {
                console.log(error);
            },
        }).then(() => ret)
    }
    
}
export default Kakao;