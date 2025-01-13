/*
  # Create downloads table for tracking user downloads

  1. New Tables
    - `downloads`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `url` (text)
      - `format` (text)
      - `quality` (text)
      - `status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `downloads` table
    - Add policies for users to manage their own downloads
*/

CREATE TABLE IF NOT EXISTS downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  url text NOT NULL,
  format text NOT NULL,
  quality text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own downloads"
  ON downloads
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own downloads"
  ON downloads
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);