import burgerImg from '../assets/images/burger.png';
import mojitoImg from '../assets/images/mojito.png';
import pizzaImg from '../assets/images/pizza.avif';
import frenchfriesImg from '../assets/images/french-fries.avif';
import brownieImg from '../assets/images/brownie.jpg';
import pavbhajiImg from '../assets/images/pavbhaji.jpg';
import maggieImg from '../assets/images/maggie.jpg';
import sandwichImg from '../assets/images/sandwhich.jpg';
import coffeeImg from '../assets/images/coffe.jpg';
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
    id: 'burgers',
    category: 'Burgers',
    image: burgerImg,
    imagePosition: 'center 40%', // Lift the image slightly
    items: [
      { name: 'Veg. Burger', price: 120, image: burgerImg },
      { name: 'Veg. Cheese Burger', price: 150, image: burgerImg },
      { name: 'Paneer Cheese Burger', price: 180, image: burgerImg },
    ],
  },
  {
    id: 'chill-mojito-ice-tea',
    category: 'Chill Mojito & Ice Tea',
    image: mojitoImg,
    imageFit: 'cover',
    items: [
      { name: 'Kiwi Mojito', price: 150, image: mojitoImg },
      { name: 'Dashing Blue', price: 140, image: mojitoImg },
      { name: 'Virgin Mojito', price: 130, image: mojitoImg },
      { name: 'Peach Ice Tea', price: 120, image: mojitoImg },
    ],
  },
  {
    id: 'pizza',
    category: 'Pizza',
    image: pizzaImg,
    imagePosition: 'center 50%', // Lift the image slightly
    items: [
      { name: 'Cheese Corn', price: 270, image: pizzaImg },
      { name: 'Paneer Tikka', price: 320, image: pizzaImg },
      { name: 'Margherita', price: 240, image: pizzaImg },
    ],
  },
  {
    id: 'pavbhaji-special',
    category: 'Pavbhaji Special',
    image: pavbhajiImg,
    items: [
      { name: 'Pav Bhaji', price: 140 },
      { name: 'Paneer Pav Bhaji', price: 180 },
      { name: 'Cheese Pav Bhaji', price: 230 },
    ],
  },
  {
    id: 'pulao',
    category: 'Pulao',
    imagePosition: 'center 50%', // Lift the image slightly
    items: [
      { name: 'Veg. Tawa Pulao', price: 140 },
      { name: 'Cheese Tawa Pulao', price: 180 },
    ],
  },
  {
    id: 'maggie-delight',
    category: 'Maggie Delight',
    image: maggieImg,
    items: [
      { name: 'Plain Maggi', price: 90 },
      { name: 'Masala Maggi', price: 110 },
      { name: 'Cheese Maggi', price: 140 },
    ],
  },
  {
    id: 'sandwich-toasties',
    category: 'Sandwich & Toasties',
    image: sandwichImg,
    imagePosition: 'center 50%', // Lift the image slightly
    items: [
      { name: 'Bread Butter', price: 80 },
      { name: 'Bombay Masala', price: 160 },
      { name: 'Veg. Cheese', price: 200 },
    ],
  },
  {
    id: 'coffee-shakes',
    category: 'Coffee & Shakes',
    image: coffeeImg,
    imagePosition: 'center 50%', // Lift the image slightly
    items: [
      { name: 'Cold Coffee Regular', price: 90 },
      { name: 'Hazelnut Coffee', price: 140 },
      { name: 'Oreo Shake', price: 180 },
      { name: 'KitKat Shake', price: 190 },
    ],
  },
  {
    id: 'french-fries',
    category: 'French Fries',
    image: frenchfriesImg,
    items: [
      { name: 'Classic Salted', price: 140 },
      { name: 'Peri Peri Fries', price: 160 },
      { name: 'Cheesy Fries', price: 210 },
    ],
  },
  {
    id: 'hot-beverages',
    category: 'Hot Beverages',
    image: coffeeImg,
    imagePosition: 'center 50%', // Lift the image slightly
    items: [
      { name: 'Adrak Wali Chai', price: 60 },
      { name: 'Masala Chai', price: 70 },
      { name: 'Hot Coffee', price: 80 },
    ],
  },
  {
    id: 'brownie-specials',
    category: 'Brownie Specials',
    image: brownieImg,
    imagePosition: 'center 50%', // Lift the image slightly
    items: [
      { name: 'Walnut Brownie', price: 180 },
      { name: 'Sizzling Brownie', price: 220 },
    ],
  },
];

export default menuData;