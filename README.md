# shipit-nvm

A set of tasks for [Shipit](https://github.com/shipitjs/shipit) used for [nvm](https://github.com/creationix/nvm) specific tasks.

**Features:**

- Automatically sets a default node version. (`nvm alias default` triggered on `updated`,`fetched` or a custom event. *See options below.*)
- Works with [shipit-deploy](https://github.com/shipitjs/shipit-deploy), [shipit-npm](https://github.com/callerc1/shipit-npm) and [shipit-shared](https://github.com/timkelty/shipit-shared)
- Gets node version from `.nvmrc`
- Can Unalias/Clean up default node version. (`nvm unalias default` triggered on custom event. *See options below.*)
- Has a direct pass though task to [nvm](https://github.com/creationix/nvm) commands.
- Works via [shipit-cli](https://github.com/shipitjs/shipit) and [grunt-shipit](https://github.com/shipitjs/grunt-shipit)

## Install

```
npm install shipit-nvm
```

## Usage

Just simply run: (This triggers the `nvm` specific tasks on the events mentioned previously. No additional config necessary.)

```
shipit staging deploy

```

Or you can run the tasks separately :

```
  shipit staging nvm:init nvm:alias-default
  shipit staging nvm:init nvm:unalias-default
  shipit staging nvm:run --cmd "update"
```


## Options `shipit.config.nvm`

### `nvm.remote`

Type: `Boolean`
Default: `true`

A Boolean to determine whether to run the task in local workspace or on the remote. **NOTE:** if used with [shipit-npm](https://github.com/callerc1/shipit-npm) the *npm.remote* option takes precedence over this one.

### `nvm.sh`

Type: `String`
Default: *`'/usr/local/nvm/nvm.sh'`*

An string specifying the absolute path to the **nvm.sh** file (see [nvm readme](https://github.com/creationix/nvm/blob/master/README.markdown) for more info).

### `nvm.triggerEvents`
#### `nvm.triggerEvents.aliasDefault`

Type: `String`,`Boolean`
Default: `updated` or `fetched` (depending on `nvm.remote` value)

An event name that triggers `nvm:alias-default`. Can be set to false to prevent the `nvm:alias-default` task from being fired.

#### `nvm.triggerEvents.unaliasDefault`

Type: `String`,`Boolean`
Default: `false`

An event name that triggers `nvm:unalias-default`.

### Example `shipitfile.js` options usage

```js
module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-nvm')(shipit);

  shipit.initConfig({
    default: {
      nvm: {
        remote: false,
        sh: '~/.nvm/nvm.sh',
        triggerEvents: {
          unaliasDefault: 'npm_installed'
        }
      }
    }
  });
};
```

## License

MIT
