import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffEntity } from '../entity/staff.entity/staff.entity';
import { StaffDto } from '../dto/staff.dto/staff.dto';
import { ApiTags, ApiOperation, ApiBody, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('Staff')
@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(StaffEntity)
    private staffRepository: Repository<StaffEntity>,
  ) {}

  @ApiOperation({ summary: 'Creates a new staff member' })
  @ApiBody({ type: StaffDto, description: 'Body of the staff member with all the data fields' })
  @ApiCreatedResponse({ description: 'The created staff member' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async create(staffDto: StaffDto): Promise<StaffEntity> {
    return this.staffRepository.save(staffDto);
  }

  @ApiOperation({ summary: 'Gets all staff members' })
  @ApiOkResponse({ description: 'An array with all staff members', type: [StaffEntity] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findAll(): Promise<StaffEntity[]> {
    return this.staffRepository.find();
  }

  @ApiOperation({ summary: 'Gets a staff member specified by the ID' })
  @ApiOkResponse({ description: 'The staff member specified by the ID', type: StaffEntity })
  @ApiNotFoundResponse({ description: 'Staff member not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findOne(id: number): Promise<StaffEntity> {
    return this.staffRepository.findOne({ where: { staff_id: id } });
  }

  @ApiOperation({ summary: 'Updates a staff member specified by the ID' })
  @ApiBody({ type: StaffDto, description: 'The fields to update of the specified staff member' })
  @ApiOkResponse({ description: 'The updated staff member', type: StaffEntity })
  @ApiNotFoundResponse({ description: 'Staff member not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async update(id: number, staffDto: StaffDto): Promise<StaffEntity> {
    await this.staffRepository.update(id, staffDto);
    return this.findOne(id);
  }

  @ApiOperation({ summary: 'Deletes the staff member specified by the ID' })
  @ApiOkResponse({ description: 'Staff member successfully deleted' })
  @ApiNotFoundResponse({ description: 'Staff member not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async remove(id: number): Promise<void> {
    await this.staffRepository.delete(id);
  }

  @ApiOperation({ summary: 'Gets a staff member specified by the username' })
  @ApiOkResponse({ description: 'The staff member specified by the username', type: StaffEntity })
  @ApiNotFoundResponse({ description: 'Staff member not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findOneByUserName(username: string): Promise<StaffEntity> {
    return this.staffRepository.findOneBy({ username });
  }
}
