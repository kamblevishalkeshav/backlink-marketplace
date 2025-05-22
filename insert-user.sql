-- Insert a default admin user
INSERT INTO "User" (id, email, name, role, "createdAt", "updatedAt")
VALUES (
  'admin-user-123',
  'admin@example.com',
  'Admin User',
  'ADMIN',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT (email) DO NOTHING; 