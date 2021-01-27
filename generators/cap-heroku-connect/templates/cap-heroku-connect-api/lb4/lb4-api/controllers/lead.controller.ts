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
import {Lead} from '../models';
import {LeadRepository} from '../repositories';

export class LeadController {
  constructor(
    @repository(LeadRepository)
    public leadRepository: LeadRepository,
  ) {}

  @post('/Leads', {
    responses: {
      '200': {
        description: 'Lead model instance',
        content: {'application/json': {schema: getModelSchemaRef(Lead)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lead, {
            title: 'NewLead',
            exclude: ['id'],
          }),
        },
      },
    })
    lead: Omit<Lead, 'id'>,
  ): Promise<Lead> {
    return this.leadRepository.create(lead);
  }

  @get('/Leads/count', {
    responses: {
      '200': {
        description: 'Lead model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Lead) where?: Where<Lead>,
  ): Promise<Count> {
    return this.leadRepository.count(where);
  }

  @get('/Leads', {
    responses: {
      '200': {
        description: 'Array of Lead model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Lead, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Lead) filter?: Filter<Lead>,
  ): Promise<Lead[]> {
    return this.leadRepository.find(filter);
  }

  @patch('/Leads', {
    responses: {
      '200': {
        description: 'Lead PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lead, {partial: true}),
        },
      },
    })
    lead: Lead,
    @param.where(Lead) where?: Where<Lead>,
  ): Promise<Count> {
    return this.leadRepository.updateAll(lead, where);
  }

  @get('/Leads/{SACAP__UUID__c}', {
    responses: {
      '200': {
        description: 'Lead model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Lead, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('SACAP__UUID__c') SACAP__UUID__c: string,
    @param.filter(Lead, {exclude: 'where'}) filter?: FilterExcludingWhere<Lead>
  ): Promise<Lead> {
    return this.leadRepository.findById(SACAP__UUID__c, filter);
  }

  @patch('/Leads/{SACAP__UUID__c}', {
    responses: {
      '204': {
        description: 'Lead PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('SACAP__UUID__c') SACAP__UUID__c: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lead, {partial: true}),
        },
      },
    })
    lead: Lead,
  ): Promise<void> {
    await this.leadRepository.updateById(SACAP__UUID__c, lead);
  }

  @put('/Leads/{SACAP__UUID__c}', {
    responses: {
      '204': {
        description: 'Lead PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('SACAP__UUID__c') SACAP__UUID__c: string,
    @requestBody() lead: Lead,
  ): Promise<void> {
    await this.leadRepository.replaceById(SACAP__UUID__c, lead);
  }

  @del('/Leads/{SACAP__UUID__c}', {
    responses: {
      '204': {
        description: 'Lead DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('SACAP__UUID__c') SACAP__UUID__c: string): Promise<void> {
    await this.leadRepository.deleteById(SACAP__UUID__c);
  }
}