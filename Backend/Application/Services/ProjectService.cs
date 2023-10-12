using Application.DTO.Project;
using Application.DTO.Yarn;
using Application.Interfaces.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Interfaces.Repository;
using Domain.Entities;

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

    public Guid AddProject(ProjectDto report)
    {
        var reportEnity = _mapper.Map<Project>(report);
        var id = _projectRepo.AddProject(reportEnity);
        return id;
    }

    public void DeleteProject(Guid reportId)
    {
        _projectRepo.DeleteProject(reportId);
    }

    public object GetProjectById(Guid reportId)
    {
        var report = _projectRepo.GetProjectById(reportId);
        var reportDto = _mapper.Map<ProjectDto>(report);
        return reportDto;
    }

    public List<ProjectDto> GetProjectsList()
    {
        var reports = _projectRepo.GetAllProjects()
            .ProjectTo<ProjectDto>(_mapper.ConfigurationProvider)
            .ToList();
        return reports;
    }

    public object UpdateProject(ProjectDto newProject)
    {
        var report = _mapper.Map<Project>(newProject);
        _projectRepo.UpdateProject(report);
        return report;
    }
}