import {Entity, hasMany, model, property} from '@loopback/repository';
import {CapFileC} from './cap-file-c.model';

@model({
  settings: {
    postgresql: {
      schema: 'salesforce',
      table: 'sacap__cap_user__c',
    },
  },
})
export class CapUserC extends Entity {
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
      columnName: 'sacap__first_name__c',
      dataType: 'character varying',
      dataLength: 150,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  FirstName?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'sacap__last_name__c',
      dataType: 'character varying',
      dataLength: 150,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  LastName?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'sacap__email__c',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Email?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'sacap__company__c',
      dataType: 'character varying',
      dataLength: 150,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Company?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'sacap__type__c',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Type?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'sacap__external_id__c',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  ExternalId?: string;

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

  @hasMany(() => CapFileC, {keyTo: 'SACAP__CAP_User__c', keyFrom: 'SfId'})
  capUserFiles: CapFileC[];

  constructor(data?: Partial<CapUserC>) {
    super(data);
  }
}

export interface CapUserCRelations {
  // describe navigational properties here
}

export type CapUserCWithRelations = CapUserC & CapUserCRelations;
