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
    public leadRepository : LeadRepository,
  ) {}

  @post('/leads', {
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

  @get('/leads/count', {
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

  @get('/leads', {
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

  @patch('/leads', {
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

  @get('/leads/{id}', {
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
    @param.path.number('id') id: number,
    @param.filter(Lead, {exclude: 'where'}) filter?: FilterExcludingWhere<Lead>
  ): Promise<Lead> {
    return this.leadRepository.findById(id, filter);
  }

  @patch('/leads/{id}', {
    responses: {
      '204': {
        description: 'Lead PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lead, {partial: true}),
        },
      },
    })
    lead: Lead,
  ): Promise<void> {
    await this.leadRepository.updateById(id, lead);
  }

  @put('/leads/{id}', {
    responses: {
      '204': {
        description: 'Lead PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() lead: Lead,
  ): Promise<void> {
    await this.leadRepository.replaceById(id, lead);
  }

  @del('/leads/{id}', {
    responses: {
      '204': {
        description: 'Lead DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.leadRepository.deleteById(id);
  }
}
