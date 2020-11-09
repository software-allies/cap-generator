import {DefaultCrudRepository} from '@loopback/repository';
import {CapFileC, CapFileCRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CapFileCRepository extends DefaultCrudRepository<
  CapFileC,
  typeof CapFileC.prototype.id,
  CapFileCRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(CapFileC, dataSource);
  }
}
