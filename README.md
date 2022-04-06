# error 해결 과정

KAKAO REST API로 SignIn 구현중 fetch를 통해 https://kauth.kakao.com/oauth/authorize를 비동기 통신 방식으로 호출했다.

    fetch(
    `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=http://localhost:3000`
    );

결과
Access to fetch at 'https://accounts.kakao.com/login?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3000%26client_id%3D1709c427adddf6bb6a6c0fbe29a8922c' (redirected from 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=1709c427adddf6bb6a6c0fbe29a8922c&redirect_uri=http://localhost:3000') from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
app.jsx:11 GET https://accounts.kakao.com/login?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3000%26client_id%3D1709c427adddf6bb6a6c0fbe29a8922c net::ERR_FAILED 200
app.jsx:11 Uncaught (in promise) TypeError: Failed to fetch

해결
https://kauth.kakao.com/oauth/authorize은 redirect_uri로 리다이렉트 되기 때문에 HTML 링크로 구현하거나 SDK를 사용해야 한다.
본 프로젝트에서는 a태그를 사용해서 구현했다.

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=http://localhost:3000`;
    <a href={kakaoURL}>kakao SignIn</a>

KAKAO REST API로 SignIn 토큰 받기 중에 에러가 발생했다.

    fetch(`https://kauth.kakao.com/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        client_id: process.env.REACT_APP_CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        code: AUTHORIZE_CODE,
      }),
    })

결과
app.jsx:15
POST https://kauth.kakao.com/oauth/token 401 (Unauthorized)
app.jsx:15
{error: 'invalid_client', error_description: 'Bad client credentials', error_code: 'KOE010'}
error: "invalid_client"
error_code: "KOE010"
error_description: "Bad client credentials"
[[Prototype]]: Object

해결
KAKAO 문서에 아주 작게 QueryString 형식으로 인가 코드를 전달 받는다고 작성되어 있었다.
따라서 body를 JSON.stringify형식이 아닌 QueryString형식으로 수정했고 곧바로 해결되었다.
관련 정보를 찾던 중 'Client Secret 코드를 발급받아야 한다', '허용 IP 주소를 추가해야 한다'는 얘기를 듣고 여러 뻘짓을 했다

    fetch(`https://kauth.kakao.com/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=authorization_code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}`,
    })

KAKAO REST API로 사용자 정보 얻기 중에 에러가 발생했다.

Access to fetch at 'https://kapi.kakao.com/v2/user/me' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
kakao.js:19 GET https://kapi.kakao.com/v2/user/me net::ERR_FAILED
kakao.js:19 Uncaught (in promise) TypeError: Failed to fetch

CORS 정책 오류.. Kakao REST API 사용중에 CORS 정책 오류가 발생함
찾아보니 kapi는 정책상 cross domain을 허용하지 않는다 kauth는 허용한다고 함 그래서 인증 코드 발급까지는 가능했던 것
그래서 REST API는 포기하고 CORS가 허용되는 Kakao SDK를 사용해서 로그인을 구현하고 사용자 정보를 받아올 예정...

Javascript Kakao SDK를 사용한 로그인 과정

1. Kakao SDK를 통해 SignIn 및 AUTHORIZE_CODE 생성
2. AUTHORIZE_CODE 및 Kakao REST API를 통해 사용자 ACCESS_TOKEN 생성
3. ACCESS_TOKEN 통해 사용해서 사용자 정보 접근
4. ACCESS_TOKEN 파기 및 사용자 로그아웃
   으로 요약할 수 있다.
   AUTHORIZE_CODE는 재사용 불가능 코드이며
   ACCESS_TOKEN을 localStorage에 저장해두고 재사용함으로써 로그인 상태를 유지할 수 있다.
