Object.defineProperty(Object.prototype, "should", {
  enumerable: false,
  configurable: true,
  get: () => () => {},
  set: () => () => {}
})

export {}
