import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    pendo: {
      initialize: (config: any) => void;
      identify: (config: any) => void;
    };
  }
}

interface UserProfile {
  role_type: string;
  region: string;
  portfolio_balance: number;
  company_id: string;
}

export const usePendo = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Fetch user profile data
  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const { data } = await supabase
          .from('profiles')
          .select('role_type, region, portfolio_balance, company_id')
          .eq('id', user.id)
          .maybeSingle();
        
        if (data) {
          setProfile(data);
        }
      };
      
      fetchProfile();
    }
  }, [user]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.pendo && user) {
      // Initialize Pendo with user data and profile metadata (with defaults if profile not loaded)
      window.pendo.initialize({
        visitor: {
          id: user.email,
          email: user.email,
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
          role_type: profile?.role_type || 'investor',
          region: profile?.region || 'US',
          portfolio_total_balance: profile?.portfolio_balance || 0,
        },
        account: {
          id: profile?.company_id || 'Individual',
          name: profile?.company_id === 'Individual' ? 'Individual' : (profile?.company_id || 'Individual'),
        }
      });
    }
  }, [user, profile]);

  return null;
};