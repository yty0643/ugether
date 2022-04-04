class Kakao{
    
    getAuthCode() {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
    }

    async getToken(AUTHORIZE_CODE) {
        const res = await fetch(`https://kauth.kakao.com/oauth/token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=authorization_code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&code=${AUTHORIZE_CODE}`,
        })
        return await res.json();
    }

    async getUser(ACCESS_TOKEN) {
        const res = await fetch('https://kapi.kakao.com/v2/user/me', {
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        });
        return await res.json();
    }
}

export default Kakao;