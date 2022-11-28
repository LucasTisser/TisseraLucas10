import "../config/db.js";
import { CarritosModel } from "../modules/carritos.modules.js";

export class CarritoDao {
  ID_FIELD = "_id";

  async createCart() {
    try {
      return await CarritosModel.create({});
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async deleteCartById(id) {
    try {
      return await CarritosModel.findByIdAndDelete({ [this.ID_FIELD]: id });
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async saveProductToCart(id, obj) {
    try {
      console.log(id);
      const cart = await CarritosModel.findById({ [this.ID_FIELD]: id });
      console.log(cart);
      cart.products.push(obj.productId);
      cart.save();
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async deleteProductFromCart(id, productId) {
    try {
      const cart = await CarritosModel.findById(id);
      cart.products.remove(productId);
      cart.save();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getAllProductsFromCart(id) {
    try {
      console.log(id);
      const cart = await CarritosModel.findById({ [this.ID_FIELD]: id }).select(
        { products: 1, _id: 0 }
      );
      return cart.products;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
