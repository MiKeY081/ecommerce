import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/categoryModel";

export default async function handle(req, res) {
  const { method } = req;

  try {
    await mongooseConnect();

    if (method === "POST") {
      const { type, properties } = req.body;
      const category = await Category.create({ type, properties });
      res.status(201).json({
        success: true,
        message: "Category created successfully",
        category,
      });
    }

    if (method === "GET") {
      if (!req.query?.id) {
        const categories = await Category.find();
        res.status(200).json({
          success: true,
          categories,
        });
      } else {
        const { id } = req.query;
        const category = await Category.findOne({ _id: id });
        res.status(200).json({
          success: true,
          category,
        });
      }
    }

    if (method === "PUT") {
      const { type, properties, _id } = req.body;
      const category = await Category.findByIdAndUpdate(
        _id,
        { type, properties },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Category updated successfully",
        category,
      });
    }

    if (method === "DELETE") {
      const { id } = req.query;
      const category = await Category.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
        category,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
