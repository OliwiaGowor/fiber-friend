using Common.Enums;

namespace Common.Helpers;
public class FilterModel
{
    public NeedleworkType? Type { get; set; }
    public string? category { get; set; }
    public bool? isFinished { get; set; }
    public bool? isAuthorial { get; set; }
    
    public FilterModel(NeedleworkType? type, string? category, bool? isFinisged)
    {
        Type = type;
        this.category = category;
        this.isFinished = isFinisged;
    }
}