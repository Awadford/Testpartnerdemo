
import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/contexts/ThemeContext';
import { Bell, Globe, Lock, User, Settings as SettingsIcon } from 'lucide-react';

interface SettingsFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  darkMode: boolean;
  compactView: boolean;
}

const Settings = () => {
  const { toast } = useToast();
  const { isDarkMode, setDarkMode } = useTheme();
  
  const [formData, setFormData] = useState<SettingsFormData>({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    darkMode: isDarkMode,
    compactView: true,
  });

  // Sync dark mode state with theme context
  useEffect(() => {
    setFormData(prev => ({ ...prev, darkMode: isDarkMode }));
  }, [isDarkMode]);

  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field: keyof SettingsFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Apply dark mode immediately when toggled
    if (field === 'darkMode') {
      setDarkMode(value as boolean);
    }
    
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Settings saved",
        description: "Your settings have been successfully updated.",
      });
      
      setHasChanges(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      darkMode: false,
      compactView: true,
    });
    setHasChanges(false);
  };
  return (
    <PageLayout title="Settings">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" size="lg">
                <User className="mr-2 h-5 w-5" />
                Account
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="lg">
                <Bell className="mr-2 h-5 w-5" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="lg">
                <Lock className="mr-2 h-5 w-5" />
                Security
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="lg">
                <Globe className="mr-2 h-5 w-5" />
                Regional Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="lg">
                <SettingsIcon className="mr-2 h-5 w-5" />
                Preferences
              </Button>
            </nav>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName"
                      type="text" 
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName"
                      type="text" 
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      type="email" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone"
                      type="text" 
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Display Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
                    </div>
                    <Switch 
                      checked={formData.darkMode}
                      onCheckedChange={(checked) => handleInputChange('darkMode', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Compact View</p>
                      <p className="text-sm text-muted-foreground">Show more data with less spacing</p>
                    </div>
                    <Switch 
                      checked={formData.compactView}
                      onCheckedChange={(checked) => handleInputChange('compactView', checked)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button 
                  onClick={handleSave} 
                  disabled={!hasChanges || isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button 
                  variant="outline" 
                  className="ml-2"
                  onClick={handleCancel}
                  disabled={!hasChanges || isLoading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Settings;
