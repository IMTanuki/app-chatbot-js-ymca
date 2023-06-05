"use client";
// imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

// imports - react
import { useRef, useState } from "react";
import {marked} from "marked";
import parse from "html-react-parser";

// imports - next
import Image from "next/image";

// main - home
export default function Home () {
	const messageRef = useRef ();
	const [ messages, setMessages ] = useState ( [] );
	const [ displayMessage, setDisplayMessage ] = useState ( "Hey there!" )
	const [ loading, setLoading ] = useState ( false );

	// event handlers
	const handleSubmit = async ( e ) => {
		e.preventDefault ();
		const prompt = messageRef.current.value;

		setLoading ( true );

		// update message list with latest prompt
		let newMessageList = [
			... messages,
			{
				role: "user",
				content: prompt,
			},
		];

		// call router and upd
		try {
			const response = await fetch ( "api/bot", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify ( { messages: newMessageList } ),
			} );

			// check status
			if ( ! response.ok ) {
				return;
			}

			// upd message list
			const data = await response.json ();

			newMessageList.push ( {
				role: data.response.message.role,
				content: data.response.message.content,
			} );

			setMessages (newMessageList);
			setDisplayMessage (data.response.message.content);
			messageRef.current.value = "";

			// console.log (newMessageList);

		} catch ( error ) {
			console.log ( error );
		} finally {
			setLoading (false);
		}

	}

	return <main className="container mx-auto max-w-4xl">

		{/* botman main */ }
		<div className="my-10 grid grid-cols-[50px,3fr,2fr] gap-4 items-center ">

			{/* col 01 */ }
			<div></div>

			{/*  coll 02 */}
			<div className={ `
			relative py-4 px-4 h-[50%] flex flex-col justify-center bg-indigo-400 rounded-lg
			${ loading ? "animate-pulse" : "" }
			` }>
				<div className="absolute h-[15px] w-[15px] bg-indigo-400 -right-[7px] top[50%] rotate-45"></div>
				<h3 className="text-2xl text-white bold">Botman Says:</h3>
				<p className="text-1xl text-white ">
					{ loading ? "I'm thinking..." : displayMessage }
				</p>
			</div>

			{/* col 03 */ }
			<div className="flex flex-col justify-center">
				<Image alt="Botman Image" src="/bot.png" width={ 512 } height={ 512 }/>
			</div>
		</div>

		{/* messages - form */}
		<form className="mt-6 grid grid-cols-[50px,4fr,1fr] gap-4 items-center" onSubmit={handleSubmit}>

			{/*  empty space */}
			<div></div>

			{/*  input field */}
			<input
				className="py-2 px-4 bg-white border border-gray-500 rounded-lg text-gray-700 placeholder-gray-500 "
				required
				type="text"
				ref={messageRef}
				placeholder="Ask me anything (then press the enter key or click the send btn)."
			/>

			{/* submit btn */}
			<button
				type="submit"
				className="px-4 py-2 bg-gray-100 border border-gray-700 rounded-lg text-gray-700 hover:scale-110 transition-all duration-200"
			>
				<div className="flex flex-row gap-4">
					<span>SEND</span>
					<FontAwesomeIcon className="pt-1" icon={faPaperPlane} />
				</div>
			</button>
		</form>


		{/* messages - list */ }
		<div className="mt-6">
			{messages.map((message) => {
				return (
					<div key={message.content} className="grid grid-cols-[50px,minmax(0,1fr)] gap-4 py-2 items-center">

						{/*  display role */}
						<div className="flex items-center justify-center">
							{message.role === "assistant" ? (
								<div className="w-[50px] h-[50px] rounded-full overflow-hidden">
									<img
										alt = "Botman Image"
										src="/bot.png"
										className="w-full h-full object-cover"
									/>
								</div>
							) : (
								<div className="text-xl font-normal">You</div>
							)}
						</div>

						{/*  display message */}
						<div className="py-2 px-4 bg-gray-100 border border-gray-400 rounded-xl text-left">
							{message.content}
						</div>
					</div>
				);
			})}
		</div>

	</main>;
}
