class WrapFuncExecution {
  constructor(fn = () => {}) {
    this.fn = fn;
  }

  setupAsserts(asserts = () => {}) {
    this.runAsserts = asserts;
    return this;
  }

  exec(...args) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.fn(...args);
        this.runAsserts();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = WrapFuncExecution;
