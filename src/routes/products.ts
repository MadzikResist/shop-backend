import express, { Request, Response } from "express";
import Product from "../models/productModel";
import {addProductsToDB} from "../../controllers/productController";

const router = express.Router();

//GET all products
router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/popularProducts', async (req: Request, res: Response) => {
  try{
    const popularProducts = await Product.find({}, {galleryImages: 1}).limit(4);
    res.status(200).json(popularProducts)
  }catch(error){
    res.status(500).json({ error: error.message });
  }
})

//GET a single product
router.get("/:id", async (req: Request, res: Response) => {
  try {
    res.status(200).json({ msg: "GET a single product" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new product
router.post("/add", addProductsToDB)
// router.post("/", async (req: Request, res: Response) => {
//   const { name, price } = req.body;
//
//   try {
//     const product = await Product.create({ name, price });
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// DELETE a product
router.delete("/:id", (req: Request, res: Response) => {
  res.status(200).json({ msg: "DELETE a product" });
});

// UPDATE a product
router.patch("/:id", (req: Request, res: Response) => {
  res.status(200).json({ msg: "UPDATE a product" });
});

export default router;
