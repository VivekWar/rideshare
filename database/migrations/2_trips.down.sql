-- Drop trips table and related objects
DROP TRIGGER IF EXISTS update_trips_updated_at ON trips;
DROP TABLE IF EXISTS trips CASCADE;
