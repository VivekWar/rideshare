-- Migration: Create trip_passengers table
CREATE TABLE IF NOT EXISTS trip_passengers (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE,
    passenger_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(trip_id, passenger_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_trip_passengers_trip ON trip_passengers(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_passengers_user ON trip_passengers(passenger_id);
CREATE INDEX IF NOT EXISTS idx_trip_passengers_status ON trip_passengers(status);
CREATE INDEX IF NOT EXISTS idx_trip_passengers_joined_at ON trip_passengers(joined_at);
