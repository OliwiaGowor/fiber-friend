using Common.Enums;

namespace Common.Helpers;
public class FilterModel
{
    public NeedleworkType? Type { get; set; } = null;
    public string? category { get; set; } = null;
    public bool? isFinished { get; set; } = null;
    public bool? isAuthorial { get; set; } = null;


    public FilterModel() { }
    public FilterModel(NeedleworkType? type, string? category, bool? isFinished, bool? isAuthorial)
    {
        Type = type ?? null;
        this.category = category ?? null;
        this.isFinished = isFinished ?? null;
        this.isAuthorial = isAuthorial ?? null;
    }
}