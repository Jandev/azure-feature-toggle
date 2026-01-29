import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { ProductionConfirmation } from './components/ProductionConfirmation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type UserRole = 'read-only' | 'admin';
type EnvironmentType = 'development' | 'staging' | 'production';

interface FeatureToggle {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  lastModifiedBy?: string;
  lastModifiedAt?: string;
}

interface CurrentResource {
  id: string;
  displayName: string;
  environmentType: EnvironmentType;
}

const sampleToggles: FeatureToggle[] = [
  {
    id: 'toggle-001',
    name: 'new-checkout-flow',
    description: 'Enable the redesigned checkout experience',
    enabled: true,
    lastModifiedBy: 'Jan de Vries',
    lastModifiedAt: '2026-01-28T14:30:00Z',
  },
  {
    id: 'toggle-002',
    name: 'dark-mode',
    description: 'Enable dark mode theme option',
    enabled: true,
    lastModifiedBy: 'Sarah Johnson',
    lastModifiedAt: '2026-01-27T10:15:00Z',
  },
  {
    id: 'toggle-003',
    name: 'ai-recommendations',
    description: 'Show AI-powered product recommendations',
    enabled: false,
    lastModifiedBy: 'Michael Chen',
    lastModifiedAt: '2026-01-26T16:45:00Z',
  },
  {
    id: 'toggle-004',
    name: 'social-login',
    description: 'Allow login with Google and Microsoft accounts',
    enabled: true,
    lastModifiedBy: 'Jan de Vries',
    lastModifiedAt: '2026-01-28T09:20:00Z',
  },
  {
    id: 'toggle-005',
    name: 'advanced-search',
    description: 'Enable advanced search with filters',
    enabled: false,
    lastModifiedBy: 'Emma Williams',
    lastModifiedAt: '2026-01-25T14:00:00Z',
  },
  {
    id: 'toggle-006',
    name: 'live-chat-support',
    description: 'Enable live chat widget for customer support',
    enabled: true,
    lastModifiedBy: 'Jan de Vries',
    lastModifiedAt: '2026-01-28T11:30:00Z',
  },
  {
    id: 'toggle-007',
    name: 'beta-dashboard',
    description: 'New dashboard layout with analytics',
    enabled: false,
    lastModifiedBy: 'Sarah Johnson',
    lastModifiedAt: '2026-01-24T13:15:00Z',
  },
  {
    id: 'toggle-008',
    name: 'mobile-app-banner',
    description: 'Show banner promoting mobile app download',
    enabled: true,
    lastModifiedBy: 'Michael Chen',
    lastModifiedAt: '2026-01-27T15:00:00Z',
  },
];

const resources: CurrentResource[] = [
  { id: 'res-001', displayName: 'Development', environmentType: 'development' },
  { id: 'res-002', displayName: 'Staging', environmentType: 'staging' },
  { id: 'res-003', displayName: 'Production', environmentType: 'production' },
];

export function FeatureToggleDashboardView() {
  const [toggles, setToggles] = useState<FeatureToggle[]>(sampleToggles);
  const [currentResource, setCurrentResource] = useState<CurrentResource>(resources[0]);
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [updatingToggleId, setUpdatingToggleId] = useState<string | null>(null);
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    toggleId: string;
    toggleName: string;
    currentState: boolean;
    newState: boolean;
  } | null>(null);
  const [showDemoControls, setShowDemoControls] = useState(true);

  const handleToggle = async (toggleId: string, currentState: boolean) => {
    const toggle = toggles.find((t) => t.id === toggleId);
    if (!toggle) return;

    const newState = !currentState;

    // If production, show confirmation modal
    if (currentResource.environmentType === 'production') {
      setConfirmationModal({
        isOpen: true,
        toggleId,
        toggleName: toggle.name,
        currentState,
        newState,
      });
      return;
    }

    // Otherwise, toggle immediately
    await performToggle(toggleId, newState);
  };

  const performToggle = async (toggleId: string, newState: boolean) => {
    setUpdatingToggleId(toggleId);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    setToggles((prev) =>
      prev.map((t) =>
        t.id === toggleId
          ? {
              ...t,
              enabled: newState,
              lastModifiedBy: 'Jan de Vries',
              lastModifiedAt: new Date().toISOString(),
            }
          : t
      )
    );

    setUpdatingToggleId(null);
  };

  const handleConfirmProduction = async () => {
    if (confirmationModal) {
      await performToggle(confirmationModal.toggleId, confirmationModal.newState);
      setConfirmationModal(null);
    }
  };

  const handleCancelProduction = () => {
    setConfirmationModal(null);
  };

  const setDemoState = (state: 'empty' | 'populated' | 'read-only') => {
    if (state === 'empty') {
      setToggles([]);
    } else {
      setToggles(sampleToggles);
      if (state === 'read-only') {
        setUserRole('read-only');
      } else {
        setUserRole('admin');
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-stone-50 dark:bg-slate-950 p-6">
      {/* Demo Controls */}
      {showDemoControls && (
        <div className="fixed top-4 right-4 z-50">
          <Card className="w-72 shadow-xl border-orange-200 dark:border-orange-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center justify-between">
                Demo Controls
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDemoControls(false)}
                  className="h-6 w-6 p-0"
                >
                  ×
                </Button>
              </CardTitle>
              <CardDescription className="text-xs">
                Switch between different states
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Environment
                </p>
                <div className="flex gap-1">
                  {resources.map((res) => (
                    <Button
                      key={res.id}
                      variant={currentResource.id === res.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentResource(res)}
                      className={`text-xs flex-1 ${
                        currentResource.id === res.id
                          ? 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700'
                          : ''
                      }`}
                    >
                      {res.displayName.slice(0, 4)}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  User Role
                </p>
                <div className="flex gap-1">
                  <Button
                    variant={userRole === 'admin' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setUserRole('admin')}
                    className={`text-xs flex-1 ${
                      userRole === 'admin'
                        ? 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700'
                        : ''
                    }`}
                  >
                    Admin
                  </Button>
                  <Button
                    variant={userRole === 'read-only' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setUserRole('read-only')}
                    className={`text-xs flex-1 ${
                      userRole === 'read-only'
                        ? 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700'
                        : ''
                    }`}
                  >
                    Read-Only
                  </Button>
                </div>
              </div>
              <div className="pt-2 border-t space-y-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDemoState('empty')}
                  className="w-full justify-start text-xs"
                >
                  Empty State
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDemoState('populated')}
                  className="w-full justify-start text-xs"
                >
                  With Toggles
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Show controls button when hidden */}
      {!showDemoControls && (
        <button
          onClick={() => setShowDemoControls(true)}
          className="fixed top-4 right-4 z-50 px-3 py-2 bg-orange-600 text-white rounded-lg shadow-lg hover:bg-orange-700 text-sm"
        >
          Show Controls
        </button>
      )}

      {/* Main Dashboard */}
      <div className="max-w-6xl mx-auto">
        <Dashboard
          toggles={toggles}
          currentResource={currentResource}
          userRole={userRole}
          isLoading={false}
          error={null}
          updatingToggleId={updatingToggleId}
          onToggle={handleToggle}
        />
      </div>

      {/* Production Confirmation Modal */}
      {confirmationModal && (
        <ProductionConfirmation
          isOpen={confirmationModal.isOpen}
          toggleName={confirmationModal.toggleName}
          currentState={confirmationModal.currentState}
          newState={confirmationModal.newState}
          onConfirm={handleConfirmProduction}
          onCancel={handleCancelProduction}
        />
      )}
    </div>
  );
}

export default FeatureToggleDashboardView;
