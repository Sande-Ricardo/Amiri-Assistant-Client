# Project State

## Sprint 1: Project Setup & Core Infrastructure
- [x] Initialize Next.js project with App Router, TypeScript, and Tailwind CSS.
- [x] Configure `tailwind.config.ts`, `globals.css`, and custom color palette/typography.
- [x] Setup `lib/api-client.ts` with error normalization and base URL from env vars.
- [x] Setup React Query provider in root layout.
- [x] Create `AppShell` component as the top-level state machine orchestrator.

## Sprint 2: Form & Input View
- [x] Create Zod schema in `lib/validation.ts`.
- [x] Implement `ProposalForm` using `react-hook-form`.
- [x] Implement UI behavior for auto-expanding textarea with live character counter.
- [x] Implement `useGenerateProposal` hook (POST `/generate`).
- [x] Connect `ProposalForm` submission to `AppShell` to transition state to `submitting` and then `polling`.

## Sprint 3: Polling & Loading View
- [ ] Implement `useProposalStatus` hook (GET `/status`) with dynamic `refetchInterval` (4s) and auto-stop conditions.
- [ ] Implement 180s client-side watchdog timer for polling timeout.
- [ ] Implement `AgentNodeIndicator` presentational component.
- [ ] Implement `AgentStatusStepper` mapping current_node to UI progress.
- [ ] Integrate `AgentStatusStepper` and `useProposalStatus` into `AppShell` during the `polling` state.

## Sprint 4: Result View & Export Actions
- [ ] Implement `MarkdownViewer` using `react-markdown`, `remark-gfm`, and `rehype-sanitize` with Tailwind typography prose.
- [ ] Implement `CopyToClipboardButton`.
- [ ] Implement `ExportActions` with Blob generation for `.md` download.
- [ ] Implement `.pdf` download functionality using `jsPDF` + `html2canvas`.
- [ ] Integrate `MarkdownViewer` into `AppShell` during the `completed` state.

## Sprint 5: Error Handling & Polish
- [ ] Implement `ErrorBoundaryView` for backend `failed` status and client-side timeouts.
- [ ] Implement `LoadingSpinner` y validaciones en línea.
- [ ] Perform final UI polish, responsiveness checks (mobile-first breakpoints), and accessibility review.
- [ ] Validate Vercel deployment configuration and Lighthouse performance targets.

## Blockers
- None.
