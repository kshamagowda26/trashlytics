-- Drop the security definer view
DROP VIEW IF EXISTS public.leaderboard;

-- Create a security invoker function instead to get leaderboard data
CREATE OR REPLACE FUNCTION public.get_leaderboard()
RETURNS TABLE (
  user_id UUID,
  full_name TEXT,
  avatar_url TEXT,
  eco_points INTEGER,
  level INTEGER,
  total_reports INTEGER,
  resolved_reports INTEGER,
  rank BIGINT
)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT 
    up.user_id,
    p.full_name,
    p.avatar_url,
    up.eco_points,
    up.level,
    up.total_reports,
    up.resolved_reports,
    RANK() OVER (ORDER BY up.eco_points DESC)::BIGINT as rank
  FROM public.user_progress up
  LEFT JOIN public.profiles p ON up.user_id = p.user_id
  ORDER BY up.eco_points DESC
  LIMIT 100;
$$;