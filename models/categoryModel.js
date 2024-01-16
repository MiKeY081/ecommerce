const { Schema, model, models } = require("mongoose");

const categorySchema = new Schema({
  type: String,
  properties: [{type: String}],
});

export const Category = models.Category || model("Category", categorySchema);
