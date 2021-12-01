class FixedLengthQueue {
  constructor(length) {
    this._front = 0;
    if (length < 1) {
      throw new RangeError('FixedLengthQueue length must be at least 1');
    }
    this._length = length;
    this._values = new Array(length);
  }

  push(...items) {
    for (let item of items) {
      this._values[this._front] = item;
      this._front = (this._front + 1) % this._length;
    }
  }

  unshift(...items) {
    for (let item of items) {
      this._front = (this._front - 1 + this._length) % this._length;
      this._values[this._front] = item;
    }
  }

  rotate(distance) {
    this._front = (this._front - distance) % this._length;
    if (this._front < 0) {
      this._front += this._length;
    }
  }

  get(i) {
    if (i < 0) {
      i += len;
    }
    if (i < 0 || i >= len) {
      return undefined;
    }
    i = (this._front + i) % this._length;
    return this._values[i];
  }

  set(i, item) {
    if (i < 0) {
      i += len;
    }
    if (i < 0 || i >= len) {
      return undefined;
    }
    i = (this._front + i) % this._length;
    this._values[i] = item;
  }

  [Symbol.iterator]() {
    let i = this._front;
    let j = 0;
    const values = this._values;
    const length = this._length;
    return {
      next: () => {
        j++;
        if (i === length) {
          i = 0;
        }
        return { value: values[i++], done: j > length };
      },
    };
  }
}

export default FixedLengthQueue;
