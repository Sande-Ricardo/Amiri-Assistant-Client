# Amiri - Automated B2B Commercial Proposal Generator

> [!IMPORTANT]
> **This repository contains only the Frontend client application.**
> For the complete system architecture, API definitions, and the LangGraph multi-agent orchestration, please refer to the Backend repository:
> [Amiri Assistant Backend](https://github.com/Sande-Ricardo/Amiri-Assistant-API)

Amiri is a production-grade frontend application that interfaces with an asynchronous multi-agent AI backend to generate B2B commercial proposals. 

The application submits raw client requirements, polls a stateful backend job for real-time agent progress, and renders the final AI-generated proposal as formatted, exportable content. It is designed as a robust portfolio artifact demonstrating asynchronous state management, resilient polling architectures, and modern React engineering practices.

## Features

- **Asynchronous Proposal Generation:** Submit raw requirements and client details. The UI handles the transition smoothly from submission to polling.
- **Real-Time Polling & Status Tracking:** Live progress visualization maps backend AI agent nodes (e.g., *requirements analysis*, *solution architecture*) to a dynamic UI stepper.
- **Robust Error Handling:** Comprehensive error boundaries, network retry policies, and a client-side watchdog timeout ensure users are never left waiting indefinitely.
- **Export Capabilities:** The rendered markdown output can be seamlessly copied to the clipboard, downloaded as a `.md` source file, or exported as a stylized `.pdf`.
- **Accessibility & UX Polish:** Includes fully accessible ARIA live regions for screen readers, mobile-first responsive breakpoints, strict inline Zod validation, and comprehensive keyboard navigability.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (Custom Indigo/Slate palette & Typography plugin)
- **State Management:** TanStack Query (React Query) for server caching, mutations, and polling
- **Validation:** Zod and React Hook Form
- **Markdown Rendering:** `react-markdown` with `remark-gfm` and `rehype-sanitize`
- **PDF Generation:** `jsPDF` and `html2canvas`

## Getting Started

### Prerequisites

- Node.js (v20.x or higher recommended)
- `npm` (Windows environments should use `npm.cmd` when executing scripts if encountering execution policies)

### Installation

1. Clone the repository and navigate to the client directory.
2. Install the dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env.local` file in the root directory and configure the following variables:

```env
# Base URL of the backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# Optional: Override polling intervals and timeouts (in milliseconds)
NEXT_PUBLIC_POLLING_INTERVAL_MS=4000
NEXT_PUBLIC_POLLING_TIMEOUT_MS=180000
```

### Running the Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the application.

## Deployment to Vercel

Amiri is optimized for a zero-configuration deployment to Vercel. 
1. Import the repository into your Vercel dashboard.
2. Vercel will automatically detect the **Next.js** framework preset.
3. Ensure you add `NEXT_PUBLIC_API_URL` to the Environment Variables section before building.
4. The application uses optimized typography (`next/font`) and semantic HTML, targeting 90+ Lighthouse performance scores out of the box.

## Backend Documentation

The main documentation for the asynchronous multi-agent AI backend (API endpoints, LangGraph architecture, and stateful job execution) can be found at the following repository:

[Amiri-Assistant-API](https://github.com/Sande-Ricardo/Amiri-Assistant-API)

## License

This project is licensed under the MIT License.
