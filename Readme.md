
# ServiceLocator

Allows your teams to make use of the Service Locator pattern to help with communication between Front-End a(UI Interactions) and Back-End (Web Services).

## Usage


#### Adding/Editing the Service Locator 
```
ServiceLocator
  .addService(new Service("getUserInformation", "/api/user/{id}"))
  .addService(new Service("addUser", "/api/user"))
```

#### Consuming a service
```
ServiceLocator.getService("getUserInformation").invoke({ name: "jbueza"}, function(err, response) {
  if (err) throw new Error("Unable to fetch data from get user service");
  
  console.log(response);
});
```

## Notes

* It is still tied to jQuery or Zepto. Working towards perhaps detecting if you're on Windows8 (WinJS) so we can use the WinJS APIs instead of having jQuery/Zepto as a dependency.

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