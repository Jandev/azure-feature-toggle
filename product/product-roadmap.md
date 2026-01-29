# Product Roadmap

## Sections

### 1. Authentication
**ID:** `authentication`

**Description:**
User login and authentication flow. Validates user identity and retrieves their roles to determine permissions (read-only vs. read-write access to feature toggles).

**Key Capabilities:**
- User login interface
- Authentication with Azure/identity provider
- Retrieve and store user roles/permissions
- Session management

---

### 2. Resource Configuration
**ID:** `resource-configuration`

**Description:**
Configure and manage connections to Azure App Configuration resources within the subscription. Users can add multiple App Configuration resources from one or more resource groups, all within the same Azure subscription.

**Key Capabilities:**
- Connect to Azure subscription
- Browse and select App Configuration resources
- Save multiple resource configurations
- Manage connection credentials securely

---

### 3. Resource Switcher
**ID:** `resource-switcher`

**Description:**
Switch between different Azure App Configuration resources (e.g., dev, staging, production). Visual indicators help prevent accidental changes to production environments.

**Key Capabilities:**
- Dropdown or navigation to switch between configured resources
- Clear visual indicators showing current environment
- Quick switching without re-authentication
- Warnings for production environment changes

---

### 4. Feature Toggle Dashboard
**ID:** `feature-toggle-dashboard`

**Description:**
View and manage feature flags for the currently selected App Configuration resource. Toggles are enabled/disabled based on user permissions - read-only users see disabled controls.

**Key Capabilities:**
- List all feature flags from current resource
- Enable/disable toggles with a single click (if user has write permissions)
- Search and filter feature flags
- Show toggle state clearly (on/off)
- Display controls as disabled for read-only users

---

### 5. Audit Log
**ID:** `audit-log`

**Description:**
Track all changes to feature toggles, including who made the change, what was changed, and when. Provides accountability and helps troubleshoot issues.

**Key Capabilities:**
- Display chronological history of toggle changes
- Show user who made each change
- Filter by date range, user, or specific toggle
- Export audit logs for compliance
