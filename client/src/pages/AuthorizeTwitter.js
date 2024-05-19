const axios = require('axios');

function AuthorizeTwitter() {

    const getTwitterAuthLink = async () => {
        try {
            const response = await axios.get('/auth/twitter');
            const authLink = response.data;
            window.location.href = authLink;
        } catch (error) {
            console.error('Failed to get Twitter auth link:', error);
        }
    };

    getTwitterAuthLink();

    return (
        <div id="AuthorizeTwitter" className="h-[300px] flex flex-col justify-center items-center">
            <h1 className="">Redirecting you to twitter...</h1>
        </div>
    );

}

export default AuthorizeTwitter;