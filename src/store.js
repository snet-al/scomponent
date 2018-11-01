export default function () {
  var storeCache = {};

  var storeBuilder = function (config) {
    if (typeof config == "string") {
      try {
        return storeCache[config];
      } catch (e) {
        console.log(e);
      }
    }
    return new StoreClass(config);
  };

  var StoreClass = function (config) {
    this.model = null;
    this.data = [];
    this.indices = [];
    this.original = [];
    this.filtered = [];

    if (!config.model || config.model == "") {
      console.log("Please define a model for the store");
      return false;
    } else {
      this.model = window.$net.model(config.model);
    }
    if (!this.model) {
      console.log("Error with model");
      return false;
    }

    if (config.data && $.isArray(config.data)) {
      for (let i = 0; i < config.data.length; i++) {
        this.data.push(this.model.create(config.data[i]));
      }
    }

    var length = this.data.length;

    if (config.name && typeof config.name == "string") {
      storeCache[config.name] = this;
    } else {
      console.log("This store is not cached");
    }

    return this;
  };

  StoreClass.prototype.add = function (data) {
    var self = this;
    if ($.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        self.data.push(self.model.create(data[i]));
      }
    }

    self.original = self.data;
    return self;
  };

  StoreClass.prototype.removeAt = function (index) {
    var self = this;
    if (index < self.data.length && index >= 0) {
      self.data.splice(index, 1);
    }

    self.original = self.data;
    return self;
  };

  StoreClass.prototype.removeAll = function () {
    var self = this;

    self.data = [];
    self.original = self.data;
    return self;
  };

  StoreClass.prototype.getAt = function (index) {
    var self = this;
    return self.data[index];
  };

  StoreClass.prototype.average = function (fieldName) {
    var self = this;
    var canCalculate = false;
    for (let i in self.fields) {
      if (self.fields[i].name == fieldName) {
        if (self.fields[i].type == "int" || self.fields[i].type == "float") {
          canCalculate = true;
        } else {
          return undefined;
        }
      }
    }
    if (!canCalculate || self.data.length == 0) {
      return undefined;
    }
    var sum = 0;
    for (var i in self.data) {
      sum += self.data[i].data[fieldName];
    }
    return sum / self.data.length;
  };

  StoreClass.prototype.max = function (fieldName) {
    var self = this;
    var canCalculate = false;
    for (let i in self.fields) {
      if (self.fields[i].name == fieldName) {
        if (self.fields[i].type == "int" || self.fields[i].type == "float") {
          canCalculate = true;
          break;
        } else {
          return undefined;
        }
      }
    }
    if (!canCalculate || self.data.length == 0) {
      return undefined;
    }
    var max = self.data[0].data[fieldName];
    for (var i = 1; i < self.data.length; i++) {
      if (self.data[i].data[fieldName] > max) {
        max = self.data[i].data[fieldName];
      }
    }
    return max;
  };

  StoreClass.prototype.min = function (fieldName) {
    var self = this;
    var canCalculate = false;
    for (let i in self.fields) {
      if (self.fields[i].name == fieldName) {
        if (self.fields[i].type == "int" || self.fields[i].type == "float") {
          canCalculate = true;
          break;
        } else {
          return undefined;
        }
      }
    }
    var min = self.data[0].data[fieldName];
    for (var i = 1; i < self.data.length; i++) {
      if (self.data[i].data[fieldName] < min) {
        min = self.data[i].data[fieldName];
      }
    }
    return min;
  };

  StoreClass.prototype.sort = function (sorters, direction) {
    var self = this;
    var fieldName = "";
    var directionToSearch = "asc";
    if (direction !== undefined && typeof sorters == "string") {
      fieldName = sorters;
      directionToSearch = direction;
    } else if (
        typeof sorters == "object" &&
        sorters.property &&
        sorters.direction
    ) {
      fieldName = sorters.property;
      directionToSearch = sorters.direction;
    } else {
      console.log("error: not specified parameters");
    }

    for (var i = 0; i < self.data.length; i++) {
      for (var j = i + 1; j < self.data.length; j++) {
        if (directionToSearch == "asc") {
          if (self.data[i].data[fieldName] > self.data[j].data[fieldName]) {
            var record = self.data[i];
            self.data[i] = self.data[j];
            self.data[j] = record;
          }
        } else {
          if (self.data[i].data[fieldName] < self.data[j].data[fieldName]) {
            var record = self.data[i];
            self.data[i] = self.data[j];
            self.data[j] = record;
          }
        }
      }
    }
    return self;
  };

  StoreClass.prototype.filter = function (filters, value) {
    var self = this;
    var fieldName = "";
    var valueToSearch = "";
    if (value !== undefined && typeof filters == "string") {
      fieldName = filters;
      valueToSearch = value;
    } else if (
        typeof filters == "object" &&
        filters.property &&
        filters.value
    ) {
      fieldName = filters.property;
      valueToSearch = filters.value;
    } else {
      console.log(
          "Nuk eshte konfiguruar sakte: duhet store.filter('name', 'test')"
      );
      return false;
    }

    self.data = [];
    for (var i = 0; i < self.original.length; i++) {
      var record = self.original[i];
      var result = (record.data[fieldName] + "").match(value);
      if (result && result.length > 0) {
        self.data.push(record);
      }
    }
    return self;
  };

  StoreClass.prototype.filterBy = function (fn) {
    if (typeof (fn) !== 'function') {
      console.log('Error: should use function as parameter for filterBy');
      return false;
    }
    var self = this;
    self.data = [];
    for (var i = 0; i < self.original.length; i++) {
      var record = self.original[i];
      if (fn(record)) {
        self.data.push(record);
      }
    }
    return self;
  };

  StoreClass.prototype.find = function (fieldName, value) {
    var self = this;
    var valueToSearch = "";
    self.sorted = [];
    if (value !== undefined && typeof fieldName == "string") {
      valueToSearch = value;
    } else {
      console.log("Not Found");
      return -1;
    }

    for (var i = 0; i < self.data.length; i++) {
      var record = self.data[i];
      var result = (record.data[fieldName] + "").match(valueToSearch);
      if (result && result.length > 0) {
        return i;
      }
    }

    return -1;
  };

  StoreClass.prototype.findRecord = function (fieldName, value) {
    var self = this;
    if (value !== undefined && typeof fieldName == "string") {
      valueToSearch = value;
    } else {
      console.log("Not Found");
      return -1;
    }

    for (var i = 0; i < self.data.length; i++) {
      var record = self.data[i];
      var result = (record.data[fieldName] + "").match(valueToSearch);
      if (result && result.length > 0) {
        return record;
      }
    }

    return null;

    self.data = [];
    return self;
  };

  StoreClass.prototype.findBy = function (fn) {
    //TODO: duhet implementuar nje metode find ne store, duhet te kthehet indexi
    var self = this;
    self.data = [];
    return self;
  };

  return storeBuilder;
}