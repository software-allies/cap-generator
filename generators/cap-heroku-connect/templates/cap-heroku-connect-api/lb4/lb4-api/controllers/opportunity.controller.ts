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
    public opportunityRepository : OpportunityRepository,
  ) {}

  @post('/Opportunities', {
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

  @get('/Opportunities/count', {
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

  @get('/Opportunities', {
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

  @patch('/Opportunities', {
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

  @get('/Opportunities/{id}', {
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
    @param.path.number('id') id: number,
    @param.filter(Opportunity, {exclude: 'where'}) filter?: FilterExcludingWhere<Opportunity>
  ): Promise<Opportunity> {
    return this.opportunityRepository.findById(id, filter);
  }

  @patch('/Opportunities/{id}', {
    responses: {
      '204': {
        description: 'Opportunity PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Opportunity, {partial: true}),
        },
      },
    })
    opportunity: Opportunity,
  ): Promise<void> {
    await this.opportunityRepository.updateById(id, opportunity);
  }

  @put('/Opportunities/{id}', {
    responses: {
      '204': {
        description: 'Opportunity PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() opportunity: Opportunity,
  ): Promise<void> {
    await this.opportunityRepository.replaceById(id, opportunity);
  }

  @del('/Opportunities/{id}', {
    responses: {
      '204': {
        description: 'Opportunity DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.opportunityRepository.deleteById(id);
  }
}
