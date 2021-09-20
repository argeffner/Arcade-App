\echo 'Delete and recreate arcade db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE IF EXISTS arcade;
CREATE DATABASE arcade;
\connect arcade

\i arcade-schema.sql
\i arcade-seed.sql

\echo 'Delete and recreate arcade_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE IF EXISTS arcade_test;
CREATE DATABASE arcade_test;
\connect arcade_test

\i arcade-schema.sql
