import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export const generate = async (url: string) => {
	try {
		const chatCompletion = await openai.chat.completions.create({
			messages: [{ role: 'user', content: 'Say this is a test' }],
			model: 'gpt-3.5-turbo',
		});

		console.log(url);
		console.log(chatCompletion.choices[0].message.content);
	} catch (err) {
		console.log(err);
	}
};
