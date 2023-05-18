import { IsNumber } from "class-validator";

export class EditProductDto {
    @IsNumber({}, { message: 'Cena musi być liczbą' })
    price: number;
}