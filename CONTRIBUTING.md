# Contributing

This document describes how the development of Python Create is organised.


## Setting up the project

```bash
npm install
npm run start  # Develop mode
```

## Creating a new feature

If you're a member of this project, please create branches in the following format: `feature/PC{issue #}_short_title`.
An example would be `feature/PC16_seo_improvement`.

## Going to production

Verify that the website still works after running the commands below.

```bash
npm run build  # Build source files
firebase emulators:start  # Emulate Firebase components locally
```

Once this is fine, please create a [pull request](https://github.com/bartcode/pythoncreate/compare) and assign it to
one of the contributors.
