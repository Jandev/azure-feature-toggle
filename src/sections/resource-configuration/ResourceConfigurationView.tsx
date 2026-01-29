import { useState } from 'react';
import { ResourceList } from './components/ResourceList';
import { ResourceForm } from './components/ResourceForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type EnvironmentType = 'development' | 'staging' | 'production';
type ConnectionStatus = 'unknown' | 'testing' | 'connected' | 'error';

interface AppConfigResource {
  id: string;
  displayName: string;
  environmentType: EnvironmentType;
  resourceName: string;
  resourceGroup: string;
  connectionString: string;
  subscriptionId: string;
  connectionStatus: ConnectionStatus;
  lastTested?: string;
}

interface ResourceFormData {
  displayName: string;
  environmentType: EnvironmentType;
  resourceName: string;
  resourceGroup: string;
  connectionString: string;
  subscriptionId: string;
}

type ViewMode = 'list' | 'add' | 'edit';

const sampleResources: AppConfigResource[] = [
  {
    id: 'res-001',
    displayName: 'Development',
    environmentType: 'development',
    resourceName: 'appconfig-dev-eastus',
    resourceGroup: 'rg-featuretoggle-dev',
    connectionString: 'Endpoint=https://appconfig-dev-eastus.azconfig.io;Id=***;Secret=***',
    subscriptionId: '12345678-1234-1234-1234-123456789abc',
    connectionStatus: 'connected',
    lastTested: '2026-01-28T14:30:00Z',
  },
  {
    id: 'res-002',
    displayName: 'Staging',
    environmentType: 'staging',
    resourceName: 'appconfig-staging-eastus',
    resourceGroup: 'rg-featuretoggle-staging',
    connectionString: 'Endpoint=https://appconfig-staging-eastus.azconfig.io;Id=***;Secret=***',
    subscriptionId: '12345678-1234-1234-1234-123456789abc',
    connectionStatus: 'connected',
    lastTested: '2026-01-28T14:25:00Z',
  },
  {
    id: 'res-003',
    displayName: 'Production',
    environmentType: 'production',
    resourceName: 'appconfig-prod-eastus',
    resourceGroup: 'rg-featuretoggle-prod',
    connectionString: 'Endpoint=https://appconfig-prod-eastus.azconfig.io;Id=***;Secret=***',
    subscriptionId: '12345678-1234-1234-1234-123456789abc',
    connectionStatus: 'connected',
    lastTested: '2026-01-28T14:20:00Z',
  },
];

export function ResourceConfigurationView() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [resources, setResources] = useState<AppConfigResource[]>(sampleResources);
  const [editingResource, setEditingResource] = useState<AppConfigResource | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AppConfigResource | null>(null);
  const [showDemoControls, setShowDemoControls] = useState(true);

  const handleAdd = () => {
    setEditingResource(null);
    setTestResult(null);
    setViewMode('add');
  };

  const handleEdit = (resource: AppConfigResource) => {
    setEditingResource(resource);
    setTestResult(null);
    setViewMode('edit');
  };

  const handleDelete = (resource: AppConfigResource) => {
    setDeleteTarget(resource);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      setResources((prev) => prev.filter((r) => r.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const handleSave = (data: ResourceFormData) => {
    if (viewMode === 'add') {
      const newResource: AppConfigResource = {
        ...data,
        id: `res-${Date.now()}`,
        connectionStatus: 'connected',
        lastTested: new Date().toISOString(),
      };
      setResources((prev) => [...prev, newResource]);
    } else if (editingResource) {
      setResources((prev) =>
        prev.map((r) =>
          r.id === editingResource.id
            ? { ...r, ...data, lastTested: new Date().toISOString() }
            : r
        )
      );
    }
    setViewMode('list');
    setTestResult(null);
  };

  const handleTest = async (_data: ResourceFormData) => {
    setIsTesting(true);
    setTestResult(null);

    // Simulate connection test
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Randomly succeed or fail for demo
    const success = Math.random() > 0.3;
    setTestResult({
      success,
      message: success
        ? 'Connection successful! Resource is accessible.'
        : 'Connection failed: Invalid connection string or insufficient permissions.',
    });
    setIsTesting(false);
  };

  const handleCancel = () => {
    setViewMode('list');
    setEditingResource(null);
    setTestResult(null);
  };

  const setDemoState = (state: 'empty' | 'populated') => {
    if (state === 'empty') {
      setResources([]);
    } else {
      setResources(sampleResources);
    }
    setViewMode('list');
  };

  return (
    <div className="relative min-h-screen bg-stone-50 dark:bg-slate-950 p-6">
      {/* Demo Controls */}
      {showDemoControls && (
        <div className="fixed top-4 right-4 z-50">
          <Card className="w-64 shadow-xl border-orange-200 dark:border-orange-800">
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
                Switch between different views
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
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
                With Resources
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAdd}
                className="w-full justify-start text-xs"
              >
                Add Form
              </Button>
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {viewMode === 'list' ? (
          <ResourceList
            resources={resources}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <ResourceForm
            mode={viewMode}
            initialData={
              editingResource
                ? {
                    displayName: editingResource.displayName,
                    environmentType: editingResource.environmentType,
                    resourceName: editingResource.resourceName,
                    resourceGroup: editingResource.resourceGroup,
                    connectionString: editingResource.connectionString,
                    subscriptionId: editingResource.subscriptionId,
                  }
                : undefined
            }
            isTesting={isTesting}
            testResult={testResult}
            errors={{}}
            onSave={handleSave}
            onTest={handleTest}
            onCancel={handleCancel}
          />
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteTarget !== null} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Resource</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deleteTarget?.displayName}"? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ResourceConfigurationView;
