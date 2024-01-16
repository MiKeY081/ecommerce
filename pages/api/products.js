import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/productModel";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "POST") {
    const {
      title,
      description,
      slug,
      price,
      discountRate,
      image,
      imageLink,
      rating,
      userName,
      category,
    } = req.body;
    const productDoc = await Product.create({
      title,
      description,
      slug,
      price,
      discountRate,
      image,
      imageLink,
      rating,
      userName,
      category,
    });
    res.json(productDoc);
  }
  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    }
    res.json(await Product.find());
  }
  if (method === "PUT") {
    const {
      title,
      description,
      price,
      discountRate,
      image,
      imageLink,
      userName,
      rating,
      slug,
      category,
      _id,
    } = req.body;
    await Product.updateOne(
      { _id },
      {
        title,
        description,
        price,
        discountRate,
        image,
        imageLink,
        userName,
        rating,
        slug,
        category,
      }
    );
    res.json(true);
  }
  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query.id });
      res.json(true);
    }
  }
}
