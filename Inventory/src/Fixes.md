# Users

This document explains the decisions and optimizations implemented in the User module.

## 1. Separation of Concerns

Separated the code into four layers to ensure maintainability and testability:

- **Services**: Handles fetching the API `userService.js`

- **Business Logic Hook**: Manages state. `useUsers.js`

- **UI Components**: Reusable, pure UI elements. They receive data through props.
- **Pages**: Build the final layout.

## 2. Performance Optimizations

### Memoization

- **`React.memo`**: Applied to `UserList`, `UserItem`, and `UserDetails` to prevent unnecessary re-renders when their parent state changes but their own props remain the same.
- **`useMemo`**: Used to cache the results of expensive operations, such as filtering the user list, so they only re-run when dependencies (`users` or `search` query) change.
- **`useCallback`**: Used to provide stable function references to child components, ensuring that memoized children don't re-render due to function recreation.

- By separating `UserItem` from `UserList`, ensuring that selecting a single user only triggers updates for the affected items, keeping the UI smooth.

## 3. Interaction Optimizations

Implemented a Debouncing in the `UserSearch` component.

## 4. Responsive Data Display

The user details view utilizes a responsive design that:

- Appears as a dedicated sidebar on large screens.

- Collapses elegantly directly under the selected user on mobile devices, providing a seamless "accordion-like" experience.

## 5. Visual Feedback

- Added subtle animations.
