export type Handler<T> = (data: T) => void;

type HandlerList = {
  [k in keyof EventHandlerType]?: Handler<EventHandlerType[k]>[];
};
export class Event {
  private static events: HandlerList = {};
  public static on(
    eventName: keyof EventHandlerType,
    handler: Handler<EventHandlerType[typeof eventName]>,
  ) {
    if (!Array.isArray(this.events[eventName])) {
      this.events[eventName] = [];
    }
    this.events[eventName]?.push(handler);
  }

  public static off(
    eventName: keyof EventHandlerType,
    handler: Handler<EventHandlerType[typeof eventName]>,
  ) {
    this.events[eventName] = this.events[eventName]?.filter(
      (e) => e !== handler,
    );
  }
  public static emit(
    eventName: keyof EventHandlerType,
    data: EventHandlerType[typeof eventName],
  ) {
    this.events[eventName]?.forEach((e) => e(data));
  }
}
