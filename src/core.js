let $net = {
  root_path: typeof root_path != "undefined" && root_path ? root_path : "lib",
  ver: typeof snet_ver != "undefined" && snet_ver ? snet_ver : "",
  esversion: false,
  dom: window.jQuery,
  tpl: window.Handlebars || {},
  loader: {},
  data: {},
  store: {},
  module: null,
  modules: [],
  cmp: {},
  ready: null,
  onready: [],
  iframes: {
    cmp: {},
    user: {}
  }
};
$net.ready = function (fn) {
  $net.onready.push(fn || function () {});
};

$net.module = function (name, config) {
  var templateString = "";
  let elementReference;
  if (!config && typeof name == "object") {
    config = name;
  }

  if (config.el) {
    elementReference = config.el;
    return $net.modules['module_' + elementReference] = new Vue({
      data: config.scope,
      el: elementReference,
      computed: config.computed || {},
      methods: config.methods || {},
      created: config.created || null,
      mounted: config.mounted || null
    });
  }
  name = config.stype || config.type;
  if (name) {
    for (let i in $net.iframes.cmp) {
      templateString = $net.iframes.cmp[i]
      .contents()
      .find(name)
      .html();
      if (templateString && templateString != "") {
        break;
      }
    }
  } else if (config.template) {
    templateString = $(config.template).html();
  } else if (config.url) {
    $.ajax({
      url: config.url,
      success: function(html) {
        templateString = html;
      },
      async:false
    });
  }

  if (!config.renderTo) {
    console.log("Error: please specify el");
    return false;
  }
  $(config.renderTo).html(templateString);

  if (!config.modules) {
    elementReference = config.renderTo;
    return $net.modules['module_' + elementReference] = new Vue({
      data: config.scope,
      el: elementReference,
      computed: config.computed || {},
      methods: config.methods || {},
      created: config.created || null,
      mounted: config.mounted || null
    });
  }

  for(var i in config.modules) {
    var moduleReference = config.modules[i];
    $net.modules['module_' + moduleReference] = new Vue({
      data: config.scope,
      el: moduleReference,
      computed: config.computed || {},
      methods: config.methods || {},
      created: config.created || null,
      mounted: config.mounted || null
    });
  }

  if (config.modules.length === 1) {
    return $net.modules['module_' + moduleReference];
  }

};

$net.model = (require('./model').default)();

$net.store = (require('./store').default)();

function windowOnLoad() {
  var systemTemplateIframes = $net.dom("iframe[data-snet-tpl]");
  for (var i = 0; i < systemTemplateIframes.length; i++) {
    $net.iframes.cmp[
    "_" + systemTemplateIframes.eq(i).attr("data-snet-tpl")
        ] = systemTemplateIframes.eq(i);
  }

  var userTemplateIframes = $net.dom("iframe[data-templates]");
  for (i = 0; i < userTemplateIframes.length; i++) {
    $net.iframes.user[
    "_" + userTemplateIframes.eq(i).attr("data-templates")
        ] = userTemplateIframes.eq(i);
  }

  for (i = 0; i < $net.onready.length; i++) {
    $net.onready[i]();
  }

  $net.onready = null;
  delete $net.onready;
}

window.addEventListener("load", windowOnLoad);

$net.ready(require("./cms").default);

export default $net;