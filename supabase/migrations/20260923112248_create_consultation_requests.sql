/*
# Create consultation requests table

1. New Tables
- `consultation_requests`
- `id` (uuid, primary key): Unique request identifier.
- `name` (text): Visitor's name.
- `email` (text): Visitor's email address.
- `phone` (text): Visitor's phone number.
- `goal` (text): The support area selected by the visitor.
- `created_at` (timestamptz): Time the request was submitted.

2. Security
- Row Level Security is enabled.
- Anonymous and authenticated visitors may submit a request.
- Submitted requests cannot be read, edited, or deleted through the public client.

3. Important Notes
- This is a single-tenant consultation landing page with no sign-in flow.
- The form intentionally stores only the fields needed to follow up.
*/

CREATE TABLE IF NOT EXISTS public.consultation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  goal text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can submit consultation requests" ON public.consultation_requests;
CREATE POLICY "Public can submit consultation requests"
ON public.consultation_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(name)) BETWEEN 2 AND 120
  AND length(trim(email)) BETWEEN 5 AND 320
  AND length(trim(phone)) BETWEEN 7 AND 40
  AND length(trim(goal)) BETWEEN 2 AND 120
);

DROP POLICY IF EXISTS "Public cannot read consultation requests" ON public.consultation_requests;
CREATE POLICY "Public cannot read consultation requests"
ON public.consultation_requests
FOR SELECT
TO anon, authenticated
USING (false);

DROP POLICY IF EXISTS "Public cannot update consultation requests" ON public.consultation_requests;
CREATE POLICY "Public cannot update consultation requests"
ON public.consultation_requests
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "Public cannot delete consultation requests" ON public.consultation_requests;
CREATE POLICY "Public cannot delete consultation requests"
ON public.consultation_requests
FOR DELETE
TO anon, authenticated
USING (false);
