import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersEntity } from '../entities/customers.entity';
import { CustomersDto } from '../dto/customers/customers.dto';
import { ICustomersRepository } from './customers.repository.interface';

@Injectable()
export class CustomersRepository implements ICustomersRepository {
    constructor(
        @InjectRepository(CustomersEntity)
        private customersRepository: Repository<CustomersEntity>,
    ) {}

    async create(customersDto: CustomersDto): Promise<CustomersEntity> {
        return this.customersRepository.save(customersDto);
    }

    async findAll(): Promise<CustomersEntity[]> {
        return this.customersRepository.find();
    }

    async findOne(id: number): Promise<CustomersEntity> {
        return this.customersRepository.findOne({ where: { customer_id: id } });
    }

    async update(id: number, customersDto: CustomersDto): Promise<CustomersEntity> {
        await this.customersRepository.update(id, customersDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.customersRepository.delete(id);
    }

    async findByCustomerName(customer_name: string): Promise<CustomersEntity> {
        return this.customersRepository.findOne({ where: { customer_name } });
    }
}
