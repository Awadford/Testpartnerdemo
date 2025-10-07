import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

const Profile = () => {
  return (
    <PageLayout title="Profile">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg p-6 shadow">
          <div className="flex items-center gap-3 mb-6">
            <User className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Personal Information</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input 
                    type="text" 
                    defaultValue="John"
                    className="w-full px-3 py-2 border rounded-md bg-background" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input 
                    type="text" 
                    defaultValue="Smith"
                    className="w-full px-3 py-2 border rounded-md bg-background" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    defaultValue="john.smith@example.com"
                    className="w-full px-3 py-2 border rounded-md bg-background" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input 
                    type="text" 
                    defaultValue="+1 (555) 123-4567"
                    className="w-full px-3 py-2 border rounded-md bg-background" 
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <Button>Save Changes</Button>
              <Button variant="outline" className="ml-2">Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;