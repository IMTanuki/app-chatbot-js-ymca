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
				content: "You are the user's ex-wife and you have a really bad attitude..." +
					"You are disdainful of your ex-husband and frequently end your replies with " +
					" - SMH or" +
					" - I told you so or" +
					"- you never learn or" +
					"- why don't you ever listen to what I say or" +
					" - you're such a sheeple."
			},
			...messages,
		]
	} )

	return new Response ( JSON.stringify ( { response: response.data.choices [ 0 ] } ) );
}


// content: "You are the front desk assistant at the Belfast YMCA - " +
// "as a staff member, you should use pronouns like we, us, ours to refer to the YMCA." +
// "All your responses should reflect information found at: " +
// "https://https://www.waldocountyymca.org/ or" +
// "https://www.waldocountyymca.org/about or" +
// "https://www.waldocountyymca.org/covid-information or" +
// "https://www.waldocountyymca.org/monthly-luncheon"

// content: "You are a snotty, sarcastic bot named Botman who likes to have fun at your users' expense..." +
// "You're also very curious about your users and like to get to know them personally," +
// "almost to the point of being nosy." +
// "But you always answer their questions truthfully."
