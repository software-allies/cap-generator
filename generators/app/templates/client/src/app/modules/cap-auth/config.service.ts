import { Injectable, Optional } from '@angular/core';

export interface IConfig {<%if(authService === 'auth0'){%>
  domain: string;
  clientId: string;
  clientSecret: string;<% } %>
}

@Injectable()

export class ConfigService {
  <%if(authService === 'auth0'){%>
  domain: string;
  clientId: string;
  clientSecret: string;
  <% } -%>

  constructor(@Optional() config: IConfig) {
    if (config) {<%if(authService === 'auth0'){%>
      this.domain = config.domain;
      this.clientId = config.clientId;
      this.clientSecret = config.clientSecret;<% } %>
    }
  }
}
