import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      schema: 'salesforce',
      table: 'opportunity',
    },
  },
})
export class Opportunity extends Entity {
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
    type: 'number',
    postgresql: {
      columnName: 'expectedrevenue',
      dataType: 'character varying',
      dataLength: 32,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  ExpectedRevenue?: number;

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
    type: 'boolean',
    postgresql: {
      columnName: 'isprivate',
      dataType: 'boolean',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  IsPrivate?: boolean;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'name',
      dataType: 'character varying',
      dataLength: 120,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Name?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'accountid',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  AccountId?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'type',
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
      columnName: 'leadsource',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  LeadSource?: string;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'amount',
      dataType: 'character varying',
      dataLength: 16,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Amount?: number;

  // @property({
  //   type: 'number',
  // })
  // AccountId?: number;
  @property({
    type: 'date',
    postgresql: {
      columnName: 'closedate',
      dataType: 'character varying',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  CloseDate?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'nextstep',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  NextStep?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'stagename',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  StageName?: string;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'probability',
      dataType: 'character varying',
      dataLength: 3,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Probability?: number;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'campaignid',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  CampaignId?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'ordernumber__c',
      dataType: 'character varying',
      dataLength: 8,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  OrderNumber__c?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'currentgenerators__c',
      dataType: 'character varying',
      dataLength: 100,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  CurrentGenerators__c?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'trackingnumber__c',
      dataType: 'character varying',
      dataLength: 12,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  TrackingNumber__c?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'maincompetitors__c',
      dataType: 'character varying',
      dataLength: 100,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  MainCompetitors__c?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'deliveryinstallationstatus__c',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  DeliveryInstallationStatus__c?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'description',
      dataType: 'character varying',
      dataLength: 32000,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Description?: string;

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

  constructor(data?: Partial<Opportunity>) {
    super(data);
  }
}

export interface OpportunityRelations {
  // describe navigational properties here
}

export type OpportunityWithRelations = Opportunity & OpportunityRelations;
