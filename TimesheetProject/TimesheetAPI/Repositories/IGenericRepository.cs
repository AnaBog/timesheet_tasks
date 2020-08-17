using System.Collections.Generic;

namespace TimesheetApplication.Repositories
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        TEntity Get(int Id);
        void Add(TEntity entity);
        void Delete(int Id);
        void Update(TEntity entity);
    }
}
