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

  @post('/CapUserCs', {
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

  @get('/CapUserCs/count', {
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

  @get('/CapUserCs', {
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

  @patch('/CapUserCs', {
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

  @get('/CapUserCs/{sacap__uuid__c}', {
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
    @param.path.string('sacap__uuid__c') sacap__uuid__c: string,
    @param.filter(CapUserC, {exclude: 'where'}) filter?: FilterExcludingWhere<CapUserC>
  ): Promise<CapUserC> {
    return this.capUserCRepository.findById(sacap__uuid__c, filter);
  }

  @patch('/CapUserCs/{sacap__uuid__c}', {
    responses: {
      '204': {
        description: 'CapUserC PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('sacap__uuid__c') sacap__uuid__c: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CapUserC, {partial: true}),
        },
      },
    })
    capUserC: CapUserC,
  ): Promise<void> {
    await this.capUserCRepository.updateById(sacap__uuid__c, capUserC);
  }

  @put('/CapUserCs/{sacap__uuid__c}', {
    responses: {
      '204': {
        description: 'CapUserC PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('sacap__uuid__c') sacap__uuid__c: string,
    @requestBody() capUserC: CapUserC,
  ): Promise<void> {
    await this.capUserCRepository.replaceById(sacap__uuid__c, capUserC);
  }

  @del('/CapUserCs/{sacap__uuid__c}', {
    responses: {
      '204': {
        description: 'CapUserC DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('sacap__uuid__c') sacap__uuid__c: string): Promise<void> {
    await this.capUserCRepository.deleteById(sacap__uuid__c);
  }
}
