﻿using Application.DTO.Pattern;
using Application.Interfaces.Services;
using AutoMapper;
using Common.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using static NuGet.Packaging.PackagingConstants;
using System.Drawing.Printing;

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

    [HttpGet("GetPatternsForUser/{userId:Guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<PatternDto> GetPatternsForUser([FromQuery] string? filters, Guid userId, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        if (userId.Equals("") || page < 0 || pageSize < 0) return BadRequest();

        FilterModel filterModel = null;

        if (!string.IsNullOrEmpty(filters))
        {
            try
            {
                // Deserialize the JSON string into FilterModel
                filterModel = JsonConvert.DeserializeObject<FilterModel>(filters);
            }
            catch (JsonException)
            {
                // Handle JSON deserialization error
                return BadRequest("Invalid JSON format for filters.");
            }
        }

        var service = _patternService.GetPatternsForUser(filterModel, userId, page, pageSize);

        if (service is null) return NotFound();

        return Ok(service);
    }

    [AllowAnonymous]
    [HttpGet("GetCommunityPatterns")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<IEnumerable<CommunityPatternDto>> GetCommunityPatterns([FromQuery] string? filters, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        FilterModel filterModel = null;

        if (!string.IsNullOrEmpty(filters))
        {
            try
            {
                // Deserialize the JSON string into FilterModel
                filterModel = JsonConvert.DeserializeObject<FilterModel>(filters);
            }
            catch (JsonException)
            {
                // Handle JSON deserialization error
                return BadRequest("Invalid JSON format for filters.");
            }
        }

        var list = _patternService.GetCommunityPatterns(filterModel, page, pageSize);
        return Ok(list);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public ActionResult Create([FromBody] NewPatternDto newPattern)
    {
        Console.WriteLine(newPattern.AuthorId);
        if (!ModelState.IsValid) return BadRequest();

        var patternId = _patternService.AddPattern(newPattern);
        newPattern.Id = patternId;

        return Ok(patternId);
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

    [HttpPut("{id:Guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Update([FromBody] NewPatternDto newPattern)
    {
        if (!this.ModelState.IsValid) return BadRequest();

        var pattern = _patternService.UpdatePattern(newPattern);
        return Ok(pattern);
    }
}