import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { EditProductDto } from './dtos/edit-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productService : ProductsService) {}

    @Get()
    getProducts() {
        return this.productService.getAll();
    }

    @Get('/:id')
    getProduct(@Param('id') id : string) {
        return this.productService.getById(parseInt(id));
    }

    @Post()
    addProduct(@Body() body : CreateProductDto) {
        return this.productService.addProduct(body.title, body.price);
    }

    @Delete('/:id')
    @HttpCode(204)
    deleteProduct(@Param('id') id : string) {
        this.productService.deleteProduct(parseInt(id));
    }

    @Patch('/:id')
    editProduct(@Body() body : EditProductDto, @Param('id') id : string) {
        return this.productService.editProduct(parseInt(id), body.price);
    }
}