using Application.DTO.Counter;
using Application.Mapping;
using AutoMapper;
using FluentValidation;

namespace Application.DTO.CountersGroup
{
    public class NewCountersGroupDto : IMapFrom<Domain.Entities.CountersGroup>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<NewCounterDto> Counters { get; set; }
        public Guid UserId { get; set; }
        public Guid? PatternId { get; set; }
        public Guid? ProjectId { get; set; }

        public static void Mapping(Profile profile)
        {
            profile.CreateMap<NewCountersGroupDto, Domain.Entities.CountersGroup>().ReverseMap();
        }
    }

    public class NewCountersGroupValidation : AbstractValidator<NewCountersGroupDto>
    {
        public NewCountersGroupValidation()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
            RuleFor(x => x.UserId).NotEmpty();
            RuleFor(x => x.Counters).NotEmpty();
        }
    }
}
