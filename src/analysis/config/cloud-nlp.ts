/**
 * Configuration for communicating with Google Cloud NLP Rest API.
 */
const config = {
	baseUrl: 'https://language.googleapis.com/v1',
	endpoints: {
		entitySentiment: '/documents:analyzeEntitySentiment',
		textClassification: '/documents:classifyText',
	},
};

export default config;
