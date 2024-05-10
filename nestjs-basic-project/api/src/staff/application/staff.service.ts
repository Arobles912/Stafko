import { Injectable, Inject } from '@nestjs/common';
import { StaffEntity } from '../domain/entities/staff.entity';
import { StaffDto } from '../domain/dto/staff.dto/staff.dto';
import { ApiTags, ApiOperation, ApiBody, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { IStaffService } from './staff.service.interface';
import { IStaffRepository } from '../domain/repositories/staff.repository.interface';

@ApiTags('Staff')
@Injectable()
export class StaffService implements IStaffService {
  constructor(
    @Inject('StaffRepository')
    private readonly staffRepository: IStaffRepository
  ) {}

  @ApiOperation({ summary: 'Creates a new staff member' })
  @ApiBody({ type: StaffDto, description: 'Body of the staff member with all the data fields' })
  @ApiCreatedResponse({ description: 'The created staff member' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async create(staffDto: StaffDto): Promise<StaffEntity> {
    return this.staffRepository.create(staffDto);
  }

  @ApiOperation({ summary: 'Gets all staff members' })
  @ApiOkResponse({ description: 'An array with all staff members', type: [StaffEntity] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findAll(): Promise<StaffEntity[]> {
    return this.staffRepository.findAll();
  }

  @ApiOperation({ summary: 'Gets a staff member specified by the ID' })
  @ApiOkResponse({ description: 'The staff member specified by the ID', type: StaffEntity })
  @ApiNotFoundResponse({ description: 'Staff member not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findOne(id: number): Promise<StaffEntity> {
    return this.staffRepository.findOne(id);
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
    await this.staffRepository.remove(id);
  }

  @ApiOperation({ summary: 'Gets a staff member specified by the username' })
  @ApiOkResponse({ description: 'The staff member specified by the username', type: StaffEntity })
  @ApiNotFoundResponse({ description: 'Staff member not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findOneByUsername(username: string): Promise<StaffEntity> {
    return this.staffRepository.findOneByUsername(username);
    //return this.staffRepository.findOne({ where: { username } });
  }
}
