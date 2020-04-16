Helper for turning a provided endpoint into a valid request URL. Here are your options:

* Pass in a string (not including any `/` path separators). The function will assume you mean to access an endpoint, ending in the string you provided, at your configured API_ROOT_URL at the path `/data/`. Example: if you provide `myComponent` it will opass back `API_ROOT_URL + '/data/myComponent'`
* Pass in a path. This function will then assume it is an endpoint at your API_ROOT_URL. Example: if you provide `myEndpoint/myComponent` it will pass back `API_ROOT_URL + '/myEndpoint/myComponent'`
* Pass in a complete URL. In this case, this function will assume it is a complete, external endpoint and pass back the URL as-is.
