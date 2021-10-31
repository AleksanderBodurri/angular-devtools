import { MessageBus } from './message-bus';
import { Events, Topic } from './messages';
import { PriorityAwareMessageBus } from './priority-aware-message-bus';

class MockMessageBus extends MessageBus<Events> {
  cbs: any = {};
  emit(_: Topic, __: any): boolean {
    return true;
  }
  on(topic: Topic, cb: any): void {
    this.cbs[topic] = cb;
  }
  once(topic: Topic, cb: any): void {
    this.cbs[topic] = cb;
  }
  destroy(): void {}
}

describe('PriorityAwareMessageBus', () => {
  it('should emit not throttled requests', () => {
    const timeout: any = (_: any, __: number) => {};
    const bus = new PriorityAwareMessageBus(new MockMessageBus(), timeout);
    expect(bus.emit('handshake')).toBeTrue();
    expect(bus.emit('inspectorStart')).toBeTrue();
  });

  it('should throttle `getLatestComponentExplorerView`', () => {
    let callback: any;
    const timeout: any = (cb: any, _: number) => {
      callback = cb;
    };
    const bus = new PriorityAwareMessageBus(new MockMessageBus(), timeout);
    expect(bus.emit('getLatestComponentExplorerView')).toBeTrue();
    expect(bus.emit('getLatestComponentExplorerView')).toBeFalse();
    expect(bus.emit('getLatestComponentExplorerView')).toBeFalse();
    callback();
    expect(bus.emit('getLatestComponentExplorerView')).toBeTrue();
  });

  it('should not emit `getLatestComponentExplorerView` if blocked by `getNestedProperties`', () => {
    let callback: any;
    const timeout: any = (cb: any, _: number) => {
      callback = cb;
    };
    const mock = new MockMessageBus();
    const bus = new PriorityAwareMessageBus(mock, timeout);
    bus.on('nestedProperties', () => {});
    expect(bus.emit('getNestedProperties')).toBeTrue();
    expect(bus.emit('getLatestComponentExplorerView')).toBeFalse();
    mock.cbs.nestedProperties();
    expect(bus.emit('getLatestComponentExplorerView')).toBeTruthy();
  });
});
