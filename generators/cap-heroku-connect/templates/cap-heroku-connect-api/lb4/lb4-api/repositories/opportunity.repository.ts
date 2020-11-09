import {DefaultCrudRepository} from '@loopback/repository';
import {Opportunity, OpportunityRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OpportunityRepository extends DefaultCrudRepository<
  Opportunity,
  typeof Opportunity.prototype.id,
  OpportunityRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Opportunity, dataSource);
  }
}
