# @project-sunbird/sb-tag-manager

## Table of Contents

1. [Overview](#overview)
1. [Installation](#installation)
1. [Getting Started](#getting-started)
1. [Services](#services)
   1. [SBTagService](#SBTagService)

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
