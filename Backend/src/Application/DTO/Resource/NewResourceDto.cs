using Application.Mapping;
using AutoMapper;
using Common.Enums;
using FluentValidation;

namespace Application.DTO.Resource;
public class NewResourceDto : IMapFrom<Domain.Entities.Resource>
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public ResourceType Type { get; set; }
    public int Quantity { get; set; }
    public string? Gauge { get; set; }
    public string ToolSize { get; set; }
    public Guid UserId { get; set; }

    public static void Mapping(Profile profile)
    {
        profile.CreateMap<NewResourceDto, Domain.Entities.Resource>().ReverseMap();
    }
}

public class NewResourceValidation : AbstractValidator<ResourceDto>
{
    public NewResourceValidation()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Type).NotEmpty();
        RuleFor(x => x.Quantity).NotEmpty().GreaterThanOrEqualTo(0);
        RuleFor(x => x.Gauge).NotEmpty().MaximumLength(50);
        RuleFor(x => x.ToolSize).NotEmpty().MaximumLength(20);
    }
}
