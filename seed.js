
require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/Product");
const calculateEcoRating = require("./utils/ecoRating");

const products = [
  {
    name: "Organic Cotton Tote Bag",
    category: "Accessories",
    price: 299,
    description: "Reusable bag made from organic cotton.",
    image: "https://images.unsplash.com/photo-1597481499666-6f1c8d6f4c3b",
    sustainabilityData: {
      carbonFootprint: 2,
      recyclable: true,
      organic: true,
      packaging: "biodegradable"
    }
  },
  {
    name: "Bamboo Toothbrush",
    category: "Personal Care",
    price: 99,
    description: "Toothbrush with a biodegradable bamboo handle.",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe",
    sustainabilityData: {
      carbonFootprint: 3,
      recyclable: true,
      organic: true,
      packaging: "biodegradable"
    }
  },
  {
    name: "Reusable Steel Water Bottle",
    category: "Accessories",
    price: 499,
    description: "Durable reusable stainless steel bottle.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    sustainabilityData: {
      carbonFootprint: 4,
      recyclable: true,
      organic: false,
      packaging: "recyclable"
    }
  },
  {
    name: "Recycled Paper Notebook",
    category: "Stationery",
    price: 149,
    description: "Notebook made using recycled paper.",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57",
    sustainabilityData: {
      carbonFootprint: 5,
      recyclable: true,
      organic: false,
      packaging: "recyclable"
    }
  },
  {
    name: "Organic Cotton T-Shirt",
    category: "Clothing",
    price: 699,
    description: "Comfortable T-shirt made from organic cotton.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    sustainabilityData: {
      carbonFootprint: 8,
      recyclable: true,
      organic: true,
      packaging: "recyclable"
    }
  },
  {
    name: "Everyday Plastic Organizer",
    category: "Home",
    price: 199,
    description: "Plastic organizer with no verified sustainability information."
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany({});

    const preparedProducts = products.map((product) => {
      const rating = calculateEcoRating(product.sustainabilityData);

      return {
        ...product,
        ecoScore: rating.score,
        hasEcoData: rating.hasEcoData
      };
    });

    await Product.insertMany(preparedProducts);

    console.log("Sample products added successfully!");
    console.log("Total products:", preparedProducts.length);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Seeding error:", error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedDatabase();
