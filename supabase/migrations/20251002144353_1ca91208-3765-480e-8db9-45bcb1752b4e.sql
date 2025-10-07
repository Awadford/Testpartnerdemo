-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, role_type, region, company_id, portfolio_balance)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'role_type', 'investor'),
    COALESCE(NEW.raw_user_meta_data->>'region', 'US'),
    COALESCE(NEW.raw_user_meta_data->>'company_id', 'Individual'),
    0.00
  );
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();