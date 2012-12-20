describe("Service", function() {
  var testService = new Service("GetUsers", "data/user/{userId}", { template: true})
    , getTestService = new Service("GetUsers", "data/user.js")
    , postTestService = new Service("AddUser", "data/user.js")
    , delTestService = new Service("DeleteUser", "data/user.js")
    , updateTestService = new Service("UpdateUser", "data/user.js")
    , jsonpTestService = new Service('GetSXPBlogs', 'http://sxpdata.cloudapp.net/feeds/g3c', { jsonp: true })
    , brokenService = new Service("Broken", "data/broken.js")
    , testPostAsGetService = new Service("getUsersButAsPostService", "data/user.js", { method: "post"})
    , timeout = 100
    ;
  
  it("should exist in the window object", function() {
    expect(window.Service).toBeDefined();
  });
  it("should always have a name", function() {
    expect(getTestService.getName()).toBe("GetUsers");
  });

  it("should always have a uri", function() {
    expect(getTestService.getURI()).toBe("data/user.js");
  });

  it("should be a GET if the service name starts with 'get'", function() {
    expect(getTestService.getOptions().method).toBe('get');
  });

  it("should be a POST if the service name starts with 'add'", function() {
    expect(postTestService.getOptions().method).toBe('post');
  });

  it("should be a POST if the service name starts with 'del'", function() {
    expect(delTestService.getOptions().method).toBe('post');
  });

  it("should be a POST if the service name starts with 'update'", function() {
    expect(updateTestService.getOptions().method).toBe('post');
  });
  describe("Service.invoke", function() {
  
    it("should have an error object get passed into the callback on an erroneous service call", function() {
      brokenService.invoke({}, function(err, data) { expect(err).toBeDefined(); }, null);
    });
  });    
  describe("Service.parse", function() {
    it("should return false if incorrect arguments", function() {
      expect(testService.parse()).toBeFalsy();
    });
    it("should return false if the content param is not a string", function() {
      expect(testService.parse(false, { meow: "cat" })).toBeFalsy();
    });
    it("should return false if the params (map) param is not an object", function() {
      expect(testService.parse("Hello there {name}", false)).toBeFalsy();
    });
    it("should return a properly templated URI", function() {
      expect(testService.parse("/api/user/{user}", { user: 'jbueza'}).uri).toBe("/api/user/jbueza");
    });
    it("should return false if passing incorrect arguments", function() {
      expect(testService.parse("/meow", {}, true)).toBeFalsy();
    });
    it("should return false if 'content' is not a string", function() {
      expect(testService.parse({}, {})).toBeFalsy();
    });
    it("should return false if 'params' is not an object", function() {
      expect(testService.parse("/meow", true)).toBeFalsy();
    });  
  });
  
  describe("Service.option", function() {
    it("should have templating off by default", function() {
      var testDefaultService = new Service("GetWhat", "/api/test");
      expect(testDefaultService.option('template')).toBeFalsy();
    });
    it("should allow the developer to turn off templating", function() {
      testService.option('template', false);
      expect(testService.option('template')).toBeFalsy();
    });
    it("should allow the developer to turn on templating", function() {
      testService.option('template', true);
      expect(testService.option('template')).toBeTruthy();
    });
    it("should allow the developer to turn on cross-domain calls (jsonp)", function() {
      jsonpTestService.option('jsonp', true);
      expect(jsonpTestService.option('jsonp')).toBeTruthy();
    });
    it("should allow the developer to turn on cross-domain calls (jsonp)", function() {
      jsonpTestService.option('jsonp', true);
      expect(jsonpTestService.option('jsonp')).toBeTruthy();
    });
    it("should not allow developers to pass more than 2 arguments", function() {
       expect(jsonpTestService.option('jsonp', true, true)).toBeFalsy();
    });
    it("should not allow developers to pass a non-string value as the first parameter", function() {
       expect(jsonpTestService.option(true)).toBeFalsy();
    });  
    it("should not allow developers to pass no parameters", function() {
       expect(jsonpTestService.option()).toBeFalsy();
    });
  });
});