$net={
    root_path: ( (typeof root_path!='undefined' && root_path) ? root_path : 'lib' ),
    ver: ((typeof snet_ver != 'undefined' && snet_ver) ? snet_ver : ''),
    dom: window.jQuery,
    tpl: window.Handlebars || {},
    loader: {},
    //data
    data: {},
    //components
    cmp: {},
    onready: [],
    iframes: {
        cmp: {},
        user: {}
    }
};
alert("Eshte ok !!");
$net.ready = function(fn) {
    $net.onready.push(fn || function(){});
};

window.onload = function() {
    var systemTemplateIframes = $net.dom("iframe[data-snet-tpl]");
    for(var i=0; i < systemTemplateIframes.length; i++){
        $net.iframes.cmp[ "_" + systemTemplateIframes.eq(i).attr('data-snet-tpl')  ] = systemTemplateIframes.eq(i);
    }

    var userTemplateIframes = $net.dom("iframe[data-templates]");
    for (i=0; i<userTemplateIframes.length; i++){
        $net.iframes.user[ "_" + userTemplateIframes.eq(i).attr("data-templates")] = userTemplateIframes.eq(i);
    }

    for(i=0; i < $net.onready.length; i++){
        $net.onready[i]();
    }
    
    $net.onready = null;
    delete $net.onready;
};

$net.view = {

    create: function(config) {
        var templateString = "";
        if(config.template) {
            templateString = (config.template);
        } else if (config.path && typeof(config.path) === 'string') {
            templateString = $net.dom(config.path).html();
        } else if (config.path && typeof(config.path) === 'object') {
            templateString = $net.dom(config.path[0]).contents().find(config.path[1]).html();
        } else if (config.utype) {
            for (var i in $net.iframes.user) {
                templateString = $net.iframes.user[i].contents().find(config.utype).html();
                if(templateString && templateString !== "") {
                    break;
                }
            }
        } else if (config.stype) {
            for (var i in $net.iframes.cmp) {
                templateString = $net.iframes.cmp[i].contents().find(config.stype).html();
            }
        }

        var templateEngineFunction  = $net.tpl.compile(templateString);


        var generatedHTML ;
        if (config.data) {
            generatedHTML = templateEngineFunction(config.data);
        } else {
            generatedHTML = templateEngineFunction({});
        }
        if (config.renderTo) {
            var elementToPlaceHtml = $net.dom(config.renderTo);
            elementToPlaceHtml = elementToPlaceHtml || $net.dom(document.body);
            elementToPlaceHtml.html(generatedHTML);
        } else if (config.appendTo) {
            var elementToPlaceHtml = $net.dom(config.appendTo);
            elementToPlaceHtml = elementToPlaceHtml || $net.dom(document.body);
            elementToPlaceHtml.append(generatedHTML);
        } else {
            return generatedHTML;
        }
    },
    cmpId: 100,
    generateCmpId: function() {
        return 'scmp_' + (++$net.view.cmpId) + '';
    },
    tplConstructors: {},
    cmp: function (name, config) {
        var templateString = "";
        if (!config && typeof name == "object") {
            config = name;
            name = config.stype || config.type;
        }

        if (name) {
            for (var i in $net.iframes.cmp) {
                templateString = $net.iframes.cmp[i].contents().find(name).html();
                if (templateString && templateString != "") {
                    break;
                }
            }
        }
        var templateEngineFunction  = $net.tpl.compile(templateString);
        var generatedHTML ;

        var id_cmp = config.id || $net.view.generateCmpId();
        var dataForTemplate = { id: id_cmp, store:new $net.data.Store({
                model:(new $net.data.Model({fields:[{name:'id',type:"string"}]})),
                data:config.data || []
            }),
            scope: config.scope || {}, style : config.style || ""};

        generatedHTML = templateEngineFunction( dataForTemplate );

        if (config.renderTo) {
            var elementToPlaceHtml = $net.dom(config.renderTo);
            elementToPlaceHtml = elementToPlaceHtml || $net.dom(document.body);

            var dom = elementToPlaceHtml.html(generatedHTML);
        } else if (config.appendTo) {
            var elementToPlaceHtml = $net.dom(config.appendTo);
            elementToPlaceHtml = elementToPlaceHtml || $net.dom(document.body);

            var dom = elementToPlaceHtml.html(generatedHTML);
        } else {
            //this is a bug entry point
        }
            
        return new this.cmpConstructor(config, id_cmp, dom, name)
    },
    ucmp: function (name, config) {
        var templateString = "";
        if (!config && typeof(name) == "object") {
            config = name;
            name = config.stype || config.type;
        }

        if (name) {
            for (var i in $net.iframes.user) {
                templateString = $net.iframes.user[i].contents().find(name).html();
                if (templateString && templateString !== "") {
                    break;
                }
            }
        }
        var templateEngineFunction  = $net.tpl.compile(templateString);
        var generatedHTML;

        var id_cmp = config.id || $net.view.generateCmpId();
        var dataForTemplate = { id: id_cmp, store:new $net.data.Store({
                model:(new $net.data.Model({fields:[{name:'id',type:"string"}]})),
                data:config.data || []
            }),
            scope: config.scope || {}, style : config.style || ""};

        generatedHTML = templateEngineFunction( dataForTemplate );

        if (config.renderTo) {
            var elementToPlaceHtml = $net.dom(config.renderTo);
            elementToPlaceHtml = elementToPlaceHtml || $net.dom(document.body);

            var dom = elementToPlaceHtml.html(generatedHTML);
        } else if (config.appendTo) {
            var elementToPlaceHtml = $net.dom(config.appendTo);
            elementToPlaceHtml = elementToPlaceHtml || $net.dom(document.body);

            var dom = elementToPlaceHtml.html(generatedHTML);
        } else {
            //this is a bug entry point
        }

        return new this.cmpConstructor(config, id_cmp, dom, name );
    },
    cmpConstructor: function (config, id_cmp, dom, name) {
        
        this.config = config;
        this.id = id_cmp;
        this.dom = dom;
        if (name.charAt(0) == '#') {
            name = name.substring(1);
        }
        this.stype = name;
        var self = this;
        //events
        for (var piece in config.events) {
            //piece is elements of components
            var t = $('#'+id_cmp+' .s-cmp-'+self.stype+'-event-'+piece,dom);
            for (var event_name in config.events[piece]) {
                var userfn = config.events[piece][event_name];
                t.on(event_name, (function(userfn) {
                    return function(e) {
                        var id = self.id || id_cmp || '';
                        var r = userfn.call(self,e,id,this);
                        if (r === false) {
                            e.stopPropagation();
                        }
                    };
                })(userfn));
            }
        }
        //onrender
        if (config.onrender && typeof(config.onrender) == 'function'){
            config.onrender();
        }

    },
    vue: function (name, config) {
        if (!config && typeof name == "object") {
            config = name;
        }

        if (config.el) {
            elementReference = config.el;
        } else {
            var templateString = "";
            name = config.stype || config.type;

            if (name) {
                for (var i in $net.iframes.cmp) {
                    templateString = $net.iframes.cmp[i].contents().find(name).html();
                    if (templateString && templateString != "") {
                        break;
                    }
                }
            } else if (config.template) {
                templateString = $(config.template).html();
            }
            if (config.renderTo) {
                elementReference = config.renderTo;
            } else {
                console.log('Error: please specify el');
                return false;
            }
            $(elementReference).html(templateString);
        }

        return new Vue({
            data: config.scope,
            el: elementReference
        });
    }
};

/*DATA STORE*/
$net.data = {
    Model:function(object){
        this.fields = [];
        this.create = function(o){
            var createrConstructor = function(data){
                this.data = data;
                //this.get=function(p){return this.data[p];};//
            };
            var data = [];
            var i = null;

            for(i in o){

                if(this.fields[i]){
                    data[i]=o[i];
                }else{
                    data[i]=o[i];
                }

            }

            return new createrConstructor(data);


        };

        if(object && object.fields && typeof object.fields[0]=="string" ){
            var fName=null;
            for(fName in object.fields){
                this.fields[object.fields[fName]]="string";
            }
        }else if(object && object.fields && typeof object.fields[0]=="object" ){
            var fObj=null,obj=null;

            for (fObj in object.fields){
                obj=object.fields[fObj];
                if(obj.name && obj.type){
                    this.fields[obj.name]=obj.type;
                }else if(obj.name && !obj.type){
                    this.fields[obj.name]="string";
                }else {
                    console.log("vendos ne rregull te dhenat");
                }
            }
        }else{//asgje
        }
    },
    Store: function(config){
        var j = 0;
        var data = [];

        if(config && config.model && typeof config.model=="object" && typeof config.data[0]=="object"){
            this.model = config.model;
            var mod = config.model;
            var d, x;
            for(i in config.data){
                d = config.data[i];
                x = mod.create(d);
                data[j] = x;
                j++;
            }
        }

        this.getAt = function (i){
            return data[i];
        };

        this.get = function(){
            return data;
        };

        this.findBy = function (f,v){
            for(i in data){
                if(data[i].data[f]==v){
                    return data[i];
                }
            }
        };

        this.count = function(){
            return (data.length);
        };

        this.add = function(o){
            data[j] = this.model.create(o);
j++;
};

this.each = function(f){
    for(j in data){
        f(data[j]);
    }
};

this.data = data;
}
};

$net.model = (function(){
    var modelCache = {};
    var MODEL_FIELD_TYPES = ['string', 'int', 'float', 'bool'];

    var modelBuilder = function(config){
        if(typeof(config)=='string'){

            try{
                return modelCache[config];

            }catch(e){

                console.log(e);
            }
        }
        return new ModelClass(config);
    };

    var ModelInstance = function(Model) {
        this.data = {};
        this.model = Model;
    };

    ModelInstance.prototype.get = function(property, formating) {
        var propertyInFields = false, foundField, fieldHasFormating = false;
        for (fieldIndex in this.model.fields) {
            field = this.model.fields[fieldIndex];
            if (field.name === property) {
                propertyInFields = true;
                if (field.type === 'float') {
                    fieldHasFormating = true;
                }
                break;
            }
        }
        if (!propertyInFields) {
            console.log("Property not in model");
            return undefined;
        }
        if (typeof(formating)==='undefined') {
            return this.data[property];
        }
        return parseFloat(this.data[property]).toFixed(formating);
    };

    ModelInstance.prototype.set = function(property, value, formating) {
        var propertyInFields = false, foundField, typeOfField = 'string';
        for (fieldIndex in this.model.fields) { 
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
            case 'string':
                this.data[property] = '' + value;
                break;
            case 'int':
                this.data[property] = parseInt(value);
                break;
            case 'float':
                if (typeof(formating)==='undefined') {
                    this.data[property] = parseFloat(value);
                    break;
                }
                this.data[property] = parseFloat(value).toFixed(formating);
        }
        return this;        
    };

    var ModelClass = function(config){
        this.fields = [];
        if(!config.name || config.name == ''){
            console.log("Please define a name for the model"); return false;
        }
        if(modelCache[config.name]){
            console.log("Model already exists");
            return modelCache[config.name];
        }

        if(!config.fields || typeof(config.fields) !== 'object' || Array.isArray(config.fields) != true){
            console.log("Please define fields for the model"); return false;
        }

        var length = config.fields.length;
        for(var i=0; i<length; i++){
            var field = config.fields[i];

            if(!field.name){
                console.log("Please set the name of the fields"); return false;
            }
            var typeOfField = 'string';
            if(field.type && MODEL_FIELD_TYPES.indexOf(field.type) !=- 1){
                typeOfField = field.type;
            }
            this.fields.push({
                name: field.name,
                type: typeOfField
            });
        }
        (modelCache[config.name] = this);
    }

    ModelClass.prototype.create = function(data){
        var self = this;
        if($.isArray(data)){
            var instances = [];
            for(var recordIndex in data){
                let record = data[recordIndex];
                let instance = new ModelInstance(self);

                for(let i in self.fields){
                    instance.data[self.fields[i].name] = record[self.fields[i].name] || null;
                }
                instances.push(instance);
            }
            return instances;
        }

        var instance = new ModelInstance(self);

        for(var i in self.fields){
            instance.data[self.fields[i].name] = data[self.fields[i].name] || null;
        }
        return instance;
    };

    return modelBuilder;
})();

$net.store = (function(){
    var storeCache = {};

    var storeBuilder = function(config){
        if (typeof(config) == 'string'){
            try {
                return storeCache[config];
            } catch(e) {
                console.log(e);
            }
        }
        return new StoreClass(config);
    }

    var StoreClass = function(config){
        this.model = null;
        this.data = [];
        this.indices = [];
        this.filtered = [];

        if (!config.model || config.model == ''){
            console.log("Please define a model for the store"); return false;
        } else {
            this.model = $net.model(config.model);
        }

        if (!this.model) {
            console.log("Error with model"); return false;
        }
        
        if (config.data && $.isArray(config.data)) {
            for (let i=0; i<config.data.length; i++){
                this.data.push(this.model.create(config.data[i]));
            }

        }

        var length = this.data.length;
        
        if (config.name && typeof(config.name) == 'string') {
            storeCache[config.name] = this;
        } else {
            console.log("This store is not cached");
        }
        
        return this;
    };

    StoreClass.prototype.add = function(data) {
        var self = this;
        if($.isArray(data)){
            for (let i=0; i < data.length; i++) {
                self.data.push(self.model.create(data[i]));

            }

        }
        return self;
    };

    StoreClass.prototype.removeAt = function(index) {
        var self = this;
        if (index < self.data.length && index >= 0) {
            self.data.splice(index, 1);

        }
        return self;
    };

    StoreClass.prototype.removeAll = function() {
        var self = this;

        self.data = [];
        return self;
    };

    StoreClass.prototype.getAt = function(index) {
        var self = this;
        return self.data[index];
    };

    StoreClass.prototype.average = function(fieldName) {
        var self = this;
        var canCalculate = false;
        for(let i in self.fields){
            if (self.fields[i].name == fieldName) {
                if (self.fields[i].type == 'int' || self.fields[i].type == 'float'){
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
        for (let i in self.fields){
            if (self.fields[i].name == fieldName) {
                if (self.fields[i].type == 'int' || self.fields[i].type == 'float') {
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
        for (var i = 1;i < self.data.length; i++){
            if(self.data[i].data[fieldName] > max){
                max = self.data[i].data[fieldName];
            }
        }
        return max;
    };
    
    StoreClass.prototype.min = function(fieldName) {
        var self = this;
        var canCalculate = false;
        for(let i in self.fields){
            if (self.fields[i].name == fieldName) {
                if (self.fields[i].type == 'int' || self.fields[i].type == 'float'){
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

    StoreClass.prototype.sort = function(sorters, direction) {
        var self = this;
        if (direction !== undefined && typeof(sorters)== 'string'){
            fieldName = sorters;
            directionToSearch = direction;
        } else if (typeof(sorters)=='object' && sorters.property && sorters.direction) {
            fieldName = sorters.property;
            directionToSearch = sorters.direction;
        } else {
            console.log()
        }

        for (var i = 0; i<self.data.length;i++){
            for (var j=i+1; j<self.data.length; j++ ) {
                if (directionToSearch == 'asc') {
                    if (self.data[i].data[fieldName] > self.data[j].data[fieldName]){
                        var record = self.data[i];
                        self.data[i] = self.data[j];
                        self.data[j] = record;
                    }
                } else {
                    if (self.data[i].data[fieldName] < self.data[j].data[fieldName]){
                        var record = self.data[i];
                        self.data[i] = self.data[j];
                        self.data[j] = record;
                    }
                }
            }
        }
        return self;
    };

    StoreClass.prototype.filter = function(filters, value) {
        var self = this;
        if (value !== undefined && typeof(filters) == 'string') {
            fieldName = filters;
            valueToSearch = value;
        } else if (typeof(filters) == 'object' && filters.property && filters.value) {
            fieldName = filters.property;
            valueToSearch = filters.value;
        } else {
            console.log("Nuk eshte konfiguruar sakte: duhet store.filter('name', 'bled') ");
            return false;
        }
        self.filtered = [];
        for (var i = 0; i < self.data.length; i++) {
            var record = self.data[i];
            var result = (record.data[fieldName]+"").match(value);
            if (result && result.length > 0) {
                self.filtered.push(record);
            }
        }
        return self;
    };





    StoreClass.prototype.filterBy = function(fn) {
        //TODO: duhet implementuar nje filter e store, duhet te ruhet te self.filtered
        var self = this
        self.data = [];
        return self;
    };

    StoreClass.prototype.find = function(fieldName, value) {
        var self = this;
        self.sorted = [];
        if(value !== undefined && typeof(fieldName)=='string'){
            valueToSearch = value;
        }else {
            console.log("Not Found");
            return -1;
        }

        for (var i = 0; i < self.data.length; i++) {
            var record = self.data[i];
            var result = (record.data[fieldName]+"").match(valueToSearch);
            if (result && result.length > 0) {
               return i;
            }
        }

        return -1;
    };

    StoreClass.prototype.findRecord = function(fieldName, value) {
        var self = this;
        if(value !== undefined && typeof(fieldName)=='string'){
            valueToSearch = value;
        }else {
            console.log("Not Found");
            return -1;
        }

        for (var i = 0; i < self.data.length; i++) {
            var record = self.data[i];
            var result = (record.data[fieldName]+"").match(valueToSearch);
            if (result && result.length > 0) {
                return record;
            }
        }

        return null;

        self.data = [];
        return self;
    };

    StoreClass.prototype.findBy = function(fn) {
        //TODO: duhet implementuar nje metode find ne store, duhet te kthehet indexi
        var self = this;
        self.data = [];
        return self;
    };

    return storeBuilder;
})();

export default $net;