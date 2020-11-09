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
import {CapFileC} from '../models';
import {CapFileCRepository} from '../repositories';

export class CapFileCController {
  constructor(
    @repository(CapFileCRepository)
    public capFileCRepository : CapFileCRepository,
  ) {}

  @post('/cap-file-cs', {
    responses: {
      '200': {
        description: 'CapFileC model instance',
        content: {'application/json': {schema: getModelSchemaRef(CapFileC)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CapFileC, {
            title: 'NewCapFileC',
            exclude: ['id'],
          }),
        },
      },
    })
    capFileC: Omit<CapFileC, 'id'>,
  ): Promise<CapFileC> {
    return this.capFileCRepository.create(capFileC);
  }

  @get('/cap-file-cs/count', {
    responses: {
      '200': {
        description: 'CapFileC model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(CapFileC) where?: Where<CapFileC>,
  ): Promise<Count> {
    return this.capFileCRepository.count(where);
  }

  @get('/cap-file-cs', {
    responses: {
      '200': {
        description: 'Array of CapFileC model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CapFileC, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(CapFileC) filter?: Filter<CapFileC>,
  ): Promise<CapFileC[]> {
    return this.capFileCRepository.find(filter);
  }

  @patch('/cap-file-cs', {
    responses: {
      '200': {
        description: 'CapFileC PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CapFileC, {partial: true}),
        },
      },
    })
    capFileC: CapFileC,
    @param.where(CapFileC) where?: Where<CapFileC>,
  ): Promise<Count> {
    return this.capFileCRepository.updateAll(capFileC, where);
  }

  @get('/cap-file-cs/{id}', {
    responses: {
      '200': {
        description: 'CapFileC model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CapFileC, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CapFileC, {exclude: 'where'}) filter?: FilterExcludingWhere<CapFileC>
  ): Promise<CapFileC> {
    return this.capFileCRepository.findById(id, filter);
  }

  @patch('/cap-file-cs/{id}', {
    responses: {
      '204': {
        description: 'CapFileC PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CapFileC, {partial: true}),
        },
      },
    })
    capFileC: CapFileC,
  ): Promise<void> {
    await this.capFileCRepository.updateById(id, capFileC);
  }

  @put('/cap-file-cs/{id}', {
    responses: {
      '204': {
        description: 'CapFileC PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() capFileC: CapFileC,
  ): Promise<void> {
    await this.capFileCRepository.replaceById(id, capFileC);
  }

  @del('/cap-file-cs/{id}', {
    responses: {
      '204': {
        description: 'CapFileC DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.capFileCRepository.deleteById(id);
  }
}
