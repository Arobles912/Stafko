import { Test, TestingModule } from "@nestjs/testing";
import { ProjectsService } from "./projects.service";
import { ProjectsEntity } from "../entity/projects.entity/projects.entity";
import { MulterFile } from "multer";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("ProjectsService", () => {
  let service: ProjectsService;
  let repository: Repository<ProjectsEntity>;

  const mockProjectsRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findOneByProjectName: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(ProjectsEntity),
          useValue: mockProjectsRepository,
        },
      ],
      imports: [],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    repository = module.get<Repository<ProjectsEntity>>(
      getRepositoryToken(ProjectsEntity)
    );
  });

  describe("create", () => {
    it("should create a new project", async () => {
      const projectDto: ProjectsEntity = {
        project_id: null,
        project_name: "Test Project",
        description: "This is a test project",
        creation_date: new Date(),
        project_file: Buffer.from("Test file content"),
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
        project_name: "Test Project",
        description: "This is a test project",
        creation_date: new Date(),
        project_file: Buffer.from("Test file content"),
      };

      mockProjectsRepository.save.mockResolvedValue(createdProject);

      jest.spyOn(mockProjectsRepository, "save").mockReturnValue(projectDto);

      const result = await service.create(projectDto, file);
      expect(result).toEqual(createdProject);
    });
  });

  describe("findAll", () => {
    it("should return an array of projects", async () => {
      const projects: ProjectsEntity[] = [
        {
          project_id: 1,
          project_name: "Project 1",
          description: "Description 1",
          creation_date: new Date(),
          project_file: Buffer.from("File content 1"),
        },
        {
          project_id: 2,
          project_name: "Project 2",
          description: "Description 2",
          creation_date: new Date(),
          project_file: Buffer.from("File content 2"),
        },
      ];

      mockProjectsRepository.find.mockResolvedValue(projects);

      const result = await service.findAll();

      expect(result).toEqual(projects);
      expect(mockProjectsRepository.find).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return a project specified by the ID", async () => {
      const id = 1;
      const project: ProjectsEntity = {
        project_id: 1,
        project_name: "Test Project",
        description: "This is a test project",
        creation_date: new Date(),
        project_file: Buffer.from("Test file content"),
      };

      mockProjectsRepository.findOne.mockResolvedValue(project);

      const result = await service.findOne(id);

      expect(result).toEqual(project);
      expect(mockProjectsRepository.findOne).toHaveBeenCalledWith({ where: { project_id: id } });
    });

    it("should return null if project is not found", async () => {
      const id = 999;

      mockProjectsRepository.findOne.mockResolvedValue(null);

      const result = await service.findOne(id);

      expect(result).toBeNull();
      expect(mockProjectsRepository.findOne).toHaveBeenCalledWith({ where: { project_id: id } });
    });
  });

  describe("update", () => {
    it("should update a project specified by the ID", async () => {
      const id = 1;
      const projectDto: ProjectsEntity = {
        project_id: 1,
        project_name: "Updated Project",
        description: "This is an updated project",
        creation_date: new Date(),
        project_file: Buffer.from("Updated file content"),
      };
      const updatedProject: ProjectsEntity = {
        project_id: 1,
        project_name: "Updated Project",
        description: "This is an updated project",
        creation_date: new Date(),
        project_file: Buffer.from("Updated file content"),
      };

      mockProjectsRepository.update.mockResolvedValue({ raw: updatedProject });

      const result = await service.update(id, projectDto);

      expect(result).toEqual(updatedProject);
      expect(mockProjectsRepository.update).toHaveBeenCalledWith(id, projectDto);
    });
  });

  describe("remove", () => {
    it("should remove a project specified by the ID", async () => {
      const id = 1;

      mockProjectsRepository.delete.mockResolvedValue({});

      await service.remove(id);

      expect(mockProjectsRepository.delete).toHaveBeenCalledWith(id);
    });
  });

  describe("findByProjectName", () => {
    it("should return a project specified by the project name", async () => {
      const projectName = "Test Project";
      const project: ProjectsEntity = {
        project_id: 1,
        project_name: "Test Project",
        description: "This is a test project",
        creation_date: new Date(),
        project_file: Buffer.from("Test file content"),
      };

      mockProjectsRepository.findOneByProjectName.mockResolvedValue(project);

      const result = await service.findByProjectName(projectName);

      expect(result).toEqual(project);
      expect(mockProjectsRepository.findOneByProjectName).toHaveBeenCalledWith(projectName);
    });

    it("should return null if project is not found", async () => {
      const projectName = "Non-existing Project";

      mockProjectsRepository.findOneByProjectName.mockResolvedValue(null);

      const result = await service.findByProjectName(projectName);

      expect(result).toBeNull();
      expect(mockProjectsRepository.findOneByProjectName).toHaveBeenCalledWith(projectName);
    });
  });
});
