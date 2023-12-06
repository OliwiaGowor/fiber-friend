using Application.DTO.Pattern;
using Application.DTO.Project;
using Application.Interfaces.Services;
using AutoMapper;
using Common.Enums;
using Common.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

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

    [HttpGet("GetAllProjectsForUser/{userId:Guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<IEnumerable<ProjectDto>> GetAllProjectsForUser(Guid userId)
    {
        if (userId.Equals("0") || userId.Equals("")) return BadRequest();
        var list = _projectService.GetProjectsListForUser(userId);
        return Ok(list);
    }

    [HttpGet("GetProjectsForUser/{userId:Guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<ProjectDto> GetProjectsForUser([FromQuery] string? filters, Guid userId, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        if (userId.Equals("") || page < 0 || pageSize < 0) return BadRequest();

        FilterModel filterModel = null;

        if (!string.IsNullOrEmpty(filters))
        {
            try
            {
                filterModel = JsonConvert.DeserializeObject<FilterModel>(filters);
            }
            catch (JsonException)
            {
                return BadRequest("Invalid JSON format for filters.");
            }
        }

        var service = _projectService.GetProjectsForUser(filterModel, userId, page, pageSize);

        if (service is null) return NotFound();

        return Ok(service);
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

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public ActionResult Create([FromBody] NewProjectDto newProject)
    {
        if (!ModelState.IsValid) return BadRequest();

        var projectId = _projectService.AddProject(newProject);
        newProject.Id = projectId;

        return Ok(projectId);
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