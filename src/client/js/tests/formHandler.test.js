import {analyzeSentimentWithAPI, formatScoreTag} from '../formHandler';

test('Sentiment Analysis API Working', async () => {
    const requestOptionsForTest = {
        method: 'POST',
        body: JSON.stringify({urlToAnalyze: 'https://www.independent.co.uk/topic/murder'}),
        headers: {
            "Content-Type": "application/json"
        },
    };

    expect(
        await analyzeSentimentWithAPI(requestOptionsForTest)
    ).not.toBe({});
}, 15000);

test('Score Tag Formatting', () => {
    expect(
        formatScoreTag('P+')
    ).toBe('Strongly Positive');
    expect(
        formatScoreTag('NEU')
    ).toBe('Neutral');
});