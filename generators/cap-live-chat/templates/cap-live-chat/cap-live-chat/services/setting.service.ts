import { Injectable, Optional } from '@angular/core';

export interface IConfig {
  embeddedServiceName: string;
  idServiceName: string;
  urlSandbox: string;
  urlDomain: string;
  baseLiveAgentContentURL: string;
  deploymentId: string;
  buttonId: string;
  baseLiveAgentURL: string;
  scriptUrl: string;
}

@Injectable()

export class SettingService {
  embeddedServiceName: string;
  idServiceName: string;
  urlSandbox: string;
  urlDomain: string;
  baseLiveAgentContentURL: string;
  deploymentId: string;
  buttonId: string;
  baseLiveAgentURL: string;
  scriptUrl: string;

  constructor(@Optional() config: IConfig) {
    if (config) {
      this.embeddedServiceName = config.embeddedServiceName
      this.idServiceName = config.idServiceName
      this.urlSandbox = config.urlSandbox
      this.urlDomain = config.urlDomain
      this.baseLiveAgentContentURL = config.baseLiveAgentContentURL
      this.deploymentId = config.deploymentId
      this.buttonId = config.buttonId
      this.baseLiveAgentURL = config.baseLiveAgentURL
      this.scriptUrl = config.scriptUrl

    }
  }
}