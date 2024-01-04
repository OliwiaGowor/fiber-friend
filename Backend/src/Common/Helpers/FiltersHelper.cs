using Common.Enums;

namespace Common.Helpers;
public class FilterModel
{
    public NeedleworkType? needleworkType { get; set; } = null;
    public string? category { get; set; } = null;
    public bool? isFinished { get; set; } = null;
    public bool? isAuthorial { get; set; } = null;
    public ResourceType? resourceType { get; set; }

    public FilterModel() { }
    public FilterModel(NeedleworkType? needleworkType, string? category, bool? isFinished, bool? isAuthorial, ResourceType? resourceType)
    {
        this.needleworkType = needleworkType ?? null;
        this.category = category ?? null;
        this.isFinished = isFinished ?? null;
        this.isAuthorial = isAuthorial ?? null;
        this.resourceType = resourceType ?? null;
    }
}