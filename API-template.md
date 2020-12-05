## Server API

### Create a Property
  * POST "/mortgageAPI/property/:id"
**Success Status Code:** "201"
**Request Body:** json with keys...
```json
    {
      "id": Number,
      "price": Number,
      "hoa": {
        "name": String,
        "fee": Number
      },
      "appointments": [{
        "nameAgent": String,
        "nameClient": String,
        "contactAgent": {
          "phone": String,
          "email": String
        },
        "contactClient": {
          "phone": String,
          "email": String
        },
        "time": Date,
        "inPerson": Boolean,
        "zoom":  String,
      }]
    }
```

### Read a Property
  * GET "/mortgageAPI/property/:id"
**Path Paramaters**
  * "id" property listing"s id
**Returns** json
```json
    {
      "id": Number,
      "price": Number,
      "hoa": {
        "name": String,
        "fee": Number
      },
      "appointments": [{
        "nameAgent": String,
        "nameClient": String,
        "contactAgent": {
          "phone": String,
          "email": String
        },
        "contactClient": {
          "phone": String,
          "email": String
        },
        "time": Date,
        "inPerson": Boolean,
        "zoom":  String,
      }]
    }
```

### Update property listing info
  * PATCH "/mortgageAPI/listing/:id"
**Path Parameters:**
  * "id" property listing`s id
**Success Status Code:** "204"
**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)
```json
    {
      "id": Number,
      "price": Number,
      "hoa": {
        "name": String,
        "fee": Number
      },
      "appointments": [{
        "nameAgent": String,
        "nameClient": String,
        "contactAgent": {
          "phone": String,
          "email": String
        },
        "contactClient": {
          "phone": String,
          "email": String
        },
        "time": Date,
        "inPerson": Boolean,
        "zoom":  String,
      }]
    }
```

### Delete property listing
  * DELETE "/mortgageAPI/listing/:id"
**Path Paramaters:**
  * "id" property listing"s id
**Success Status Code:** "204"

### Create an agent
  * POST "/api/agent/:name"
**Path Paramaters:**
  * "name" the agent"s name
**Success Status Code:** "201"
**Request Body**: Expects JSON with the following keys.
```json
    {
      "name": String,
      "title": String,
      "rating": Number,
      "recentSales": Number,
      "phone": String,
      "avatar": String,   // s3 resource
      "about": String,    // a description
      "agency": String,   // employer
      "appointments": [{
        "nameClient": String,
        "contactClient": {
          "phone": String,
          "email": String
        },
        "time": Date,
        "inPerson": Boolean,
        "zoom": String
      }]
    }
```

### Read all data about an agent
  * GET "/mortgageAPI/agent/:name"
**Path Paramaters**
  * "name" the agent"s name
**Returns** json
```json
    {
      "name": String,
      "title": String,
      "rating": Number,
      "recentSales": Number,
      "phone": String,
      "avatar": String,   // s3 resource
      "about": String,    // a description
      "agency": String,   // employer
      "appointments": [{
        "nameClient": String,
        "contactClient": {
          "phone": String,
          "email": String
        },
        "time": Date,
        "inPerson": Boolean,
        "zoom": String
      }]
    }
```

### Update the data about an agent
  * PATCH "/mortgageAPI/agent/:name"
**Path Parameters:**
  * "name" the agent"s name
**Success Status Code:** "204"
**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)
```json
    {
      "name": String,
      "title": String,
      "rating": Number,
      "recentSales": Number,
      "phone": String,
      "avatar": String,   // s3 resource
      "about": String,    // a description
      "agency": String,   // employer
      "appointments": [{
        "nameClient": String,
        "contactClient": {
          "phone": String,
          "email": String
        },
        "time": Date,
        "inPerson": Boolean,
        "zoom": String
      }]
    }
```

### Delete an agent
  * DELETE "/mortgageAPI/agent/:name"
**Route Paramaters:**
  * "name" the agent"s name
**Success Status Code:** "204"
