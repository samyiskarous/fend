
function handleSubmit(event) {
    event.preventDefault()
    document.getElementById('results').innerHTML = "Analyzing the content's sentiment...";

    let urlToAnalyze = document.getElementById('urlToAnalyze').value

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({urlToAnalyze}),
        headers: {
            "Content-Type": "application/json"
        },
        // redirect: 'follow'
    };

    fetch('http://localhost:8081/sentiment-analysis', requestOptions)
    .then(res => {
        return res.json();
    }).then((data) => {
        document.getElementById('results').innerHTML = `The content's sentiment is (${formatScoreTag(data.score_tag)})`;
    })
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
