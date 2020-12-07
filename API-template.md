# Server API

## PROPERTIES

### Create a Property
  * POST "/mortgageAPI/property"
**Success Status Code:** "201"
**Request Body:** json with keys...
```json
    {
      "price": Number,
      "beds": Number,
      "baths": Number,
      "hoa": {
        "name": String,
        "fee": Number
      },
      "appointments": [{
        "appointment_id": Number,
        "contactAgent": {
          "name": String,
          "phone": String,
          "email": String
        },
        "contactClient": {
          "client_id": Number,
          "name": String,
          "phone": String,
          "email": String
        },
        "date": Date,
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
      "beds": Number,
      "baths": Number,
      "hoa": {
        "name": String,
        "fee": Number
      },
      "appointments": [{
        "appointment_id": Number,
        "contactAgent": {
          "name": String,
          "phone": String,
          "email": String
        },
        "contactClient": {
          "client_id": Number,
          "name": String,
          "phone": String,
          "email": String
        },
        "date": Date,
        "inPerson": Boolean,
        "zoom":  String,
      }]
    }
```

### Update a property
  * PATCH "/mortgageAPI/listing/:id"
**Path Parameters:**
  * "id" property listing`s id
**Success Status Code:** "204"
**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)
```json
    {
      "price": Number,
      "beds": Number,
      "baths": Number,
      "hoa": {
        "name": String,
        "fee": Number
      },
      "appointments": [{
        "appointment_id": Number,
        "contactAgent": {
          "name": String,
          "phone": String,
          "email": String
        },
        "contactClient": {
          "client_id": Number,
          "name": String,
          "phone": String,
          "email": String
        },
        "date": Date,
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

## AGENTS

### Create an agent
  * POST "/api/agent/:name"
**Path Paramaters:**
  * "name" the agent's name
**Success Status Code:** "201"
**Request Body**: Expects JSON with the following keys.
```json
    {
      "name": String,
      "title": String,
      "rating": Number,
      "recentSales": Number,
      "phone": String,
      "email": String,
      "avatar": String,
      "about": String,
      "agency": String,
    }
```

### Read all data about an agent
  * GET "/mortgageAPI/agent/:name"
**Path Paramaters**
  * "name" the agent's name
**Returns** json
```json
    {
      "agent_id": Number,
      "name": String,
      "title": String,
      "rating": Number,
      "recentSales": Number,
      "phone": String,
      "email": String,
      "avatar": String,
      "about": String,
      "agency": String,
      "appointments": [{
        "appointment_id": Number,
        "contactClient": {
          "client_id": Number,
          "name": String,
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
  * "name" the agent's name
**Success Status Code:** "204"
**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)
```json
    {
      "agent_id": Number,
      "name": String,
      "title": String,
      "rating": Number,
      "recentSales": Number,
      "phone": String,
      "email": String,
      "avatar": String,
      "about": String,
      "agency": String,
    }
```

### Delete an agent
  * DELETE "/mortgageAPI/agent/:name"
**Route Paramaters:**
  * "name" the agent's name
**Success Status Code:** "204"

### Associate an agent with a property listing
  * POST "/mortgageAPI/agent/:name/property/:address"
**Route Paramaters:**
  * "name" the agent's name
**Success Status Code:** 201

## APPOINTMENTS

### Book an appointment for an agent
  * POST "/mortgageAPI/agent/:name/appointment"
**Route Paramaters:**
  * "name" the agent's name
**Success Status Code:** "201"
**Request Body:** Expects JSON with the following keys:
```json
  {
    "contactAgent": {
      "name": String,
      "phone": String,
      "email": String
    },
    "contactClient": {
      "name": String,
      "phone": String,
      "email": String
    }
  }
```

### Update an appointment for an agent
  * PATCH "/mortgageAPI/agent/:name/appointment"
**Route Paramaters:**
  * "name" the agent's name
**Success Status Code:** "204"
**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
  {
    "contactAgent": {
      "name": String,
      "phone": String,
      "email": String
    },
    "contactClient": {
      "name": String,
      "phone": String,
      "email": String
    }
  }
```

### Delete an appointment for an agent
  * DELETE "/mortgageAPI/agent/:name/appointment/:client"
**Route Paramaters:**
  * "name" the agent's name
  * "client" the name of the client who's appointment will be deleted
**Success Status Code:** "204"

