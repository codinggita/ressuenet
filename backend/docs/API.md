# API Documentation

## Base URL
`http://localhost:5000/api`

## Endpoints

### Authentication
- **POST** `/auth/register` - User/NGO Registration
- **POST** `/auth/login` - User/NGO Login

### Rescue Services
- **GET** `/rescue` - List active rescue requests
- **POST** `/rescue/report` - Report a new animal in need

### Adoption
- **GET** `/pets` - List available pets for adoption
- **POST** `/pets/add` - Add a new pet profile (NGO only)
