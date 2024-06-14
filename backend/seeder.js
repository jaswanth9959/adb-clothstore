import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db.js";
import users from "./data/customers.js";
import products from "./data/products.js";
import Product from "./models/Product.js";
import User from "./models/User.js";
// import Shoe from "./models/shoe.js";
// import Category from "./models/category.js";
// import Staff from "./models/staff.js";
dotenv.config();

await connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    // await Category.deleteMany();
    // await Staff.deleteMany();
    // const createdCategories = await Category.insertMany(category);
    const createdStaff = await User.insertMany(users);
    // const createdStaff = await Staff.insertMany(staff);
    const adminStaff = createdStaff[0]._id;

    const sampleProducts = products.map((p) => {
      return {
        ...p,
        createdBy: adminStaff,
      };
    });

    await Product.insertMany(sampleProducts);

    console.log("---DATA HAS BEEN IMPORTED---");
    process.exit();
  } catch (error) {
    console.log("---IMPORT FAILED---");
    console.log(`ERROR:${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    // await Category.deleteMany();
    // await Staff.deleteMany();
    console.log("---DATA HAS BEEN DESTROYED---");
    process.exit();
  } catch (error) {
    console.log("---DESTROY FAILED---");
    console.log(`ERROR:${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
