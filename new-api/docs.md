# API Docs

**Table of Contents**

- [Get info for specific list](#get-info-for-specific-list)
- [Save List or Update List Title](#save-list-or-update-list-title)
- [Save or Update List Item](#save-or-update-list-item)
- [Delete single list item](#delete-single-list-item)
- [Delete All Items on List](#delete-all-items-on-list)
- [JSON List Item Format](#json-list-item-format)

&nbsp;

***



&nbsp;
## Get info for specific list
`GET /api/v1/list/:listId`

### Payload
```json
{
  "username" : "string",
  "password" : "string"
}
```
###### * Currently there is no authentication, so you dont have to send anything

### Response

##### List Found:
`GET /api/v1/list/asdf/`
```json
{
  "error" : null,
  "info" : {
    "id" : "string",
    "items" : [
      {
        "done" : false,
        "id" : 23,
        "priority" : "string",
        "number" : 2,
        "text" : "string",
        "title" : "string"
      }
    ],
    "title" : "string"
  },
  "statusCode" : 200,
  "success" : true
}
```
&nbsp;
&nbsp;
##### List not found:
`GET /api/v1/list/sdfasdkfjsad/`
```json
{
  "error" : "List not found",
  "info" : {},
  "statusCode" : 404,
  "success" : false
}
```
&nbsp;

***

&nbsp;
## Save List or Update List Title
`POST /api/v1/list/:listId`

Will update if list exists, will save new if listid is "new", or doesn't exist.

### Payload
```json
{
  "title" : "string"
}
```
| Parameter | Type   | Description                                                                                  |
|-----------|--------|----------------------------------------------------------------------------------------------|
| title     | string | Title of list                                                                                |

&nbsp;

### Response

##### List Found:
`GET /api/v1/list/asdf/`
```json
{
  "error" : null,
  "statusCode" : 200,
  "success" : true,
  "url" : "string"
}
```
&nbsp;

***

&nbsp;
## Save or Update List Item
`POST /api/v1/:listId/tasks/:taskId`

Will update if item exists, will save new if item doesn't exist.

### Payload
```json
{
  "title" : "string",
  "text" : "string",
  "done" : false,
  "number" : 2,
  "priority" : "string"
}
```
| Parameter | Type   | Description                                                                                  |
|-----------|--------|----------------------------------------------------------------------------------------------|
| done      | bool   | Whether item is finished or not                                                              |
| priority  | string | String form of item priority level. "normal", "moderate", or "important"                     |
| number    | int    | Number index of item on list. 1 - infinity                                                   |
| title     | string | Title of item                                                                                |
| text      | string | Text  of item                                                                                |

&nbsp;

### Response

##### List Found:
`GET /api/v1/list/asdf/`
```json
{
  "error" : null,
  "payload" : {
    "id" : 232
  },
  "success" : true
}
```

&nbsp;

***

&nbsp;
## Delete single list item
`DELETE /api/v1/:listId/tasks/:taskId`

Will delete item

### Payload
```json
{}
```

&nbsp;

### Response

##### List Found:
`GET /api/v1/list/asdf/`
```json
{
  "error" : null,
  "payload" : {},
  "success" : true
}
```
&nbsp;

***

&nbsp;
## Delete All Items on List
`DELETE /api/v1/:listId/tasks/`

Delete all items on list

### Payload
```json
{}
```

&nbsp;

### Response

##### List Found:
`GET /api/v1/list/asdf/`
```json
{
  "error" : null,
  "payload" : {},
  "success" : true
}
```
&nbsp;

***

&nbsp;
## JSON List Item Format

```json
{
  "id" : 2,
  "done" : false,
  "priority" : "string",
  "title" : "string",
  "text" : "string",
  "number" : 3
}
```

| Parameter | Type   | Description                                                                                  |
|-----------|--------|----------------------------------------------------------------------------------------------|
| done      | bool   | Whether item is finished or not                                                              |
| id        | int    | Unique integer ID of item. Sent from server.                                                 |
| priority  | string | String form of item priority level. "normal", "moderate", or "important"                     |
| number    | int    | Number index of item on list. 1 - infinity                                                   |
| title     | string | Title of item                                                                                |
| text      | string | Text  of item                                                                                |
