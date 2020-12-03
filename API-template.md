## Server API

### Create listing
  * POST `/api/listing/:id/mortgage`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      `id`: `Number`,
      `homePrice`: `Number`,
      `agent`: `Object`
    }
```

### Read all data about the mortgage for a listing
  * GET `/api/listing/:id/mortgage`

**Path Paramaters**
  * `id` property listing's id

**Returns** json
```json
    {
      `id`: `Number`,
      `homePrice`: `Number`,
      `agent`: `Object`
    }
```

### Update property listing info
  * PATCH `/api/listing/:id`

**Path Parameters:**
  * `id` property listing's id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      `id`: `Number`,
      `homePrice`: `Number`,
      `agent`: `Object`
    }
```

### Delete property listing
  * DELETE `/api/listing/:id`

**Path Paramaters:**
  * `id` property listing's id

**Success Status Code:** `204`

### Create an agent
  * POST `/api/agent/:name`

**Path Paramaters:**
  * `name` the agent's name

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      `name`: `String`,
      `title`: `String`,
      `phone`: `String`,
      `rating`: `Number`,
      `sales`: `Number`,
      `schedule`: `Object`
    }
```

### Read all data about an agent
  * GET `/api/agent/:name`

**Path Paramaters**
  * `name` the agent's name

**Returns** json
```json
    {
      `name`: `String`,
      `title`: `String`,
      `phone`: `String`,
      `rating`: `Number`,
      `sales`: `Number`,
      `schedule`: `Object`
    }
```

### Update the data about an agent
  * PATCH `/api/agent/:name`

**Path Parameters:**
  * `name` the agent's name

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      `name`: `String`,
      `title`: `String`,
      `phone`: `String`,
      `rating`: `Number`,
      `sales`: `Number`,
      `schedule`: `Object`
    }
```

### Delete an agent
  * DELETE `/api/agent/:name`

**Route Paramaters:**
  * `name` the agent's name

**Success Status Code:** `204`
