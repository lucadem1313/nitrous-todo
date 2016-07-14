`POST /register`

Create a new user

### Payload
```json
{
  "username" : "string",
  "password" : "string"
}
```

### Response
```json
{
  "success" : true,
  "error" : null,
  "payload" : {}
}
```

`GET /api/tasks`

### Response
```json
{
  "success" : true,
  "error" : null,
  "payload" : [
    {
      "title" : "string",
      "text" : "string",
      "priority" : "int"
    },
    ...
  ]
}
```

`POST /api/task`
### Payload
```json
{
  "title" : "string",
  "text" : "string",
  "priority" : "int"
}
```

### Response
```json
{
  "success" : true,
  "error" : null,
  "payload" : {}
}
```

`DELETE /api/task/:id`
### Response
```json
{
  "success" : true,
  "error" : null,
  "payload" : {}
}





