export default class Publisher {
  constructor() {
    this.subscribers = [];
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter((sub) => sub !== callback);
  }

  dispatch(message) {
    for (let sub of this.subscribers) {
      sub(message);
    }
  }
}
