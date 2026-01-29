# Data Model

## Entities

### User
Represents a person using the Azure Feature Toggle Tool.

**Key Attributes:**
- Unique identifier
- Name
- Email
- Role (determines permissions: read-only or read-write)

**Relationships:**
- A User can make changes recorded in AuditLogEntry

---

### AppConfigurationResource
Represents an Azure App Configuration resource that the tool connects to.

**Key Attributes:**
- Unique identifier
- Display name (e.g., "Development", "Staging", "Production")
- Azure resource name
- Connection string or credentials
- Resource group name
- Environment type (for visual indicators)

**Relationships:**
- An AppConfigurationResource contains multiple FeatureToggles

---

### FeatureToggle
Represents a feature flag within an Azure App Configuration resource.

**Key Attributes:**
- Unique identifier (feature key)
- Display name
- Current state (enabled/disabled)
- Last modified timestamp
- Last modified by (User reference)

**Relationships:**
- A FeatureToggle belongs to an AppConfigurationResource
- A FeatureToggle has changes tracked in AuditLogEntry

---

### AuditLogEntry
Represents a record of a feature toggle change for accountability and troubleshooting.

**Key Attributes:**
- Unique identifier
- Timestamp
- User who made the change
- Feature toggle that was changed
- Previous state
- New state
- Resource where change occurred

**Relationships:**
- An AuditLogEntry references a User (who made the change)
- An AuditLogEntry references a FeatureToggle (what was changed)
- An AuditLogEntry references an AppConfigurationResource (where it happened)

---

## Key Relationships

```
User (1) ──→ (many) AuditLogEntry
AppConfigurationResource (1) ──→ (many) FeatureToggle
FeatureToggle (1) ──→ (many) AuditLogEntry
```

## Notes

- **User roles**: Simple read-only vs. read-write permissions determine UI behavior
- **Last modified tracking**: FeatureToggle tracks who last changed it (important requirement)
- **Audit trail**: Every toggle change creates an AuditLogEntry for accountability
- **Simple toggles**: Feature toggles are simple on/off switches (no complex targeting rules in v1)
