# Aurawill Backend API

Complete backend infrastructure for the Aurawill Health Mix e-commerce website.

## Features

- **Product Management**: CRUD operations for health mix products
- **Order Processing**: Complete order lifecycle management
- **Customer Reviews**: Review submission and approval system
- **Contact Forms**: Customer inquiry handling
- **Newsletter**: Email subscription management

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Database Setup**
   - Install MongoDB locally or use MongoDB Atlas
   - Update MONGODB_URI in .env file

3. **Environment Variables**
   - Copy .env file and update with your credentials
   - Add Stripe keys for payment processing
   - Add email credentials for notifications

4. **Start Server**
   ```bash
   npm run dev  # Development mode
   npm start    # Production mode
   ```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PATCH /api/orders/:id/status` - Update order status

### Reviews
- `GET /api/reviews` - Get approved reviews
- `POST /api/reviews` - Submit new review

### Users
- `POST /api/users/contact` - Contact form submission
- `POST /api/users/newsletter` - Newsletter subscription

## Database Models

- **Product**: Health mix product information
- **Order**: Customer orders and status tracking
- **Review**: Customer feedback and ratings

## Security Features

- CORS enabled for frontend integration
- Input validation on all endpoints
- Environment variable configuration
- Ready for JWT authentication

## Deployment Ready

- Production-ready Express server
- MongoDB integration
- Environment-based configuration
- Error handling and logging