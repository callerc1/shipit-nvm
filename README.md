# shipit-nvm

A set of tasks for [Shipit](https://github.com/shipitjs/shipit) used for [nvm](https://github.com/creationix/nvm) specific tasks.

**Features:**

- Automatically sets/unsets a default version of node to use pre and post `npm install` respectively
- Gets node version from `.nvmrc`
- Sets default node version (`nvm alias default`) triggered on the `npm_preinstall` event from [shipit-npm](https://github.com/callerc1/shipit-npm)
- Unalias/Cleans up default node version (`nvm unalias default`) triggered on the `npm_installed` event from [shipit-npm](https://github.com/callerc1/shipit-npm)
- Has a direct pass though task to [nvm](https://github.com/creationix/nvm) commands.
- Works via [shipit-cli](https://github.com/shipitjs/shipit) and [grunt-shipit](https://github.com/shipitjs/grunt-shipit)

## Install

```
nvm install shipit-nvm
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

A Boolean to determine whether to run the task in local workspace or on the remote.

### `nvm.sh`

Type: `String`
Default: *`'/usr/local/nvm/nvm.sh'`*

An string specifying the absolute path to the **nvm.sh** file (see [nvm readme](https://github.com/creationix/nvm/blob/master/README.markdown) for more info).


### Example `shipitfile.js` options usage

```js
module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-nvm')(shipit);

  shipit.initConfig({
    default: {
      nvm: {
        remote: false,
        sh: '~/.nvm/nvm.sh'
      }
    }
  });
};
```

## License

MIT
