
function handleSubmit(event) {
    event.preventDefault()
    document.getElementById('results').innerHTML = "Analyzing the paragraph...";

    let textToAnalyze = document.getElementById('textToAnalyze').value
    
    const formdata = new FormData();
    formdata.append("key", process.env.API_KEY);
    formdata.append("txt", textToAnalyze);
    formdata.append("lang", "en");  

    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    const response = fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
    .then(response => ({
        status: response.status, 
        body: response.json()
    }))
    .then(({ status, body }) => {
        return body;
    })
    .catch(error => console.log('error', error));

    const displayResultsWhenReady = async () => {
        const data = await response;
        document.getElementById('results').innerHTML = `This paragraph is <strong>${formatScoreTag(data.score_tag)}</strong>`;
    }

    displayResultsWhenReady();
}

const formatScoreTag = (scoreTag) => {
    let formattedScoreTag = "";

    switch(scoreTag){
        case 'P+':
            formattedScoreTag = "Strongly Positive";
            break;
        case 'p':
            formattedScoreTag = "Positive";
            break;
        case 'NEU':
            formattedScoreTag = "Neutral";
            break;
        case 'N':
            formattedScoreTag = "Negative";
            break;
        case 'N+':
            formattedScoreTag = "Strongly Negative";
            break;
        case 'NONE':
            formattedScoreTag = "No Polarity";
            break;
        default:
            formattedScoreTag = "";
    }

    return formattedScoreTag;
}

export { handleSubmit }
