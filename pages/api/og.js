import { ImageResponse, Text, Image } from '@vercel/og';

export const config = {
	api: {
		bodyParser: false,
	},
};

export default function handler(req, res) {
	const title = 'Ex-wife Bot';
	const description = 'Stay in touch with yourl ex-wife';
	const imgSrc = '/bot.png'; // path to your bot.png

	const ogImage = new ImageResponse(
		new Image({ src: imgSrc, alt: title }),
		new Text({ align: 'center', y: '50%', fontSize: 96, color: 'white', children: title }),
		{
			width: 1200,
			height: 600,
		},
	);

	ogImage.render(req, res);
}
