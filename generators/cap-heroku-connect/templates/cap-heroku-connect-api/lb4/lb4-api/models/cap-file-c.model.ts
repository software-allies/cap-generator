import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      schema: 'salesforce',
      table: 'sacap__cap_file__c',
    },
  },
})
export class CapFileC extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    postgresql: {
      columnName: 'id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: 32,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  id?: number;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'sacap__uuid__c',
      dataType: 'character varying',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  SACAP__UUID__c?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'sacap__cap_user__c',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  SACAP__CAP_User__c?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'sacap__cap_user__c__sacap__uuid__c',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  SACAP__CAP_User__c__SACAP__UUID__c?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'sacap__url__c',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  SACAP__URL__c?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'sacap__name__c',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  SACAP__Name__c?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'sfid',
      dataType: 'character varying',
      dataLength: 53,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  SfId?: string;

  constructor(data?: Partial<CapFileC>) {
    super(data);
  }
}

export interface CapFileCRelations {
  // describe navigational properties here
}

export type CapFileCWithRelations = CapFileC & CapFileCRelations;
