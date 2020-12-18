# Server API

## ENDPOINTS REFERENCE
### Primary Queries
  * POST "/mortageAPI/main"
  * GET "/mortageAPI/main"
### Secondary Queries (not required)
  * POST "/mortgageAPI/property"
  * GET "/mortgageAPI/property/:id"
  * PATCH "/mortgageAPI/property/:id"
  * DELETE "/mortgageAPI/property/:id"
  * POST "/mortgageAPI/agent/:id"
  * GET "/mortgageAPI/agent/:id"
  * PATCH "/mortgageAPI/agent/:id"
  * DELETE "/mortgageAPI/agent/:id"
  * POST "/mortgageAPI/agent/:agent_id/property/:property_id"
  * DELETE "/mortgageAPI/agent/:agent_id/property/:property_id"
  * POST "/mortgageAPI/agent/:id/appointment"
  * PATCH "/mortgageAPI/agent/:id/appointment"
  * DELETE "/mortgageAPI/agent/:id/appointment/:client"

## PRIMARY QUERIES

### Create a property, Create agents associated with it, associate existing agents to it.
  * POST "/mortageAPI/main"
**Success Status Code:** "201"
**Request Body:** json with keys...
```json
    {
      "property": {
        Property Object, less property_id
      },
      "agents": {
        "new": [{Agent Objects, less agent_id}],
        "existing" [Number]:
      }
    }
```



## PROPERTIES

### Create a Property
  * POST "/mortgageAPI/property"
**Success Status Code:** "201"
**Request Body:** json with keys...
```json
    {
      "property_id": Number,
      "price": Number,
      "beds": Number,
      "baths": Number,
      "address": String,
      "hoa": {
        "name": String,
        "fee": Number
      },
      "agents": [Number], // 2-way embeddeing, with ids as foreign keys
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
  * PATCH "/mortgageAPI/property/:id"
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
  * DELETE "/mortgageAPI/property/:id"
**Path Paramaters:**
  * "id" property listing"s id
**Success Status Code:** "204"

## AGENTS

### Create an agent
  * POST "/mortgageAPI/agent/:id"
**Path Paramaters:**
  * "id"  the agent's id
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
  * GET "/mortgageAPI/agent/:id"
**Path Paramaters**
  * "id"  the agent's id
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
  * PATCH "/mortgageAPI/agent/:id"
**Path Parameters:**
  * "id"  the agent's id
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
  * DELETE "/mortgageAPI/agent/:id"
**Route Paramaters:**
  * "id"  the agent's id
**Success Status Code:** "204"

### Associate an agent with a property listing
  * POST "/mortgageAPI/agent/:agent_id/property/:property_id"
**Route Paramaters:**
  * "agent_id", number
  * "property_id", number
**Success Status Code:** "201"

### Disaassociate an agent from a property listing
  * DELETE "/mortgageAPI/agent/:agent_id/property/:property_id"
**Route Paramaters:**
  * "agent_id", number
  * "property_id", number
**Success Status Code:** "204"


## APPOINTMENTS

### Book an appointment for an agent
  * POST "/mortgageAPI/agent/:id/appointment"
**Route Paramaters:**
  * "id"  the agent's id
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
    },
    "date": Date,
    "inPerson": Boolean,
    "zoom":  String,
  }
```

### Update an appointment for an agent
  * PATCH "/mortgageAPI/agent/:agent_id/appointment/:appointment_id"
**Route Paramaters:**
  * "agent_id" number
  * "appointment_id" number
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
  * DELETE "/mortgageAPI/agent/:id/appointment/:client"
**Route Paramaters:**
  * "id"  the agent's id
  * "client" the name of the client who's appointment will be deleted
**Success Status Code:** "204"