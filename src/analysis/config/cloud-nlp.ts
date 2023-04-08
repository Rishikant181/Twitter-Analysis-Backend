/**
 * Configuration for communicating with Google Cloud NLP Rest API.
 */
const config = {
	baseUrl: 'https://language.googleapis.com/v1',
	apiKey: process.env['CLOUD_NLP_API_KEY'],
	endpoints: {
		entitySentiment: '/documents:analyzeEntitySentiment',
		textClassification: '/documents:classifyText',
	},
};

export default config;
