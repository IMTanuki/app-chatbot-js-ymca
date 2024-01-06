"use client";
// imports - fonts
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

// imports - react
import { useRef, useState } from "react";
import { marked } from "marked";
import parse from "html-react-parser";

// imports - next
import Image from "next/image";

// imports - layout
import Layout from '../components/layout'

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
			const response = await fetch ( '/api/bot', {
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

			setMessages ( newMessageList );
			// setDisplayMessage (data.response.message.content);
			setDisplayMessage ( "See my answer below..." );
			messageRef.current.value = "";

			// console.log (newMessageList);

		} catch ( error ) {
			console.log ( error );
		} finally {
			setLoading ( false );
		}

	}

	return (
		<Layout>
			<main className="container mx-auto max-w-4xl">

				{/* botman main */ }
				<div className="grid grid-cols-1 gap-0
									lg:grid-cols-[50px,3fr,2fr] lg:gap-4
									items-center">

					{/* 01 - null */ }
					<div></div>

					{/*  coll 02  - text box*/ }
					<div className={ `
										relative mx-2 lg:mx-0 py-20 lg:py-4 px-4 lg:px-4 h-[50%] 
										flex flex-col justify-center 
										items-center lg:items-start 
										bg-indigo-400 rounded-lg
			${ loading ? "animate-pulse" : "" }
			` }>
						<div className="hidden lg:block absolute h-[15px] w-[15px]
											-right-[7px] top-[50%] rotate-45
											bg-indigo-400"></div>
						<div className="lg:hidden absolute h-[15px] w-[15px]
											left-[50%] -top-[7px] rotate-45
											bg-indigo-400"></div>
						<h3 className="text-3xl lg:text-3xl  bold text-center text-white">YMCA Info Bot</h3>
						<div className="py-2"></div>
						<p className="text-2xl lg:text-2xl  text-center text-white">
							{ loading ? "I'm thinking..." : displayMessage }
						</p>
					</div>

					{/* 03 - bot img */ }
					<div className="order-[-1] lg:order-none
										flex justify-center lg:justify-center">
						<Image alt="Botman Image" src="/bot.png" width={ 512 } height={ 512 }/>
					</div>

				</div>

				{/*  form */ }
				<form className="mt-6
									grid grid-cols-1 gap-0
									lg:grid-cols-[50px,4fr,1fr] lg:gap-4
									items-center"
					  onSubmit={ handleSubmit }>

					{/* empty space */ }
					<div className="hidden lg:block lg:col-span-1"></div>

					{/*  input field */ }
					<input
						className="mx-2 lg:mx-0 py-2 px-4
									col-span-3 lg:col-span-1
									bg-white border border-gray-500 rounded-lg
									text-gray-700 placeholder-gray-500 "
						required
						type="text"
						ref={ messageRef }
						placeholder="Ask me something...."
					/>

					{/* submit btn */ }
					<button
						type="submit"
						className="px-4 py-2
									hidden lg:flex lg:col-span-1
									bg-gray-100 border border-gray-700 rounded-lg text-gray-700
									hover:scale-110 transition-all duration-200 ">
						<div className="flex flex-row gap-4">
							<span>SEND</span>
							<FontAwesomeIcon className="pt-1"
											 icon={ faPaperPlane }/>
						</div>
					</button>
				</form>


				{/* messages - list */ }
				<div className="mt-6 mx-2 lg:mx-0 ">
					{ messages.map ( ( message ) => {
						return (
							<div key={ message.content }
								 className="grid grid-cols-[50px,minmax(0,1fr)] gap-4 py-2 items-center">

								{/*  display role */ }
								<div className="flex items-center justify-center">
									{ message.role === "assistant" ? (
										<div className="w-[50px] h-[50px] rounded-full overflow-hidden">
											<img
												alt="Botman Image"
												src="/bot.png"
												className="w-full h-full object-cover"
											/>
										</div>
									) : (
										<div className="text-xl font-normal">You</div>
									) }
								</div>

								{/*  display message */ }
								<div className="py-2 px-4 bg-gray-100 border border-gray-400 rounded-xl text-left">
									{ message.content }
								</div>
							</div>
						);
					} ) }
				</div>

			</main>
		</Layout>
	);
}
