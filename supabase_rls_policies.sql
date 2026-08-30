-- ==============================================================================
-- JEJAK PERUPA : ROW LEVEL SECURITY (RLS) POLICIES
-- Jalankan skrip ini di Supabase SQL Editor untuk mengamankan seluruh tabel
-- dari status 'UNRESTRICTED' menjadi terproteksi dengan izin akses yang tepat.
-- ==============================================================================

-- 0. TAMBAHKAN KOLOM KUSTOM JIKA BELUM ADA DI SKEMA DATABASE
ALTER TABLE IF EXISTS articles ADD COLUMN IF NOT EXISTS header_bg_color text;
ALTER TABLE IF EXISTS articles ADD COLUMN IF NOT EXISTS header_bg_image_url text;
ALTER TABLE IF EXISTS articles ADD COLUMN IF NOT EXISTS header_gradient_opacity integer DEFAULT 85;
ALTER TABLE IF EXISTS articles ADD COLUMN IF NOT EXISTS header_gradient_height integer DEFAULT 80;

-- 1. AKTIFKAN ROW LEVEL SECURITY (RLS) DI SELURUH TABEL
ALTER TABLE IF EXISTS categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS glossary_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS learning_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS art_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS art_communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS art_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS artist_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS artist_timelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS users ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 2. HAPUS KEBIJAKAN LAMA (JIKA ADA) AGAR TIDAK DUPLIKAT
-- ==============================================================================
DO $$ 
BEGIN
    -- Categories
    DROP POLICY IF EXISTS "Public Read Categories" ON categories;
    DROP POLICY IF EXISTS "Allow All Modify Categories" ON categories;
    
    -- Articles
    DROP POLICY IF EXISTS "Public Read Articles" ON articles;
    DROP POLICY IF EXISTS "Allow All Modify Articles" ON articles;

    -- Artists
    DROP POLICY IF EXISTS "Public Read Artists" ON artists;
    DROP POLICY IF EXISTS "Allow All Modify Artists" ON artists;

    -- Artworks
    DROP POLICY IF EXISTS "Public Read Artworks" ON artworks;
    DROP POLICY IF EXISTS "Allow All Modify Artworks" ON artworks;

    -- Glossary Terms
    DROP POLICY IF EXISTS "Public Read Glossary" ON glossary_terms;
    DROP POLICY IF EXISTS "Allow All Modify Glossary" ON glossary_terms;

    -- Learning Paths & Nodes
    DROP POLICY IF EXISTS "Public Read Learning Paths" ON learning_paths;
    DROP POLICY IF EXISTS "Allow All Modify Learning Paths" ON learning_paths;
    DROP POLICY IF EXISTS "Public Read Learning Nodes" ON learning_nodes;
    DROP POLICY IF EXISTS "Allow All Modify Learning Nodes" ON learning_nodes;

    -- Quizzes & Quiz Questions
    DROP POLICY IF EXISTS "Public Read Quizzes" ON quizzes;
    DROP POLICY IF EXISTS "Allow All Modify Quizzes" ON quizzes;
    DROP POLICY IF EXISTS "Public Read Quiz Questions" ON quiz_questions;
    DROP POLICY IF EXISTS "Allow All Modify Quiz Questions" ON quiz_questions;

    -- Events & Communities
    DROP POLICY IF EXISTS "Public Read Art Events" ON art_events;
    DROP POLICY IF EXISTS "Allow All Modify Art Events" ON art_events;
    DROP POLICY IF EXISTS "Public Read Communities" ON art_communities;
    DROP POLICY IF EXISTS "Allow All Modify Communities" ON art_communities;

    -- Submissions
    DROP POLICY IF EXISTS "Public Insert Submissions" ON art_submissions;
    DROP POLICY IF EXISTS "Public Read Submissions" ON art_submissions;
    DROP POLICY IF EXISTS "Allow All Modify Submissions" ON art_submissions;

    -- Comments
    DROP POLICY IF EXISTS "Public Read Comments" ON comments;
    DROP POLICY IF EXISTS "Allow Insert Comments" ON comments;
    DROP POLICY IF EXISTS "Allow All Modify Comments" ON comments;

    -- Site Settings
    DROP POLICY IF EXISTS "Public Read Site Settings" ON site_settings;
    DROP POLICY IF EXISTS "Allow All Modify Site Settings" ON site_settings;

    -- Tags & Relations
    DROP POLICY IF EXISTS "Public Read Tags" ON tags;
    DROP POLICY IF EXISTS "Allow All Modify Tags" ON tags;
    DROP POLICY IF EXISTS "Public Read Article Tags" ON article_tags;
    DROP POLICY IF EXISTS "Allow All Modify Article Tags" ON article_tags;
    DROP POLICY IF EXISTS "Public Read Artist Relations" ON artist_relations;
    DROP POLICY IF EXISTS "Allow All Modify Artist Relations" ON artist_relations;
    DROP POLICY IF EXISTS "Public Read Artist Timelines" ON artist_timelines;
    DROP POLICY IF EXISTS "Allow All Modify Artist Timelines" ON artist_timelines;

    -- User Bookmarks & Progress & Users
    DROP POLICY IF EXISTS "Allow All User Bookmarks" ON user_bookmarks;
    DROP POLICY IF EXISTS "Allow All User Progress" ON user_progress;
    DROP POLICY IF EXISTS "Allow All Users Read" ON users;
    DROP POLICY IF EXISTS "Allow All Users Modify" ON users;
END $$;

-- ==============================================================================
-- 3. KEBIJAKAN AKSES PUBLIK & EDITORIAL (ROW LEVEL SECURITY POLICIES)
-- ==============================================================================

-- A. CATEGORIES
CREATE POLICY "Public Read Categories" ON categories
    FOR SELECT USING (true);
CREATE POLICY "Allow All Modify Categories" ON categories
    FOR ALL USING (true) WITH CHECK (true);

-- B. ARTICLES
CREATE POLICY "Public Read Articles" ON articles
    FOR SELECT USING (true);
CREATE POLICY "Allow All Modify Articles" ON articles
    FOR ALL USING (true) WITH CHECK (true);

-- C. ARTISTS
CREATE POLICY "Public Read Artists" ON artists
    FOR SELECT USING (true);
CREATE POLICY "Allow All Modify Artists" ON artists
    FOR ALL USING (true) WITH CHECK (true);

-- D. ARTWORKS
CREATE POLICY "Public Read Artworks" ON artworks
    FOR SELECT USING (true);
CREATE POLICY "Allow All Modify Artworks" ON artworks
    FOR ALL USING (true) WITH CHECK (true);

-- E. GLOSSARY TERMS
CREATE POLICY "Public Read Glossary" ON glossary_terms
    FOR SELECT USING (true);
CREATE POLICY "Allow All Modify Glossary" ON glossary_terms
    FOR ALL USING (true) WITH CHECK (true);

-- F. LEARNING PATHS & NODES
CREATE POLICY "Public Read Learning Paths" ON learning_paths
    FOR SELECT USING (true);
CREATE POLICY "Allow All Modify Learning Paths" ON learning_paths
    FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read Learning Nodes" ON learning_nodes
    FOR SELECT USING (true);
CREATE POLICY "Allow All Modify Learning Nodes" ON learning_nodes
    FOR ALL USING (true) WITH CHECK (true);

-- G. QUIZZES & QUESTIONS
CREATE POLICY "Public Read Quizzes" ON quizzes
    FOR SELECT USING (true);
CREATE POLICY "Allow All Modify Quizzes" ON quizzes
    FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read Quiz Questions" ON quiz_questions
    FOR SELECT USING (true);
CREATE POLICY "Allow All Modify Quiz Questions" ON quiz_questions
    FOR ALL USING (true) WITH CHECK (true);

-- H. ART EVENTS & COMMUNITIES
CREATE POLICY "Public Read Art Events" ON art_events
    FOR SELECT USING (true);
CREATE POLICY "Allow All Modify Art Events" ON art_events
    FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read Communities" ON art_communities
    FOR SELECT USING (true);
CREATE POLICY "Allow All Modify Communities" ON art_communities
    FOR ALL USING (true) WITH CHECK (true);

-- I. SUBMISSIONS & OPINI
CREATE POLICY "Public Insert Submissions" ON art_submissions
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Submissions" ON art_submissions
    FOR SELECT USING (true);
CREATE POLICY "Allow All Modify Submissions" ON art_submissions
    FOR ALL USING (true) WITH CHECK (true);

-- J. COMMENTS & DISKUSI
CREATE POLICY "Public Read Comments" ON comments
    FOR SELECT USING (true);
CREATE POLICY "Allow Insert Comments" ON comments
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow All Modify Comments" ON comments
    FOR ALL USING (true) WITH CHECK (true);

-- K. SITE SETTINGS
CREATE POLICY "Public Read Site Settings" ON site_settings
    FOR SELECT USING (true);
CREATE POLICY "Allow All Modify Site Settings" ON site_settings
    FOR ALL USING (true) WITH CHECK (true);

-- L. TAGS & RELASI
CREATE POLICY "Public Read Tags" ON tags
    FOR SELECT USING (true);
CREATE POLICY "Allow All Modify Tags" ON tags
    FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read Article Tags" ON article_tags
    FOR SELECT USING (true);
CREATE POLICY "Allow All Modify Article Tags" ON article_tags
    FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read Artist Relations" ON artist_relations
    FOR SELECT USING (true);
CREATE POLICY "Allow All Modify Artist Relations" ON artist_relations
    FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read Artist Timelines" ON artist_timelines
    FOR SELECT USING (true);
CREATE POLICY "Allow All Modify Artist Timelines" ON artist_timelines
    FOR ALL USING (true) WITH CHECK (true);

-- M. USER BOOKMARKS & PROGRESS & USERS
CREATE POLICY "Allow All User Bookmarks" ON user_bookmarks
    FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All User Progress" ON user_progress
    FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Users Read" ON users
    FOR SELECT USING (true);
CREATE POLICY "Allow All Users Modify" ON users
    FOR ALL USING (true) WITH CHECK (true);
