import { useState } from 'react';
import { AppShell } from './components/AppShell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Sample data
const sampleResources = [
  {
    id: '1',
    displayName: 'Development',
    resourceName: 'appconfig-dev',
    environmentType: 'development' as const,
  },
  {
    id: '2',
    displayName: 'Staging',
    resourceName: 'appconfig-staging',
    environmentType: 'staging' as const,
  },
  {
    id: '3',
    displayName: 'Production',
    resourceName: 'appconfig-prod',
    environmentType: 'production' as const,
  },
];

const sectionContent = {
  dashboard: {
    title: 'Feature Toggle Dashboard',
    description: 'Manage your feature flags for the selected Azure App Configuration resource.',
  },
  resources: {
    title: 'Resource Configuration',
    description: 'Configure and manage connections to Azure App Configuration resources.',
  },
  'audit-log': {
    title: 'Audit Log',
    description: 'Track all changes to feature toggles with full accountability.',
  },
  settings: {
    title: 'Settings',
    description: 'Configure application preferences and user settings.',
  },
};

export function ShellPreview() {
  const [currentResource, setCurrentResource] = useState(sampleResources[0]);
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleResourceChange = (resource: typeof sampleResources[0]) => {
    setCurrentResource(resource);
  };

  const handleLogout = () => {
    alert('Logout clicked - this would redirect to login page');
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };

  const content = sectionContent[activeSection as keyof typeof sectionContent];

  return (
    <AppShell
      currentResource={currentResource}
      resources={sampleResources}
      onResourceChange={handleResourceChange}
      userName="Jan de Vries"
      userEmail="jan@example.com"
      userRole="admin"
      onLogout={handleLogout}
      activeSection={activeSection}
      onNavigate={handleNavigate}
    >
      <div className="max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{content.title}</CardTitle>
            <CardDescription className="text-base">
              {content.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                This is a preview of the application shell. The actual content for each section
                will be designed in the next steps.
              </p>
              <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="text-sm text-orange-900 dark:text-orange-100">
                  <strong>Current Resource:</strong> {currentResource.displayName} (
                  {currentResource.environmentType})
                </p>
                <p className="text-sm text-orange-900 dark:text-orange-100 mt-2">
                  <strong>Active Section:</strong> {content.title}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Try these interactions:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Click the hamburger menu to collapse/expand the sidebar</li>
                  <li>Switch between different Azure resources using the center dropdown</li>
                  <li>Navigate between sections using the sidebar</li>
                  <li>Click your user avatar to see the user menu</li>
                  <li>Toggle between light and dark mode (if available)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
