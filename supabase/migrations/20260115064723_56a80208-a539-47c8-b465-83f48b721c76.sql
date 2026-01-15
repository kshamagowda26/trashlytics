-- Add image columns to waste_reports table
ALTER TABLE public.waste_reports 
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS after_image_url TEXT;

-- Create storage bucket for waste report images
INSERT INTO storage.buckets (id, name, public)
VALUES ('waste-images', 'waste-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload images
CREATE POLICY "Users can upload waste images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'waste-images');

-- Allow public read access to waste images
CREATE POLICY "Public can view waste images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'waste-images');

-- Allow users to update their own images
CREATE POLICY "Users can update their own waste images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'waste-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to delete their own images
CREATE POLICY "Users can delete their own waste images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'waste-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create leaderboard view for top contributors
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT 
  up.user_id,
  p.full_name,
  p.avatar_url,
  up.eco_points,
  up.level,
  up.total_reports,
  up.resolved_reports,
  RANK() OVER (ORDER BY up.eco_points DESC) as rank
FROM public.user_progress up
LEFT JOIN public.profiles p ON up.user_id = p.user_id
ORDER BY up.eco_points DESC
LIMIT 100;

-- Enable RLS on leaderboard view access via user_progress
-- (The view inherits from user_progress which has RLS, so we need a public read policy)
CREATE POLICY "Anyone can view leaderboard data"
ON public.user_progress
FOR SELECT
TO public
USING (true);