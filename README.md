![npm](https://img.shields.io/npm/v/gcript)
[![build](https://github.com/ankitmishradev/gcript/actions/workflows/build.yml/badge.svg)](https://github.com/ankitmishradev/gcript/actions/workflows/build.yml)
[![CodeFactor](https://www.codefactor.io/repository/github/ankitmishradev/gcript/badge)](https://www.codefactor.io/repository/github/ankitmishradev/gcript)
![npm](https://img.shields.io/npm/dm/gcript)
![GitHub repo size](https://img.shields.io/github/repo-size/ankitmishradev/gcript?label=size)
![Typescript](https://img.shields.io/github/languages/top/ankitmishradev/gcript)
![MIT License](https://img.shields.io/github/license/ankitmishradev/gcript)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/ankitmishradev/gcript)

# Gcript

A nodejs cli tool to automate daily used git processes and provide utilities based on git.

To get more understanding of gcript read this documentation:

- [Installation](#installation)
- [Commands](#commands)

  - [How to use commands](#how-to-use-commands)
  - [Run command](#run-command)
    - [Usage](#usage)
    - [Options](#options)
  - [Config command](#config-command)
    - [Usage](#usage)
    - [Properties](#properties)
    - [Options](#options)
  - [Help command](#help-command)
    - [Usage](#usage)
  - [Upgrade command](#upgrade-command)

    - [Usage](#usage)

  - [Version command](#version-command)
    - [Usage](#usage)

- [Global options](#global-option)
  - [Usage](#usage)
  - [List](#list)
- [Changelog](#changelog)
- [Contributions](#contribution)

## Installation

Install gcript as a global npm package and then you will be able to use gcript for any project on your machine. But if you wish to install it in a specific project, install it as a dev dependency because there is no need for gcript when your project is in production.

Install using `npm`

```cmd
npm i -g gcript
```

Install using `yarn`

```cmd
yarn global add gcript
```

> Please make sure to install gcript either as global or local package otherwise conflict between local and global package might introduce unexpected behaviors.

## Commands

Gus provides commands to do operation such as running the main thread or configuring the gcript etc. These commands can be further configured for a specific use case using command options or global configurations.

### How to use commands

To use gcript commands simply right the gcript command in your terminal or cmd as shown below:

```terminal
gcript <command> [options]
```

### Run command

Run command is like main thread of gcript. Run command automatically chains and execute the git add, commit and push commands with all the extra information these commands need. In this chain of process gcript will only execute commands that are necessary. For example, if all files and changes are already staged, gcript will not execute git add command. Failing of any command in this chain will kill the further process. When you run this command, gcript will automatically check if there is a git repository present from where you ran the command. If it will not find any git repository, gcript will initialize a git repository for you. So there is no need to worry about whether you are using the `gcript run` command inside a git repository or not. Gus will automatically suggest you to add a remote, if it will not find any remotes in the repository.

#### Usage

```cmd
gcript run [options]
```

#### Options

- `-b | --branch <branch>` : Use this option to use another branch for git push command in the chain of process. By default gcript uses `main` branch for git push command.
- `-f | --file <...files>` : Use this option to only include specified files in the git add command in the chain of process. You can specify multiple files with this option by separating file names with a whitespace. For example: `gcript run -f file1.js file2.js`. In the absence of this option gcript will execute `git add .` command.
- `-m | --message <message>` : Use this option to specify a commit message. In the absence of this option gcript will stop the chain of process at git commit command and ask you to enter a commit message and resume the process as per your response.
- `-r |--remote <remote>` : Use this option to specify a remote for git push command in the chain of process. In absence of this option, gcript will check the current remotes available in that repository. If gcript will not find any remotes it will ask you to add a remote otherwise it will display the list of available remotes and ask you to choose one unless you have set global configuration for `remote` property or the `origin` remote is available.

### Config command

Config command deals with global configurations of gcript. It stores the configurations as `json` at the installation location of gcript. Configuration can be changed or viewed at any time using `config` command. Note that local configurations take precedence over global configurations.

#### Usage

```cmd
gcript config [options]
```

#### Properties

- `remote` : Holds the remote that will be used while executing `git push` command in the chain of process. This property is related to [run command](#run-command).
- `branch` : Value of this property will be used while executing `git push` command in the chain of process. This property is related to [run command](#run-command).
- `trace` : If this property is equal to true, after any process complete log will be displayed.

#### Options

- `-s | --set <property=value>` : Use this option to change a global configuration. For example `gcript config --set remote=origin` will set the global configuration property `remote` equal to `origin`.
- `-l | --list [property]` : Use this option to view global configurations. If no property will be specified with this option, gcript will view the all global configuration of gcript. For example `gcript config -l branch` will only display the value of `branch` property while `gcript config -l` will display all global configurations.

### Help command

Help command display the help for the commands. For example `gcript help config` will display help for `config` command.

#### Usage

```cmd
gcript help <command>
```

### Upgrade command

Upgrade command checks the availability of any latest version of gcript and updates the gcript accordingly.

#### Usage

```cmd
gcript upgrade
```

### Version command

Version command displays the current version of gcript along with a notice if any latest version of gcript is available.

#### Usage

```cmd
gcript version
```

## Global options

Global options can be used with all commands of gcript. Global options can be placed after or before command specific options.

### Usage

```cmd
gcript <command> [global-options] [options]
```

### List

- `-t | --trace` : Use this option to see the complete log of process executed by any command of gcript. For example `gcript run -t` will display the complete log at every moment rather than showing a short message.

- `-h | --help` : Use this option to view help for any command of gcript. For example `gcript config -h` will display the help for `config` command , same as `gcript help config`.

## Changelog

Please see the [changelog](https://github.com/ankitmishradev/gcript/blob/main/CHANGELOG.md) to know about changed in the version updates.

## Contributions

Contributions to this project are most welcomed.

If you find bugs or want more features, but don't know how to fix/implement them, please fill an [issue](https://github.com/ankitmishradev/gcript/issues).

If you fixed bugs or implemented new features, please send a [pull request](https://github.com/ankitmishradev/gcript/pulls).
