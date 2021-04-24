const fetch = require('node-fetch');

async function handleSubmit(event) {
    event.preventDefault()

    let urlToAnalyze = document.getElementById('urlToAnalyze').value

    if(Client.validateURL(urlToAnalyze) === false){
        alert('Invalid URL')
        return false;
    }

    document.getElementById('results').innerHTML = "Analyzing the content's sentiment...";
    document.getElementById('analyzeBtn').value = "Analyzing...";
    document.getElementById('analyzeBtn').disabled = true;

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({urlToAnalyze}),
        headers: {
            "Content-Type": "application/json"
        },
    };

    const analysisData = await analyzeSentimentWithAPI(requestOptions);

    updateDOMWithResults(analysisData.score_tag);  
}

const analyzeSentimentWithAPI = async (requestOptions) => {
    let analysisData = {}; 

    analysisData = await fetch('http://localhost:8081/sentiment-analysis', requestOptions)
    .then(res => {
        return res.json();
    }).then((data) => {
        return data;
    })

    return analysisData;
}

const updateDOMWithResults = (score_tag) => {
    document.getElementById('results').innerHTML = `The content's sentiment is (${formatScoreTag(score_tag)})`;

    document.getElementById('analyzeBtn').value = "Analyze Sentiment";
    document.getElementById('analyzeBtn').disabled = false;
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

export { 
    handleSubmit, 
    formatScoreTag,
    analyzeSentimentWithAPI
}
