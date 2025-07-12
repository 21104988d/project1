# Known Issues

**Last Updated:** July 8, 2025

This document tracks known issues, warnings, or minor bugs that have been
identified but are not critical to the core functionality of the project.

---

### 1. Deprecated `boolean` Package Warning

- **Issue:** A deprecation warning for the `boolean` package appears when
  running `npm install`.
- **Location:** The warning originates from the `@theproject/api` package.
- **Dependency Trace:** `npm ls boolean` shows the dependency chain as
  `@theproject/api` -> `snyk` -> `global-agent` -> `boolean`.
- **Description:** The `snyk` package, a development dependency used for
  security scanning, relies on `global-agent`, which in turn uses a deprecated
  version of the `boolean` package.
- **Status:** Acknowledged. An attempt to resolve this by updating `snyk` to the
  latest version (`1.1297.3`) was made, but the underlying dependency issue in
  `global-agent` persists.
- **Impact:** This is a low-priority issue as it only affects the development
  environment and does not pose a risk to production builds or application
  functionality. No further action is planned at this time.
