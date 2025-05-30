const sellers = [
	{
		id: '410544b2-4001-4271-9855-fec4b6a6442a',
		first_name: 'Danny',
		last_name: 'Smith',
		description:
			'I am a passionate artist. I love to create unique and useful pottery objects',
		location: 'New York, New York',
		email: 'dsmith@mail.com',
		password: '123456',
		created: '1/1/2025 13:00',
		modified: '1/8/2025 18:36',
        profile_pic: 'dSmith_profile.png'
	},
	{
		id: 'a0f88e4a-2f3b-4b0a-8f3c-cd2adad8dc9e',
		first_name: 'John',
		last_name: 'Dirk',
		description:
			'I love to put pen to paper and just draw. My unique style of painting is done in one go, never lifting the pen from the paper',
		location: 'Salt Lake City, Utah',
		email: 'jdirk@mail.com',
		password: '123456',
		created: '3/1/2025 06:00',
		modified: '5/8/2025 03:15',
        profile_pic: 'jDirk_profile.png'
	},
];

const items = [
    {
        id: '1fa85f64-5717-4562-b3fc-2c963f66afa1',
        seller_id: sellers[0].id,
        category_id: '7b4d755d-83c1-4d68-91f3-dc4297a2db1e',
        price: '35.00',
        description: 'A beautifully handcrafted pottery bowl.',
        title: 'Pottery Bowl',
        created: '1/10/2025 10:00',
        modified: '1/10/2025 10:30',
        image_name: 'potteryBowl.png'
    },
    {
        id: '2a51d22c-df3e-42cb-9451-bcf24c51bc98',
        seller_id: sellers[0].id,
        category_id: 'fa8e1a4d-0e8d-4b20-935d-92cb768e71fa',
        price: '120.00',
        description: 'Colorful painting on canvas representing nature.',
        title: 'Nature Painting',
        created: '1/11/2025 11:00',
        modified: '1/11/2025 11:45',
        image_name: 'naturePainting.png'
    },
    {
        id: '49a4626a-6f6b-4e9c-a7d2-86e7e42f1c1e',
        seller_id: sellers[0].id,
        category_id: '4c1c7e94-0982-4d13-99cb-ecc71dd00e35',
        price: '40.00',
        description: 'Stylish handwoven bracelet made from recycled materials.',
        title: 'Woven Bracelet',
        created: '1/12/2025 09:00',
        modified: '1/12/2025 09:20',
        image_name: 'wovenBracelet.png'
    },
    {
        id: 'f630e67b-3eb2-4cd4-9507-d45376db1cb7',
        seller_id: sellers[0].id,
        category_id: 'd2346f56-61e2-4a91-ae0a-e0ae7f252733',
        price: '75.00',
        description: 'Hand-stitched wool sweater perfect for winter.',
        title: 'Wool Sweater',
        created: '1/13/2025 14:00',
        modified: '1/13/2025 14:30',
        image_name: 'woolSweater.png'
    },
    {
        id: 'c6e36e1b-d3c7-4d2d-a531-01b92c9622ae',
        seller_id: sellers[1].id,
        category_id: '7b4d755d-83c1-4d68-91f3-dc4297a2db1e',
        price: '50.00',
        description: 'Clay sculpture of a bird, handcrafted and painted.',
        title: 'Clay Bird Sculpture',
        created: '3/10/2025 10:00',
        modified: '3/10/2025 10:30',
        image_name: 'clayBird.png'
    },
    {
        id: 'edc13e08-7814-4a8d-949a-3bcf01d8db18',
        seller_id: sellers[1].id,
        category_id: 'fa8e1a4d-0e8d-4b20-935d-92cb768e71fa',
        price: '95.00',
        description: 'Abstract ink illustration done in a single stroke.',
        title: 'Ink Illustration',
        created: '3/11/2025 11:00',
        modified: '3/11/2025 11:45',
        image_name: 'inkIllustration.png'
    },
    {
        id: '439c2f08-97f9-45db-877b-967f9f142108',
        seller_id: sellers[1].id,
        category_id: '4c1c7e94-0982-4d13-99cb-ecc71dd00e35',
        price: '60.00',
        description: 'Silver necklace with a hand-engraved pendant.',
        title: 'Engraved Necklace',
        created: '3/12/2025 09:00',
        modified: '3/12/2025 09:20',
        image_name: 'silverNecklace.png'
    },
    {
        id: '05c45f77-1c11-4b4d-bd42-04b6ce9a9f58',
        seller_id: sellers[1].id,
        category_id: 'd2346f56-61e2-4a91-ae0a-e0ae7f252733',
        price: '85.00',
        description: 'Linen tunic with hand-painted floral designs.',
        title: 'Floral Tunic',
        created: '3/13/2025 14:00',
        modified: '3/13/2025 14:30',
        image_name: 'floralTunic.png'
    }
]

const categories = [
	{
		id: 'fa8e1a4d-0e8d-4b20-935d-92cb768e71fa',
		name: 'Paintings',
		created: '1/1/2025 12:00',
	},
	{
		id: '7b4d755d-83c1-4d68-91f3-dc4297a2db1e',
		name: 'Pottery',
		created: '1/1/2025 12:01',
	},
	{
		id: '4c1c7e94-0982-4d13-99cb-ecc71dd00e35',
		name: 'Jewelry',
		created: '1/1/2025 12:02',
	},
	{
		id: 'd2346f56-61e2-4a91-ae0a-e0ae7f252733',
		name: 'Clothing',
		created: '1/1/2025 12:03',
	},
];

const ratings = [
    {
        id: 'a1f3c4e7-8b92-4e1a-bf44-3a9b7c6d2f14',
        itemId: '1fa85f64-5717-4562-b3fc-2c963f66afa1',
        rating: 5,
        review: 'This pottery bowl is absolutely stunning and has become a centerpiece in my kitchen. The craftsmanship is evident in every detail, and it feels sturdy yet elegant. I use it daily for serving salads and fruits, and it never fails to impress my guests. The glaze finish is smooth and vibrant, making it a joy to clean. I highly recommend this bowl to anyone who appreciates handmade pottery with a unique touch. It adds warmth and charm to any table setting.',
        created: '1/15/2025 12:30',
        name: 'Emily Carter'
    },
    {
        id: 'b2d5e6f7-3c19-4a2d-9a9b-f3d9e4b8a1e2',
        itemId: '1fa85f64-5717-4562-b3fc-2c963f66afa1',
        rating: 4,
        review: 'I love the size and shape of this pottery bowl. It is perfect for everyday use and also works well for special occasions. The earthy tones complement my kitchen decor beautifully. It’s both functional and decorative. The seller was very responsive and the bowl arrived safely packaged. I would definitely buy more items from this artisan. This piece brings a handmade charm that mass-produced bowls lack.',
        created: '1/18/2025 14:20',
        name: 'Michael Johnson'
    },
    {
        id: 'c3e9f7a1-4f4c-4b5a-8f9d-1a2b3c4d5e6f',
        itemId: '1fa85f64-5717-4562-b3fc-2c963f66afa1',
        rating: 3,
        review: 'The bowl is nice but a bit smaller than I expected. The glaze is beautiful and the texture feels good in hand. It’s a great piece for decorative purposes or light use. I appreciate the handmade quality and the unique design. Overall, a charming addition to my collection of pottery items. Shipping was quick and the item arrived in perfect condition.',
        created: '1/20/2025 09:45',
        name: 'Samantha Lee'
    },
    {
        id: 'd4f8a9b2-7c6d-4e5f-b123-4567890abcde',
        itemId: '2a51d22c-df3e-42cb-9451-bcf24c51bc98',
        rating: 5,
        review: 'The nature painting is breathtaking. The colors are vivid and the brushwork is very expressive. It captures the essence of the outdoors perfectly. I hung it in my living room and it has received many compliments. The canvas quality is excellent and the painting arrived rolled and undamaged. The artist’s style is unique and very appealing. A wonderful piece for any art lover.',
        created: '1/16/2025 15:10',
        name: 'Olivia Martinez'
    },
    {
        id: 'e5a7c8d9-0b1c-4d2e-8f3a-123456789abc',
        itemId: '2a51d22c-df3e-42cb-9451-bcf24c51bc98',
        rating: 4,
        review: 'I am very pleased with this painting. The colors are bright and lively, and the natural theme fits perfectly in my home office. It adds a touch of calmness and inspiration to my workspace. The painting feels authentic and the artist’s technique is impressive. Packaging was secure and delivery was prompt. I would recommend this to anyone looking for original artwork.',
        created: '1/19/2025 11:25',
        name: 'David Wilson'
    },
    {
        id: 'f6b7d8e9-1c2d-3e4f-5a6b-7c8d9e0f1a2b',
        itemId: '2a51d22c-df3e-42cb-9451-bcf24c51bc98',
        rating: 2,
        review: 'While the painting is nice, it did not fully meet my expectations. The colors were a bit more muted than shown in the photos. However, the craftsmanship is good and the piece has a soothing vibe. It works well in a casual setting. I appreciate the artist’s effort and the originality of the work. Overall, a decent purchase.',
        created: '1/22/2025 13:00',
        name: 'Jessica Brown'
    },
    {
        id: 'a7c8d9e0-1f2a-3b4c-5d6e-7f8a9b0c1d2e',
        itemId: '49a4626a-6f6b-4e9c-a7d2-86e7e42f1c1e',
        rating: 5,
        review: 'This woven bracelet is beautifully crafted and very comfortable to wear. The recycled materials used give it an eco-friendly appeal, which I really appreciate. It matches well with both casual and dressy outfits. The colors are vibrant and the weaving is tight and durable. I have received many compliments and would definitely purchase more jewelry from this artist. A great addition to my accessory collection.',
        created: '1/13/2025 16:40',
        name: 'Sophia Nguyen'
    },
    {
        id: 'b8d9e0f1-2a3b-4c5d-6e7f-8a9b0c1d2e3f',
        itemId: '49a4626a-6f6b-4e9c-a7d2-86e7e42f1c1e',
        rating: 4,
        review: 'The bracelet is lovely and well made. The design is unique and the materials feel sturdy. It fits perfectly and is easy to put on and take off. I like that it’s made from recycled materials, which adds to its charm. The seller was very helpful and the shipping was fast. I would recommend this bracelet to anyone looking for handmade jewelry with a story.',
        created: '1/15/2025 10:15',
        name: 'Liam Thompson'
    },
    {
        id: 'c9e0f1a2-3b4c-5d6e-7f8a-9b0c1d2e3f4g',
        itemId: '49a4626a-6f6b-4e9c-a7d2-86e7e42f1c1e',
        rating: 3,
        review: 'It’s a nice bracelet, but I found it a bit smaller than I expected. The colors and style are great, and it’s comfortable to wear. It’s a good piece for casual wear and adds a handmade touch to my outfits. The packaging was neat and the item arrived on time. Overall, I’m satisfied with this purchase.',
        created: '1/18/2025 09:30',
        name: 'Mia Garcia'
    },
    {
        id: 'd0f1a2b3-4c5d-6e7f-8a9b-0c1d2e3f4g5h',
        itemId: 'f630e67b-3eb2-4cd4-9507-d45376db1cb7',
        rating: 5,
        review: 'The wool sweater is incredibly warm and soft. It fits perfectly and is very well made. I love the hand-stitched details which give it a unique and cozy look. It’s perfect for the cold winter months and pairs well with jeans or skirts. The color is rich and the fabric feels durable yet comfortable. I’ve received many compliments and highly recommend this sweater to anyone looking for quality handmade clothing.',
        created: '1/16/2025 17:20',
        name: 'Noah Davis'
    },
    {
        id: 'e1a2b3c4-5d6e-7f8a-9b0c-1d2e3f4g5h6i',
        itemId: 'f630e67b-3eb2-4cd4-9507-d45376db1cb7',
        rating: 4,
        review: 'I really like this wool sweater. It’s warm and comfortable, and the hand-stitched design adds a nice touch. The fit is true to size and the material feels high quality. It’s become one of my favorite winter garments. The only minor issue is that the sleeves are a bit long for me, but that’s easily fixed. Overall, a great purchase that I’m happy with.',
        created: '1/19/2025 13:45',
        name: 'Ava Wilson'
    },
    {
        id: 'f2b3c4d5-6e7f-8a9b-0c1d-2e3f4g5h6i7j',
        itemId: 'f630e67b-3eb2-4cd4-9507-d45376db1cb7',
        rating: 3,
        review: 'The sweater is nice and warm, but I found it a bit itchy at first. After a few washes, it softened up nicely. The craftsmanship is good and the style is classic. It’s a solid piece for winter, though not the softest sweater I’ve owned. Shipping was quick and the seller was responsive to my questions. Overall, a decent buy for the price.',
        created: '1/22/2025 11:00',
        name: 'Ethan Moore'
    },
    {
        id: 'a3b4c5d6-7e8f-9a0b-1c2d-3e4f5g6h7i8j',
        itemId: 'c6e36e1b-d3c7-4d2d-a531-01b92c9622ae',
        rating: 4,
        review: 'The clay bird sculpture is beautifully made with great attention to detail. The painting is vibrant and the shape is elegant. It adds a lovely artistic touch to my living room. The size is perfect for display on a shelf or table. The artist clearly put a lot of care into this piece. It arrived well packaged and in perfect condition. I’m very happy with this purchase.',
        created: '3/15/2025 10:30',
        name: 'Isabella Taylor'
    },
    {
        id: 'b4c5d6e7-8f9a-0b1c-2d3e-4f5g6h7i8j9k',
        itemId: 'c6e36e1b-d3c7-4d2d-a531-01b92c9622ae',
        rating: 5,
        review: 'I adore this clay bird sculpture! The craftsmanship is exquisite and the colors are lively. It has become a focal point in my home decor and I often get compliments on it. The artist’s skill is evident in every curve and brushstroke. It’s a unique piece that brings personality and charm to any space. I would definitely purchase more sculptures from this seller.',
        created: '3/18/2025 14:00',
        name: 'James Anderson'
    },
    {
        id: 'c5d6e7f8-9a0b-1c2d-3e4f-5g6h7i8j9k0l',
        itemId: 'c6e36e1b-d3c7-4d2d-a531-01b92c9622ae',
        rating: 3,
        review: 'The sculpture is nice but smaller than I imagined. The paint is well applied and the details are charming. It looks great on my shelf and adds a handmade touch to my decor. Shipping was prompt and the item was packaged securely. Overall, a good buy for those who appreciate unique handmade art pieces.',
        created: '3/20/2025 09:15',
        name: 'Mason Martinez'
    },
    {
        id: 'd6e7f8g9-0a1b-2c3d-4e5f-6g7h8i9j0k1l',
        itemId: 'edc13e08-7814-4a8d-949a-3bcf01d8db18',
        rating: 5,
        review: 'The ink illustration is stunning and truly one of a kind. The single stroke technique gives it a dynamic and fluid feel. It’s a captivating piece that draws you in. I hung it in my study and it inspires creativity every day. The quality of the paper and ink is top-notch. The artist’s talent is undeniable and I’m thrilled to own this piece.',
        created: '3/16/2025 12:45',
        name: 'Charlotte Harris'
    },
    {
        id: 'e7f8g9h0-1a2b-3c4d-5e6f-7g8h9i0j1k2l',
        itemId: 'edc13e08-7814-4a8d-949a-3bcf01d8db18',
        rating: 4,
        review: 'I really appreciate the unique style of this ink illustration. The single stroke technique is impressive and the composition is balanced. It adds an artistic flair to my living room. The print quality is excellent and the packaging was secure. The seller was communicative and helpful. I would recommend this artwork to anyone looking for something different and creative.',
        created: '3/19/2025 10:20',
        name: 'Benjamin Clark'
    },
    {
        id: 'f8g9h0i1-2a3b-4c5d-6e7f-8g9h0i1j2k3l',
        itemId: 'edc13e08-7814-4a8d-949a-3bcf01d8db18',
        rating: 3,
        review: 'The illustration is interesting but not quite what I expected. The style is unique and the ink work is detailed, but it didn’t fit my decor as well as I hoped. Still, it’s a quality piece with artistic merit. The seller was professional and shipping was timely. A nice addition for collectors of original art.',
        created: '3/22/2025 14:10',
        name: 'Amelia Lewis'
    },
    {
        id: 'a9b0c1d2-3e4f-5g6h-7i8j-9k0l1m2n3o4p',
        itemId: '439c2f08-97f9-45db-877b-967f9f142108',
        rating: 5,
        review: 'The engraved necklace is exquisite and beautifully crafted. The silver shines brilliantly and the pendant engraving is delicate and detailed. It’s a perfect gift for a loved one or a special treat for yourself. The chain is sturdy and comfortable to wear all day. I have received many compliments and would definitely buy from this seller again. Excellent quality and craftsmanship.',
        created: '3/14/2025 16:00',
        name: 'Ella Walker'
    },
    {
        id: 'b0c1d2e3-4f5g-6h7i-8j9k-0l1m2n3o4p5q',
        itemId: '439c2f08-97f9-45db-877b-967f9f142108',
        rating: 4,
        review: 'I really like this necklace. The engraving is finely done and adds a personal touch. The silver is high quality and the necklace feels durable. It’s versatile enough to wear with many outfits. The seller was responsive and the item arrived quickly. I’m very satisfied with this purchase and would recommend it to others looking for unique handmade jewelry.',
        created: '3/17/2025 11:30',
        name: 'William King'
    },
    {
        id: 'c1d2e3f4-5g6h-7i8j-9k0l-1m2n3o4p5q6r',
        itemId: '439c2f08-97f9-45db-877b-967f9f142108',
        rating: 3,
        review: 'The necklace is nice but a bit lighter than I expected. The engraving is pretty and the chain is comfortable. It’s a good piece for everyday wear. Packaging was secure and delivery was on time. Overall, a decent purchase for the price and quality.',
        created: '3/20/2025 09:50',
        name: 'Grace Scott'
    },
    {
        id: 'd2e3f4g5-6h7i-8j9k-0l1m-2n3o4p5q6r7s',
        itemId: '05c45f77-1c11-4b4d-bd42-04b6ce9a9f58',
        rating: 5,
        review: 'The floral tunic is gorgeous and fits perfectly. The hand-painted flowers are vibrant and add a lovely artistic touch. The fabric is lightweight and comfortable, ideal for spring and summer. I have received many compliments and feel great wearing it. The quality of the stitching and paint is impressive. I highly recommend this tunic for anyone who loves unique handmade clothing.',
        created: '3/15/2025 13:00',
        name: 'Chloe Young'
    },
    {
        id: 'e3f4g5h6-7i8j-9k0l-1m2n-3o4p5q6r7s8t',
        itemId: '05c45f77-1c11-4b4d-bd42-04b6ce9a9f58',
        rating: 4,
        review: 'I really enjoy wearing this floral tunic. The hand-painted design is beautiful and looks very unique. The fabric is soft and breathable, making it comfortable for warm weather. The fit is true to size and the colors have stayed vibrant after washing. It’s a lovely addition to my wardrobe and I plan to buy more from this artist.',
        created: '3/18/2025 10:40',
        name: 'Daniel Hernandez'
    },
    {
        id: 'f4g5h6i7-8j9k-0l1m-2n3o-4p5q6r7s8t9u',
        itemId: '05c45f77-1c11-4b4d-bd42-04b6ce9a9f58',
        rating: 3,
        review: 'The tunic is pretty and the floral design is lovely. It fits well but I found the fabric a bit thinner than expected. It’s still comfortable and perfect for casual outings. The hand-painted details make it special and unique. The seller was friendly and shipping was prompt. Overall, a nice piece for the price.',
        created: '3/21/2025 15:25',
        name: 'Natalie Moore'
    }
]

export { sellers, items, categories, ratings }