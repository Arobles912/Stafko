import { Test, TestingModule } from "@nestjs/testing";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";
import { ProjectsEntity } from "../domain/entities/projects.entity/projects.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { MulterFile } from "multer";

describe("ProjectsController", () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        ProjectsService,
        { provide: getRepositoryToken(ProjectsEntity), useValue: {} },
      ],
      imports: [],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a project", async () => {
      const projectDto: ProjectsEntity = {
        project_id: 1,
        project_name: "Test",
        description: "Hola Hola Hola Hola Hola Hola Hola",
        creation_date: new Date(),
        project_file: Buffer.from([]), 
      };
      const file: MulterFile = {
        fieldname: "file",
        originalname: "test.txt",
        encoding: "7bit",
        mimetype: "text/plain",
        buffer: Buffer.from([]),
        size: 0, 
      };
      const createdProject: ProjectsEntity = {
        project_id: 1, 
        project_name: "Test",
        description: "Hola Hola Hola Hola Hola Hola Hola",
        creation_date: new Date(), 
        project_file: Buffer.from([]), 
      };

      jest.spyOn(service, "create").mockResolvedValue(createdProject);

      await expect(controller.create(projectDto, file)).resolves.toEqual(createdProject);
      expect(service.create).toHaveBeenCalledWith(projectDto, file);
    });
  });
  

  describe("findAll", () => {
    it("should return an array of projects", async () => {
      const projectsList: ProjectsEntity[] = [
        {
          project_id: 1,
          project_name: "Test",
          description: "Hola Hola Hola Hola Hola Hola Hola",
          creation_date: new Date(),
          project_file: Buffer.from([]), 
        },
        {
          project_id: 2,
          project_name: "Test2",
          description: "fdbvsbfd",
          creation_date: new Date(),
          project_file: Buffer.from([]), 
        },
      ];

      jest.spyOn(service, "findAll").mockResolvedValue(projectsList);

      await expect(controller.findAll()).resolves.toEqual(projectsList);
    });
  });

  describe("findOne", () => {
    it("should find a project by a given ID and return its data", async () => {
      const id = 1;
      const expectedProject: ProjectsEntity = {
        project_id: 1,
        project_name: "Test",
        description: "Hola Hola Hola Hola Hola Hola Hola",
        creation_date: new Date(),
        project_file: Buffer.from([]), 
      };

      const mockProjectsService = {
        findOne: jest.fn(() => Promise.resolve(expectedProject)),
      };

      controller = new ProjectsController(mockProjectsService as any);

      const actualProject = await controller.findOne(id);

      expect(actualProject.project_id).toEqual(id);

      expect(mockProjectsService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe("update", () => {
    it("should find a project by a given id and update its data", async () => {
      const id = 1;
      const project = {
        project_name: "Test",
        description: "Hola Hola Hola Hola Hola Hola Hola",
        creation_date: new Date(),
        project_file: Buffer.from([]), 
      };
  
      const expectedProject = {
        project_id: 1,
        project_name: "Test",
        description: "Hola Hola Hola Hola Hola Hola Hola",
        creation_date: new Date(),
        project_file: Buffer.from([]), 
      };
  
      const mockProjectsService = {
        update: jest.fn((id: number, project: any) => Promise.resolve({
          ...expectedProject,
          ...project, 
        })),
      };
      
  
      controller = new ProjectsController(mockProjectsService as any);
  
      const actualProject = await controller.update(id, project);
  
      expect(mockProjectsService.update).toHaveBeenCalledWith(id, project);

      expect(actualProject).toEqual(expectedProject);
    });
  });

  describe("remove", () => {
    it("should remove a project by a given id", async () => {
      const id = 1;
      const project = {
        project_id: 1,
        project_name: "Test",
        description: "Hola Hola Hola Hola Hola Hola Hola",
        creation_date: new Date(),
        project_file: Buffer.from([]), 
      };
  
      const mockProjectsService = {
        remove: jest.fn((id: number) => Promise.resolve(project)), 
      };
  
      controller = new ProjectsController(mockProjectsService as any);
  
      await controller.remove(id);
      
      expect(project.project_id).toEqual(id);
  
      expect(mockProjectsService.remove).toHaveBeenCalledWith(id);
    });
  });

  describe("findByProjectName", () => {
    it("should find a project by a given project name and return its data", async () => {
      const project_name = "Test";
      const expectedProject: ProjectsEntity = {
        project_id: 1,
        project_name: "Test",
        description: "Hola Hola Hola Hola Hola Hola Hola",
        creation_date: new Date(),
        project_file: Buffer.from([]), 
      };

      const mockProjectService = {
        findByProjectName: jest.fn(() => Promise.resolve(expectedProject)),
      };

      controller = new ProjectsController(mockProjectService as any);

      const actualProject = await controller.findByProjectName(project_name);

      expect(actualProject.project_name).toEqual(project_name);

      expect(mockProjectService.findByProjectName).toHaveBeenCalledWith(project_name);
    });
  });
  
});
