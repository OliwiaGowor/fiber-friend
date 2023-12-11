using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure.Helpers
{
    public class RepositoryHelper
    {
        public static void UpdateCollection<T>(DbSet<T> dbSet, ICollection<T> existingCollection, List<T> newCollection, Func<T, Guid> keySelector) where T : class
        {

            // Remove existing items not present in the new collection
            var existingIds = existingCollection.Select(keySelector);
            var newIds = newCollection.Select(keySelector);
            var idsToRemove = existingIds.Except(newIds);

            var itemsToRemove = existingCollection.Where(item => idsToRemove.Contains(keySelector(item)));
            dbSet.RemoveRange(itemsToRemove);

            // Add new items not present in the existing collection
            var idsToAdd = newIds.Except(existingIds);
            var itemsToAdd = newCollection.Where(item => idsToAdd.Contains(keySelector(item)));
            dbSet.AddRange(itemsToAdd);
        }
    }
}
