using Application.DTO.Pattern;
using Application.Interfaces.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Helpers;
using Domain.Entities;
using Domain.Interfaces.Repository;

namespace Application.Services;

internal class PatternService : IPatternService
{
    private readonly IMapper _mapper;
    private readonly IPatternRepository _patternRepo;

    public PatternService(IPatternRepository patternRepo, IMapper mapper)
    {
        _patternRepo = patternRepo;
        _mapper = mapper;
    }

    public Guid AddPattern(NewPatternDto pattern)
    {
        var patternEnity = _mapper.Map<Pattern>(pattern);
        var yarnsEntity = _mapper.Map<List<Yarn>>(pattern.Yarns);
        var toolsEntity = _mapper.Map<List<Tool>>(pattern.Tools);
        var otherSuppliesEntity = _mapper.Map<List<OtherSupply>>(pattern.OtherSupplies);

        var id = _patternRepo.AddPattern(patternEnity, yarnsEntity, toolsEntity, otherSuppliesEntity);

        return id;
    }

    public void DeletePattern(Guid patternId)
    {
        _patternRepo.DeletePattern(patternId);
    }

    public object GetPatternById(Guid patternId)
    {
        var pattern = _patternRepo.GetPatternById(patternId);
        var patternDto = _mapper.Map<PatternDto>(pattern);

        return patternDto;
    }

    public List<PatternDto> GetPatternsListForUser(Guid userId)
    {
        var patterns = _patternRepo.GetAllPatternsForUser(userId)
            .ProjectTo<PatternDto>(_mapper.ConfigurationProvider)
            .ToList();

        return patterns;
    }

    public List<PatternDto> GetPatternsForUser(FilterModel filters, Guid userId, int page, int pageSize)
    {
        var patterns = _patternRepo.GetPatternsForUser(filters, userId, page, pageSize)
            .ProjectTo<PatternDto>(_mapper.ConfigurationProvider)
            .ToList();

        return patterns;
    }

    public List<PatternDto> GetPatternsByTimePeriodForUser(DateTime timePeriodStart, DateTime timePeriodEnd, Guid userId)
    {
        var patterns = _patternRepo.GetPatternsByTimePeriodForUser(timePeriodStart, timePeriodEnd, userId)
            .ProjectTo<PatternDto>(_mapper.ConfigurationProvider)
            .ToList();

        return patterns;
    }

    public object UpdatePattern(NewPatternDto newPattern)
    {
        var pattern = _mapper.Map<Pattern>(newPattern);
        var yarnsEntity = _mapper.Map<List<Yarn>>(newPattern.Yarns);
        var toolsEntity = _mapper.Map<List<Tool>>(newPattern.Tools);
        var otherSuppliesEntity = _mapper.Map<List<OtherSupply>>(newPattern.OtherSupplies);

        _patternRepo.UpdatePattern(pattern, yarnsEntity, toolsEntity, otherSuppliesEntity);

        return pattern;
    }
}