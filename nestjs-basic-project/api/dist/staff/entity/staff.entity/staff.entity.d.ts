import { ProjectsEntity } from 'src/projects/entity/projects.entity/projects.entity';
export declare class StaffEntity {
    staff_id: number;
    username: string;
    pass: string;
    email: string;
    project_id: number;
    user_role: string;
    project: ProjectsEntity;
}
