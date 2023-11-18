using Application.DTO.Statistics;
using Application.Interfaces.Services;
using Domain.Enums;
using Domain.Interfaces.Repository;

namespace Application.Services;

internal class StatisticsService : IStatisticsService
{
    private readonly IResourceRepository _resourceRepo;
    private readonly IProjectRepository _projectRepo;

    public StatisticsService(IResourceRepository resourceRepo, IProjectRepository projectRepo)
    {
        _resourceRepo = resourceRepo;
        _projectRepo = projectRepo;
    }

    public StatisticsDto GetProjectsStatisticsForUser(Guid userId, DateTime timePeriodStart, DateTime timePeriodEnd)
    {
        var projects = _projectRepo.GetProjectsByTimePeriodForUser(timePeriodStart, timePeriodEnd, userId);

        var statistics = new StatisticsDto();

        statistics.ActiveProjects = projects.Count(p => p.Finished == false);
        statistics.FinishedProjects = projects.Count(p => p.Finished == true);

        statistics.SkeinsUsed = projects.Sum(p => p.Yarns.Sum(y => y.Quantity));

        var mostFreqToolSize = projects.SelectMany(p => p.Yarns.Select(y => y.ToolSize))
                                   .GroupBy(toolSize => toolSize)
                                   .OrderByDescending(g => g.Count())
                                   .FirstOrDefault()?.Key;
        statistics.MostFreqToolSize = mostFreqToolSize ?? "N/A";

        var mostFreqStitch = projects.SelectMany(p => p.Yarns.Select(y => y.Stitch))
                                     .GroupBy(stitch => stitch)
                                     .OrderByDescending(g => g.Count())
                                     .FirstOrDefault()?.Key;
        statistics.MostFreqStitch = mostFreqStitch ?? "N/A";

        var mostFreqCategory = projects.GroupBy(p => p.Category)
                                       .OrderByDescending(g => g.Count())
                                       .FirstOrDefault()?.Key;
        statistics.MostFreqCategory = mostFreqCategory ?? "N/A";

        statistics.CrochetProjects = projects.Count(p => p.Type == NeedleworkType.Crochet).ToString();
        statistics.KnittingProjects = projects.Count(p => p.Type == NeedleworkType.Knitting).ToString();
        statistics.OtherProjects = projects.Count(p => p.Type == NeedleworkType.Other).ToString();

        return statistics;
    }
}