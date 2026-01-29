import { useState } from 'react';
import { LogEntry } from './components/LogEntry';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Download, FileText, Search, X } from 'lucide-react';

type ActionType = 'enabled' | 'disabled';
type EnvironmentType = 'development' | 'staging' | 'production';
type DateRangeFilter = 'last7days' | 'last30days' | 'last90days';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userEmail: string;
  action: ActionType;
  toggleId: string;
  toggleName: string;
  resourceId: string;
  resourceName: string;
  environmentType: EnvironmentType;
  previousState: boolean;
  newState: boolean;
}

const sampleLogs: AuditLogEntry[] = [
  {
    id: 'log-001',
    timestamp: '2026-01-28T14:30:00Z',
    userId: 'user-001',
    userName: 'Jan de Vries',
    userEmail: 'jan@example.com',
    action: 'enabled',
    toggleId: 'toggle-001',
    toggleName: 'new-checkout-flow',
    resourceId: 'res-001',
    resourceName: 'Development',
    environmentType: 'development',
    previousState: false,
    newState: true,
  },
  {
    id: 'log-002',
    timestamp: '2026-01-28T13:45:00Z',
    userId: 'user-002',
    userName: 'Sarah Johnson',
    userEmail: 'sarah.johnson@example.com',
    action: 'disabled',
    toggleId: 'toggle-003',
    toggleName: 'ai-recommendations',
    resourceId: 'res-003',
    resourceName: 'Production',
    environmentType: 'production',
    previousState: true,
    newState: false,
  },
  {
    id: 'log-003',
    timestamp: '2026-01-28T12:20:00Z',
    userId: 'user-001',
    userName: 'Jan de Vries',
    userEmail: 'jan@example.com',
    action: 'enabled',
    toggleId: 'toggle-006',
    toggleName: 'live-chat-support',
    resourceId: 'res-002',
    resourceName: 'Staging',
    environmentType: 'staging',
    previousState: false,
    newState: true,
  },
  {
    id: 'log-004',
    timestamp: '2026-01-28T11:15:00Z',
    userId: 'user-003',
    userName: 'Michael Chen',
    userEmail: 'michael.chen@example.com',
    action: 'enabled',
    toggleId: 'toggle-008',
    toggleName: 'mobile-app-banner',
    resourceId: 'res-001',
    resourceName: 'Development',
    environmentType: 'development',
    previousState: false,
    newState: true,
  },
  {
    id: 'log-005',
    timestamp: '2026-01-28T10:30:00Z',
    userId: 'user-002',
    userName: 'Sarah Johnson',
    userEmail: 'sarah.johnson@example.com',
    action: 'disabled',
    toggleId: 'toggle-007',
    toggleName: 'beta-dashboard',
    resourceId: 'res-002',
    resourceName: 'Staging',
    environmentType: 'staging',
    previousState: true,
    newState: false,
  },
  {
    id: 'log-006',
    timestamp: '2026-01-28T09:45:00Z',
    userId: 'user-001',
    userName: 'Jan de Vries',
    userEmail: 'jan@example.com',
    action: 'enabled',
    toggleId: 'toggle-004',
    toggleName: 'social-login',
    resourceId: 'res-003',
    resourceName: 'Production',
    environmentType: 'production',
    previousState: false,
    newState: true,
  },
  {
    id: 'log-007',
    timestamp: '2026-01-27T16:20:00Z',
    userId: 'user-004',
    userName: 'Emma Williams',
    userEmail: 'emma.williams@example.com',
    action: 'disabled',
    toggleId: 'toggle-005',
    toggleName: 'advanced-search',
    resourceId: 'res-001',
    resourceName: 'Development',
    environmentType: 'development',
    previousState: true,
    newState: false,
  },
  {
    id: 'log-008',
    timestamp: '2026-01-27T15:30:00Z',
    userId: 'user-002',
    userName: 'Sarah Johnson',
    userEmail: 'sarah.johnson@example.com',
    action: 'enabled',
    toggleId: 'toggle-002',
    toggleName: 'dark-mode',
    resourceId: 'res-002',
    resourceName: 'Staging',
    environmentType: 'staging',
    previousState: false,
    newState: true,
  },
];

export function AuditLogView() {
  const [logs] = useState<AuditLogEntry[]>(sampleLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<DateRangeFilter>('last7days');
  const [environmentFilter, setEnvironmentFilter] = useState<EnvironmentType | 'all'>('all');
  const [actionFilter, setActionFilter] = useState<ActionType | 'all'>('all');
  const [showDemoControls, setShowDemoControls] = useState(true);

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      searchQuery === '' ||
      log.toggleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesEnvironment =
      environmentFilter === 'all' || log.environmentType === environmentFilter;

    const matchesAction = actionFilter === 'all' || log.action === actionFilter;

    return matchesSearch && matchesEnvironment && matchesAction;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setDateRange('last7days');
    setEnvironmentFilter('all');
    setActionFilter('all');
  };

  const handleExport = () => {
    alert('Export functionality - would download CSV/JSON of filtered logs');
  };

  // Empty state
  if (logs.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-slate-950 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center max-w-md">
              <div className="mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                No Audit Logs Yet
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Feature toggle changes will appear here once you start managing toggles.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                Adjust filters to see different views
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}

      {!showDemoControls && (
        <button
          onClick={() => setShowDemoControls(true)}
          className="fixed top-4 right-4 z-50 px-3 py-2 bg-orange-600 text-white rounded-lg shadow-lg hover:bg-orange-700 text-sm"
        >
          Show Controls
        </button>
      )}

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Audit Log</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Complete history of all feature toggle changes
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div className="flex gap-3 flex-wrap items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by toggle or user..."
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Export Button */}
            <Button variant="outline" onClick={handleExport} className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-sm text-slate-600 dark:text-slate-400">Date:</span>
            <div className="flex gap-1">
              {(['last7days', 'last30days', 'last90days'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-1.5 text-sm rounded transition-colors ${
                    dateRange === range
                      ? 'bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {range === 'last7days'
                    ? 'Last 7 days'
                    : range === 'last30days'
                    ? 'Last 30 days'
                    : 'Last 90 days'}
                </button>
              ))}
            </div>

            <span className="text-sm text-slate-600 dark:text-slate-400 ml-4">Environment:</span>
            <div className="flex gap-1">
              {(['all', 'development', 'staging', 'production'] as const).map((env) => (
                <button
                  key={env}
                  onClick={() => setEnvironmentFilter(env)}
                  className={`px-3 py-1.5 text-sm rounded transition-colors ${
                    environmentFilter === env
                      ? 'bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {env === 'all' ? 'All' : env.charAt(0).toUpperCase() + env.slice(1)}
                </button>
              ))}
            </div>

            <span className="text-sm text-slate-600 dark:text-slate-400 ml-4">Action:</span>
            <div className="flex gap-1">
              {(['all', 'enabled', 'disabled'] as const).map((act) => (
                <button
                  key={act}
                  onClick={() => setActionFilter(act)}
                  className={`px-3 py-1.5 text-sm rounded transition-colors ${
                    actionFilter === act
                      ? 'bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {act.charAt(0).toUpperCase() + act.slice(1)}
                </button>
              ))}
            </div>

            {(searchQuery || environmentFilter !== 'all' || actionFilter !== 'all') && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-2">
                Clear Filters
              </Button>
            )}
          </div>

          <div className="text-sm text-slate-600 dark:text-slate-400">
            {filteredLogs.length} {filteredLogs.length === 1 ? 'entry' : 'entries'}
          </div>
        </div>

        {/* Log Entries */}
        {filteredLogs.length === 0 ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <AlertCircle className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600 dark:text-slate-400">No logs match your filters</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <LogEntry key={log.id} entry={log} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AuditLogView;
