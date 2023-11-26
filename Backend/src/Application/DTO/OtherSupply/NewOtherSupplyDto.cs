using Application.Mapping;
using AutoMapper;
using FluentValidation;

namespace Application.DTO.OtherSupply;

public class NewOtherSupplyDto : IMapFrom<Domain.Entities.OtherSupply>
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Quantity { get; set; }
    public string Note { get; set; }
    public Guid ParentId { get; set; }

    public static void Mapping(Profile profile)
    {
        profile.CreateMap<NewOtherSupplyDto, Domain.Entities.OtherSupply>().ReverseMap();
    }
}

public class NewPatternValidation : AbstractValidator<NewOtherSupplyDto>
{
    public NewPatternValidation()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Quantity).NotEmpty().GreaterThanOrEqualTo(0);
        RuleFor(x => x.Note).MaximumLength(150);
    }
}
