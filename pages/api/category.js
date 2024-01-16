import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/categoryModel";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "POST") {
    const { type, properties } = req.body;
    try {
      const category = await Category.create({ type, properties });
      res.send({
        success: true,
        message: "Category created Successfully",
        category,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
  if (method == "GET") {
    try {
      const categories = await Category.find();
      res.send({
        success: true,
        categories,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
  if (method == "PUT") {
    try {
      const { type, properties, _id } = req.body;
      const category = await Category.updateOne({ _id }, { type, properties });
      res.send({
        success: true,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
  if (method == "DELETE") {
    try {
      const { id } = req.query?.id;
      const category = await Category.delete({ _id: id });
      res.send({
        success: true,
        message: "Category deleted Successfully",
        category,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
}
