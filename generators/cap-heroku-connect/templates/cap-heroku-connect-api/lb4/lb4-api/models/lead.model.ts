import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      schema: 'salesforce',
      table: 'lead',
    },
  },
})
export class Lead extends Entity {
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
      columnName: 'name',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Name?: string;

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
      columnName: 'salutation',
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Salutation?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'firstname',
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  FirstName?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'lastname',
      dataType: 'character varying',
      dataLength: 80,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  LastName?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'company',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Company?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'title',
      dataType: 'character varying',
      dataLength: 128,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Title?: string;

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
    type: 'string',
    postgresql: {
      columnName: 'industry',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Industry?: string;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'annualrevenue',
      dataType: 'character varying',
      dataLength: 18,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  AnnualRevenue?: number;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'phone',
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Phone?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'mobilephone',
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  MobilePhone?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'fax',
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Fax?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'email',
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Email?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'website',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Website?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'status',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Status?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'rating',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Rating?: string;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'numberofemployees',
      dataType: 'character varying',
      dataLength: 8,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  NumberOfEmployees?: number;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'street',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Street?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'city',
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  City?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'state',
      dataType: 'character varying',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  State?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'postalcode',
      dataType: 'character varying',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  PostalCode?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'country',
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Country?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'productinterest__c',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  ProductInterest__c?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'siccode__c',
      dataType: 'character varying',
      dataLength: 15,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  SICCode__c?: string;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'numberoflocations__c',
      dataType: 'character varying',
      dataLength: 3,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  NumberofLocations__c?: number;

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
      columnName: 'primary__c',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Primary__c?: string;

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

  constructor(data?: Partial<Lead>) {
    super(data);
  }
}

export interface LeadRelations {
  // describe navigational properties here
}

export type LeadWithRelations = Lead & LeadRelations;
