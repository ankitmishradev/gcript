# GUS - Git Utility Script

A typed nodejs cli tool to automate daily used git processes and provide utilities based on git.

To get more understanding of gus read this doc:

- [Installation](#installation)
- [Commands](#commands)
  - [How to use commands](#how-to-use-commands)
  - [Run command](#run-command)
    - [Syntax](#syntax)
    - [Options](#options)
    - [How it automate the process](#how-it-automate-process)
  - [Config command](#config-command)

## Installation

Install gus as a global npm package and then you will be able to use gus for any project on your machine. But if you wish to install it in a specific project, install it as a dev dependency because there is no need for gus when your project is in production.

Install using `npm`

```cmd
npm i -g gus
```

Install using `yarn`

```cmd
yarn global add gus
```

## Commands

Gus provides commands to do operation such as running the main thread or configuring the gus etc. These commands can be further configured for a specific use case using option flags or global configurations.

### How to use commands

To use gus commands simply right the gus command in your terminal or cmd as shown below:

```terminal
gus <command> [options]
```

### Run command

Run command is like main thread of gus. Run command simplifies the add, commit and push git process. Gus is smart enough to figure out what is necassry and only focus on that.

#### Syntax

```cmd
gus run [options]
```

#### Options

- `-b | --branch <branch>` : Use this option to use another branch for `git push` process. By default gus uses `main` branch for `git push` process.
- `-f | --file <...files>` : Use this option to only include specified files in the `git add` process. You can specify multiple files with this option by separating file names with a whitespace. For example: `gus run -f file1.js file2.js`. In the absence of this option gus will execute `git add .` command.
- `-m | --message <message>` : Use this option to specify a commit message. In absence of this option gus will stop the process at `git commit` command and ask you to enter a commit message.
- `-r |--remote <remote>` : Use this option to specify a remote for `git push` process. In absence of this option, gus will check the current remotes available in that repository. If gus will not find any remotes it will ask you to add a remote otherwise it will display the list of available remotes and ask you to choose one unless you have set global configuration for `remote` property or the `origin` remote is available.

#### How it automate the process

When you run the command `gus run`, gus will detect if there is any git repository present from where you ran the command. If it will not find any git repository, gus will initialize a git repository. So there is no need to worry about whether you are using the `gus run` command inside a git repository or not. Gus automatically suggest you to add a remote, if it will not find any remote in the repository. Gus uses better cli to let you pass commit message and interact with remotes.

### Config command

Use configuration command to view or set global configurations for gus.

#### Syntax

```cmd
gus config [options]
```
