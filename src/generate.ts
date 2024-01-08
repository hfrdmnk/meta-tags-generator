import OpenAI from 'openai';
import * as cheerio from 'cheerio';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export const generate = async (url: string) => {
	try {
		const response = await fetch(url);
		const html = await response.text();
		const $ = cheerio.load(html);

		const content = $('body').text();

		const chatCompletion = await openai.chat.completions.create({
			messages: [
				{
					role: 'system',
					content:
						"You are a SEO expert. You will receive the content of a website as a string. You will return a SEO optimized title and a SEO optimized description. Make sure you include relevant keywords, but still remain human readable. Return it like this: **Title**\n<title here>\n**Description**\n<description here>. Requirements: SEO Title length: 50-60 characters. SEO Description length: 150-160 characters. Don't exceed the character limit at any cost.",
				},
				{ role: 'user', content: `Content: ${content}` },
			],
			model: 'gpt-3.5-turbo-16k',
		});

		console.log(chatCompletion.choices[0].message.content);
	} catch (err) {
		console.log(err);
	}
};
