import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/Category.js";

const getCategoryById = asyncHandler(async (req, res) => {
  const cat = await Category.findById(req.params.id);
  res.json(cat);
});
const getCategories = asyncHandler(async (req, res) => {
  const cat = await Category.find({});
  res.json(cat);
});

const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const cat = new Category({ name });

  try {
    const createdCat = await cat.save();
    res.status(201).json(createdCat);
  } catch (error) {
    console.log(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const cat = await Category.findById(req.params.id);

  if (cat) {
    cat.name = name;
    const updateCat = await cat.save();
    res.json(updateCat);
  } else {
    res.status(404);
    throw new Error("item not found");
  }
});
export { getCategories, addCategory, updateCategory, getCategoryById };
