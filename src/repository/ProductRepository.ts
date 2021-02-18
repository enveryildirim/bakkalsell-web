import { Product } from "../models/Product";
import { IRepository } from "./IRepository";

const productList: Array<Product> = [];

export class ProductRepository implements IRepository<Product> {
  create(product: Product): void {
    const newID = productList[productList.length - 1]
      ? productList[productList.length - 1].id + 1
      : 0;
    product.id = newID;
    productList.push(product);
  }

  update(product: Product): void {
    const index = productList.findIndex(productItem => productItem.id == product.id);
    productList[index] = { ...product };
  }
  deletee(product: Product): void {
    const index = productList.findIndex(productItem => productItem.id == product.id);
    productList.splice(index, 1);
  }
  get(id: number): Product {
    const result = productList.filter(productItem => productItem.id == id);
    return result.length > 0 ? result[0] : undefined;
  }
  getAll(): Array<Product> {
    return productList;
  }
}