import { Product } from "../models/Product";
import { ProductRepository } from "../repository/ProductRepository";

export class ProductService {
  productRepository: ProductRepository;
  constructor(productRepo: ProductRepository) {
    this.productRepository = productRepo;
  }
  
  createProduct(product: Product): void {
    if (this.isValid(product)) {
      if (!this.productRepository.getProductByName(product.name)) {
        this.productRepository.create(product);
      } else {
        console.log("Ürün zaten eklenmiş!!!!");
      }
    } else {
      console.log("Product tipi valid değil !!!");
    }
  }

  updateProduct(product: Product): void {
    if (this.isValid(product)) {
      this.productRepository.update(product);
    } else {
      console.log("Product tipi valid değil !!!");
    }
  }

  deleteProduct(product: Product): void {
    this.productRepository.deletee(product);
  }

  getProductById(id: number): Product {
    return this.productRepository.get(id);
  }

  getAllProduct(): Array<Product> {
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
      product.price <= 0 ||
      product.price > 1000 ||
      product.amount <= 0 ||
      product.amount > 1000 ||
      product.name.length === 0
    ) {
      isValid = false;
    }

    return isValid;
  }
}
