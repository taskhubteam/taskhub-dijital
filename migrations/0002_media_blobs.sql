-- Uploaded files live in D1 (no R2 needed). Each object (an original upload or one of its WebP
-- width variants) is split into chunks of ≤1 MB — D1 caps a single row/BLOB at 2 MB.

CREATE TABLE media_objects (
  key TEXT PRIMARY KEY,          -- "<filename>" or "w<width>/<filename>.webp"
  content_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  chunks INTEGER NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE media_chunks (
  key TEXT NOT NULL,
  idx INTEGER NOT NULL,
  data BLOB NOT NULL,
  PRIMARY KEY (key, idx)
);
