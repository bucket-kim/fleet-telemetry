export const t = {
  // surfaces
  bg: "var(--bg)",
  surface: "var(--surface)",
  surface2: "var(--surface-2)",
  surface3: "var(--surface-3)",
  sidebarBg: "var(--sidebar-bg)",

  // text
  text: "var(--text)",
  textHeading: "var(--text-heading)",
  textMuted: "var(--text-muted)",

  // borders & elevation
  border: "var(--border)",
  borderStrong: "var(--border-strong)",
  shadow: "var(--shadow)",

  // brand / accent
  accent: "var(--accent)",
  accentStrong: "var(--accent-strong)",
  accentContrast: "var(--accent-contrast)",
  accentSoft: "var(--accent-soft)",

  // status
  success: "var(--success)",
  successSoft: "var(--success-soft)",
  warning: "var(--warning)",
  danger: "var(--danger)",
  info: "var(--info)",

  // navigation
  navFg: "var(--nav-fg)",
  navActiveBg: "var(--nav-active-bg)",
  navActiveFg: "var(--nav-active-fg)",

  // data viz / gauges
  gaugeTrack: "var(--gauge-track)",
  gaugeNeedle: "var(--gauge-needle)",
  speed: "var(--speed)",
  soc: "var(--soc)",
  range: "var(--range)",
  rpmStart: "var(--rpm-start)",
  rpmEnd: "var(--rpm-end)",
  route: "var(--route)",

  // typography
  fontSans: "var(--sans)",
  fontHeading: "var(--heading)",
  fontMono: "var(--mono)",
} as const;

export type Token = keyof typeof t;
