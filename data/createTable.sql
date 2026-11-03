-- =========================================================
-- MarketPulse database schema
-- PostgreSQL
-- =========================================================

-- Drop tables in dependency order (optional).
-- Uncomment these statements if you want to recreate the schema.
-- DROP TABLE IF EXISTS mp_price_history CASCADE;
-- DROP TABLE IF EXISTS mp_user_history CASCADE;
-- DROP TABLE IF EXISTS mp_user_roles CASCADE;
-- DROP TABLE IF EXISTS mp_products CASCADE;
-- DROP TABLE IF EXISTS mp_regions CASCADE;
-- DROP TABLE IF EXISTS mp_product_types CASCADE;
-- DROP TABLE IF EXISTS mp_categories CASCADE;
-- DROP TABLE IF EXISTS mp_users CASCADE;
-- DROP TABLE IF EXISTS mp_roles CASCADE;

-- 1. Roles
CREATE TABLE mp_roles (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(25) NOT NULL,
    description TEXT
);

-- 2. Users
CREATE TABLE mp_users (
    id       SERIAL PRIMARY KEY,
    email    VARCHAR(254) NOT NULL,
    password TEXT NOT NULL,
    status   INTEGER NOT NULL
);

-- 3. User roles (many-to-many relationship)
-- The diagram shows "role" as TEXT, but it references mp_roles.id
-- (INTEGER). Therefore role_id is defined as INTEGER.
CREATE TABLE mp_user_roles (
    id      SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,

    CONSTRAINT fk_mp_user_roles_user
        FOREIGN KEY (user_id) REFERENCES mp_users(id),
    CONSTRAINT fk_mp_user_roles_role
        FOREIGN KEY (role_id) REFERENCES mp_roles(id),
    CONSTRAINT uq_mp_user_roles_user_role
        UNIQUE (user_id, role_id)
);

-- 4. User history
CREATE TABLE mp_user_history (
    id      SERIAL PRIMARY KEY,
    date    TIMESTAMP NOT NULL,
    user_id INTEGER NOT NULL,
    action  JSONB NOT NULL,

    CONSTRAINT fk_mp_user_history_user
        FOREIGN KEY (user_id) REFERENCES mp_users(id)
);

-- 5. Product categories
CREATE TABLE mp_categories (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- 6. Product types
CREATE TABLE mp_product_types (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- 7. Products
CREATE TABLE mp_products (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(50) NOT NULL,
    category_id INTEGER NOT NULL,
    description TEXT,
    unit        CHAR(5),
    status      INTEGER,

    CONSTRAINT fk_mp_products_category
        FOREIGN KEY (category_id) REFERENCES mp_categories(id)
);

-- 8. Regions
CREATE TABLE mp_regions (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- 9. Product price history
CREATE TABLE mp_price_history (
    id             SERIAL PRIMARY KEY,
    product_id     INTEGER NOT NULL,
    date           DATE,
    region_id      INTEGER NOT NULL,
    average_price  DOUBLE PRECISION,
    volume_sales   DOUBLE PRECISION,
    product_type_id INTEGER,

    CONSTRAINT fk_mp_price_history_product
        FOREIGN KEY (product_id) REFERENCES mp_products(id),
    CONSTRAINT fk_mp_price_history_region
        FOREIGN KEY (region_id) REFERENCES mp_regions(id),
    CONSTRAINT fk_mp_price_history_product_type
        FOREIGN KEY (product_type_id) REFERENCES mp_product_types(id)
);

-- =========================================================
-- Optional indexes for commonly used foreign-key columns
-- =========================================================
CREATE INDEX idx_mp_user_history_user_id
    ON mp_user_history(user_id);

CREATE INDEX idx_mp_products_category_id
    ON mp_products(category_id);

CREATE INDEX idx_mp_price_history_product_id
    ON mp_price_history(product_id);

CREATE INDEX idx_mp_price_history_region_id
    ON mp_price_history(region_id);

CREATE INDEX idx_mp_price_history_product_type_id
    ON mp_price_history(product_type_id);

CREATE INDEX idx_mp_price_history_date
    ON mp_price_history(date);
