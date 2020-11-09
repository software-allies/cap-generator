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
  Contact,
} from '../models';
import {AccountRepository} from '../repositories';

export class AccountContactController {
  constructor(
    @repository(AccountRepository) protected accountRepository: AccountRepository,
  ) { }

  @get('/accounts/{id}/contacts', {
    responses: {
      '200': {
        description: 'Array of Account has many Contact',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Contact)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Contact>,
  ): Promise<Contact[]> {
    return this.accountRepository.contacts(id).find(filter);
  }

  @post('/accounts/{id}/contacts', {
    responses: {
      '200': {
        description: 'Account model instance',
        content: {'application/json': {schema: getModelSchemaRef(Contact)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Account.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contact, {
            title: 'NewContactInAccount',
            exclude: ['id'],
            optional: ['AccountId']
          }),
        },
      },
    }) contact: Omit<Contact, 'id'>,
  ): Promise<Contact> {
    return this.accountRepository.contacts(id).create(contact);
  }

  @patch('/accounts/{id}/contacts', {
    responses: {
      '200': {
        description: 'Account.Contact PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contact, {partial: true}),
        },
      },
    })
    contact: Partial<Contact>,
    @param.query.object('where', getWhereSchemaFor(Contact)) where?: Where<Contact>,
  ): Promise<Count> {
    return this.accountRepository.contacts(id).patch(contact, where);
  }

  @del('/accounts/{id}/contacts', {
    responses: {
      '200': {
        description: 'Account.Contact DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Contact)) where?: Where<Contact>,
  ): Promise<Count> {
    return this.accountRepository.contacts(id).delete(where);
  }
}
