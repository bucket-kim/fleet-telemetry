# Fleet Telemetry — Real-Time EV Digital Twin

A real-time vehicle telemetry dashboard that streams a vehicle's live driving data into an interactive 3D digital twin. Built around a real EV trip from the [Vehicle Energy Dataset (VED)](https://github.com/gsoh/VED) (University of Michigan), it replays genuine telemetry — speed, battery state, GPS, and derived power — over a live WebSocket connection, persists it to Azure Cosmos DB, and renders it as a 3D car that responds to the data in real time.

**Live demo:** https://fleet-telemetry-frontend.vercel.app

> Note: the backend runs on a free tier that sleeps after inactivity. The first load may take up to ~50 seconds while the server wakes up.

---

## What it does

- **Live 3D digital twin** — a 3D car whose wheels spin with the vehicle's speed and whose heading rotates to follow the real GPS track, computed from the bearing between consecutive coordinates.
- **Real-time telemetry gauges** — speed, battery state of charge, and power (kW) update live as data streams in. The dashboard adapts which gauges it shows based on the vehicle's powertrain (an EV shows power; an ICE vehicle would show RPM).
- **Live map** — the vehicle's real position plotted on a Mapbox map, updating as it moves along its route.
- **Monitoring & alerts** — threshold-based alerts (low battery, overspeed, hard regenerative braking) surface as transient toast notifications. A separate connection-health layer detects data staleness and flags the vehicle as offline.
- **Real telemetry data** — driving data comes from the VED research dataset, not mock values. Power is derived from real battery voltage and current (negative values indicate regenerative braking).

---

## Architecture

```
VED CSV  →  Replayer  →  ┌─ WebSocket ──→  Frontend (live stream)
                         └─ Azure Cosmos ←─ HTTP API (history)
```

- A **replayer** reads the recorded trip and emits each reading at its original cadence, simulating a live vehicle feed.
- Each reading is **broadcast** to connected clients over WebSocket (live) and **persisted** to Azure Cosmos DB (history), using a stable composed document id and upsert so the looping replay never creates duplicates.
- The **frontend** fetches history over HTTP on load, then subscribes to the WebSocket for live updates — the standard "HTTP for history, WebSocket for live" split.

---

## Tech stack

**Frontend**

- React + TypeScript (Vite)
- React Three Fiber / Three.js (3D digital twin)
- Mapbox GL (`react-map-gl`) for the live map
- Zustand for state management
- styled-components

**Backend**

- Node.js + Express + `ws` (WebSocket)
- Azure Cosmos DB (NoSQL API) via `@azure/cosmos`
- TypeScript (run with `tsx`)

**Infrastructure**

- Yarn workspaces monorepo (shared types between frontend and backend)
- Backend deployed on Render; frontend on Vercel; database on Azure Cosmos DB

---

## Project structure

```
fleet-telemetry/
├── packages/
│   ├── shared/      # shared TypeScript types (single source of truth for the data contract)
│   ├── backend/     # Express + WebSocket server, replayer, Cosmos persistence
│   └── frontend/    # React dashboard + 3D twin
```

The `shared` package holds the telemetry type definitions used by both frontend and backend, so the data contract is enforced by the compiler across the network boundary.

---

## Running locally

**Prerequisites:** Node.js, Yarn (Classic), and either a Cosmos DB connection or the local Azure Cosmos DB emulator (via Docker).

```bash
# install all workspace dependencies from the repo root
yarn install
```

**Backend** — create `packages/backend/.env`:

```
COSMOS_ENDPOINT=<your Cosmos endpoint>
COSMOS_KEY=<your Cosmos key>
```

```bash
yarn workspace @fleet/backend dev
```

**Frontend** — create `packages/frontend/.env`:

```
VITE_API_URL=http://localhost:8080
VITE_WS_URL=ws://localhost:8080
VITE_MAPBOX_TOKEN=<your Mapbox token>
```

```bash
yarn workspace @fleet/frontend dev
```

---

## Notable technical details

- **Derived power signal** — the dataset provides battery voltage and current but not power; kW is computed as `voltage × current / 1000`. Negative values represent regenerative braking (the motor acting as a generator, returning energy to the battery).
- **GPS-derived heading** — the data has no heading field, so the car's direction is computed as the bearing between consecutive GPS points, smoothed with damping and shortest-path angle normalization to avoid jumps at the ±180° boundary.
- **Cosmos data modeling** — documents are partitioned by `vehicleId` (queries are always per-vehicle), with a stable composed id (`vehicleId-trip-timestamp`) and upsert so the continuous replay overwrites rather than duplicates.
- **Staleness-based offline detection** — connection health is determined by time since the last received reading, not just socket state, so a "zombie" connection (open but no data) is still detected as offline.

---

## Data source

Driving data is from the [Vehicle Energy Dataset (VED)](https://github.com/gsoh/VED), a real-world dataset of vehicle energy and GPS data collected in Ann Arbor, Michigan. Vehicle and model labels in the UI are illustrative; the telemetry signals are real.
