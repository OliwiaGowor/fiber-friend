using Application.Mapping;
using AutoMapper;
using FluentValidation;

namespace Application.DTO.Yarn;

public class NewYarnDto : IMapFrom<Domain.Entities.Yarn>
{
    public Guid Id { get; set; }
    public string Name { get; set; } = "Unnamed Yarn";
    public int Quantity { get; set; }
    public string Gauge { get; set; } = "";
    public string Stitch { get; set; } = "";
    public string ToolSize { get; set; } = "";
    public Guid? PatternId { get; set; }
    public Guid? ProjectId { get; set; }

    public static void Mapping(Profile profile)
    {
        profile.CreateMap<NewYarnDto, Domain.Entities.Yarn>().ReverseMap();
    }

    public class NewYarnValidation : AbstractValidator<NewYarnDto>
    {
        public NewYarnValidation()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Quantity).NotEmpty();
            RuleFor(x => x.Gauge).NotEmpty().MaximumLength(20);
            RuleFor(x => x.Stitch).NotEmpty().MaximumLength(50);
            RuleFor(x => x.ToolSize).NotEmpty().MaximumLength(20);
        }
    }
}
