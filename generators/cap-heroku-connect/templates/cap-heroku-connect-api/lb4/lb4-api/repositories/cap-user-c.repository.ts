import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {CapUserC, CapUserCRelations, CapFileC} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CapFileCRepository} from './cap-file-c.repository';

export class CapUserCRepository extends DefaultCrudRepository<
  CapUserC,
  typeof CapUserC.prototype.id,
  CapUserCRelations
> {

  public readonly capUserFiles: HasManyRepositoryFactory<CapFileC, typeof CapUserC.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CapFileCRepository') protected capFileCRepositoryGetter: Getter<CapFileCRepository>,
  ) {
    super(CapUserC, dataSource);
    this.capUserFiles = this.createHasManyRepositoryFactoryFor('capUserFiles', capFileCRepositoryGetter,);
    this.registerInclusionResolver('capUserFiles', this.capUserFiles.inclusionResolver);
  }
}
