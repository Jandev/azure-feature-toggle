# Application Shell Specification

## Overview
The application shell provides the persistent navigation and layout structure for the Azure Feature Toggle Tool. It includes a collapsible sidebar, prominent resource switcher, and user menu.

## Layout Structure

### Top Navigation Bar
Fixed header that spans the full width of the application.

**Left Section:**
- Product logo/name: "Azure Feature Toggle Tool"
- Hamburger menu icon to toggle sidebar collapse/expand

**Center Section:**
- Resource switcher dropdown (prominent placement)
- Shows currently selected Azure App Configuration resource
- Visual indicator for environment type (dev/staging/production)
- Dropdown to switch between configured resources

**Right Section:**
- User name display
- User role badge (read-only or admin)
- User menu dropdown with logout option

### Sidebar Navigation
Collapsible sidebar on the left side of the application.

**Default State:** Expanded (shows icons + labels)
**Collapsed State:** Icons only (labels hidden, narrower width)

**Navigation Items:**
1. Dashboard (home icon) - Feature Toggle Dashboard
2. Resources (server/database icon) - Resource Configuration
3. Audit Log (list/history icon) - View change history
4. Settings (gear icon) - User settings or app preferences

**Collapse Behavior:**
- Click hamburger menu in top nav to toggle
- Smooth transition animation
- State persists across sessions (localStorage)
- Collapsed width: ~60px, Expanded width: ~240px

### Main Content Area
Occupies the remaining space to the right of the sidebar.

**Characteristics:**
- Full height (below top nav)
- Padding for content breathing room
- Scrollable independently of nav
- Responsive: on mobile, sidebar becomes an overlay/drawer

## Visual Design

### Top Navigation
- Height: 64px
- Background: white (light mode) / dark gray (dark mode)
- Border bottom: 1px neutral-200
- Box shadow: subtle for elevation

### Sidebar
- Background: orange-50 (light mode) / slate-900 (dark mode)
- Active item: orange-100 background with orange-600 left border
- Hover state: slight background color change
- Icons: 24px, using Heroicons or Lucide icons

### Resource Switcher
- Prominent button style with dropdown
- Shows environment badge with color coding:
  - Development: blue badge
  - Staging: yellow badge
  - Production: red badge (with warning styling)
- Display resource name clearly

### User Menu
- User avatar or initials in circle
- Role badge next to name (small pill)
  - Read-only: slate-500
  - Admin: orange-500

## Responsive Behavior

**Desktop (>= 1024px):**
- Sidebar always visible, can be collapsed
- Top nav spans full width
- Main content adjusts based on sidebar state

**Tablet (768px - 1023px):**
- Sidebar starts collapsed
- Can expand on toggle
- Resource switcher remains in top nav

**Mobile (< 768px):**
- Sidebar becomes overlay/drawer (hidden by default)
- Opens from left when hamburger clicked
- Backdrop overlay when open
- Resource switcher moves to full-width dropdown below top nav

## Interactions

**Sidebar Navigation:**
- Click nav item to navigate to section
- Active section highlighted
- Smooth page transitions

**Resource Switcher:**
- Click to open dropdown with list of configured resources
- Show resource name and environment badge in list
- Click resource to switch (shows loading state briefly)
- Confirmation modal for switching to production

**User Menu:**
- Click to open dropdown
- Show user name, email, role
- Logout button at bottom

**Collapse Toggle:**
- Click hamburger to toggle sidebar
- Icon rotates or changes to indicate state
- Smooth width transition animation

## States

**Loading:**
- Show skeleton/shimmer for resource switcher while loading
- Disable navigation during resource switching

**Error:**
- Toast notification for connection errors
- Fallback UI if resource unavailable

**Empty:**
- Show "No resources configured" in switcher if none exist
- Link to Resource Configuration section

## Accessibility

- Keyboard navigation for all interactive elements
- ARIA labels for icon-only buttons (especially when collapsed)
- Focus indicators visible
- Screen reader announcements for route changes
- Skip to main content link
