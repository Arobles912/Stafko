import { StaffEntity } from 'src/staff/entity/staff.entity/staff.entity';
import { ProjectsEntity } from 'src/projects/entity/projects.entity/projects.entity';
export declare class StaffProjectEntity {
    staff_id: number;
    project_id: number;
    staff: StaffEntity;
    project: ProjectsEntity;
}
