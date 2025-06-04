# @project-sunbird/sb-tag-manager

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [Services](#services)
   1. [SBTagService](#SBTagService)
5. [Development](#development)
   - [Code Quality](#code-quality)
   - [Package Publishing](#package-publishing)

## Overview
Library is used to create Edge Computable Tags agnostic to project,framework choice. This works like a Open Specification to enable clients to generate Tags and Evaluate these tags against a criteria from server.

## Installation
1. Install the library in the project as follows :

```
npm i @project-sunbird/sb-tag-manager
```
## Getting Started
1. Navigate to App Component (or) Equivalent module and add the following import

```
import { SBTagModule } from 'sb-tag-manager';
```

2. Initialise the Library
```
let instance = SBTagModule.instance;
instance.init();
```
## Services
### SBTagService
1. Tag Interface Methods
```
instance.SBTagService.pushTag({object},"prefix_string");
instance.SBTagService.getTags("prefix_string");
instance.SBTagService.getAllTags();
instance.SBTagService.removeTag("prefix_string");
instance.SBTagService.removeAll();
```
## Development

### Code Quality

The project maintains code quality through automated checks that run on every pull request:

1. **Linting**
   - Runs ESLint to check code style and quality
   - Command: `npm run lint`

2. **Dependencies**
   - Uses `npm ci` for deterministic installations
   - GitHub Actions cache for faster builds

3. **Code Formatting**
   - Ensures consistent code formatting
   - Can be automatically fixed using `npm run lint:fix`

These checks ensure consistent code style and secure dependency management.

### Package Publishing

Workflow automatically builds and publishes NPM packages whenever a new tag is pushed to the repository.

Key features of the workflow:
1. Automatically builds the project
2. Creates NPM package
3. Publishes to NPM registry using NPM authentication token (must be provided as GitHub secret `NPM_TOKEN`)