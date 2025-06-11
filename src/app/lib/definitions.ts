export type Seller = {
  id: string;
  first_name: string;
  last_name: string;
  description: string;
  location: string;
  email: string;
  password: string;
  created: string;
  modified: string;
  profile_pic: string;
};

export type Item = {
  id: string;
  seller_id: string;
  category_id: string;
  price: string;
  description: string;
  title: string;
  created: string;
  modified: string;
  image_name: string;
};

export type Category = {
  id: string;
  name: string;
  created: string;
};

export type Rating = {
  id: string;
  item_id: string;
  rating: number;
  review: string;
  created: string;
  name: string;
};
