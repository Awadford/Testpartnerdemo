-- Add company_id column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN company_id TEXT DEFAULT 'Individual';

-- Update the handle_new_user function to include company_id
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, role_type, region, portfolio_balance, company_id)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data ->> 'role_type', 'investor'),
    COALESCE(new.raw_user_meta_data ->> 'region', 'US'),
    0.00,
    COALESCE(new.raw_user_meta_data ->> 'company_id', 'Individual')
  );
  RETURN new;
END;
$$;