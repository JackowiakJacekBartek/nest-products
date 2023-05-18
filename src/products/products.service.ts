import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';


//Ctrl + / to zakomentowanie
// let products = [
//     { id: 1, title: "mleko", price: 10},
//     { id: 2, title: "buraki", price: 5},
// ];

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly repo: Repository<Product>
      ) {}

    getAll(){
        // return products;
        return this.repo.find();
    }

    getById(id: number) {
        // return products.find(x => x.id === id);
        return this.repo.findOneBy({ id: id });
    }

    addProduct(title: string, price: number) {
        // const id = Math.round(Math.random()*1000);
        // const newProduct = {id, title, price};
        // products.push(newProduct);
        // return newProduct;

        const newProduct = this.repo.create({ title, price });
        return this.repo.save(newProduct);
    }

    async deleteProduct(id: number){
        // products = products.filter(x => x.id !== id);

        const product = await this.repo.findOneBy({ id: id });
        this.repo.remove(product);
    }

    async editProduct(id: number, price: number) {
        // let product = products.find(x => x.id === id);
        // product.price = price;
        // return product;

        const product = await this.repo.findOneBy({ id: id });
        product.price = price;
        return this.repo.save(product);
    }
}
