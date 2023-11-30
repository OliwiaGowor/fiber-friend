
using Application.DTO.Statistics;

namespace Application.Interfaces.Services;

public interface IStatisticsService
{
    ProjectsStatisticsDto GetProjectsStatisticsForUser(Guid userId, DateTime timePeriodStart, DateTime timePeriodEnd);
    PatternsStatisticsDto GetPatternsStatisticsForUser(Guid userId, DateTime timePeriodStart, DateTime timePeriodEnd);
}