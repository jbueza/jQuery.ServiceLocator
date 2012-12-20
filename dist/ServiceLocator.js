/* 
 * Service
 * 
 * @author Jaime Bueza
 *
 * Represents a service call
 */

var Service = function Service(name, uri, options) {
  if (typeof options == 'undefined') options = {};

  var defaults = {
    method: options.method || function () {
      var type = "get";
      if (name.match(/^get/i)) {
        type = "get";
      } else if (name.match(/^add/i)) {
        type = "post";
      } else if (name.match(/^del/i)) {
        type = "delete";
      } else if (name.match(/^update/i)) {
        type = "put";
      }
      return type;
    } (),
    jsonp: false,
    wrapped: false,
    template: false,
    contentType: "application/json; charset=utf-8"
  };
  this.name = name;
  this.uri = uri;
  this.options = $.extend({}, defaults, options);
};

Service.prototype.invoke = function (params, callback, scope) {
  if (!callback) return false;

  var self = this
    , data;
  var options = self.getOptions() || {}
    , method = options.method
    , uri = self.getURI()
    , responseType = options.responseType || 'JSON';

    if (options.template) {
      uriObj = self.parse(uri, params);

      uri = uriObj.uri;

      if (method == 'get') {
        params = null;
      } else {
        params = uriObj.params; //
      }
    }

  if (method == 'post' && options.contentType.match(/application\/json/gi)) {
    data = JSON.stringify(params);
  } else {
    data = params;
  }

  return ($.ajax({
    url: uri,
    data: data,
    dataTypeString: responseType,
    dataType: options.jsonp ? 'jsonp' : responseType,
    type: method,
    async: options.async || true,
    cache: options.cache || false,
    contentType: options.contentType || "application/json; charset=utf-8"
  }).success(function (data) {
    if (responseType == 'JSON' && this.contentType.match(/javascript/g)) {
      data = $.parseJSON(data);
    }

    if (options.wrapped) data = self.unwrap(data);

    if ('undefined' != typeof callback) {
      var args = [ null, data, arguments[1], arguments[2] ];
      if (typeof callback == 'function') {
        callback.apply(scope, args);
      } else {
        //string
        scope[callback].apply(scope, args);
      }
    }
  }).error(function () {
    if ('undefined' != typeof callback) {
      callback.apply(scope || this, arguments);
    }
  }));
};

/* 
 *  Returns the current service's name
 */
Service.prototype.getName = function () {
  return this.name;
};

/* 
* Returns the current service's URI
*/
Service.prototype.getURI = function () {
  return this.uri;
};

/*
 * Returns the optional parameters of the current service
 */ 
Service.prototype.getOptions = function () {
  return this.options;
};

/* 
 * Unwraps the ____Result from a WebServiceResult 
 * and returns the object that the ___Result wraps.
 * @param data A web service result from typical WCF service
 */
Service.prototype.unwrap = function (data) {
  var self = this;
  var unwrapped = {};
  for (var prop in data) {
    if (typeof prop === 'string' && prop.substr(prop.length - 6, prop.length) == 'Result') {
      data = self.convert(data[prop]);
      break;
    }
  }
  return data;
};
/*
 *  Works in conjunction with the unwrap method
 * @param o {Object} 
 */
Service.prototype.convert = function (o) {
  var newResult = {};
  for (var rootProp in o) {
    newResult[rootProp] = o[rootProp];
  }
  return newResult;
};

/*
* Sets or Gets an option from a particular Service
*/
Service.prototype.option = function () {
  if (!arguments.length) return false;
  if (arguments.length > 2) return false;
  if ('string' != typeof arguments[0]) return false;

  if (arguments.length == 2) {
    this.options[arguments[0]] = arguments[1];
    return this;
  } else if (arguments.length == 1) {
    return this.options[arguments[0]];
  }
};

/*
* Returns an HTML fragment from {} templating
* @param context {String} Accepts any length string with mustaches ({myKey})
* @param params {Object} A JSON object that is ran against the content string that has mustaches
*/
Service.prototype.parse = function (content, params) {
  if (arguments.length != 2) return false;
  if ('string' != typeof content) return false;
  if ('object' != typeof params) return false;
  var replaced = [];
  $.each(params, function (key, value) {
    
    if (content.split("{" + key + "}").length > 1) {
      replaced.push(key);
    }
    content = content.split("{" + key + "}").join(value);
  });
  
  for ( var i = 0; i < replaced.length; i++) {
    var keyToDelete = replaced[i];
    delete params[keyToDelete];
  }
  return { uri: content, params: params };
};

/*
 * Service Locator
 *
 * @author        Jaime Bueza
 *
 * The service locator pattern is a design pattern used in software development 
 * to encapsulate the processes involved in obtaining a service with a strong 
 * abstraction layer. This pattern uses a central registry known as the 
 * "service locator" which on request returns the information necessary 
 * to perform a certain task. - Wikipedia
 */
  var ServiceLocator = {
    services: {},
    /* 
     * Adds a particular service to the Service Locator
     * @param service {Service Object} An instance of a Service class
     */
    addService: function(service) {
      if (!service) return false;
      this.services[service.name] = service;
      return this;
    },
    /* 
     * Gets a particular service to the Service Locator
     * @param service {Service Object} An instance of Service class
     */
    getService: function(name) {
      return this.services[name];
    },
    /* 
     * Removes a particular Service from the Service Locator
     * @param name {String} Specific service to be removed
     */
    removeService: function(name) {
      delete this.services[name];
    },
    /* 
     * Destroys all service references in the Service Locator
     */
    removeServices: function() { 
      this.services = {}; 
      return true;
    },
    /*
     * Returns all services in the Service Locator
     */
    getServices: function() {
      if (typeof this.services === undefined) return false;
      return this.services;
    }
  };

  