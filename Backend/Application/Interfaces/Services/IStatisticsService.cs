
using Application.DTO.Statistics;

namespace Application.Interfaces.Services;

public interface IStatisticsService
{
    StatisticsDto GetProjectsStatisticsForUser(Guid userId, DateTime timePeriodStart, DateTime timePeriodEnd);
}