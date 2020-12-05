export default class FlexiClass {
  constructor(opts = {}, defaults = {}) {
    this.opts = opts;
    this.defaults = defaults;
    this.parseOpts();
  }
  parseOpts() {
    // Function to get options from an object:
    // either return the object or call the function if it is one
    const getOpts = (x) => (typeof x === 'function' ? x() : x);
    // Merge opts and detaults and convert each property to an instance attribute
    Object.entries({
      ...getOpts(this.defaults),
      ...getOpts(this.opts),
    }).forEach(([k, v]) => (this[k] = v));
  }
}
