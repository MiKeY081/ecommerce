import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/productModel";

export default async function handle(req, res) {
  await mongooseConnect();
  const method = req.method;
  if (method == "POST") {
    try {
      const ids = req.body.ids;
      const cartProducts = await Product.find({ _id: ids });
      res.send({
        success: true,
        cartProducts,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
}
