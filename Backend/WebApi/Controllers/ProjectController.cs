using Application.DTO.Project;
using Application.Interfaces.Services;
using AutoMapper;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ProjectController : ControllerBase
{
    private readonly IProjectService _projectService;
    private readonly IMapper _mapper;

    public ProjectController(IProjectService projectService, IMapper mapper)
    {
        _projectService = projectService;
        _mapper = mapper;
    }

    [HttpGet("/GetAllProjectsForUser/{userId:Guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<IEnumerable<ProjectDto>> GetAllProjectsForUser(Guid userId)
    {
        if (userId.Equals("0") || userId.Equals("")) return BadRequest();
        var list = _projectService.GetProjectsListForUser(userId);
        return Ok(list);
    }

    [HttpGet("{id:Guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<ProjectDto> GetProjectById(Guid id)
    {
        if (id.Equals("0") || id.Equals("")) return BadRequest();
        var service = _projectService.GetProjectById(id);
        if (service is null) return NotFound();

        return Ok(service);
    }

    [HttpGet("GetProjectsByTypeForUser/{type}/{userId:Guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<ProjectDto> GetProjectsByTypeForUser(NeedleworkType type, Guid userId)
    {
        if (!Enum.IsDefined(typeof(NeedleworkType), type) || type.Equals("")) return BadRequest();
        var service = _projectService.GetProjectsByTypeForUser(type, userId);

        if (service is null) return NotFound();

        return Ok(service);
    }

    [HttpGet("GetProjectsByStatusForUser/{finished:bool}/{userId:Guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<ProjectDto> GetProjectsByStatusForUser(bool finished, Guid userId)
    {
        var service = _projectService.GetProjectsByStatusForUser(finished, userId);

        if (service is null) return NotFound();

        return Ok(service);
    }

    [HttpGet("GetProjectsByCategoryForUser/{category}/{userId:Guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<ProjectDto> GetProjectsByCategoryForUser(string category, Guid userId)
    {
        if (category.Equals("")) return BadRequest();
        var service = _projectService.GetProjectsByCategoryForUser(category, userId);

        if (service is null) return NotFound();

        return Ok(service);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public ActionResult Create([FromBody] NewProjectDto newProject)
    {
        if (!ModelState.IsValid) return BadRequest();

        var onlyProject = new NewProjectDto
        {
            Type = newProject.Type,
            StartDate = newProject.StartDate,
            EndDate = newProject.EndDate,
            Finished = newProject.Finished,
            Category = newProject.Category,
            Notes = newProject.Notes
        };

        var projectId = _projectService.AddProject(onlyProject, newProject.Yarns);
        newProject.Id = projectId;

        return CreatedAtRoute("GetProject", new { id = projectId }, newProject);
    }

    [HttpDelete("{id:Guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Delete(Guid id)
    {
        if (id.Equals("0") || id.Equals("")) return BadRequest();
        _projectService.DeleteProject(id);

        return NoContent();
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Update([FromBody] NewProjectDto newProject)
    {
        if (!this.ModelState.IsValid) return BadRequest();

        var onlyProject = new NewProjectDto
        {
            Type = newProject.Type,
            StartDate = newProject.StartDate,
            EndDate = newProject.EndDate,
            Finished = newProject.Finished,
            Category = newProject.Category,
            Notes = newProject.Notes
        };

        _projectService.UpdateProject(onlyProject, newProject.Yarns);
        return NoContent();
    }
}