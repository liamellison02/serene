function AuthorizeTwitter() {
    const handleTwitterLogin = () => {
        window.location.href = 'https://api.twitter.com/oauth/authenticate?oauth_token=YOUR_OAUTH_TOKEN';
    };

    return (
        <div id="AuthorizeTwitter" className="h-[300px] flex flex-col justify-center items-center">
            <h1 className="">This page will authorize the user with twitter</h1>
            <button id="twitter-login" onClick={handleTwitterLogin} className="h-[20px] bg-slate-300 p-5 border border-black">Login with Twitter</button>
        </div>
    );

}

export default AuthorizeTwitter;