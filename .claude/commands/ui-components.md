---
description: Create a UI component in the src/ui directory
argument-hint: component name | component summary 
---

## Context

Parse $ARGUMENTS to get the following values:
- [name]: Component name from $ARGUMENTS, converted to PascalCase
- [summary]: Component summary from $ARGUMENTS

## Task

Make a UI component according to the [name] and [summary] provided, following these instructions:

- Create the component file in the `src/ui/[name]/[name].tsx` directory.
- Use a functional component with the name [name].
- Reference the [summary] when making the component.

## Variants

- Add the following variants for the component using the colors from the theme variables in the @src/app/globals.css
  file. 
  - Primary
  - Secondary
  - Success
  - Danger
  - Warning

- Support a common pattern like disabled states and sizes when appropriate (sm, md, lg, default to md when no preferences passed).

## Testing

- Make a test file for the component to test basic use cases.
- Run tests and iterate until all tests pass.

## Previews

- Add the component to the `src/app/preview/page.tsx` file, o it can be viewed in the browser, and use multiple variants.
- Do not add the components to any other page.