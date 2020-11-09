import {Entity, model, property} from '@loopback/repository';
@model({
  settings: {
    postgresql: {
      schema: 'salesforce',
      table: 'contact',
    },
  },
})
export class Contact extends Entity {
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
      columnName: 'accountid',
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  AccountId?: string;

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
      columnName: 'department',
      dataType: 'character varying',
      dataLength: 80,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Department?: string;

  @property({
    type: 'date',
    postgresql: {
      columnName: 'birthdate',
      dataType: 'character varying',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Birthdate?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'reportstoid',
      dataType: 'character varying',
      dataLength: 80,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  ReportsToId?: string;

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
      columnName: 'homephone',
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  HomePhone?: string;

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
      columnName: 'otherphone',
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  OtherPhone?: string;

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
      dataLength: 80,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Email?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'assistantname',
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  AssistantName?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'assistantphone',
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  AssistantPhone?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'mailingstreet',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  MailingStreet?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'mailingcity',
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  MailingCity?: string;

  // @property({
  //   type: 'number',
  // })
  // AccountId?: number;
  @property({
    type: 'string',
    postgresql: {
      columnName: 'mailingstate',
      dataType: 'character varying',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  MailingState?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'mailingpostalcode',
      dataType: 'character varying',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  MailingPostalCode?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'mailingcountry',
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  MailingCountry?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'otherstreet',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  OtherStreet?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'othercity',
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  OtherCity?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'otherstate',
      dataType: 'character varying',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  OtherState?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'otherpostalcode',
      dataType: 'character varying',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  OtherPostalCode?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'othercountry',
      dataType: 'character varying',
      dataLength: 40,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  OtherCountry?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'languages__c',
      dataType: 'character varying',
      dataLength: 100,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Languages__c?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'level__c',
      dataType: 'character varying',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  Level__c?: string;

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

  // @belongsTo(() => Account, {name: 'contacts', keyFrom: 'SfId'})
  // AccountId: number;

  constructor(data?: Partial<Contact>) {
    super(data);
    console.log('DATA: ', data);
  }
}

export interface ContactRelations {
  // describe navigational properties here
}

export type ContactWithRelations = Contact & ContactRelations;
