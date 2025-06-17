package config

import (
    "os"
    "strconv"
    
    "github.com/joho/godotenv"
)

type Config struct {
    DatabaseURL    string
    JWTSecret      string
    Port           string
    EmailHost      string
    EmailPort      int
    EmailUser      string
    EmailPassword  string
    FrontendURL    string
    Environment    string
}

func Load() *Config {
    // Load .env file if it exists
    godotenv.Load()
    
    emailPort, _ := strconv.Atoi(getEnv("EMAIL_PORT", "587"))
    
    return &Config{
        DatabaseURL:   getEnv("DATABASE_URL", "postgres://localhost/rideshare_db?sslmode=disable"),
        JWTSecret:     getEnv("JWT_SECRET", "your-secret-key"),
        Port:          getEnv("PORT", "8080"),
        EmailHost:     getEnv("EMAIL_HOST", "smtp.gmail.com"),
        EmailPort:     emailPort,
        EmailUser:     getEnv("EMAIL_USER", ""),
        EmailPassword: getEnv("EMAIL_PASSWORD", ""),
        FrontendURL:   getEnv("FRONTEND_URL", "http://localhost:3000"),
        Environment:   getEnv("ENVIRONMENT", "development"),
    }
}

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}
