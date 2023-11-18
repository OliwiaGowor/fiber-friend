using Application.DTO.Pattern;
using Application.Interfaces.Services;
using AutoMapper;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class PatternController : ControllerBase
{
    private readonly IPatternService _patternService;
    private readonly IMapper _mapper;

    public PatternController(IPatternService patternService, IMapper mapper)
    {
        _patternService = patternService;
        _mapper = mapper;
    }

    [HttpGet("GetAllPatternsForUser/{userId:Guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<IEnumerable<PatternDto>> GetAllPatternsForUser(Guid userId)
    {
        var list = _patternService.GetPatternsListForUser(userId);
        return Ok(list);
    }

    [HttpGet("{id:Guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<PatternDto> GetPatternById(Guid id)
    {
        if (id.Equals("0") || id.Equals("")) return BadRequest();
        var service = _patternService.GetPatternById(id);
        if (service is null) return NotFound();

        return Ok(service);
    }

    [HttpGet("GetPatternsByTypeForUser/{type}/{userId:Guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<PatternDto> GetPatternsByTypeForUser(NeedleworkType type, Guid userId)
    {
        if (!Enum.IsDefined(typeof(NeedleworkType), type) || type.Equals("")) return BadRequest();
        var service = _patternService.GetPatternsByTypeForUser(type, userId);

        if (service is null) return NotFound();

        return Ok(service);
    }

    [HttpGet("GetPatternsByStatusForUser/{finished:bool}/{userId:Guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<PatternDto> GetPatternsByStatusForUser(bool finished, Guid userId)
    {
        var service = _patternService.GetPatternsByStatusForUser(finished, userId);

        if (service is null) return NotFound();

        return Ok(service);
    }

    [HttpGet("GetPatternsByCategoryForUser/{category}/{userId:Guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<PatternDto> GetPatternsByCategoryForUser(string category, Guid userId)
    {
        if (category.Equals("")) return BadRequest();
        var service = _patternService.GetPatternsByCategoryForUser(category, userId);

        if (service is null) return NotFound();

        return Ok(service);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public ActionResult Create([FromBody] NewPatternDto newPattern)
    {
        if (!ModelState.IsValid) return BadRequest();

        var onlyPattern = new NewPatternDto
        {
            Type = newPattern.Type,
            StartDate = newPattern.StartDate,
            EndDate = newPattern.EndDate,
            Finished = newPattern.Finished,
            Category = newPattern.Category,
            Notes = newPattern.Notes
        };

        var patternId = _patternService.AddPattern(onlyPattern, newPattern.Yarns);
        newPattern.Id = patternId;

        return CreatedAtRoute("GetPattern", new { id = patternId }, newPattern);
    }

    [HttpDelete("{id:Guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Delete(Guid id)
    {
        if (id.Equals("0") || id.Equals("")) return BadRequest();
        _patternService.DeletePattern(id);

        return NoContent();
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Update([FromBody] NewPatternDto newPattern)
    {
        if (!this.ModelState.IsValid) return BadRequest();

        var onlyPattern = new NewPatternDto
        {
            Type = newPattern.Type,
            StartDate = newPattern.StartDate,
            EndDate = newPattern.EndDate,
            Finished = newPattern.Finished,
            Category = newPattern.Category,
            Notes = newPattern.Notes
        };

        _patternService.UpdatePattern(onlyPattern, newPattern.Yarns);
        return NoContent();
    }
}