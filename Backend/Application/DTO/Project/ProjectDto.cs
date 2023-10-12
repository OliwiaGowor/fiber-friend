using Application.DTO.Yarn;
using Application.Mapping;
using AutoMapper;
using FluentValidation;

namespace Application.DTO.Project;

public class ProjectDto : IMapFrom<Domain.Entities.Project>
{
    public Guid Id { get; set; }
    public string Name { get; set; } = "";
    public string Type { get; set; } = "";
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool Finished { get; set; } = false;
    public string Category { get; set; } = "";
    public List<YarnDto>? Yarns {get; set;}

    public static void Mapping(Profile profile)
    {
        profile.CreateMap<Domain.Entities.Project, ProjectDto>()
            .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
            .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name))
            .ForMember(d => d.Type, opt => opt.MapFrom(s => s.Type))
            .ForMember(d => d.StartDate, opt => opt.MapFrom(s => s.StartDate))
            .ForMember(d => d.EndDate, opt => opt.MapFrom(s => s.EndDate))
            .ForMember(d => d.Finished, opt => opt.MapFrom(s => s.Finished))
            .ForMember(d => d.Category, opt => opt.MapFrom(s => s.Category))
            .ForMember(d => d.Yarns, opt => opt.MapFrom(s => s.Yarns));

        profile.CreateMap<ProjectDto, Domain.Entities.Project>().ReverseMap();
    }  
}

public class NewProjectValidation : AbstractValidator<ProjectDto>
{
    public NewProjectValidation()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Type).NotEmpty().MaximumLength(100);
        RuleFor(x => x.StartDate).NotEmpty();
        RuleFor(x => x.Finished).NotEmpty();
        RuleFor(x => x.Category).NotEmpty().MaximumLength(100);
    }
}