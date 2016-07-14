# API Docs
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
        "level" : "string",
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
## Save or Update List
`POST /api/v1/list/:listId`

Will update if list exists, will save new if listid is "new", or doesn't exist.

### Payload
```json
{
  "items" : "[{\"done\":false,\"level\":\"string\",\"title\":\"string\",\"text\":\"string\",\"number\":2}]",
  "title" : "string"
}
```
| Parameter | Type   | Description                                                                                  |
|-----------|--------|----------------------------------------------------------------------------------------------|
| items     | string | JSON encoded array of list item objects. See [JSON list item format](#json-list-item-format) |
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

## JSON List Item Format

```json
{
  "id" : 2,
  "done" : false,
  "level" : "string",
  "title" : "string",
  "text" : "string",
  "number" : 3
}
```

| Parameter | Type   | Description                                                                                  |
|-----------|--------|----------------------------------------------------------------------------------------------|
| done      | bool   | Whether item is finished or not                                                              |
| id        | int    | Unique integer ID of item.                                                                   |
| level     | string | String form of item priority level. "normal", "moderate", or "important"                     |
| number    | int    | Number index of item on list. 1 - infinity                                                   |
| title     | string | Title of item                                                                                |
| text      | string | Text  of item                                                                                |
