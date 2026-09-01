# Amiri - Automated B2B Commercial Proposal Generator

Amiri is a production-grade frontend application that interfaces with an asynchronous multi-agent AI backend to generate B2B commercial proposals. 

The application submits raw client requirements, polls a stateful backend job for real-time agent progress, and renders the final AI-generated proposal as formatted, exportable content. It is designed as a robust portfolio artifact demonstrating asynchronous state management, resilient polling architectures, and modern React engineering practices.

## Features

- **Asynchronous Proposal Generation:** Submit raw requirements and client details.
- **Real-Time Polling & Status Tracking:** Live progress visualization mapping backend AI agent nodes (e.g., requirements analysis, solution architecture) to a UI stepper.
- **Robust Error Handling:** Comprehensive error boundaries, network retry policies, and a client-side watchdog timeout.
- **Export Capabilities:** Rendered markdown output with options to copy to clipboard, download as `.md`, or export as `.pdf`.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (Indigo/Slate palette)
- **State Management:** TanStack Query (React Query) for server caching and polling
- **Validation:** Zod and React Hook Form
- **Markdown Rendering:** react-markdown with remark-gfm and rehype-sanitize
- **PDF Generation:** jsPDF and html2canvas

## Getting Started

### Prerequisites

- Node.js (v20.x or higher recommended)
- pnpm or npm

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

## Backend Documentation

The main documentation for the asynchronous multi-agent AI backend (API endpoints, LangGraph architecture, and stateful job execution) can be found at the following repository:

[Amiri-Assistant-API](https://github.com/Sande-Ricardo/Amiri-Assistant-API)

## License

This project is licensed under the MIT License.
