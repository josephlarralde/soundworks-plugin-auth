# soundworks-plugin-auth

### soundworks plugin allowing to password protect soundworks clients

## server side example

```es6
// src/server/index.js

import pluginAuthFactory from 'soundworks-plugin-auth/server';
import ProtectedExperience from './ProtectedExperience';
//...
server.pluginManager.register('auth', pluginAuthFactory, {
  password: config.env.password,
}, []);
//...
(async function launch() {
  //...
})();
```

```es6
// src/server/ProtectedExperience.js

import { AbstractExperience } from '@soundworks/core/server';

class ProtectedExperience extends AbstractExperience {
  constructor(server, clientTypes, options = {}) {
    super(server, clientTypes);
    this.auth = this.require('auth');
  }
  //...
}

export default ProtectedExperience;
```

## client side example

```es6
// src/clients/protected/index.js

import pluginAuthFactory from 'soundworks-plugin-auth/client';
import ProtectedExperience from './ProtectedExperience.js';
// ...
async function launch($container) {
  try {
    const client = new Client();
    client.pluginManager.register('auth', pluginAuthFactory, {});
    // ...
    return Promise.resolve();
  } catch(err) {
    console.error(err);
  }
}

const $container = document.querySelector('#__soundworks-container');
launch($container);
```

```es6
// src/clients/protected/ProtectedExperience.js

import { AbstractExperience } from '@soundworks/core/client';
// for now use github.com/josephlarralde/soundworks-template-helpers :
import renderInitializationScreens from 'soundworks-template-helpers/client/render-initialization-screens.js';

class ProtectedExperience extends AbstractExperience {
  constructor(client, config, $container) {
    super(client);
    this.config = config;
    this.$container = $container;
    this.auth = this.require('auth');
    renderInitializationScreens(client, config, $container);
  }
  //...
}

export default ProtectedExperience;
```