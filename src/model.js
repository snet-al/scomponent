export default function () {
  var modelCache = {};
  var MODEL_FIELD_TYPES = ["string", "int", "float", "bool"];

  var modelBuilder = function (config) {
    if (typeof config == "string") {
      try {
        return modelCache[config];
      } catch (e) {
        console.log(e);
      }
    }
    return new ModelClass(config);
  };

  var ModelInstance = function (Model) {
    this.data = {};
    this.model = Model;
  };

  ModelInstance.prototype.get = function (property, formating) {
    var propertyInFields = false,
        field,
        foundField,
        fieldHasFormating = false;

    for (let fieldIndex in this.model.fields) {
      field = this.model.fields[fieldIndex];
      if (field.name === property) {
        propertyInFields = true;
        if (field.type === "float") {
          fieldHasFormating = true;
        }
        break;
      }
    }
    if (!propertyInFields) {
      console.log("Property not in model");
      return undefined;
    }
    if (typeof formating === "undefined") {
      return this.data[property];
    }
    return parseFloat(this.data[property]).toFixed(formating);
  };

  ModelInstance.prototype.set = function (property, value, formating) {
    var propertyInFields = false,
        field,
        foundField,
        typeOfField = "string";
    for (let fieldIndex in this.model.fields) {
      field = this.model.fields[fieldIndex];
      if (field.name === property) {
        propertyInFields = true;
        typeOfField = field.type;
        break;
      }
    }
    if (!propertyInFields) {
      console.log("Property not in model");
      return this;
    }
    switch (typeOfField) {
      case "string":
        this.data[property] = "" + value;
        break;
      case "int":
        this.data[property] = parseInt(value);
        break;
      case "float":
        if (typeof formating === "undefined") {
          this.data[property] = parseFloat(value);
          break;
        }
        this.data[property] = parseFloat(value).toFixed(formating);
    }
    return this;
  };

  var ModelClass = function (config) {
    this.fields = [];
    if (!config.name || config.name == "") {
      console.log("Please define a name for the model");
      return false;
    }
    if (modelCache[config.name]) {
      console.log("Model already exists");
      return modelCache[config.name];
    }

    if (!config.fields ||
        typeof config.fields !== "object" ||
        Array.isArray(config.fields) != true
    ) {
      console.log("Please define fields for the model");
      return false;
    }

    var length = config.fields.length;
    for (var i = 0; i < length; i++) {
      var field = config.fields[i];

      if (!field.name) {
        console.log("Please set the name of the fields");
        return false;
      }
      var typeOfField = "string";
      if (field.type && MODEL_FIELD_TYPES.indexOf(field.type) != -1) {
        typeOfField = field.type;
      }
      this.fields.push({
        name: field.name,
        type: typeOfField
      });
    }
    modelCache[config.name] = this;
  };

  ModelClass.prototype.create = function (data) {
    var self = this;
    if ($.isArray(data)) {
      var instances = [];
      for (var recordIndex in data) {
        let record = data[recordIndex];
        let instance = new ModelInstance(self);

        for (let i in self.fields) {
          instance.data[self.fields[i].name] =
              record[self.fields[i].name] || null;
        }
        instances.push(instance);
      }
      return instances;
    }

    var instance = new ModelInstance(self);

    for (let i in self.fields) {
      instance.data[self.fields[i].name] = data[self.fields[i].name] || null;
    }
    return instance;
  };

  return modelBuilder;
}