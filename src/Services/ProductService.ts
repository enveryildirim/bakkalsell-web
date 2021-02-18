import { Product } from "../models/Product";
import { ProductRepository } from "../repository/ProductRepository";

export class UserService {
  productRepository: ProductRepository;
  constructor(productRepo: ProductRepository) {
    this.productRepository = productRepo;
  }
  createUser(product: Product): void {
    if (this.isValid(product)) {
      this.productRepository.create(product);
    } else {
      console.log("Product tipi valid değil !!!");
    }
  }

  updateUser(product: Product): void {
    if (this.isValid(product)) {
      this.productRepository.update(product);
    } else {
      console.log("Product tipi valid değil !!!");
    }
  }

  deleteUser(product: Product): void {
    this.productRepository.deletee(product);
  }

  getUserById(id: number): Product {
    return this.productRepository.get(id);
  }

  getAllUser(): Array<Product> {
    return this.productRepository.getAll();
  }

  isValid(product: Product): boolean {
    let isValid: boolean = true;

    if (
      product.name === undefined ||
      product.price === undefined ||
      product.amount === undefined
    ) {
      isValid = false;
    }

    if (
      product.price === 0 ||
      product.price > 1000 ||
      product.amount === 0 ||
      product.amount > 1000 ||
      product.name.length === 0
    ) {
      isValid = false;
    }

    return isValid;
  }
}
