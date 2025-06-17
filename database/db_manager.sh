 DB_URL="postgresql://rideshare_user:Vivek%401234@localhost:5432/rideshare_db"
case "$1" in
    "init")
        echo "Initializing database..."
        psql $DB_URL -f init.sql
        ;;
    "migrate")
        echo "Running migrations..."
        psql $DB_URL -f migrations/001_users.sql
        psql $DB_URL -f migrations/002_trips.sql
        psql $DB_URL -f migrations/003_matches.sql
        echo "Migrations completed!"
        ;;
    "reset")
        echo "Resetting database..."
        psql $DB_URL -c "DROP TABLE IF EXISTS trip_passengers CASCADE;"
        psql $DB_URL -c "DROP TABLE IF EXISTS trips CASCADE;"
        psql $DB_URL -c "DROP TABLE IF EXISTS users CASCADE;"
        psql $DB_URL -c "DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;"
        echo "Database reset completed!"
        ;;
    "connect")
        echo "Connecting to database..."
        psql $DB_URL
        ;;
    *)
        echo "Usage: $0 {init|migrate|reset|connect}"
        echo "  init     - Initialize database with extensions and permissions"
        echo "  migrate  - Run all migration files"
        echo "  reset    - Drop all tables and functions"
        echo "  connect  - Connect to database shell"
        ;;
esac
