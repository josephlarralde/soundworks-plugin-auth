"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const pluginFactory = function (AbstractPlugin) {
  return class PluginAuth extends AbstractPlugin {
    constructor(client, name, options) {
      super(client, name);
      const defaults = {};
      this.definitions = {};
      this.data = {};
      this.options = this.configure(defaults, options);
      this.sendPassword = this.sendPassword.bind(this);
      this.listener = null;
    }

    async start() {
      const onServerAck = ok => {
        if (this.listener) {
          this.listener(ok);
        }

        if (ok) {
          this.client.socket.removeListener(`s:${this.name}:ack`, onServerAck);
          this.ready();
        }
      };

      this.client.socket.addListener(`s:${this.name}:ack`, onServerAck);
      this.started();
    }

    setServerAckListener(listener) {
      this.listener = listener;
    }

    sendPassword(password) {
      this.client.socket.send(`s:${this.name}:password`, password);
    }

  };
};

var _default = pluginFactory;
exports.default = _default;