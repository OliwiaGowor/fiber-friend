using Application.DTO.CountersGroup;
using Application.DTO.Pattern;
using Application.Interfaces.Services;
using AutoMapper;
using Common.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CountersGroupController : ControllerBase
    {
        private readonly ICountersGroupService _countersGroupService;
        private readonly IMapper _mapper;

        public CountersGroupController(ICountersGroupService countersGroupService, IMapper mapper)
        {
            _countersGroupService = countersGroupService;
            _mapper = mapper;
        }

        [HttpGet("GetAllCountersGroupsForUser/{userId:Guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<CountersGroupDto>> GetAllCountersGroupsForUser(Guid userId)
        {
            var list = _countersGroupService.GetAllCountersGroupsForUser(userId);
            return Ok(list);
        }

        [HttpGet("GetCountersGroupsForUser/{userId:Guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<PatternDto> GetCountersGroupsForUser([FromQuery] FilterModel? filters, Guid userId, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            if (userId.Equals("") || page < 0 || pageSize < 0) return BadRequest();
            var service = _countersGroupService.GetCountersGroupsForUser(filters, userId, page, pageSize);

            if (service is null) return NotFound();

            return Ok(service);
        }

        [HttpGet("{id:Guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<CountersGroupDto> GetCountersGroupById(Guid id)
        {
            if (id.Equals("0") || id.Equals("")) return BadRequest();
            var service = _countersGroupService.GetCountersGroupById(id);
            if (service is null) return NotFound();

            return Ok(service);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult Create([FromBody] NewCountersGroupDto newCountersGroup)
        {
            if (!ModelState.IsValid) return BadRequest();

            var resourceId = _countersGroupService.AddCountersGroup(newCountersGroup);
            newCountersGroup.Id = resourceId;

            return Ok(resourceId);
        }

        [HttpDelete("{id:Guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Delete(Guid id)
        {
            if (id.Equals("0") || id.Equals("")) return BadRequest();
            _countersGroupService.DeleteCountersGroup(id);

            return NoContent();
        }

        [HttpPut("{id:Guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Update([FromBody] NewCountersGroupDto newCountersGroup)
        {
            if (!this.ModelState.IsValid) return BadRequest();

            _countersGroupService.UpdateCountersGroup(newCountersGroup);
            return NoContent();
        }
    }
}
