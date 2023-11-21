
# Hocket

> A WebSocket-like API that operates on HTTP "REST" API.

## About

Hocket is a WebSocket-like communication API that utilizes HTTP instead of the popular WebSocket protocol. *It's just WebSocket*, sometimes.

## How it works

WebSocket communication typically involves two actions: sending a message and getting a message. Hocket achieves this using two REST endpoints:

- `/api/send/:topic` - **POST**
  Posts a message to a topic.
- `/api/get/:topic` - **GET**
  Retrieves the latest message from a topic.
- `/api/get_all/:topic` (*extra*) - **GET**
  Retrieves all the messages from a topic.
- `/api/delete/:topic` (*extra*) - **DELETE**
  Deletes the topic.

## Example

### **POST**

**URL:** <https://myhostedhocket.com/api/send/cooking>
**Request:**

```json
{
 "author": "Joe Mama",         // Required
 "content": "Hello there!",    // Required
 "attachments": ["<base64 data>"] // Optional
}
```

**Response:**

```json
{
 "status": "success"
}
```

### **GET**

**URL:** <https://myhostedhocket.com/api/get/cooking>
**Response:**

```json
{
 "status": "success",
 "data": {
  "author": "Joe Mama",         // Required
  "content": "Hello there!",    // Required
  "attachments": ["<base64 data>"] // Optional
 }
}
```

## Miscellaneous

### Why was this made?

Because normal WebSocket communication for my totally legit projects might've been sus for Windows Defender.
