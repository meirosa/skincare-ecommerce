export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  brand?: string;
  thumbnail: string;
  images: string[];
  stock: number;
};

const image = (url: string) =>
  `${url}?auto=format&fit=crop&w=800&q=80`;

export const skincareProducts: Product[] = [
  {
    id: 1001,
    title: "Hydra Glow Hyaluronic Serum",
    description:
      "Lightweight hydrating serum for a fresh, smooth and hydrated-looking complexion.",
    price: 14.99,
    category: "serum",
    brand: "Lunera Skin",
    thumbnail: image(
      "https://images.unsplash.com/photo-1764694187667-f28a05a52c0e"
    ),
    images: [
      image(
        "https://images.unsplash.com/photo-1764694187667-f28a05a52c0e"
      ),
    ],
    stock: 28,
  },

  {
    id: 1002,
    title: "Brighten C Facial Serum",
    description:
      "Lightweight facial serum designed to give skin a brighter and more refreshed appearance.",
    price: 16.5,
    category: "serum",
    brand: "Aurelia Lab",
    thumbnail: image(
      "https://images.unsplash.com/photo-1777450793530-99a0e7b7fc53"
    ),
    images: [
      image(
        "https://images.unsplash.com/photo-1777450793530-99a0e7b7fc53"
      ),
    ],
    stock: 35,
  },

  {
    id: 1003,
    title: "Niacinamide Balance Serum",
    description:
      "Targeted facial serum designed for balanced, smooth and healthy-looking skin.",
    price: 15.99,
    category: "serum",
    brand: "Aurelia Lab",
    thumbnail: image(
      "https://images.unsplash.com/photo-1765726951362-df46f5a74cdf"
    ),
    images: [
      image(
        "https://images.unsplash.com/photo-1765726951362-df46f5a74cdf"
      ),
    ],
    stock: 22,
  },

  {
    id: 1004,
    title: "Retinol Renewal Serum",
    description:
      "Night serum with a lightweight texture for a smoother and more refined-looking complexion.",
    price: 18.99,
    category: "serum",
    brand: "Aurelia Lab",
    thumbnail: image(
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be"
    ),
    images: [
      image(
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be"
      ),
    ],
    stock: 18,
  },

  {
    id: 1005,
    title: "Gentle Daily Facial Cleanser",
    description:
      "Mild facial cleanser that removes everyday impurities while keeping skin feeling comfortable.",
    price: 11.99,
    category: "cleanser",
    brand: "Mildora",
    thumbnail: image(
      "https://images.unsplash.com/photo-1556228720-195a672e8a03"
    ),
    images: [
      image(
        "https://images.unsplash.com/photo-1556228720-195a672e8a03"
      ),
    ],
    stock: 40,
  },

  {
    id: 1006,
    title: "Low pH Foam Cleanser",
    description:
      "Soft foaming facial cleanser for a fresh and comfortable daily cleansing routine.",
    price: 12.5,
    category: "cleanser",
    brand: "Mildora",
    thumbnail: image(
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b"
    ),
    images: [
      image(
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b"
      ),
    ],
    stock: 31,
  },

  {
    id: 1007,
    title: "Aloe Gel Facial Cleanser",
    description:
      "Refreshing gel cleanser with a lightweight texture for morning and evening use.",
    price: 10.99,
    category: "cleanser",
    brand: "Nuvia",
    thumbnail: image(
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273"
    ),
    images: [
      image(
        "https://images.unsplash.com/photo-1596755389378-c31d21fd1273"
      ),
    ],
    stock: 27,
  },

  {
    id: 1008,
    title: "Daily Cloud Moisturizer",
    description:
      "Lightweight daily moisturizer that helps skin feel soft, comfortable and hydrated.",
    price: 13.99,
    category: "moisturizer",
    brand: "Nuvia",
    thumbnail: image(
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd"
    ),
    images: [
      image(
        "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd"
      ),
    ],
    stock: 36,
  },

  {
    id: 1009,
    title: "Ceramide Barrier Cream",
    description:
      "Rich facial cream designed to support comfortable and moisturized-looking skin.",
    price: 17.99,
    category: "moisturizer",
    brand: "Aurelia Lab",
    thumbnail: image(
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19"
    ),
    images: [
      image(
        "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19"
      ),
    ],
    stock: 24,
  },

  {
    id: 1011,
    title: "Daily Shield SPF 50",
    description:
      "Lightweight daily sunscreen designed for comfortable everyday sun protection.",
    price: 15.99,
    category: "sunscreen",
    brand: "Solena",
    thumbnail: image(
      "https://images.unsplash.com/photo-1670832218022-d393cb5843c2"
    ),
    images: [
      image(
        "https://images.unsplash.com/photo-1670832218022-d393cb5843c2"
      ),
    ],
    stock: 42,
  },

  {
    id: 1012,
    title: "Aqua UV Defense SPF 50",
    description:
      "Daily sunscreen with a lightweight feel for outdoor and everyday activities.",
    price: 17.5,
    category: "sunscreen",
    brand: "Solena",
    thumbnail: image(
      "https://images.unsplash.com/photo-1738721796968-bc0c4a55960d"
    ),
    images: [
      image(
        "https://images.unsplash.com/photo-1738721796968-bc0c4a55960d"
      ),
    ],
    stock: 33,
  },

  {
    id: 1013,
    title: "Daily Sun Cream SPF 45",
    description:
      "Cream sunscreen with a smooth texture for daily skincare and sun protection.",
    price: 16.99,
    category: "sunscreen",
    brand: "Solena",
    thumbnail: image(
      "https://images.unsplash.com/photo-1623676714504-edd78728155e"
    ),
    images: [
      image(
        "https://images.unsplash.com/photo-1623676714504-edd78728155e"
      ),
    ],
    stock: 25,
  },

  {
    id: 1014,
    title: "Soft Bloom Body Wash",
    description:
      "Gentle body wash designed to leave skin feeling fresh and clean after showering.",
    price: 9.99,
    category: "body wash",
    brand: "Velora",
    thumbnail: image(
      "https://images.unsplash.com/photo-1770880686215-7c53dbcd26b7"
    ),
    images: [
      image(
        "https://images.unsplash.com/photo-1770880686215-7c53dbcd26b7"
      ),
    ],
    stock: 38,
  },

  {
    id: 1015,
    title: "Fresh Daily Body Cleanser",
    description:
      "Refreshing liquid body cleanser for a simple and comfortable daily shower routine.",
    price: 10.5,
    category: "body wash",
    brand: "Velora",
    thumbnail: image(
      "https://images.unsplash.com/photo-1764694187721-a5035d777fdf"
    ),
    images: [
      image(
        "https://images.unsplash.com/photo-1764694187721-a5035d777fdf"
      ),
    ],
    stock: 29,
  },

  {
    id: 1016,
    title: "Oat & Shea Gentle Soap",
    description:
      "Gentle cleansing bar designed to leave skin feeling clean and comfortable.",
    price: 6.99,
    category: "soap",
    brand: "Velora",
    thumbnail: image(
      "https://images.unsplash.com/photo-1546552768-9e3a94b38a59"
    ),
    images: [
      image(
        "https://images.unsplash.com/photo-1546552768-9e3a94b38a59"
      ),
    ],
    stock: 50,
  },

  {
    id: 1017,
    title: "Natural Cleansing Soap Bar",
    description:
      "Simple cleansing soap bar suitable for an everyday personal care routine.",
    price: 7.5,
    category: "soap",
    brand: "Mildora",
    thumbnail: image(
      "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc"
    ),
    images: [
      image(
        "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc"
      ),
    ],
    stock: 44,
  },

  {
    id: 1018,
    title: "Hibiscus Body Lotion",
    description:
      "Lightweight body lotion designed to keep skin feeling soft and moisturized throughout the day.",
    price: 11.99,
    category: "body lotion",
    brand: "Velora",
    thumbnail: image(
      "https://images.unsplash.com/photo-1774772569470-b41fadf7eb55"
    ),
    images: [
      image(
        "https://images.unsplash.com/photo-1774772569470-b41fadf7eb55"
      ),
    ],
    stock: 32,
  },

  {
    id: 1019,
    title: "Replenishing Body Moisturizer",
    description:
      "Comforting body moisturizer with a smooth texture for everyday body care.",
    price: 13.5,
    category: "body lotion",
    brand: "Lunera Skin",
    thumbnail: image(
      "https://images.unsplash.com/photo-1771053393647-a8c75798f58d"
    ),
    images: [
      image(
        "https://images.unsplash.com/photo-1771053393647-a8c75798f58d"
      ),
    ],
    stock: 26,
  },

  {
    id: 1020,
    title: "Ultra Hydrating Face Cream",
    description:
      "Rich facial moisturizer designed to provide a comfortable and hydrated skin feel.",
    price: 16.99,
    category: "moisturizer",
    brand: "Aurelia Lab",
    thumbnail: image(
      "https://images.unsplash.com/photo-1764694187721-a5035d777fdf"
    ),
    images: [
      image(
        "https://images.unsplash.com/photo-1764694187721-a5035d777fdf"
      ),
    ],
    stock: 21,
  },
];