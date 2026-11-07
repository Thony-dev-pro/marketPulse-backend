-- ==========================================
-- INSERT SAMPLE CATEGORIES
-- ==========================================

INSERT INTO mp_categories (name) VALUES
('Electronics'),
('Computers'),
('Clothing'),
('Food'),
('Furniture'),
('Sports');

-- ==========================================
-- INSERT SAMPLE PRODUCTS
-- ==========================================

INSERT INTO mp_products (name, category_id, description, unit, status) VALUES

-- Electronics (category_id = 1)
('Smartphone Samsung', 1, 'Samsung Galaxy smartphone', 'unit', 1),
('Wireless Headphones', 1, 'Bluetooth wireless headphones', 'unit', 1),
('Smart TV 4K', 1, '55-inch 4K Smart television', 'unit', 1),

-- Computers (category_id = 2)
('Laptop Dell', 2, 'Dell laptop with Intel Core i7', 'unit', 1),
('Mechanical Keyboard', 2, 'RGB mechanical gaming keyboard', 'unit', 1),
('Gaming Mouse', 2, 'Wireless gaming mouse', 'unit', 1),

-- Clothing (category_id = 3)
('Cotton T-Shirt', 3, 'Basic cotton T-shirt', 'piece', 1),
('Jeans', 3, 'Classic blue denim jeans', 'piece', 1),
('Sneakers', 3, 'Casual everyday sneakers', 'pair', 1),

-- Food (category_id = 4)
('Rice', 4, 'White rice for daily consumption', 'kg', 1),
('Sugar', 4, 'White refined sugar', 'kg', 1),
('Cooking Oil', 4, 'Vegetable cooking oil', 'liter', 1),

-- Furniture (category_id = 5)
('Office Chair', 5, 'Ergonomic adjustable office chair', 'unit', 1),
('Wooden Desk', 5, 'Wooden office desk', 'unit', 1),

-- Sports (category_id = 6)
('Football', 6, 'Standard size football', 'unit', 1),
('Running Shoes', 6, 'Lightweight running shoes', 'pair', 1);