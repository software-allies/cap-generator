import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Account, AccountRelations, Contact, Opportunity} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ContactRepository} from './contact.repository';
import {OpportunityRepository} from './opportunity.repository';

export class AccountRepository extends DefaultCrudRepository<
  Account,
  typeof Account.prototype.id,
  AccountRelations
> {

  public readonly contacts: HasManyRepositoryFactory<Contact, typeof Account.prototype.id>;

  public readonly opportunities: HasManyRepositoryFactory<Opportunity, typeof Account.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ContactRepository') protected contactRepositoryGetter: Getter<ContactRepository>, @repository.getter('OpportunityRepository') protected opportunityRepositoryGetter: Getter<OpportunityRepository>,
  ) {
    super(Account, dataSource);
    this.opportunities = this.createHasManyRepositoryFactoryFor('opportunities', opportunityRepositoryGetter,);
    this.registerInclusionResolver('opportunities', this.opportunities.inclusionResolver);
    this.contacts = this.createHasManyRepositoryFactoryFor('contacts', contactRepositoryGetter,);
    this.registerInclusionResolver('contacts', this.contacts.inclusionResolver);
  }
}
