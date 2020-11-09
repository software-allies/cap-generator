import {Entity, hasMany, model, property} from '@loopback/repository';
import {Contact} from './contact.model';
import {Opportunity} from './opportunity.model';

@model({
  settings: {
    postgresql: {
      schema: 'salesforce',
      table: 'account',
    },
  },
})
export class Account extends Entity {
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
      columnName: 'name',
      dataType: 'character varying',
      dataLength: 80,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Name?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'parentid',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  ParentId?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'accountnumber',
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  AccountNumber?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'site',
      dataType: 'character varying',
      dataLength: 80,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Site?: string;

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
      dataLength: 53,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  AnnualRevenue?: number;

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
      columnName: 'tickersymbol',
      dataType: 'character varying',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  TickerSymbol?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'ownership',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Ownership?: string;

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
      columnName: 'sic',
      dataType: 'character varying',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Sic?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'billingstreet',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  BillingStreet?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'billingcity',
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  BillingCity?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'billingstate',
      dataType: 'character varying',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  BillingState?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'billingpostalcode',
      dataType: 'character varying',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  BillingPostalCode?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'billingcountry',
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  BillingCountry?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'shippingstreet',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  ShippingStreet?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'shippingcity',
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  ShippingCity?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'shippingstate',
      dataType: 'character varying',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  ShippingState?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'shippingpostalcode',
      dataType: 'character varying',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  ShippingPostalCode?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'shippingcountry',
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  ShippingCountry?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'customerpriority__c',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  CustomerPriority__c?: string;

  @property({
    type: 'date',
    postgresql: {
      columnName: 'slaexpirationdate__c',
      dataType: 'character varying',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  SLAExpirationDate__c?: string;

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
      columnName: 'active__c',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Active__c?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'sla__c',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  SLA__c?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'slaserialnumber__c',
      dataType: 'character varying',
      dataLength: 10,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  SLASerialNumber__c?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'upsellopportunity__c',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  UpsellOpportunity__c?: string;

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

  @hasMany(() => Contact, {keyTo: 'AccountId', keyFrom: 'SfId'})
  contacts: Contact[];

  @hasMany(() => Opportunity, {keyTo: 'AccountId', keyFrom: 'SfId'})
  opportunities: Opportunity[];

  constructor(data?: Partial<Account>) {
    super(data);
  }
}

export interface AccountRelations {
  // describe navigational properties here
}

export type AccountWithRelations = Account & AccountRelations;
