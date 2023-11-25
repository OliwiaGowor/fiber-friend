using Application.DTO.Counter;
using AutoMapper;
using FluentValidation;

namespace Application.DTO.CountersGroup
{
    public class NewCountersGroupDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<CounterDto> Counters { get; set; }
        public Guid? ParentId { get; set; }

        public static void Mapping(Profile profile)
        {
            profile.CreateMap<CountersGroupDto, Domain.Entities.CountersGroup>().ReverseMap();
        }
    }

    public class NewCountersGroupValidation : AbstractValidator<NewCountersGroupDto>
    {
        public NewCountersGroupValidation()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Counters).NotEmpty();
        }
    }
}
