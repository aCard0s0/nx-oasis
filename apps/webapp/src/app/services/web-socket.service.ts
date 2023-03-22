import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket | null = null;
  private subjects = new Map<string, Subject<any>>();

  public connect<T>(url: string, component: string): Observable<T> {
    if (!this.subjects.has(component)) {
      this.subjects.set(component, new Subject<T>());
    }

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log(`WebSocket connected for component ${component}`);
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data) as T;
      const subject = this.subjects.get(component);
      if (subject) {
        subject.next(data);
      }
    };

    this.socket.onerror = (error) => {
      console.error(`WebSocket error for component ${component}:`, error);
    };

    this.socket.onclose = () => {
      console.log(`WebSocket closed for component ${component}`);
      const subject = this.subjects.get(component);
      if (subject) {
        subject.complete();
        this.subjects.delete(component);
      }
    };

    const subject = this.subjects.get(component);
    return subject ? subject.asObservable() : new Observable<T>();
  }

  public disconnect(component: string): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    if (this.subjects.has(component)) {
      const subject = this.subjects.get(component);
      if (subject) {
        subject.complete();
        this.subjects.delete(component);
      }
    }
  }

}
