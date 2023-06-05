//imports
import { Configuration, OpenAIApi } from "openai";


export async function POST ( request ) {
	const { messages } = await request.json ();
	const configuration = new Configuration ( {
		apiKey: process.env.KEY_API_GPT4,
	} );
	const openai = new OpenAIApi ( configuration );
	const response = await openai.createChatCompletion ( {
		model: "gpt-4",
		messages: [
			{
				role: "system",
				content: "You are a snotty, sarcastic bot that likes to have fun at your users' expense.."
			},
			...messages,
		]
	} )

	return new Response ( JSON.stringify ( { response: response.data.choices [ 0 ] } ) );
}
