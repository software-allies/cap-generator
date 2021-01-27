import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Account,
  Opportunity,
} from '../models';
import {AccountRepository} from '../repositories';

export class AccountOpportunityController {
  constructor(
    @repository(AccountRepository) protected accountRepository: AccountRepository,
  ) {}

  @get('/Accounts/{SACAP__UUID__c}/opportunities', {
    responses: {
      '200': {
        description: 'Array of Account has many Opportunity',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Opportunity)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('SACAP__UUID__c') SACAP__UUID__c: string,
    @param.query.object('filter') filter?: Filter<Opportunity>,
  ): Promise<Opportunity[]> {
    return this.accountRepository.opportunities(SACAP__UUID__c).find(filter);
  }

  @post('/Accounts/{SACAP__UUID__c}/opportunities', {
    responses: {
      '200': {
        description: 'Account model instance',
        content: {'application/json': {schema: getModelSchemaRef(Opportunity)}},
      },
    },
  })
  async create(
    @param.path.string('SACAP__UUID__c') SACAP__UUID__c: typeof Account.prototype.SACAP__UUID__c,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Opportunity, {
            title: 'NewOpportunityInAccount',
            exclude: ['SACAP__UUID__c'],
            optional: ['AccountId']
          }),
        },
      },
    }) opportunity: Omit<Opportunity, 'SACAP__UUID__c'>,
  ): Promise<Opportunity> {
    return this.accountRepository.opportunities(SACAP__UUID__c).create(opportunity);
  }

  @patch('/Accounts/{SACAP__UUID__c}/opportunities', {
    responses: {
      '200': {
        description: 'Account.Opportunity PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('SACAP__UUID__c') SACAP__UUID__c: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Opportunity, {partial: true}),
        },
      },
    })
    opportunity: Partial<Opportunity>,
    @param.query.object('where', getWhereSchemaFor(Opportunity)) where?: Where<Opportunity>,
  ): Promise<Count> {
    return this.accountRepository.opportunities(SACAP__UUID__c).patch(opportunity, where);
  }

  @del('/Accounts/{SACAP__UUID__c}/opportunities', {
    responses: {
      '200': {
        description: 'Account.Opportunity DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('SACAP__UUID__c') SACAP__UUID__c: string,
    @param.query.object('where', getWhereSchemaFor(Opportunity)) where?: Where<Opportunity>,
  ): Promise<Count> {
    return this.accountRepository.opportunities(SACAP__UUID__c).delete(where);
  }
}
