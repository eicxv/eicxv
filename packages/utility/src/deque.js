const MAX_CAPACITY = (1 << 30) | 0;
const MIN_CAPACITY = 16;

class Deque {
  constructor(arg) {
    this._front = 0;
    this._values = new Map();
    if (arg != null && typeof arg[Symbol.iterator] === 'function') {
      const iterable = arg;
      let i = 0;
      for (let e of iterable) {
        this._values.set(i++, e);
      }
      this._length = i;
      this._capacity = getCapacity(this._length);
    } else {
      const capacity = arg ?? MIN_CAPACITY;
      this._capacity = getCapacity(capacity);
      this._length = 0;
    }
  }

  push(...items) {
    this._checkCapacity(this._length + items.length);
    let i;
    items.forEach((item, j) => {
      i = (this._front + this._length + j) & (this._capacity - 1);
      this._values.set(i, item);
    });
    this._length += items.length;
    return this._length;
  }

  pop() {
    if (this._length === 0) {
      return undefined;
    }
    const i = (this._front + this._length - 1) & (this._capacity - 1);
    const out = this._values.get(i);
    this._values.delete(i);
    this._length -= 1;
    return out;
  }

  shift() {
    if (this._length === 0) {
      return undefined;
    }
    const front = this._front;
    const out = this._values.get(front);
    this._values.delete(front);
    this._front = (front + 1) & (this._capacity - 1);
    this._length -= 1;
    return out;
  }

  unshift(...items) {
    const len = items.length;
    this._checkCapacity(this._length + len);
    const capacity = this._capacity;
    let i;
    for (let j = 1; j <= len; j++) {
      i = (((this._front - j) & (capacity - 1)) ^ capacity) - capacity;
      this._values.set(i, items[len - j]);
    }
    this._length += len;
    this._front = i;
    return this._length;
  }

  rotate(distance) {
    this._front = (this._front + -distance) & (this._capacity - 1);
  }

  peekBack() {
    const length = this._length;
    if (length === 0) {
      return undefined;
    }
    const index = (this._front + length - 1) & (this._capacity - 1);
    return this._values.get(index);
  }

  peekFront() {
    if (this._length === 0) {
      return undefined;
    }
    return this._values.get(this._front);
  }

  get(i) {
    if (i !== (i | 0)) {
      return undefined;
    }
    const length = this._length;
    if (i < 0) {
      i += length;
    }
    if (i < 0 || i >= length) {
      return undefined;
    }
    i = (this._front + i) & (this._capacity - 1);
    return this._values.get(i);
  }

  isEmpty() {
    return this._length === 0;
  }

  clear() {
    this._values.clear();
    this._length = 0;
    this._front = 0;
  }

  [Symbol.iterator]() {
    let j = -1;
    const front = this._front;
    const capacity = this._capacity;
    const values = this._values;
    const length = this.length;

    return {
      next: () => {
        j++;
        const i = (front + j) & (capacity - 1);
        return { value: values.get(i), done: j >= length };
      },
    };
  }

  get length() {
    return this._length;
  }

  toArray() {
    const length = this._length;
    const out = new Array(length);
    const front = this._front;
    const capacity = this._capacity;
    for (let j = 0; j < length; ++j) {
      out[j] = this._values.get((front + j) & (capacity - 1));
    }
    return out;
  }

  _checkCapacity(size) {
    if (this._capacity < size) {
      this._resizeTo(getCapacity(this._capacity * 1.5 + 16));
    }
  }

  _resizeTo(capacity) {
    const oldCapacity = this._capacity;
    this._capacity = capacity;
    const front = this._front;
    const length = this._length;
    if (front + length > oldCapacity) {
      const len = (front + length) & (oldCapacity - 1);
      for (let j = 0; j < len; ++j) {
        this._values.set(j + oldCapacity, this._values.get(j));
        this._values.delete(j);
      }
    }
  }
}

function pow2AtLeast(n) {
  n = n >>> 0;
  n = n - 1;
  n = n | (n >> 1);
  n = n | (n >> 2);
  n = n | (n >> 4);
  n = n | (n >> 8);
  n = n | (n >> 16);
  return n + 1;
}

function getCapacity(capacity) {
  return pow2AtLeast(Math.min(Math.max(MIN_CAPACITY, capacity), MAX_CAPACITY));
}

export default Deque;
