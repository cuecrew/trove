-- SQL required to setup Trove backend on Supabase

-- 1. Create the `items` table
CREATE TABLE public.items (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    cat TEXT,
    title TEXT NOT NULL,
    sub TEXT,
    cover TEXT,
    "placeholderTone" TEXT,
    rating NUMERIC,
    status TEXT,
    date TEXT,
    when_time TEXT,
    "loggedAt" TIMESTAMPTZ DEFAULT now(),
    note TEXT,
    tags JSONB
);

-- 2. Enable Row Level Security (RLS) on the table
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies
-- Users can read only their own items
CREATE POLICY "Users can only see their own items" 
ON public.items FOR SELECT 
USING (auth.uid() = user_id);

-- Users can insert only items tied to their own user_id
CREATE POLICY "Users can only insert their own items" 
ON public.items FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update only their own items
CREATE POLICY "Users can only update their own items" 
ON public.items FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can delete only their own items
CREATE POLICY "Users can only delete their own items" 
ON public.items FOR DELETE 
USING (auth.uid() = user_id);
