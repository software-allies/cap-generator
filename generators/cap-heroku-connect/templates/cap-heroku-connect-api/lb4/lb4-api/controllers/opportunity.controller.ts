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
import {Opportunity} from '../models';
import {OpportunityRepository} from '../repositories';

export class OpportunityController {
  constructor(
    @repository(OpportunityRepository)
    public opportunityRepository: OpportunityRepository,
  ) {}

  @post('/Opportunitys', {
    responses: {
      '200': {
        description: 'Opportunity model instance',
        content: {'application/json': {schema: getModelSchemaRef(Opportunity)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Opportunity, {
            title: 'NewOpportunity',
            exclude: ['id'],
          }),
        },
      },
    })
    opportunity: Omit<Opportunity, 'id'>,
  ): Promise<Opportunity> {
    return this.opportunityRepository.create(opportunity);
  }

  @get('/Opportunitys/count', {
    responses: {
      '200': {
        description: 'Opportunity model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Opportunity) where?: Where<Opportunity>,
  ): Promise<Count> {
    return this.opportunityRepository.count(where);
  }

  @get('/Opportunitys', {
    responses: {
      '200': {
        description: 'Array of Opportunity model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Opportunity, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Opportunity) filter?: Filter<Opportunity>,
  ): Promise<Opportunity[]> {
    return this.opportunityRepository.find(filter);
  }

  @patch('/Opportunitys', {
    responses: {
      '200': {
        description: 'Opportunity PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Opportunity, {partial: true}),
        },
      },
    })
    opportunity: Opportunity,
    @param.where(Opportunity) where?: Where<Opportunity>,
  ): Promise<Count> {
    return this.opportunityRepository.updateAll(opportunity, where);
  }

  @get('/Opportunitys/{SACAP__UUID__c}', {
    responses: {
      '200': {
        description: 'Opportunity model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Opportunity, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('SACAP__UUID__c') SACAP__UUID__c: string,
    @param.filter(Opportunity, {exclude: 'where'}) filter?: FilterExcludingWhere<Opportunity>
  ): Promise<Opportunity> {
    return this.opportunityRepository.findById(SACAP__UUID__c, filter);
  }

  @patch('/Opportunitys/{SACAP__UUID__c}', {
    responses: {
      '204': {
        description: 'Opportunity PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('SACAP__UUID__c') SACAP__UUID__c: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Opportunity, {partial: true}),
        },
      },
    })
    opportunity: Opportunity,
  ): Promise<void> {
    await this.opportunityRepository.updateById(SACAP__UUID__c, opportunity);
  }

  @put('/Opportunitys/{id}', {
    responses: {
      '204': {
        description: 'Opportunity PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('SACAP__UUID__c') SACAP__UUID__c: string,
    @requestBody() opportunity: Opportunity,
  ): Promise<void> {
    await this.opportunityRepository.replaceById(SACAP__UUID__c, opportunity);
  }

  @del('/Opportunitys/{SACAP__UUID__c}', {
    responses: {
      '204': {
        description: 'Opportunity DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('SACAP__UUID__c') SACAP__UUID__c: string): Promise<void> {
    await this.opportunityRepository.deleteById(SACAP__UUID__c);
  }
}
