using Application.Interfaces.Authentication;
using Application.Interfaces.Services;
using Application.Services;
using Application.Services.Authentication;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<ICountersGroupService, CountersGroupService>();
        services.AddScoped<IPatternService, PatternService>();
        services.AddScoped<IProjectService, ProjectService>();
        services.AddScoped<IResourceService, ResourceService>();
        services.AddScoped<IStatisticsService, StatisticsService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
        return services;
    }
}