import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type AuthenticationStatus = 'idle' | 'loading' | 'success' | 'error';

type DemoScenario = {
  label: string;
  status: AuthenticationStatus;
  errorMessage?: string;
  successMessage?: string;
};

const scenarios: DemoScenario[] = [
  {
    label: 'Default (Ready to login)',
    status: 'idle',
  },
  {
    label: 'Loading (Authenticating)',
    status: 'loading',
  },
  {
    label: 'Success (Login successful)',
    status: 'success',
    successMessage: 'Welcome back, Jan de Vries!',
  },
  {
    label: 'Error: Invalid credentials',
    status: 'error',
    errorMessage: 'Authentication failed. Please check your credentials and try again.',
  },
  {
    label: 'Error: Network error',
    status: 'error',
    errorMessage:
      'Unable to connect to the authentication service. Please check your internet connection and try again.',
  },
  {
    label: 'Error: Unauthorized',
    status: 'error',
    errorMessage:
      'Your account does not have access to this application. Please contact your administrator.',
  },
  {
    label: 'Error: Session expired',
    status: 'error',
    errorMessage: 'Your session has expired. Please log in again.',
  },
];

export function AuthenticationView() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const scenario = scenarios[currentScenario];

  const handleLogin = () => {
    console.log('Login clicked');
    // In a real app, this would trigger the Azure AD OAuth flow
  };

  return (
    <div className="relative">
      {/* Demo Controls Overlay */}
      {showControls && (
        <div className="fixed top-4 right-4 z-50">
          <Card className="w-80 shadow-xl border-orange-200 dark:border-orange-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center justify-between">
                Demo Controls
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowControls(false)}
                  className="h-6 w-6 p-0"
                >
                  ×
                </Button>
              </CardTitle>
              <CardDescription className="text-xs">
                Switch between different authentication states
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {scenarios.map((s, index) => (
                <Button
                  key={index}
                  variant={currentScenario === index ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentScenario(index)}
                  className={`w-full justify-start text-xs ${
                    currentScenario === index
                      ? 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700'
                      : ''
                  }`}
                >
                  {s.label}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Show controls button when hidden */}
      {!showControls && (
        <button
          onClick={() => setShowControls(true)}
          className="fixed top-4 right-4 z-50 px-3 py-2 bg-orange-600 text-white rounded-lg shadow-lg hover:bg-orange-700 text-sm"
        >
          Show Controls
        </button>
      )}

      {/* Login Screen */}
      <LoginScreen
        status={scenario.status}
        errorMessage={scenario.errorMessage}
        successMessage={scenario.successMessage}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default AuthenticationView;
