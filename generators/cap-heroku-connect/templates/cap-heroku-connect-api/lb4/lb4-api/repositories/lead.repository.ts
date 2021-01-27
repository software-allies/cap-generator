import {DefaultCrudRepository} from '@loopback/repository';
import {Lead, LeadRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class LeadRepository extends DefaultCrudRepository<
  Lead,
  typeof Lead.prototype.SACAP__UUID__c,
  LeadRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Lead, dataSource);
  }
}
