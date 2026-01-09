const pick = (object, keys) => {
  return keys.reduce((object_, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      object_[key] = object[key];
    }
    return object_;
  }, {});
};

module.exports = pick;
