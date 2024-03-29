﻿namespace Domain.Entities;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string HashedPassword { get; set; } = null!;
    public ICollection<Pattern>? Patterns { get; set; }
    public ICollection<UserSavedCommunityPattern>? SavedCommPatterns { get; set; }
    public ICollection<Project>? Projects { get; set; }
    public ICollection<CountersGroup>? CountersGroups { get; set; }
    public ICollection<Resource>? Resources { get; set; }
}