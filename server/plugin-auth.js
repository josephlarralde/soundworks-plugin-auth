"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const pluginFactory = function (AbstractPlugin) {
  return class PluginAuth extends AbstractPlugin {
    constructor(server, name, options) {
      super(server, name);
      const defaults = {
        password: 'azerty'
      };
      this.options = this.configure(defaults, options);
    }

    start() {
      this.started();
      this.ready();
    }

    connect(client) {
      super.connect(client);

      const processPassword = p => {
        if (p.password === this.options.password) {
          client.socket.send(`s:${this.name}:ack`, true);
          client.socket.removeListener(`s:${this.name}:password`, processPassword);
        } else {
          client.socket.send(`s:${this.name}:ack`, false);
        }
      };

      client.socket.addListener(`s:${this.name}:password`, processPassword);
    }

  };
};

var _default = pluginFactory;
exports.default = _default;