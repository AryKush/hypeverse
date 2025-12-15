const router = require("express").Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", async (_,res)=>{
  res.json(await Product.find());
});

router.get("/:id", async (req,res)=>{
  res.json(await Product.findById(req.params.id));
});

router.post("/", auth, admin, async (req,res)=>{
  const p = new Product(req.body);
  await p.save();
  res.status(201).json(p);
});

router.delete("/:id", auth, admin, async (req,res)=>{
  await Product.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;
