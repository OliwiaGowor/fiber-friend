using Application.Mapping;
using AutoMapper;
using FluentValidation;

namespace Application.DTO.Photo
{
    public class NewPhotoDto : IMapFrom<Domain.Entities.Photo>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public string Type { get; set; }
        public Guid ParentId { get; set; }

        public static void Mapping(Profile profile)
        {
            profile.CreateMap<NewPhotoDto, Domain.Entities.Photo>().ReverseMap();
        }
    }

    public class NewPhotoValidation : AbstractValidator<NewPhotoDto>
    {
        public NewPhotoValidation()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Content).NotEmpty();
            RuleFor(x => x.Type).NotEmpty().MaximumLength(100);
        }
    }
}