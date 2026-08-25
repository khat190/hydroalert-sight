# Hydro Insight

Build the frontend UI for HydroSat-Edge, a professional environmental intelligence command center.

PRODUCT

HydroSat-Edge converts periodic Sentinel-2 satellite observations into evidence-backed downstream water-risk intelligence.

The UI must communicate this workflow:

Satellite Observation
→ Spectral Anomaly
→ Evidence
→ Uncertainty
→ Downstream Forecast
→ Consequence / Risk
→ Human-Reviewable Decision

This is NOT a generic AI chatbot and NOT a generic analytics dashboard.

The product should feel like a serious environmental monitoring / emergency decision-support system.

TECHNOLOGY

Use:

React

TypeScript

Tailwind CSS

Leaflet / React-Leaflet for the map

Responsive desktop-first layout

Do NOT use Mapbox.

Do NOT create a backend.

Do NOT create fake API endpoints.

Do NOT implement scientific calculations.

Do NOT invent scientific values.

Create reusable frontend components and use clearly labeled mock data only where necessary to visualize the UI.

The mock data will later be replaced by the FastAPI backend.

PRIMARY DEMO LOCATION

Lake Elsinore, Southern California.

Primary demonstration observation:

Sentinel-2 L2A
26 August 2022

The interface should make the location visually obvious.

VISUAL STYLE

Create a polished environmental command-center interface.

Style:

dark mode

professional

restrained

high information density

clean typography

subtle borders

clear hierarchy

minimal decorative effects

no flashy gradients

no unnecessary animations

no generic SaaS landing-page aesthetic

The interface should feel closer to:

environmental monitoring center

water authority operations dashboard

scientific observatory

emergency response command center

than a consumer application.

MAIN LAYOUT

Create a desktop dashboard with:

LEFT SIDEBAR:
approximately 320–360px wide.

MAIN CONTENT:
large interactive map.

BOTTOM / OVERLAY:
timeline / forecast control.

LEFT SIDEBAR

At the top:

HYDROSAT-EDGE

Subtitle:

Satellite-to-Decision Water Intelligence

Then a system status indicator:

🟢 Monitoring

Add a location section:

MONITORING LOCATION

Lake Elsinore
Southern California

Observation:

26 Aug 2022

Source:

Sentinel-2 L2A

Observation quality:

GOOD

RISK CARD

Create a large prominent card:

CURRENT RISK

HIGH

Below it:

SYSTEM CONFIDENCE

71%

MODERATE

IMPORTANT:
Clearly label this as:

System confidence — not a validated probability

Do not imply scientific certainty.

EVIDENCE CARD

Title:

WHAT CHANGED?

Display example values such as:

NDCI
0.4952

Historical deviation
+18%

Water pixels
46,088

Observation quality
GOOD

Add a button:

View Evidence

Clicking it should open an expandable evidence panel/modal.

EVIDENCE PANEL

Include sections:

Spectral Indicators

NDCI
NDVI
Turbidity Ratio

Historical Comparison

Current value
Historical/reference value
Deviation

Observation Quality

Water pixels
Cloud condition
Observation date

Interpretation

Use cautious language:

"Elevated spectral signature consistent with abnormal algal or suspended-material activity."

Do NOT say:

"Confirmed pollution"

Do NOT say:

"Confirmed toxic chemical"

Do NOT say:

"Confirmed cyanobacteria"

UNCERTAINTY PANEL

Create a dedicated section:

UNCERTAINTY

Show four components:

Image Quality
Spectral Agreement
Historical Coverage
Flow Data Quality

Each should have a small progress indicator.

At the bottom:

Confidence: MODERATE

And a note:

This is a transparent system confidence score, not a validated statistical probability.

MAIN MAP

Use Leaflet.

Create a large map occupying most of the screen.

The map should show:

1. Water body

Lake Elsinore / relevant water region.

2. Anomaly area

Use a heatmap-like overlay or semi-transparent polygon.

It should clearly communicate:

🔴 Anomaly detected

3. Downstream flow direction

Show a visually clear downstream direction/path.

4. Assets

Use different markers for:

🚰 Water / intake asset

🌾 Agricultural asset

🏭 Industrial asset

🏘️ Population center

💧 Reservoir / water infrastructure

5. Asset status

Markers should visually communicate:

HIGH
MEDIUM
LOW

Do not use color alone. Include labels/icons.

MAP LEGEND

Include a small legend:

Anomaly
Predicted movement
High-risk asset
Medium-risk asset
Low-risk asset
Observation area

FORECAST PANEL

Create a panel or bottom drawer titled:

DOWNSTREAM FORECAST

Show:

Estimated flow:

0.8–1.1 km/h

Estimated arrival window:

16–22 hours

Important label:

Estimated — not guaranteed

Show a simple visual:

Anomaly
↓
River / outflow
↓
Asset

TIMELINE SLIDER

Create:

NOW

+6h

+12h

+18h

+24h

+36h

When the slider moves, update the mock visualization of the projected exposure path.

This is a UI simulation only.

Do not imply live satellite movement.

Add:

Forecast simulation

label somewhere near the control.

AFFECTED ASSETS

Create a sidebar or expandable panel:

POTENTIALLY AFFECTED ASSETS

Example cards:

🚰 Lee Lake / Dawson Canyon Intake

ETA:
16–22 hours

Priority:
HIGH

Then:

🏗 Prado Dam / Santa Ana River Confluence

ETA:
29–40 hours

Priority:
MEDIUM

Important:
Clearly label these as prototype/demo assumptions when necessary.

DECISION BRIEF

Create a prominent panel:

AI DECISION BRIEF

Example:

HIGH PRIORITY WATCH

An unusual water spectral signature was detected upstream with moderate system confidence. A downstream asset may be exposed within the estimated arrival window.

Then:

RECOMMENDED CHECKS

Increase sampling frequency.

Inspect downstream checkpoint conditions.

Review relevant intake contingency procedures.

Add a small badge:

AI-generated from structured evidence

And:

Human review required

DECISION STATUS

Include four separate labels:

OBSERVATION

What the satellite measured.

INFERENCE

What the analytical engine concluded.

PREDICTION

What the downstream model estimates.

RECOMMENDATION

What a human operator should investigate.

Make the distinctions visually obvious.

HISTORICAL TREND

Add a compact chart section:

HISTORICAL REFERENCE

Display:

Current NDCI
Historical/reference NDCI
Deviation

Use a simple line chart or comparison visual.

Do not fabricate a long time series.

Make clear that the MVP uses a limited reference baseline.

SYSTEM STATUS

Add a small system-status area:

Satellite Data
● Available

Analysis Engine
● Ready

Forecast Engine
● Ready

Decision Engine
● Ready

Fallback Dataset
● Available

This is UI status only.

LOADING STATE

Create a polished processing screen.

When analysis starts, show:

Retrieving satellite observation

Extracting spectral bands

Detecting anomaly

Calculating confidence

Estimating downstream exposure

Generating decision brief

Show the stages progressively.

Do not make it look like fake real-time satellite streaming.

ERROR STATE

Create a clear error state:

Observation unavailable

Explain:

"Live satellite data could not be retrieved. The system can use a verified fallback observation."

Add:

Use verified fallback

button.

FALLBACK STATE

When fallback data is used, display a visible but unobtrusive badge:

VERIFIED FALLBACK OBSERVATION

Do NOT label cached historical data as live.

RESPONSIVE DESIGN

Desktop is the primary judging experience.

Also make it usable on:

laptop

smaller desktop window

tablet

Do not spend excessive time on mobile-specific redesign.

COMPONENTS TO CREATE

Create reusable components:

Dashboard

Sidebar

SystemStatus

RiskCard

ConfidenceCard

EvidenceCard

EvidencePanel

UncertaintyPanel

MapPanel

MapLegend

ForecastPanel

TimelineSlider

AssetCard

AssetList

DecisionBrief

ActionList

HistoricalReference

LoadingState

ErrorState

FallbackBadge

IMPORTANT BACKEND BOUNDARY

The UI must be designed so that mock values can later be replaced by API responses.

Do NOT place scientific formulas in the frontend.

Do NOT calculate anomaly scores in React.

Do NOT calculate ETA in React.

Do NOT calculate risk in React.

The backend will provide structured JSON.

The frontend only:

renders the values

visualizes them

provides interaction

sends user actions to the backend

API-READY DATA SHAPE

Design components so they can eventually consume a response shaped roughly like:

{
"evidence": {
"indicators": {},
"deviations": {},
"pixel_count": 46088
},
"anomaly": {},
"confidence": {},
"forecast": [],
"risk": [],
"decision_brief": {}
}

Do not hard-code this structure into the UI in a way that makes it difficult to replace mock data later.

MOST IMPORTANT VISUAL STORY

The first screen should make the following story obvious:

WHAT CHANGED?

Anomaly detected.

WHY DO WE BELIEVE IT?

Evidence panel.

HOW CERTAIN ARE WE?

Confidence panel.

WHERE COULD IT GO?

Forecast path.

WHO COULD BE AFFECTED?

Asset cards.

WHAT SHOULD A HUMAN DO?

Decision brief.

This is the core product story.

FINAL DESIGN RULE

Do not make the interface look like:

"AI found pollution."

Make it look like:

Environmental evidence → uncertainty → consequence → decision support.

Generate the complete frontend scaffold and reusable components.

Do not generate backend code.
Do not create API keys.
Do not invent scientific data.
Do not modify files outside the frontend UI scope.


IMPORTANT DESIGN DIRECTION:

The interface must NOT look AI-generated, template-generated, or like a generic hackathon dashboard.

Do NOT use:

- emojis

- cartoon icons

- oversized rounded cards everywhere

- excessive gradients

- glowing neon effects

- generic "AI" visual motifs

- unnecessary glassmorphism

- fake futuristic HUD elements

- excessive badges

- decorative animations

- stock-dashboard styling

- excessive use of bright accent colors

The UI should feel like a real professional product designed by an experienced product designer for an environmental monitoring organization.

Visual inspiration:

- scientific monitoring software

- utility operations dashboards

- geospatial intelligence platforms

- professional GIS applications

- environmental research tools

Use:

- restrained typography

- consistent spacing

- subtle borders

- compact information hierarchy

- purposeful whitespace

- real-looking controls

- clear section headings

- muted professional colors

- strong map-first composition

- understated status indicators

Do not use emoji characters anywhere in the interface.

Use professional icons from an icon library where appropriate, but keep icon usage minimal and functional.

The result should look like a product that could realistically be used by a municipal water authority or environmental agency, not a generated AI demo.

A judge should not immediately think:

"This was generated by Lovable."

They should think:

"This looks like an actual environmental intelligence product."

Do not generate filler text, fake statistics, fake customer testimonials, fake company logos, or generic marketing copy. Every visible element must serve the monitoring, evidence, forecast, consequence, or decision workflow.
CRITICAL TECH STACK REQUIREMENTS:

- Use React + TypeScript.

- Use Tailwind CSS for styling.

- Use Leaflet with react-leaflet for all map functionality.

- DO NOT use Mapbox, mapbox-gl, Mapbox GL JS, or any Mapbox token.

- Use OpenStreetMap tiles through Leaflet.

- DO NOT generate backend API endpoints.

- DO NOT generate scientific calculation functions.

- DO NOT implement anomaly detection, NDCI, NDVI, turbidity, confidence, ETA, or risk calculations in the frontend.

- DO NOT generate WebSockets, fake real-time streaming, polling loops, or simulated live satellite feeds.

- Build pure, reusable React UI components.

- Components must accept data through standard TypeScript props.

- Design the components so they can later consume the real FastAPI JSON response without rewriting the UI.

- Use mock data only for visual development, and clearly isolate mock data so it can be removed easily.

- Do not invent scientific measurements, asset distances, confidence values, or environmental claims.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f3913b98-bff8-4216-a3f1-3cc289c6ac43).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
