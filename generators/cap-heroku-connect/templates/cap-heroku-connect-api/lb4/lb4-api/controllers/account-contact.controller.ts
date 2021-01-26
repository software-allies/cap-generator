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

  @get('/Accounts/{sacap__uuid__c}/contacts', {
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
    @param.path.string('sacap__uuid__c') sacap__uuid__c: string,
    @param.query.object('filter') filter?: Filter<Contact>,
  ): Promise<Contact[]> {
    return this.accountRepository.contacts(sacap__uuid__c).find(filter);
  }

  @post('/Accounts/{SACAP__UUID__c}/contacts', {
    responses: {
      '200': {
        description: 'Account model instance',
        content: {'application/json': {schema: getModelSchemaRef(Contact)}},
      },
    },
  })
  async create(
    @param.path.string('SACAP__UUID__c') SACAP__UUID__c: typeof Account.prototype.SACAP__UUID__c,
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
    return this.accountRepository.contacts(SACAP__UUID__c).create(contact);
  }

  @patch('/Accounts/{sacap__uuid__c}/contacts', {
    responses: {
      '200': {
        description: 'Account.Contact PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('sacap__uuid__c') sacap__uuid__c: string,
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
    return this.accountRepository.contacts(sacap__uuid__c).patch(contact, where);
  }

  @del('/Accounts/{sacap__uuid__c}/contacts', {
    responses: {
      '200': {
        description: 'Account.Contact DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('sacap__uuid__c') sacap__uuid__c: string,
    @param.query.object('where', getWhereSchemaFor(Contact)) where?: Where<Contact>,
  ): Promise<Count> {
    return this.accountRepository.contacts(sacap__uuid__c).delete(where);
  }
}
