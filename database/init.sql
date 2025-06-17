SET timezone = 'UTC';
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Ensure proper permissions
GRANT ALL ON SCHEMA public TO rideshare_user;
GRANT ALL ON ALL TABLES IN SCHEMA public TO rideshare_user;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO rideshare_user;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO rideshare_user;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO rideshare_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO rideshare_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO rideshare_user;

