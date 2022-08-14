Docusaurus Component Library

![npm](https://img.shields.io/npm/v/@philippheuer/docusaurus-components)

=================================

A Docusaurus v2 component library for the default theme.

> Note: this theme plugin requires [Docusaurus v2](https://v2.docusaurus.io/)

## Components

- JavaDependency

## Install

```bash
yarn add @philippheuer/docusaurus-components
```

## Usage

Import the components on-demand in your .mdx files:

```tsx
import { JavaDependency } from '@philippheuer/docusaurus-components';

<JavaDependency group="com.github.twitch4j" name="twitch4j" version="1.11.0" scope="implementation" />
```

## License

Released under the [MIT License](./LICENSE).
