using Application.DTO.Resource;
using Application.Interfaces.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ResourceController : ControllerBase
{
    private readonly IResourceService _resourceService;
    private readonly IMapper _mapper;

    public ResourceController(IResourceService resourceService, IMapper mapper)
    {
        _resourceService = resourceService;
        _mapper = mapper;
    }

    [HttpGet("GetAllResourcesForUser/{userId:Guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<IEnumerable<ResourceDto>> GetAllResourcesForUser(Guid userId)
    {
        var list = _resourceService.GetResourcesListForUser(userId);
        return Ok(list);
    }

    [HttpGet("GetAllYarnsForUser/{userId:Guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<IEnumerable<ResourceDto>> GetAllYarnsForUser(Guid userId)
    {
        var list = _resourceService.GetYarnsListForUser(userId);
        return Ok(list);
    }

    [HttpGet("{id:Guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<ResourceDto> GetResourceById(Guid id)
    {
        if (id.Equals("0") || id.Equals("")) return BadRequest();
        var service = _resourceService.GetResourceById(id);
        if (service is null) return NotFound();

        return Ok(service);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public ActionResult Create([FromBody] NewResourceDto newResource)
    {
        if (!ModelState.IsValid) return BadRequest();

        var resourceId = _resourceService.AddResource(newResource);
        newResource.Id = resourceId;

        return CreatedAtRoute("GetResource", new { id = resourceId }, newResource);
    }

    [HttpDelete("{id:Guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Delete(Guid id)
    {
        if (id.Equals("0") || id.Equals("")) return BadRequest();
        _resourceService.DeleteResource(id);

        return NoContent();
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Update([FromBody] NewResourceDto newResource)
    {
        if (!this.ModelState.IsValid) return BadRequest();

        _resourceService.UpdateResource(newResource);
        return NoContent();
    }
}