import { CustomersDto } from "../domain/dto/customers/customers.dto";
import { CustomersEntity } from "../domain/entities/customers.entity";

export interface ICustomersService {
    create(customersDto: CustomersDto): Promise<CustomersEntity>;
    findAll(): Promise<CustomersEntity[]>;
    findOne(id: number): Promise<CustomersEntity>;
    update(id: number, customersDto: CustomersDto): Promise<CustomersEntity>;
    remove(id: number): Promise<void>;
    findByCustomerName(customer_name: string): Promise<CustomersEntity>;
}
