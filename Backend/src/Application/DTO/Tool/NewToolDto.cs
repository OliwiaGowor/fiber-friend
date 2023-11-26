using Application.Mapping;
using AutoMapper;
using FluentValidation;

namespace Application.DTO.Tool;

public class NewToolDto : IMapFrom<Domain.Entities.Tool>
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Quantity { get; set; }
    public string Size { get; set; }
    public Guid ParentId { get; set; }

    public static void Mapping(Profile profile)
    {
        profile.CreateMap<NewToolDto, Domain.Entities.Tool>().ReverseMap();
    }
}

public class NewPatternValidation : AbstractValidator<NewToolDto>
{
    public NewPatternValidation()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Quantity).NotEmpty().GreaterThanOrEqualTo(0);
        RuleFor(x => x.Size).NotEmpty().MaximumLength(50);
    }
}
