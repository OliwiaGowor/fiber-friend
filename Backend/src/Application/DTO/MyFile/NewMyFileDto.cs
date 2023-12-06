using Application.Mapping;
using AutoMapper;
using FluentValidation;

namespace Application.DTO.File
{
    public class NewMyFileDto : IMapFrom<Domain.Entities.MyFile>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public string Type { get; set; }
        public Guid ParentId { get; set; }

         public static void Mapping(Profile profile)
        {
            profile.CreateMap<NewMyFileDto, Domain.Entities.MyFile>().ReverseMap();
        }
    }

      public class NewMyFileValidation : AbstractValidator<NewMyFileDto>
    {
        public NewMyFileValidation()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Content).NotEmpty();
            RuleFor(x => x.Type).NotEmpty();
        }
    }
}