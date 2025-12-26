# @se-oss/typeof

[![CI](https://github.com/shahradelahi/ts-typeof/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/shahradelahi/ts-typeof/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/@se-oss/typeof.svg)](https://www.npmjs.com/package/@se-oss/typeof)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](/LICENSE)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@se-oss/typeof)
[![Install Size](https://packagephobia.com/badge?p=@se-oss/typeof)](https://packagephobia.com/result?p=@se-oss/typeof)

_@se-oss/typeof_ is a robust utility for determining the runtime type of any JavaScript value.

---

- [Installation](#-installation)
- [Usage](#-usage)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#license)

## 📦 Installation

```bash
npm install @se-oss/typeof
```

<details>
<summary>Install using your favorite package manager</summary>

**pnpm**

```bash
pnpm install @se-oss/typeof
```

**yarn**

```bash
yarn add @se-oss/typeof
```

</details>

## 📖 Usage

### Basic Usage

```typescript
import { typeOf } from '@se-oss/typeof';

typeOf(undefined); // 'undefined'
typeOf(null); // 'null'
typeOf(true); // 'boolean'
typeOf('hello'); // 'string'
typeOf(123); // 'number'
typeOf([]); // 'array'
typeOf({}); // 'object'
typeOf(new Date()); // 'date'
typeOf(/abc/); // 'regexp'
```

### TypeScript Support

The library provides a `TypeOf<T>` conditional type that maps TypeScript types to their runtime string representations.

```typescript
import type { TypeOf } from '@se-oss/typeof';

type MyType = TypeOf<string>; // 'string'
type MyDate = TypeOf<Date>; // 'date'
```

The `typeOf` function also utilizes this type for better return type inference:

```typescript
const result = typeOf('hello'); // Inferred as 'string'
```

## 📚 Documentation

For all configuration options, please see [the API docs](https://www.jsdocs.io/package/@se-oss/typeof).

## 🤝 Contributing

Want to contribute? Awesome! To show your support is to star the project, or to raise issues on [GitHub](https://github.com/shahradelahi/ts-typeof).

Thanks again for your support, it is much appreciated! 🙏

## License

[MIT](/LICENSE) © [Shahrad Elahi](https://github.com/shahradelahi) and [contributors](https://github.com/shahradelahi/ts-typeof/graphs/contributors).
