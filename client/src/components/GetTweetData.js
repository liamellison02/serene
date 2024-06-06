async function GetTweetData(user_id) {

    if (!user_id) {
        console.log("Need user id to get analysis")
        return
    }

    let full_analysis = undefined

    await fetch(`/api/analyze?user_id=${user_id}`)
        .then(response => response.json())
        .then(data => {
            console.log(Object.keys(data));
            full_analysis = data
        })
        .catch(error => {
            console.error('Error:', error);
        });

    return full_analysis;
}

export default GetTweetData
