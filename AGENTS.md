# Smart Campus Room Availability

## Project and scope

Continue the existing repaired Smart Campus availability checker. Use fictional booking data and a fixed, explicitly supplied current time for reproducible checks. The application checks availability only. Do not add a backend, database, login, booking creation, persistence or unrelated features.

The assignment describes one room. The initial inspection reports five selectable rooms and a current-time control in the existing app. Record this difference before changing scope. Preserve the existing room fixtures and controls during this refactor, and demonstrate each test scenario with one selected room and a fixed current time.

## Project structure

Verify these paths against the actual files before editing:

- `src/App.tsx`: main page, time inputs and availability-check interaction.
- `src/components/RoomCard.tsx`: room selection tile.
- `src/components/Timeline.tsx`: booking timeline and list.
- `src/components/ResultBanner.tsx`: availability feedback.
- `src/lib/validation.ts`: `checkAvailability`, `labelToMinutes`, `minutesToLabel` and the private `overlaps` helper.
- `src/lib/sampleData.ts`: room and booking fixtures.
- `src/lib/types.ts`: shared types.
- `src/lib/validation.test.ts`: existing Vitest tests.
- `package.json`: scripts and dependencies.

If the actual structure differs, report the difference rather than inventing files or commands.

## Acceptance criteria

- **AC1:** Reject invalid intervals, including `start >= end`, values outside the existing day bounds, and requests that do not start after the supplied current time. Preserve the current boundary checks and validation order.
- **AC2:** Reject durations longer than 120 minutes. Allow exactly 120 minutes when all other checks pass.
- **AC3:** Reject blocked rooms. Preserve the existing behavior for a missing or unknown room.
- **AC4:** Reject overlapping bookings for the selected room. Allow intervals that only touch at endpoints. Bookings for other rooms must not cause a conflict.
- **AC5:** Do not mutate the supplied booking arrays, booking objects or fixtures, whether the decision is available or unavailable.
- **AC6:** Preserve clear feedback and the existing responsive interface on desktop and mobile. Keep the controls and result messages consistent with the current behavior.

## Selected refactoring and engineering rules

The selected problem is duplicated HH:MM-to-minutes conversion in `src/App.tsx`, which reportedly repeats the existing `labelToMinutes` helper in `src/lib/validation.ts`.

Before implementing the replacement, inspect both implementations and the UI callers. Confirm equivalent handling of every input supported by the current UI, including an empty value if it can occur. Preserve the existing guards. If behavior differs and cannot be preserved with a minimal change, report the mismatch before applying the replacement.

Reuse the existing module boundary and helper. This proposal adds zero new design patterns. Use at most two patterns only if actual project requirements justify them. The current inspection does not justify Adapter because there is one consistent booking format, or Strategy because no second required policy was found.

Keep changes small and focused. Preserve the existing TypeScript project, dependencies, fixture data and UI. Do not add unnecessary classes, factories, singletons or additional availability policies. Do not change timeline behavior or booking rules as part of this refactor.

## Commands

Confirm these commands against the actual `package.json` and installed dependencies:

- `npx vitest run`: run the regression suite once.
- `npx vitest`: watch mode for development.
- `npm run build`: production build.
- `npm run typecheck`: TypeScript check.
- `npm run lint`: lint check.

The initial inspection found no `test` script, so do not assume that `npm test` is available. Use the project's installed Vitest and existing lockfile. Do not install or upgrade packages just for this refactor.

## Verification and evidence

Before refactoring, save the starting version and run the existing tests to record a baseline. Preserve all existing assertions. Add focused regression tests for the changed time-conversion use and any missing required cases: past time, reversed or zero-length interval, 121-minute duration, blocked room, overlap, touching endpoints and unchanged booking data.

After refactoring, run the regression suite, build, type check and lint check. Compare the results with the baseline. Inspect the UI at desktop and mobile widths and preserve two screenshots. Keep the current time and test inputs fixed when comparing before and after behavior.

Report the exact commands, actual output and passing/failing test counts. Distinguish existing failures from new regressions. If a command cannot run, state the limitation and do not claim success. Do not weaken or remove assertions to obtain a passing result.

## Working with these instructions

Do not assume that Bolt automatically loads this file. When explicitly asked to use it, read it, summarize its constraints and identify the actual verification commands before editing. If the file cannot be read, say so and request its contents.

For the experiment, keep the original recommendation without explicitly supplied instructions and the recommendation with these instructions in separate conversations or checkpoints. Preserve the actual prompts and responses. Do not treat their differences as evidence of automatic AGENTS.md support.

After implementation, report the changed files, the reason for each change, verification evidence and remaining limitations. Distinguish expected benefits from results demonstrated by tests or UI checks.
