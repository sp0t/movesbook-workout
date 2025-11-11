# Movesbook Workspace Skeleton

## Overview

The current iteration establishes a Next.js 15 foundation tailored to the new Movesbook workout experience. It delivers:

- A three-column workspace shell with a reusable header/banner and footer.
- Placeholder left/right sidebars whose copy is served through the i18n layer.
- A central content surface ready to host the upcoming day → workout → moveframe → movelap grids.
- A dedicated login screen wired through a Next.js API proxy that authenticates against `movesbook.net`.
- An extensible translation pipeline (English + Italian seed dictionaries, context provider, and language switcher).

## Key Paths

- `src/app/layout.tsx` — Registers the `LanguageProvider` and global fonts/styles.
- `src/components/layout` — Contains atomic layout pieces (`AppHeader`, `PrimarySidebar`, `SecondarySidebar`, `MainContentPlaceholder`, `WorkspaceShell`).
- `src/modules/i18n` — Holds dictionaries, provider, and UI switcher.
- `src/app/(auth)/login/page.tsx` — Standalone login view that mirrors the brand surface.

## Next Suggested Milestones

1. **Data Layer**
   - Define schemas for days, workouts, moveframes, and movelaps.
   - Expose typed API routes (REST or tRPC) to feed the workspace.
   - Seed sample data to drive mocked UI states (empty day, partially planned day, completed day).

2. **Interactive Grid**
   - Replace the central placeholder with collapsible sections for days → workouts → moveframes → movelaps.
   - Implement drag/reorder + resize behaviour with persisted preferences (per user).
   - Surface day/workout metadata drawers (period, weather, HR, etc.).

3. **Settings**
   - Wire the color/text selectors from the “Backgrounds” menu to CSS variables.
   - Scaffold CRUD interfaces for Periods, Workout Sections, Main Sports, and Favourites lists.
   - Connect the language admin grid to the provider (auto-registering new keys).

4. **Access Control Enhancements**
   - Enrich the new session middleware with role-aware redirects and graceful session refresh.
   - Prepare API contracts consumable by the existing React Native client.

### Environment

- `MOVESBOOK_BASE_URL` (optional): override the upstream hostname; defaults to `https://movesbook.net`.

Routes under `/api/auth/*` proxy credentials and logout requests, storing the upstream `PHPSESSID` inside the secure `movesbook_session` cookie (the cookie is `Secure` only in production so local development over `http://localhost` works).

Document updates should continue to live inside `docs/` as the project gains new modules.

