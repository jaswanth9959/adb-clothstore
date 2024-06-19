import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate("category");
  res.status(200).json(products);
});

const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  res.status(200).json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProductVariant = asyncHandler(async (req, res) => {
  const { size, color, price, stock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const variant = {
      size,
      color,
      price,
      stock,
    };

    product.variant.push(variant);

    await product.save();
    res.status(201).json({ message: "variant added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const deleteVariant = asyncHandler(async (req, res) => {
  const result = await Product.findOneAndUpdate(
    { "variant._id": req.params.id },
    {
      $pull: {
        variant: { _id: req.params.id },
      },
    },
    { new: true } // Return the updated document
  );
  if (result) {
    res.status(200).json({ message: "variant deleted" });
  } else {
    res.status(404);
    throw new Error("Variant not found");
  }
});

const getVariant = asyncHandler(async (req, res) => {
  // const result = await Product.aggregate([
  //   { $unwind: "$variant" },
  //   { $match: { "variant._id": mongoose.Types.ObjectId(req.params.id) } },
  //   { $project: { variant: 1, _id: 0 } },
  // ]);

  const product = await Product.findOne(
    { "variant._id": req.params.id },
    { "variant.$": 1 }
  );

  if (product) {
    res.status(200).json(product);
  } else {
    console.log("ero");
    res.status(404);
    throw new Error("Variant  not found");
  }
});

const editVariant = asyncHandler(async (req, res) => {
  const { color, stock, size, price } = req.body;
  const updatedData = { color, price, size, stock };

  const product = await Product.findOne({
    "variant._id": new mongoose.Types.ObjectId(req.params.id),
  });

  if (product) {
    // Find the index of the variant
    const variantIndex = product.variant.findIndex(
      (variant) => variant._id.toString() === req.params.id
    );

    if (variantIndex !== -1) {
      // Update the variant
      Object.assign(product.variant[variantIndex], updatedData);
      await product.save();
      res.status(200).json("Variant updated successfully");
    } else {
      console.log("Variant not found");
    }
  } else {
    console.log("Product containing the variant not found");
  }

  // }
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    image,
    brand,
    category,
    price,
    stock,
    size,
    color,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.price = price;
    product.stock = stock;
    product.color = color;
    product.size = size;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    description,
    category,
    image,
    userId,
    price,
    stock,
    size,
    color,
  } = req.body;
  const product = new Product({
    name,
    brand,
    description,
    category,
    image,
    price,
    stock,
    size,
    color,
    createdBy: userId,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
export {
  getProducts,
  getProductByID,
  deleteProduct,
  createProductVariant,
  deleteVariant,
  getVariant,
  editVariant,
  updateProduct,
  createProduct,
};
