import burgerImg from '../assets/images/burger.avif';
import mojitoImg from '../assets/images/mojito.avif';
import pizzaImg from '../assets/images/pizza.avif';
import frenchfriesImg from '../assets/images/french-fries.avif';
import brownieImg from '../assets/images/brownie.avif';
import pavbhajiImg from '../assets/images/pavbhaji.avif';
import maggieImg from '../assets/images/maggie.avif';
import sandwichImg from '../assets/images/sandwhich.avif';
import coffeeImg from '../assets/images/coffe.avif';
import pulaoImg from '../assets/images/pulao.avif';
import shakeImg from '../assets/images/shake.avif';
import momoImg from '../assets/images/momo.avif';
export interface MenuItem {
  name: string;
  price: number;
  image?: string;
}

export interface MenuCategory {
  id: string;
  category: string;
  image?: string;
  imageFit?: 'cover' | 'contain';
  imagePosition?: string;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
   {
    id: 'pavbhaji-special',
    category: 'Pavbhaji Special',
    image: pavbhajiImg,
    items: [
      { name: 'Pav Bhaji', price: 140 },
      { name: 'Cheese Pav Bhaji', price: 230 },
      { name: 'Amul Butter Pav Bhaji', price: 180 },
      { name: 'Extra Pav Jodi', price: 20 },
      { name: 'Extra Single Paav', price: 10 },
      { name: 'Extra Bhaji Plate', price: 110 },
      { name: 'Extra Bhaji per KG.', price: 500 },
    ],
  },
  {
    id: 'pulao',
    category: 'Pulao',
    image: pulaoImg,
    items: [
      { name: 'Veg. Tawa Pulao', price: 140 },
      { name: 'Veg. Cheese Tawa Pulao', price: 180 },
      { name: 'Amul Butter Tawa Pulao', price: 200 },
      { name: 'Peas Tawa Pulao', price: 155 },
      { name: 'Paneer Tawa Pulao', price: 170 },
      { name: 'Paneer Cheese Tawa Pulao', price: 200 },
      { name: 'Veg. Tawa Pulao (Per KG.)', price: 380 },
    ],
  },
  {
    id: 'burgers',
    category: 'Burgers',
    image: burgerImg,
    imagePosition: 'center 40%', // Lift the image slightly
    items: [
      { name: 'Veg. Burger', price: 120},
      { name: 'Veg. Cheese Burger', price: 150},
      { name: 'Paneer Cheese Burger', price: 180},
    ],
  },
  {
    id: 'chill-mojito-ice-tea',
    category: 'Chill Mojito & Ice Tea',
    image: mojitoImg,
    imageFit: 'cover',
    items: [
      { name: 'Kiwi Mojito', price: 150 },
      { name: 'Dashing Blue', price: 140 },
      { name: 'Sparkle Mint Mojito', price: 140 },
      { name: 'Lemon Sherbet', price: 60 },
      { name: 'Lemon Soda', price: 60 },
      { name: 'Lemon Ice Tea', price: 90 },
    ],
  },
  {
    id: 'pizza',
    category: 'Pizza',
    image: pizzaImg,
    imagePosition: 'center 50%', // Lift the image slightly
    items: [
      { name: 'Onion Capsicum Pizza', price: 230},
      { name: 'Paneer Tikka Pizza', price: 320},
      { name: 'Cheesy Tomato Pizza', price: 260},
      { name: 'Cheese Corn Pizza', price: 270},
      { name: 'Farmhouse Pizza', price: 370},
      { name: 'Paneer Makhni Pizza', price: 290},
      { name: 'Cheese Burst Pizza', price: 380, },
    ],
  },
 
  {
    id: 'maggie-delight',
    category: 'Maggie Delight',
    image: maggieImg,
    items: [
      { name: 'Plain Maggi', price: 90 },
      { name: 'Peri Peri Maggi', price: 140 },
      { name: 'Peri Peri Paneer Maggi', price: 155 },
      { name: 'Cheese Maggi', price: 155 },
      { name: 'Cheese Corn Maggi', price: 155 },
      { name: 'Indian Masala Maggi', price: 140 },
    ],
  },
  {
    id: 'sandwich-toasties',
    category: 'Sandwich & Toasties',
    image: sandwichImg,
    imagePosition: 'center 50%', // Lift the image slightly
    items: [
      { name: 'Bread Butter', price: 80 },
      { name: 'Bread Jam', price: 90 },
      { name: 'Cheese Toast', price: 125 },
      { name: 'Cheese Chilli Toastie', price: 140 },
      { name: 'Garlic Bread', price: 150 },
      { name: 'Veg. Sandwich', price: 120 },
      { name: 'Veg. Cheese Sandwich', price: 200 },
      { name: 'Cheese Chilli Garlic Sandwich', price: 200 },
      { name: 'Corn Chilli Garlic Sandwich', price: 210 },
      { name: 'Paneer Tikka Sandwich', price: 230 },
      { name: 'Peri Peri Paneer Sandwich', price: 230 },
      { name: 'Aloo Tikki Sandwich', price: 200 },
      { name: 'Chocolate Burst Sandwich', price: 155 },
      { name: 'Nawabi Kebab Sandwich', price: 230 },
      { name: 'Pizza Sandwich', price: 230 },
      { name: 'Paneer Makni Sandwich', price: 240 },
    ],
  },

  {
    id: 'french-fries',
    category: 'French Fries',
    image: frenchfriesImg,
    items: [
      { name: 'Classic Salted French Fries', price: 140 },
      { name: 'Peri Peri Fries', price: 150 },
      { name: 'Peri Peri Cheese Loaded Fries', price: 200 },
      { name: 'Chilli Garlic Fries', price: 170 },
      { name: 'Cheesy Makni Fries', price: 180 },
    ],
  },  
  {
    id: 'lite-bites',
    category: 'Lite Bites',
    image: momoImg,
    imagePosition: 'center 50%', // Lift the image slightly
    items: [
      { name: 'Hara Bhara Kebab (6pcs.)', price: 140 },
    { name: 'Veg. Momos (Fried)', price: 140 },
    { name: 'Paneer Momos (Fried)', price: 140 }
    ],
  },
  {
    id: 'hot-beverages',
    category: 'Hot Beverages',
    image: coffeeImg,
    imagePosition: 'center 50%', // Lift the image slightly
    items: [
      { name: 'Adrak Wali Chai (200ml.)', price: 60 },
      { name: 'Hot Coffee (200ml.)', price: 70 },
      { name: 'Hot Chocolate (200ml.)', price: 100 }
    ],
  },  
  {
    id: 'brownie-specials',
    category: 'Brownie Specials',
    image: brownieImg,
    items: [
      { name: 'Walnut Brownie (80g)', price: 180 },
      { name: 'Hazelnut Brownie (80g)', price: 200 },
      { name: 'Brownie Sundae', price: 230 },
      { name: 'Sizzling Brownie', price: 380 },
    ],
  },
  {
    id: 'coffee-shakes',
    category: 'Coffee & Shakes',
    image: shakeImg,
    imagePosition: 'center 40%', // Lift the image slightly
    items: [
      { name: 'Cold Coffee Regular', price: 90 },
      { name: 'Thick Cold Coffee', price: 60 },
      { name: 'Thick Cold Coffee with Crush', price: 120 },
      { name: 'Thick Cold Coffee with Ice cream', price: 120 },
      { name: 'Nikhils Kitchen Special Cold coffee', price: 150 },
      { name: 'Oreo Shake', price: 180 },
      { name: 'Dark Chocolate Shake', price: 180 },
      { name: 'Kitkat Shake', price: 230 },
      { name: 'Brownie Blast Shake', price: 230 },
    ],
  }
];

export default menuData;