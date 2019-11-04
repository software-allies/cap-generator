import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationComponentsService {

  private communication = new Subject<boolean>();
  sendMessageObserbable = this.communication.asObservable();

  constructor() { }

  sendUser(user: boolean) {
    this.communication.next(user);
  }
}
