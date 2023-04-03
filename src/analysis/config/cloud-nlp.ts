/**
 * Configuration for communicating with Google Cloud NLP Rest API.
 */
const config = {
    BASE_URL: 'https://language.googleapis.com/v1',
    API_KEY: process.env['CLOUD_NLP_API_KEY'],
    endpoints: {
        ENTITY_SENTIMENT: '/documents:analyzeEntitySentiment',
        TEXT_CLASSIFICATION: '/documents:classifyText'
    }
};

export default config;