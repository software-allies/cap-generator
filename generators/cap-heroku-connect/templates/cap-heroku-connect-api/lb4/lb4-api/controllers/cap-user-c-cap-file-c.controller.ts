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
  CapUserC,
  CapFileC,
} from '../models';
import {CapUserCRepository} from '../repositories';

export class CapUserCCapFileCController {
  constructor(
    @repository(CapUserCRepository) protected capUserCRepository: CapUserCRepository,
  ) { }

  @get('/cap-user-cs/{SACAP__UUID__c}/cap-file-cs', {
    responses: {
      '200': {
        description: 'Array of CapUserC has many CapFileC',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CapFileC)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('SACAP__UUID__c') SACAP__UUID__c: string,
    @param.query.object('filter') filter?: Filter<CapFileC>,
  ): Promise<CapFileC[]> {
    return this.capUserCRepository.capUserFiles(SACAP__UUID__c).find(filter);
  }

  @post('/cap-user-cs/{SACAP__UUID__c}/cap-file-cs', {
    responses: {
      '200': {
        description: 'CapUserC model instance',
        content: {'application/json': {schema: getModelSchemaRef(CapFileC)}},
      },
    },
  })
  async create(
    @param.path.string('SACAP__UUID__c') SACAP__UUID__c: typeof CapUserC.prototype.SACAP__UUID__c,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CapFileC, {
            title: 'NewCapFileCInCapUserC',
            exclude: ['id'],
            optional: ['SACAP__CAP_User__c']
          }),
        },
      },
    }) capFileC: Omit<CapFileC, 'SACAP__UUID__c'>,
  ): Promise<CapFileC> {
    return this.capUserCRepository.capUserFiles(SACAP__UUID__c).create(capFileC);
  }

  @patch('/cap-user-cs/{SACAP__UUID__c}/cap-file-cs', {
    responses: {
      '200': {
        description: 'CapUserC.CapFileC PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('SACAP__UUID__c') SACAP__UUID__c: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CapFileC, {partial: true}),
        },
      },
    })
    capFileC: Partial<CapFileC>,
    @param.query.object('where', getWhereSchemaFor(CapFileC)) where?: Where<CapFileC>,
  ): Promise<Count> {
    return this.capUserCRepository.capUserFiles(SACAP__UUID__c).patch(capFileC, where);
  }

  @del('/cap-user-cs/{SACAP__UUID__c}/cap-file-cs', {
    responses: {
      '200': {
        description: 'CapUserC.CapFileC DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('SACAP__UUID__c') SACAP__UUID__c: string,
    @param.query.object('where', getWhereSchemaFor(CapFileC)) where?: Where<CapFileC>,
  ): Promise<Count> {
    return this.capUserCRepository.capUserFiles(SACAP__UUID__c).delete(where);
  }
}
