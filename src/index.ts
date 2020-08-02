class BarrayImpl<T> {
  arr: Map<number, T>;
  start: number;
  end: number;

  constructor(arr: T[]) {
    this.arr = new Map(arr.entries());
    this.start = 0;
    this.end = arr.length - 1;
  }

  static of<T>(vals: T[]) {
    return new Proxy(new BarrayImpl(vals), {
      get: function (obj, prop) {
        if (typeof prop !== "symbol" && !Number.isNaN(Number(prop))) {
          return obj.arr.get(Number(prop) + obj.start);
        }

        return Reflect.get(...arguments);
      },
      set: function (obj, prop, value) {
        if (typeof prop !== "symbol" && !Number.isNaN(Number(prop))) {
          obj.arr.set(Number(prop) + obj.start, value);
          return true;
        }
        return Reflect.get(...arguments);
      },
    });
  }

  get length() {
      return (this.end + 1) - this.start;
  }

  push = (...vals: T[]) => {
    for (const val of vals) {
        this.end += 1;
        this.arr.set(this.end, val);
    }
  }

  pop = () => {
    const val = this.arr.get(this.end);
    this.arr.delete(this.end);
    this.end -= 1;
    return val;
  }

  unshift = (...vals: T[]) => {
    for (const val of vals.reverse()) {
        this.start -= 1;
        this.arr.set(this.start, val);
    }
  }

  shift = () => {
    const val = this.arr.get(this.start);
    this.arr.delete(this.start);
    this.start += 1;
    return val;
  }

  toString() {
    return `${[...this]}`;
  }

  toArray() {
    return [...this];
  }

  *entries() {
    for (const entry of this.arr.entries()) {
      yield entry;
    }
  }

  *keys() {
    for (const key of this.arr.keys()) {
      yield key;
    }
  }

  *values() {
    for (const value of this.arr.values()) {
      yield value;
    }
  }

  map<U>(
    callbackfn: (value: number, index: number, Barray: Proxify<T>) => U
  ): Proxify<U> {
    const newBarray = Barray<U>();

    for (let i = this.start; i <= this.end; i++) {
      newBarray.push(callbackfn(this.arr.get(i), i, this));
    }

    return newBarray;
  }

  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) {
      yield this.arr.get(i);
    }
  }
}

type Proxy<T> = {
  get(): T;
  set(value: T): boolean;
};

type Proxify<T> = { [P in keyof T]: T[P] } & BarrayImpl<T>;

export function Barray<T>(...vals: T): Proxify<T> {
  return BarrayImpl.of(vals);
}
