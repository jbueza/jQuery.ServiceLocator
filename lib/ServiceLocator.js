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

  