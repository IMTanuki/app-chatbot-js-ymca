const { ImageResponse, Text, Image } = require('@vercel/og');

module.exports = {
	config: {
		api: {
			bodyParser: false,
		},
	},

	handler(req, res) {
		const title = 'Ex-wife Bot';
		const description = 'Stay in touch with your ex-wife';
		const imgSrc = '/bot.png';

		const ogImage = new ImageResponse(
			new Image({ src: imgSrc, alt: title },
				new Text({ align: 'center', y: '50%', fontSize: 96, color: 'white', children: title }),
			),
			{
				width: 1200,
				height: 600,
			}
		);

		ogImage.render(req, res);
	}
}
