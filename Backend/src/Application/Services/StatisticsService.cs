using Application.DTO.Statistics;
using Application.Interfaces.Services;
using Common.Enums;
using Domain.Interfaces.Repository;

namespace Application.Services;

internal class StatisticsService : IStatisticsService
{
    private readonly IResourceRepository _resourceRepo;
    private readonly IProjectRepository _projectRepo;
    private readonly IPatternRepository _patternRepo;

    public StatisticsService(IResourceRepository resourceRepo, IProjectRepository projectRepo, IPatternRepository patternRepo)
    {
        _resourceRepo = resourceRepo;
        _projectRepo = projectRepo;
        _patternRepo = patternRepo;
    }

    public ProjectsStatisticsDto GetProjectsStatisticsForUser(Guid userId, DateTime timePeriodStart, DateTime timePeriodEnd)
    {
        var projects = _projectRepo.GetProjectsByTimePeriodForUser(timePeriodStart, timePeriodEnd, userId);

        var statistics = new ProjectsStatisticsDto();

        statistics.ActiveProjects = projects.Count();
        statistics.FinishedProjects = projects.Count(p => p.Finished == true);

        statistics.SkeinsUsed = projects.SelectMany(p => p.Yarns)
                                   .Sum(y => y.Quantity);

        var mostFreqToolSize = projects.SelectMany(p => p.Yarns.Select(y => y.ToolSize))
                                   .AsQueryable()
                                   .GroupBy(toolSize => toolSize)
                                   .Select(group => new { ToolSize = group.Key, Count = group.Count() })
                                   .OrderByDescending(g => g.Count)
                                   .FirstOrDefault()?.ToolSize;
        statistics.MostFreqToolSize = mostFreqToolSize ?? "N/A";

        var mostFreqStitch = projects.SelectMany(p => p.Yarns.Select(y => y.Stitch))
                                     .AsQueryable()
                                     .GroupBy(stitch => stitch)
                                     .Select(group => new { Stitch = group.Key, Count = group.Count() })
                                     .OrderByDescending(g => g.Count)
                                     .FirstOrDefault()?.Stitch;
        statistics.MostFreqStitch = mostFreqStitch ?? "N/A";

        var mostFreqCategory = projects.GroupBy(p => p.Category)
                                       .Select(group => new { Category = group.Key, Count = group.Count() })
                                       .OrderByDescending(g => g.Count)
                                       .FirstOrDefault()?.Category;
        statistics.MostFreqCategory = mostFreqCategory ?? "N/A";

        statistics.CrochetProjects = projects.Count(p => p.Type == NeedleworkType.Crochet).ToString();
        statistics.KnittingProjects = projects.Count(p => p.Type == NeedleworkType.Knitting).ToString();
        statistics.OtherProjects = projects.Count(p => p.Type == NeedleworkType.Other).ToString();

        return statistics;
    }

    public PatternsStatisticsDto GetPatternsStatisticsForUser(Guid userId, DateTime timePeriodStart, DateTime timePeriodEnd)
    {
        var patterns = _patternRepo.GetPatternsByTimePeriodForUser(timePeriodStart, timePeriodEnd, userId);

        var statistics = new PatternsStatisticsDto();

        statistics.AddedPatterns = patterns.Count();
        statistics.AuthorialPatterns = patterns.Count(p => p.IsFinished == true);

        var mostFreqToolSize = patterns.SelectMany(p => p.Yarns.Select(y => y.ToolSize))
                                   .AsQueryable()
                                   .GroupBy(toolSize => toolSize)
                                   .Select(group => new { ToolSize = group.Key, Count = group.Count() })
                                   .OrderByDescending(g => g.Count)
                                   .FirstOrDefault()?.ToolSize;
        statistics.MostFreqToolSize = mostFreqToolSize ?? "N/A";

        var mostFreqStitch = patterns.SelectMany(p => p.Yarns.Select(y => y.Stitch))
                                     .AsQueryable()
                                     .GroupBy(stitch => stitch)
                                     .Select(group => new { Stitch = group.Key, Count = group.Count() })
                                     .OrderByDescending(g => g.Count)
                                     .FirstOrDefault()?.Stitch;
        statistics.MostFreqStitch = mostFreqStitch ?? "N/A";

        var mostFreqCategory = patterns.GroupBy(p => p.Category)
                                       .Select(group => new { Category = group.Key, Count = group.Count() })
                                       .OrderByDescending(g => g.Count)
                                       .FirstOrDefault()?.Category;
        statistics.MostFreqCategory = mostFreqCategory ?? "N/A";

        statistics.CrochetPatterns = patterns.Count(p => p.Type == NeedleworkType.Crochet).ToString();
        statistics.KnittingPatterns = patterns.Count(p => p.Type == NeedleworkType.Knitting).ToString();
        statistics.OtherPatterns = patterns.Count(p => p.Type == NeedleworkType.Other).ToString();

        return statistics;
    }
}