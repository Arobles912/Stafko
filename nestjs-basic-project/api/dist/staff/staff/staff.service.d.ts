import { Repository } from 'typeorm';
import { StaffEntity } from '../entity/staff.entity/staff.entity';
import { StaffDto } from '../dto/staff.dto/staff.dto';
export declare class StaffService {
    private staffRepository;
    constructor(staffRepository: Repository<StaffEntity>);
    create(staffDto: StaffDto): Promise<StaffEntity>;
    findAll(): Promise<StaffEntity[]>;
    findOne(id: number): Promise<StaffEntity>;
    update(id: number, staffDto: StaffDto): Promise<StaffEntity>;
    remove(id: number): Promise<void>;
    findOneByUserName(username: string): Promise<StaffEntity>;
}
