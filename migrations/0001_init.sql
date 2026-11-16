-- Blog + admin schema (Cloudflare D1 / SQLite). Dates are ISO-8601 UTC strings.

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'author')),
  created_at TEXT NOT NULL
);

CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL
);

CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category TEXT NOT NULL,
  keywords TEXT NOT NULL DEFAULT '[]', -- JSON array of strings
  content_html TEXT NOT NULL,
  featured_image TEXT,
  featured_image_alt TEXT NOT NULL DEFAULT '',
  focus_keyphrase TEXT NOT NULL DEFAULT '',
  keyphrase_synonyms TEXT NOT NULL DEFAULT '',
  seo_title TEXT NOT NULL DEFAULT '',
  meta_description TEXT NOT NULL DEFAULT '',
  og_title TEXT NOT NULL DEFAULT '',
  og_description TEXT NOT NULL DEFAULT '',
  canonical_url TEXT NOT NULL DEFAULT '',
  noindex INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('draft', 'published')),
  author_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  published_at TEXT
);
CREATE INDEX posts_public ON posts (status, published_at);
CREATE INDEX posts_updated ON posts (updated_at);

CREATE TABLE media (
  id TEXT PRIMARY KEY,
  filename TEXT NOT NULL UNIQUE, -- R2 object key of the original
  alt TEXT NOT NULL DEFAULT '',
  content_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  widths TEXT NOT NULL DEFAULT '[]', -- JSON array of pre-generated WebP widths
  uploaded_at TEXT NOT NULL
);

CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL DEFAULT '',
  budget TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL,
  read INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);
CREATE INDEX messages_created ON messages (created_at);
