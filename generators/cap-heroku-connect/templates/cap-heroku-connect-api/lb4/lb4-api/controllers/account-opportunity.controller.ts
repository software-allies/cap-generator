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
  ) { }

  @get('/accounts/{id}/opportunities', {
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
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Opportunity>,
  ): Promise<Opportunity[]> {
    return this.accountRepository.opportunities(id).find(filter);
  }

  @post('/accounts/{id}/opportunities', {
    responses: {
      '200': {
        description: 'Account model instance',
        content: {'application/json': {schema: getModelSchemaRef(Opportunity)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Account.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Opportunity, {
            title: 'NewOpportunityInAccount',
            exclude: ['id'],
            optional: ['AccountId']
          }),
        },
      },
    }) opportunity: Omit<Opportunity, 'id'>,
  ): Promise<Opportunity> {
    return this.accountRepository.opportunities(id).create(opportunity);
  }

  @patch('/accounts/{id}/opportunities', {
    responses: {
      '200': {
        description: 'Account.Opportunity PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
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
    return this.accountRepository.opportunities(id).patch(opportunity, where);
  }

  @del('/accounts/{id}/opportunities', {
    responses: {
      '200': {
        description: 'Account.Opportunity DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Opportunity)) where?: Where<Opportunity>,
  ): Promise<Count> {
    return this.accountRepository.opportunities(id).delete(where);
  }
}
