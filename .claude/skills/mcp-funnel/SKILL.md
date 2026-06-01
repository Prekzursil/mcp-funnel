```markdown
# mcp-funnel Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches you the core development patterns and conventions used in the `mcp-funnel` TypeScript codebase. You'll learn about file naming, import/export styles, commit message conventions, and how to write and organize tests. While no automated workflows were detected, this guide provides best practices and suggested commands for common development tasks.

## Coding Conventions

### File Naming
- Use **camelCase** for all file names.
  - Example: `dataProcessor.ts`, `userService.ts`

### Imports
- Use **relative imports** for referencing other modules within the project.
  - Example:
    ```typescript
    import { fetchData } from './apiClient';
    ```

### Exports
- Prefer **named exports** over default exports.
  - Example:
    ```typescript
    // Good
    export function processData() { ... }
    export const CONSTANT = 42;

    // Avoid
    export default function processData() { ... }
    ```

### Commit Messages
- Follow the **Conventional Commits** specification.
- Use the `chore` prefix for non-feature, non-fix changes.
  - Example:
    ```
    chore: update dependencies to latest versions
    ```

## Workflows

### Creating a New Module
**Trigger:** When adding a new feature or utility
**Command:** `/new-module`

1. Create a new file using camelCase naming (e.g., `myFeature.ts`).
2. Use named exports for all functions/constants.
3. Import dependencies using relative paths.
4. Add corresponding test file as `myFeature.test.ts`.

### Writing a Commit
**Trigger:** When committing changes
**Command:** `/commit`

1. Write a commit message using the Conventional Commits format.
   - Start with a type (e.g., `chore:`), followed by a concise description.
   - Example: `chore: refactor data processing logic`

### Adding a Test
**Trigger:** When adding or updating functionality
**Command:** `/add-test`

1. Create a test file named `<module>.test.ts` alongside the module.
2. Write tests using the project's chosen (unknown) testing framework.
3. Use named imports for tested functions.

## Testing Patterns

- Test files follow the `*.test.*` naming convention.
  - Example: `dataProcessor.test.ts`
- Place test files next to the modules they test or in a dedicated test directory.
- The specific testing framework is not detected, but standard TypeScript test patterns apply.

  Example test file:
  ```typescript
  import { processData } from './processData';

  describe('processData', () => {
    it('should process input correctly', () => {
      const result = processData('input');
      expect(result).toBe('expectedOutput');
    });
  });
  ```

## Commands
| Command        | Purpose                                  |
|----------------|------------------------------------------|
| /new-module    | Scaffold a new module with conventions   |
| /commit        | Format and write a conventional commit   |
| /add-test      | Add a test file for a module             |
```
