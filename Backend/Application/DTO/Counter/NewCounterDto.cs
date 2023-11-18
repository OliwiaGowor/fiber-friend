using AutoMapper;
using FluentValidation;

namespace Application.DTO.Counter
{
    public class NewCounterDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Value { get; set; }
        public Guid CountersGroupId { get; set; }

        public static void Mapping(Profile profile)
        {
            profile.CreateMap<CounterDto, Domain.Entities.Counter>().ReverseMap();
        }
    }

    public class NewCounterValidation : AbstractValidator<NewCounterDto>
    {
        public NewCounterValidation()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Value).NotEmpty();
            RuleFor(x => x.CountersGroupId).NotEmpty();
        }
    }
}
