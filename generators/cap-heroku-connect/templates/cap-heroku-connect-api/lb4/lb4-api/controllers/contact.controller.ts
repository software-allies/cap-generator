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
import {Contact} from '../models';
import {ContactRepository} from '../repositories';

export class ContactController {
  constructor(
    @repository(ContactRepository)
    public contactRepository : ContactRepository,
  ) {}

  @post('/Contacts', {
    responses: {
      '200': {
        description: 'Contact model instance',
        content: {'application/json': {schema: getModelSchemaRef(Contact)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contact, {
            title: 'NewContact',
            exclude: ['id'],
          }),
        },
      },
    })
    contact: Omit<Contact, 'id'>,
  ): Promise<Contact> {
    return this.contactRepository.create(contact);
  }

  @get('/Contacts/count', {
    responses: {
      '200': {
        description: 'Contact model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Contact) where?: Where<Contact>,
  ): Promise<Count> {
    return this.contactRepository.count(where);
  }

  @get('/Contacts', {
    responses: {
      '200': {
        description: 'Array of Contact model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Contact, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Contact) filter?: Filter<Contact>,
  ): Promise<Contact[]> {
    return this.contactRepository.find(filter);
  }

  @patch('/Contacts', {
    responses: {
      '200': {
        description: 'Contact PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contact, {partial: true}),
        },
      },
    })
    contact: Contact,
    @param.where(Contact) where?: Where<Contact>,
  ): Promise<Count> {
    return this.contactRepository.updateAll(contact, where);
  }

  @get('/Contacts/{sacap__uuid__c}', {
    responses: {
      '200': {
        description: 'Contact model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Contact, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('sacap__uuid__c') sacap__uuid__c: string,
    @param.filter(Contact, {exclude: 'where'}) filter?: FilterExcludingWhere<Contact>
  ): Promise<Contact> {
    return this.contactRepository.findById(sacap__uuid__c, filter);
  }

  @patch('/Contacts/{sacap__uuid__c}', {
    responses: {
      '204': {
        description: 'Contact PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('sacap__uuid__c') sacap__uuid__c: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contact, {partial: true}),
        },
      },
    })
    contact: Contact,
  ): Promise<void> {
    await this.contactRepository.updateById(sacap__uuid__c, contact);
  }

  @put('/Contacts/{sacap__uuid__c}', {
    responses: {
      '204': {
        description: 'Contact PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('sacap__uuid__c') sacap__uuid__c: string,
    @requestBody() contact: Contact,
  ): Promise<void> {
    await this.contactRepository.replaceById(sacap__uuid__c, contact);
  }

  @del('/Contacts/{sacap__uuid__c}', {
    responses: {
      '204': {
        description: 'Contact DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('sacap__uuid__c') sacap__uuid__c: string): Promise<void> {
    await this.contactRepository.deleteById(sacap__uuid__c);
  }
}
