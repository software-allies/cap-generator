import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Account} from '../models';
import {AccountRepository} from '../repositories';

export class AccountController {
  constructor(
    @repository(AccountRepository)
    public accountRepository: AccountRepository,
  ) {}

  @post('/Accounts', {
    responses: {
      '200': {
        description: 'Account model instance',
        content: {'application/json': {schema: getModelSchemaRef(Account)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {
            title: 'NewAccount',
            exclude: ['id'],
          }),
        },
      },
    })
    account: Omit<Account, 'id'>,
  ): Promise<Account> {
    return this.accountRepository.create(account);
  }

  @get('/Accounts/count', {
    responses: {
      '200': {
        description: 'Account model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Account) where?: Where<Account>,
  ): Promise<Count> {
    return this.accountRepository.count(where);
  }

  @get('/Accounts', {
    responses: {
      '200': {
        description: 'Array of Account model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Account, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Account) filter?: Filter<Account>,
  ): Promise<Account[]> {
    return this.accountRepository.find(filter);
  }

  @patch('/Accounts', {
    responses: {
      '200': {
        description: 'Account PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {partial: true}),
        },
      },
    })
    account: Account,
    @param.where(Account) where?: Where<Account>,
  ): Promise<Count> {
    return this.accountRepository.updateAll(account, where);
  }

  @get('/Accounts/{SACAP__UUID__c}', {
    responses: {
      '200': {
        description: 'Account model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Account, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('SACAP__UUID__c') SACAP__UUID__c: string,
    @param.filter(Account, {exclude: 'where'}) filter?: FilterExcludingWhere<Account>
  ): Promise<Account> {
    return this.accountRepository.findById(SACAP__UUID__c, filter);
  }

  @patch('/Accounts/{SACAP__UUID__c}', {
    responses: {
      '204': {
        description: 'Account PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('SACAP__UUID__c') SACAP__UUID__c: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {partial: true}),
        },
      },
    })
    account: Account,
  ): Promise<void> {
    await this.accountRepository.updateById(SACAP__UUID__c, account);
  }

  @put('/Accounts/{SACAP__UUID__c}', {
    responses: {
      '204': {
        description: 'Account PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('SACAP__UUID__c') SACAP__UUID__c: string,
    @requestBody() account: Account,
  ): Promise<void> {
    await this.accountRepository.replaceById(SACAP__UUID__c, account);
  }

  @del('/Accounts/{SACAP__UUID__c}', {
    responses: {
      '204': {
        description: 'Account DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('SACAP__UUID__c') SACAP__UUID__c: string): Promise<void> {
    await this.accountRepository.deleteById(SACAP__UUID__c);
  }
}
