using Application.DTO.Pattern;
using Application.DTO.Project;
using Application.DTO.Yarn;
using Application.Interfaces.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Enums;
using Common.Helpers;
using Domain.Entities;
using Domain.Interfaces.Repository;

namespace Application.Services;

internal class ProjectService : IProjectService
{
    private readonly IMapper _mapper;
    private readonly IProjectRepository _projectRepo;

    public ProjectService(IProjectRepository projectRepo, IMapper mapper)
    {
        _projectRepo = projectRepo;
        _mapper = mapper;
    }

    public Guid AddProject(NewProjectDto project)
    {
        var projectEnity = _mapper.Map<Project>(project);
        var yarnsEntity = _mapper.Map<List<Yarn>>(project.Yarns);
        var countersEntity = _mapper.Map<List<CountersGroup>>(project.Counters);
        var filesEntity = _mapper.Map<List<MyFile>>(project.Files);
        var photosEntity = _mapper.Map<List<Photo>>(project.Photos);

        var id = _projectRepo.AddProject(projectEnity, yarnsEntity, countersEntity, filesEntity, photosEntity);

        return id;
    }

    public void DeleteProject(Guid projectId)
    {
        _projectRepo.DeleteProject(projectId);
    }

    public object GetProjectById(Guid projectId)
    {
        var project = _projectRepo.GetProjectById(projectId);
        var projectDto = _mapper.Map<ProjectDto>(project);

        return projectDto;
    }

    public List<ProjectDto> GetProjectsListForUser(Guid userId)
    {
        var projects = _projectRepo.GetAllProjectsForUser(userId).ToList();
        var mappedProjects = new List<ProjectDto>();
        foreach (var project in projects)
        {
            mappedProjects.Add(_mapper.Map<ProjectDto>(project));
        }

        return mappedProjects;
    }
    public List<ProjectDto> GetProjectsForUser(FilterModel? filters, Guid userId, int page, int pageSize)
    {
        var projects = _projectRepo.GetProjectsForUser(filters, userId, page, pageSize).ToList();
        var mappedProjects = new List<ProjectDto>();
        foreach (var project in projects)
        {
            mappedProjects.Add(_mapper.Map<ProjectDto>(project));
        }

        return mappedProjects;
    }
    public List<ProjectDto> GetProjectsByTimePeriodForUser(DateTime timePeriodStart, DateTime timePeriodEnd, Guid userId)
    {
        var projects = _projectRepo.GetProjectsByTimePeriodForUser(timePeriodStart, timePeriodEnd, userId)
            .ProjectTo<ProjectDto>(_mapper.ConfigurationProvider)
            .ToList();

        return projects;
    }

    public ProjectDto UpdateProject(NewProjectDto newProject)
    {
        var projectEntitiy = _mapper.Map<Project>(newProject);
        var yarnsEntity = _mapper.Map<List<Yarn>>(newProject.Yarns);
        var countersEntity = _mapper.Map<List<CountersGroup>>(newProject.Counters);
        var filesEntitiy = _mapper.Map<List<MyFile>>(newProject.Files);
        var photosEntitiy = _mapper.Map<List<Photo>>(newProject.Photos);

        var project = _projectRepo.UpdateProject(projectEntitiy, yarnsEntity, countersEntity, filesEntitiy, photosEntitiy);

        var dto = _mapper.Map<ProjectDto>(project);

        return dto;
    }
}