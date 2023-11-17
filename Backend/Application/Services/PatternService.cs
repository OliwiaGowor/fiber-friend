using Application.DTO.Pattern;
using Application.DTO.Yarn;
using Application.Interfaces.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Domain.Enums;
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

    public Guid AddPattern(NewPatternDto pattern, List<NewYarnDto> yarns)
    {
        var patternEnity = _mapper.Map<Pattern>(pattern);
        var yarnsEntity = _mapper.Map<List<Yarn>>(yarns);

        var id = _patternRepo.AddPattern(patternEnity, yarnsEntity);

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

    public List<PatternDto> GetPatternsList()
    {
        var patterns = _patternRepo.GetAllPatterns()
            .ProjectTo<PatternDto>(_mapper.ConfigurationProvider)
            .ToList();

        return patterns;
    }

    public List<PatternDto> GetPatternsByCategory(string category)
    {
        var patterns = _patternRepo.GetPatternsByCategory(category)
            .ProjectTo<PatternDto>(_mapper.ConfigurationProvider)
            .ToList();

        return patterns;
    }

    public List<PatternDto> GetPatternsByType(NeedleworkType type)
    {
        var patterns = _patternRepo.GetPatternsByType(type)
            .ProjectTo<PatternDto>(_mapper.ConfigurationProvider)
            .ToList();

        return patterns;
    }

    public List<PatternDto> GetPatternsByStatus(bool finished)
    {
        var patterns = _patternRepo.GetPatternsByStatus(finished)
            .ProjectTo<PatternDto>(_mapper.ConfigurationProvider)
            .ToList();

        return patterns;
    }

    public object UpdatePattern(NewPatternDto newPattern, List<NewYarnDto> yarns)
    {
        var pattern = _mapper.Map<Pattern>(newPattern);
        var yarnsEntity = _mapper.Map<List<Yarn>>(yarns);

        _patternRepo.UpdatePattern(pattern, yarnsEntity);

        return pattern;
    }
}