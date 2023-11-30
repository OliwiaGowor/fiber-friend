using Application.DTO.Yarn;
using Application.Mapping;
using AutoMapper;
using Common.Enums;
using FluentValidation;

namespace Application.DTO.Project;

public class NewProjectDto : IMapFrom<Domain.Entities.Project>
{
    public Guid Id { get; set; }
    public string Name { get; set; } = "Unnamed Project";
    public NeedleworkType Type { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool Finished { get; set; } = false;
    public string Category { get; set; } = "";
    public string Notes { get; set; } = "";
    //public ??? List<Photo> Photos { get; set; }
    //public ??? List<File> Files { get; set; }
    public Guid? ConnectedPatternId { get; set; }
    public List<NewYarnDto>? Yarns { get; set; }

    public static void Mapping(Profile profile)
    {
        profile.CreateMap<NewProjectDto, Domain.Entities.Project>().ReverseMap();
    }
}

public class NewProjectValidation : AbstractValidator<NewProjectDto>
{
    public NewProjectValidation()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Type).NotEmpty();
        RuleFor(x => x.StartDate).NotEmpty();
        RuleFor(x => x.Finished).NotEmpty();
        RuleFor(x => x.Category).NotEmpty().MaximumLength(100);
    }
}