import { TestBed } from '@angular/core/testing';
import { WebSocketService } from './web-socket.service';

describe('WebSocketService', () => {
  let service: WebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should connect to a WebSocket server', () => {
    const component = 'test';
    const url = 'ws://localhost:8080';
    const observable = service.connect(url, component);
    expect(observable).toBeDefined();
  });

  it('should disconnect from a WebSocket server', () => {
    const component = 'test';
    const url = 'ws://localhost:8080';
    const observable = service.connect(url, component);
    expect(observable).toBeDefined();
    service.disconnect(component);
  });
});
