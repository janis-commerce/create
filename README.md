# :package: JanisCommerce Package Initializer

![Build Status](https://github.com/janis-commerce/create/workflows/Build%20Status/badge.svg)
[![npm version](https://badge.fury.io/js/%40janiscommerce%2Fcreate.svg)](https://www.npmjs.com/package/@janiscommerce/create)
<!-- [![Coverage Status](https://coveralls.io/repos/github/janis-commerce/create/badge.svg?branch=master)](https://coveralls.io/github/janis-commerce/create?branch=master) -->

A package initializer for [@janiscommerce](https://www.npmjs.com/~janiscommerce) npm packages

## :hammer: Usage

```bash
npx @janiscommerce/create <package-name>
```

Or

```bash
npm init @janiscommerce <package-name>
```

## :mag: Get help on the CLI

You can also see the following docs within the CLI by running `npx @janiscommerce/create --help`

## :round_pushpin: Positional arguments

### package-name

Defines the name of the package to create. It will be automatically prefixed with the scope `@janiscommerce/`.

**Example** `npx @janiscommerce/create cool-demo`

> This will create the `@janiscommerce/cool-demo` package

## :wrench: Options

> Every named option can be passed as a command line argument or set as an environment variable (prefixed with `JANISCOMMERCE_CREATE_`).
>
> For example, `verbose` option can be passed as `--verbose` as a CLI argument or set as `JANISCOMMERCE_CREATE_VERBOSE=true` env var.

### `--description` (alias `-d`)

Sets the package description both in the package.json and README.md

**Example** `npx @janiscommerce/create cool-demo --description 'A cool package for a simple demo'`
**Example** `npx @janiscommerce/create cool-demo -d 'A cool package for a simple demo'`

### `remote-type` (alias `-r`)

Selects how will the git remote be configured. Options are `ssh` (default) or `http`.

**Example** `npx @janiscommerce/create cool-demo --remote-type http`
**Example** `npx @janiscommerce/create cool-demo -r http`

### `github-username` (alias `-u`)

You can set you github username in the remote so you don't have to type it each time (`http` remote type only).

**Example** `npx @janiscommerce/create cool-demo --remote-type http --github-username janis-commerce-admin`
**Example** `npx @janiscommerce/create cool-demo --remote-type http -u janis-commerce-admin`

### Other options

- `--verbose` or `-V`: Print verbose output
- `--version` or `-v`: Show the package version
- `--help` or `-h`: Show the package help page
