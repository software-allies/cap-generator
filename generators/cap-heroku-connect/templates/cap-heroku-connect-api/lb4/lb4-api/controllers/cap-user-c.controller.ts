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
import {CapUserC} from '../models';
import {CapUserCRepository} from '../repositories';

export class CapUserCController {
  constructor(
    @repository(CapUserCRepository)
    public capUserCRepository : CapUserCRepository,
  ) {}

  @post('/cap-user-cs', {
    responses: {
      '200': {
        description: 'CapUserC model instance',
        content: {'application/json': {schema: getModelSchemaRef(CapUserC)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CapUserC, {
            title: 'NewCapUserC',
            exclude: ['id'],
          }),
        },
      },
    })
    capUserC: Omit<CapUserC, 'id'>,
  ): Promise<CapUserC> {
    return this.capUserCRepository.create(capUserC);
  }

  @get('/cap-user-cs/count', {
    responses: {
      '200': {
        description: 'CapUserC model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(CapUserC) where?: Where<CapUserC>,
  ): Promise<Count> {
    return this.capUserCRepository.count(where);
  }

  @get('/cap-user-cs', {
    responses: {
      '200': {
        description: 'Array of CapUserC model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CapUserC, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(CapUserC) filter?: Filter<CapUserC>,
  ): Promise<CapUserC[]> {
    return this.capUserCRepository.find(filter);
  }

  @patch('/cap-user-cs', {
    responses: {
      '200': {
        description: 'CapUserC PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CapUserC, {partial: true}),
        },
      },
    })
    capUserC: CapUserC,
    @param.where(CapUserC) where?: Where<CapUserC>,
  ): Promise<Count> {
    return this.capUserCRepository.updateAll(capUserC, where);
  }

  @get('/cap-user-cs/{id}', {
    responses: {
      '200': {
        description: 'CapUserC model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CapUserC, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CapUserC, {exclude: 'where'}) filter?: FilterExcludingWhere<CapUserC>
  ): Promise<CapUserC> {
    return this.capUserCRepository.findById(id, filter);
  }

  @patch('/cap-user-cs/{id}', {
    responses: {
      '204': {
        description: 'CapUserC PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CapUserC, {partial: true}),
        },
      },
    })
    capUserC: CapUserC,
  ): Promise<void> {
    await this.capUserCRepository.updateById(id, capUserC);
  }

  @put('/cap-user-cs/{id}', {
    responses: {
      '204': {
        description: 'CapUserC PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() capUserC: CapUserC,
  ): Promise<void> {
    await this.capUserCRepository.replaceById(id, capUserC);
  }

  @del('/cap-user-cs/{id}', {
    responses: {
      '204': {
        description: 'CapUserC DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.capUserCRepository.deleteById(id);
  }
}
