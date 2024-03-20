import { StaffService } from './staff.service';
import { StaffDto } from '../dto/staff.dto/staff.dto';
import { StaffEntity } from '../entity/staff.entity/staff.entity';
export declare class StaffController {
    private readonly staffService;
    constructor(staffService: StaffService);
    create(staffDto: StaffDto): Promise<StaffEntity>;
    findAll(): Promise<StaffEntity[]>;
    findOne(id: string): Promise<StaffEntity>;
    update(id: string, staffDto: StaffDto): Promise<StaffEntity>;
    remove(id: string): Promise<void>;
    findOneByUserName(username: string): Promise<StaffEntity>;
}
