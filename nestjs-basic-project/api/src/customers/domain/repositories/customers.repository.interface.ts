import { CustomersDto } from "../dto/customers/customers.dto";
import { CustomersEntity } from "../entities/customers.entity";

export interface ICustomersRepository {
    create(customersDto: CustomersDto): Promise<CustomersEntity>;
    findAll(): Promise<CustomersEntity[]>;
    findOne(id: number): Promise<CustomersEntity>;
    update(id: number, customersDto: CustomersDto): Promise<CustomersEntity>;
    remove(id: number): Promise<void>;
    findByCustomerName(customer_name: string): Promise<CustomersEntity>;
}
