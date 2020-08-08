# `jsonrpc-api`

A simple Json-RPC API framework base on koa.

## Usage

### 1 Create a folder where controllers will be placed.
```
mkdir controllers
```

### 2 Create controllers under the folder created above.

#### 2.1 Example of using javascript:
```javascript
// controllers/A.js
const { ControllerBase } = require('@happapi/jsonrpc-api');

class A extends ControllerBase { // Classname should be the same as filename
  static paramsSchema() {
    // Return a json-schema object used to varify jsonprc params. Empty object by default.
    return {};
  }

  async main() {
    // Do stuff and return result
    return { message: 'success', requestBody: this.body, jsonrpcParams: this.params };
  }
}
module.exports = { A }; // Make class A under the exported object
```

#### 2.2 Example of using typescript:
```typescript
// controllers/A.ts
import { ControllerBase } from '@happapi/jsonrpc-api';

export class A extends ControllerBase {
  async main() {
    // Do stuff and return result
    return { message: 'success' };
  }
}
```

### 3 Start server.
```shell
CONTROLLER_DIR=./controllers npx start-happapi-jsonrpc-server
```
After that, to get all avalible jsonrpc methods:
```
Request: GET /
```
to call method `A`
```
Request: POST /
Request body: {"method": "A", "jsonrpc": "2.0", "id": "1"}
```

## Configurations or `start-happapi-jsonrpc-server`
+ `CONTROLLER_DIR`: Required. Where are controller files placed.
+ `ROUTER_PATH`: Optional. Request path, / by default.
+ `PORT`: Optional. The port the server is listening on, 3003 by default.
+ `BODY_LIMIT`: Optional. The maximun length of body, 10k by default.
