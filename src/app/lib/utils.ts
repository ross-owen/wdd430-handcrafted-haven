import sharp from 'sharp';

export function starRating(rating: number) {
	const stars = [];
	for (let i = 0; i < rating; i++) {
		stars.push('<span>★</span>');
	}
	for (let i = rating; i < 5; i++) {
		stars.push('<span>☆</span>');
	}
	return stars.join('');
}

export async function convertImageToRawBinary(image: File) {
	const fileBuffer = Buffer.from(await image.arrayBuffer());
	const optimizedBuffer = await sharp(fileBuffer)
		.resize({ width: 600, height: 600, fit: 'inside' })
		.webp({ quality: 75 })
		.toBuffer();

	return optimizedBuffer;
}
