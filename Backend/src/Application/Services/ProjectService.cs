﻿using Application.DTO.Pattern;
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

        var id = _projectRepo.AddProject(projectEnity, yarnsEntity);

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

    public object UpdateProject(NewProjectDto newProject, List<NewYarnDto> yarns)
    {
        var project = _mapper.Map<Project>(newProject);
        var yarnsEntity = _mapper.Map<List<Yarn>>(yarns);

        _projectRepo.UpdateProject(project, yarnsEntity);

        return project;
    }
}