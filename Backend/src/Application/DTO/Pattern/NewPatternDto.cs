using Application.DTO.OtherSupply;
using Application.DTO.Tool;
using Application.DTO.Yarn;
using Application.Mapping;
using AutoMapper;
using Common.Enums;
using FluentValidation;

namespace Application.DTO.Pattern
{
    public class NewPatternDto : IMapFrom<Domain.Entities.Pattern>
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "Unnamed Pattern";
        public NeedleworkType Type { get; set; }
        public bool IsAuthorial { get; set; }
        public string Category { get; set; } = "";
        public string Notes { get; set; } = "";
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? Finished { get; set; }
        //public ??? List<Photo> Photos { get; set; }
        //public ??? List<File> Files { get; set; }
        public List<NewYarnDto> Yarns { get; set; }
        public List<NewToolDto> Tools { get; set; }
        public List<NewOtherSupplyDto>? OtherSupplies { get; set; }
        public string AuthorId { get; set; }
        public bool IsShared { get; set; }

        public static void Mapping(Profile profile)
        {
            profile.CreateMap<NewPatternDto, Domain.Entities.Pattern>().ReverseMap();
        }
    }

    public class NewPatternValidation : AbstractValidator<NewPatternDto>
    {
        public NewPatternValidation()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Type).NotEmpty();
            RuleFor(x => x.IsAuthorial).NotEmpty();
            RuleFor(x => x.Category).NotEmpty().MaximumLength(100);
            RuleFor(x => x.AuthorId).NotEmpty();
            RuleFor(x => x.IsShared).NotEmpty();
        }
    }
}
