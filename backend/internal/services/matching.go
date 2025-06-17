package services

import (
    "database/sql"
    "fmt"
    "math"
    "rideshare-backend/internal/models"
    "strings"
)

type MatchingService struct {
    db *sql.DB
}

func NewMatchingService(db *sql.DB) *MatchingService {
    return &MatchingService{db: db}
}

func (s *MatchingService) FindMatchingTrips(userID int, from, to string, maxDistance float64) ([]models.TripMatch, error) {
    query := `
        SELECT t.id, t.driver_id, t.from_location, t.to_location, t.departure_time,
               t.max_passengers, t.current_passengers, t.price_per_person, t.description,
               t.status, t.created_at, t.updated_at
        FROM trips t
        WHERE t.status = 'active' 
        AND t.driver_id != $1
        AND t.current_passengers < t.max_passengers
        AND t.departure_time > NOW()
    `
    
    rows, err := s.db.Query(query, userID)
    if err != nil {
        return nil, fmt.Errorf("failed to query trips: %w", err)
    }
    defer rows.Close()
    
    var matches []models.TripMatch
    
    for rows.Next() {
        var trip models.Trip
        err := rows.Scan(
            &trip.ID,
            &trip.DriverID,
            &trip.FromLocation,
            &trip.ToLocation,
            &trip.DepartureTime,
            &trip.MaxPassengers,
            &trip.CurrentPassengers,
            &trip.PricePerPerson,
            &trip.Description,
            &trip.Status,
            &trip.CreatedAt,
            &trip.UpdatedAt,
        )
        if err != nil {
            continue
        }
        
        // Calculate similarity score
        similarity := s.calculateSimilarity(from, to, trip.FromLocation, trip.ToLocation)
        distance := s.calculateDistance(from, to, trip.FromLocation, trip.ToLocation)
        
        if distance <= maxDistance {
            matches = append(matches, models.TripMatch{
                TripID:      trip.ID,
                PassengerID: userID,
                Similarity:  similarity,
                Distance:    distance,
            })
        }
    }
    
    return matches, nil
}

func (s *MatchingService) calculateSimilarity(from1, to1, from2, to2 string) float64 {
    fromSimilarity := s.stringSimilarity(strings.ToLower(from1), strings.ToLower(from2))
    toSimilarity := s.stringSimilarity(strings.ToLower(to1), strings.ToLower(to2))
    
    return (fromSimilarity + toSimilarity) / 2.0
}

func (s *MatchingService) stringSimilarity(s1, s2 string) float64 {
    if s1 == s2 {
        return 1.0
    }
    
    // Simple substring matching
    if strings.Contains(s1, s2) || strings.Contains(s2, s1) {
        return 0.8
    }
    
    // Check for common words
    words1 := strings.Fields(s1)
    words2 := strings.Fields(s2)
    
    commonWords := 0
    for _, w1 := range words1 {
        for _, w2 := range words2 {
            if w1 == w2 {
                commonWords++
                break
            }
        }
    }
    
    if len(words1) == 0 || len(words2) == 0 {
        return 0.0
    }
    
    return float64(commonWords) / math.Max(float64(len(words1)), float64(len(words2)))
}

func (s *MatchingService) calculateDistance(from1, to1, from2, to2 string) float64 {
    // This is a simplified distance calculation
    // In a real application, you would use actual coordinates and proper distance calculation
    
    fromDistance := s.stringDistance(from1, from2)
    toDistance := s.stringDistance(to1, to2)
    
    return (fromDistance + toDistance) / 2.0
}

func (s *MatchingService) stringDistance(s1, s2 string) float64 {
    if s1 == s2 {
        return 0.0
    }
    
    // Simple Levenshtein distance approximation
    maxLen := math.Max(float64(len(s1)), float64(len(s2)))
    if maxLen == 0 {
        return 0.0
    }
    
    return float64(s.levenshteinDistance(s1, s2)) / maxLen * 100
}

func (s *MatchingService) levenshteinDistance(s1, s2 string) int {
    if len(s1) == 0 {
        return len(s2)
    }
    if len(s2) == 0 {
        return len(s1)
    }
    
    matrix := make([][]int, len(s1)+1)
    for i := range matrix {
        matrix[i] = make([]int, len(s2)+1)
        matrix[i][0] = i
    }
    
    for j := 0; j <= len(s2); j++ {
        matrix[0][j] = j
    }
    
    for i := 1; i <= len(s1); i++ {
        for j := 1; j <= len(s2); j++ {
            cost := 0
            if s1[i-1] != s2[j-1] {
                cost = 1
            }
            
            matrix[i][j] = min(
                matrix[i-1][j]+1,      // deletion
                matrix[i][j-1]+1,      // insertion
                matrix[i-1][j-1]+cost, // substitution
            )
        }
    }
    
    return matrix[len(s1)][len(s2)]
}

func min(a, b, c int) int {
    if a < b && a < c {
        return a
    }
    if b < c {
        return b
    }
    return c
}
