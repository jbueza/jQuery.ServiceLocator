
# ServiceLocator

Allows your teams to make use of the Service Locator pattern to help with communication between Front-End a(UI Interactions) and Back-End (Web Services).

If you're using CasperJS (wrapper around PhantomJS), you can easily leverage the ServiceLocator on the target site you're testing.

## Usage


#### Adding/Editing the Service Locator 

```javascript
ServiceLocator
  .addService(new Service("getUserInformation", "/api/user/{id}"))
  .addService(new Service("addUser", "/api/user"))
```

#### Consuming a service

```javascript
ServiceLocator.getService("getUserInformation").invoke({ name: "jbueza"}, function(err, response) {
  if (err) throw new Error("Unable to fetch data from get user service");
  
  console.log(response);
});
```


#### Using JSONP

```javascript
ServiceLocator.addService(new Service("getPhotos", "/api/photos", { jsonp: true }));

ServiceLocator.getService("getUserInfo").invoke({ 
  callback: "renderSomethingFromCDN"
}, function(err, response) {
  console.log(response);
});
```

#### Using Templating

```javascript
ServiceLocator.addService(new Service("getUserInfo", "/api/user/{name}", { template: true }));

ServiceLocator.getService("getUserInfo").invoke({ name: "jbueza"}, function(err, response) {
  console.log(response);
});
```

#### Extra Configuration & Notes

* HTTP POST
  * prefix with "add"
  * invokes a service with HTTP POST without specifying it by configuration.
* HTTP GET
  * prefix with "get"
  * invokes a service with HTTP GET without specifying it by configuration.
* HTTP PUT
  * prefix with "update"
  * invokes a service with HTTP PUT without specifying it by configuration
* HTTP DELETE
  * prefix with "del"
  * invokes a service with HTTP DELETE without specifying it by configuration

Since this is just client side (browser-based) you can actually do more than just POST and GET, by specifying a 'method'.

```
ServiceLocator
  .addService(new Service("updateUserProfile", "/api/user", { method: "put"}))
```

## Notes

* It is still tied to jQuery or Zepto. Working towards perhaps detecting if you're on Windows8 (WinJS) so we can use the WinJS APIs instead of having jQuery/Zepto as a dependency. Also, we're looking at an adapter for Titanium SDK (Appcelerator). 
* Running the test suite (jasmine bdd) requires phantomjs being installed! (install it, add it to your path)


## Running from repository

* git clone git@github.com:jbueza/ServiceLocator.git
* npm install
* (ensure you have phantomjs installed)
* grunt (this will run all the tasks)


## License 

<pre>
Copyright 2012 Jaime Bueza

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
</pre>