# Express.js RESTful API – Products

## 🛠️ How to Run the Server

### Prerequisites
- Node.js **v18 or higher**
- npm installed

### Installation
```bash
# Clone the repository
git clone https://github.com/PLP-MERN-Stack-Development/express-js-server-side-framework-EUGEN254.git
cd express-js-server-side-framework-EUGEN254

# Install dependencies
npm install express body-parser dotenv mongoose nodemon uuid
Environment Variables
Create a .env file in the root directory with:

### Environment varibales
Copy code
PORT=3000
MONGO_URI=mongodb+srv://eugen:12345@week2.unh7pco.mongodb.net/?retryWrites=true&w=majority&appName=week2
API_KEY=my_secret_key


# Run in development mode (with nodemon auto-restart)
npm run dev
Server runs at: http://localhost:3000

### API Documentation
    Base URL
    bash
    Copy code
    http://localhost:3000/api/products
    Endpoints
    Method	Endpoint	Description
    GET	/api/products	Get all products (supports filtering, pagination)
    GET	/api/products/:id	Get a specific product by ID
    POST	/api/products	Create a new product
    PUT	/api/products/:id	Update an existing product
    DELETE	/api/products/:id	Delete a product
    GET	/api/products/search?q=	Search products by name
    GET	/api/products/stats/category	Get product count by category

## Example Requests & Responses
    1. Get All Products
    Request:


    GET /api/products?page=1&limit=2
    Response:

    json
    Copy code
    [
    {
        "_id": "68dfd534dfcabc238c745c3d",
        "name": "MacBook Pro",
        "description": "Apple 16-inch laptop",
        "price": 2499,
        "category": "Electronics",
        "inStock": true,
        "createdAt": "2025-10-03T13:52:52.162Z",
        "updatedAt": "2025-10-03T13:52:52.162Z",
        "__v": 0
    },
    {
        "_id": "68dfd64edfcabc238c745c44",
        "name": "iPhone 15",
        "description": "Latest Apple smartphone",
        "price": 1299,
        "category": "Electronics",
        "inStock": true,
        "createdAt": "2025-10-03T13:57:34.437Z",
        "updatedAt": "2025-10-03T13:57:34.437Z",
        "__v": 0
    }
    ]
## 2. Get Product by ID
        Request:

        http
        Copy code
        GET /api/products/68dfd534dfcabc238c745c3d
        Response:

        json
        Copy code
        {
        "_id": "68dfd534dfcabc238c745c3d",
        "name": "MacBook Pro",
        "description": "Apple 16-inch laptop",
        "price": 2499,
        "category": "Electronics",
        "inStock": true,
        "createdAt": "2025-10-03T13:52:52.162Z",
        "updatedAt": "2025-10-03T13:52:52.162Z",
        "__v": 0
        }
### 3. Create a New Product
        Request:

        http
        Copy code
        POST /api/products
        Content-Type: application/json
        Authorization: Bearer <API_KEY>

        {
        "name": "Coffee Maker",
        "description": "Automatic drip coffee machine",
        "price": 89,
        "category": "Home Appliances",
        "inStock": true
        }
        Response:

        json
        Copy code
        {
        "_id": "68dfd65cdfcabc238c745c46",
        "name": "Coffee Maker",
        "description": "Automatic drip coffee machine",
        "price": 89,
        "category": "Home Appliances",
        "inStock": true,
        "createdAt": "2025-10-03T13:57:48.238Z",
        "updatedAt": "2025-10-03T13:57:48.238Z",
        "__v": 0
        }
4. Update a Product
        Request:

        http
        Copy code
        PUT /api/products/68dfd64edfcabc238c745c44
        Content-Type: application/json
        Authorization: Bearer <API_KEY>

        {
        "name": "iPhone 15 Pro",
        "description": "Latest Apple Pro smartphone",
        "price": 1499,
        "category": "Electronics",
        "inStock": false
        }
        Response:

        json
        Copy code
        {
        "_id": "68dfd64edfcabc238c745c44",
        "name": "iPhone 15 Pro",
        "description": "Latest Apple Pro smartphone",
        "price": 1499,
        "category": "Electronics",
        "inStock": false,
        "createdAt": "2025-10-03T13:57:34.437Z",
        "updatedAt": "2025-10-03T14:10:00.123Z",
        "__v": 0
        }
5. Delete a Product
        Request:

        http
        Copy code
        DELETE /api/products/68dfd65cdfcabc238c745c46
        Authorization: Bearer <API_KEY>
        Response:

        json
        Copy code
        { "message": "Product deleted successfully" }
        6. Search Products
        Request:

        http
        Copy code
        GET /api/products/search?q=macbook
        Response:

        json
        Copy code
        [
        {
            "_id": "68dfd534dfcabc238c745c3d",
            "name": "MacBook Pro",
            "description": "Apple 16-inch laptop",
            "price": 2499,
            "category": "Electronics",
            "inStock": true
        }
        ]
7. Product Statistics
        Request:

        http
        Copy code
        GET /api/products/stats/category
        Response:

        json
        Copy code
        [
        { "_id": "Electronics", "count": 3 },
        { "_id": "Home Appliances", "count": 1 }
        ]