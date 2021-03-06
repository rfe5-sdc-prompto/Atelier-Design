CREATE DATABASE product_overview;

\c product_overview;

-- Products

CREATE TABLE IF NOT EXISTS products (
  product_id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  slogan TEXT,
  description TEXT,
  category VARCHAR(100),
  default_price VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS features (
  feature_id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  feature VARCHAR(100),
  value VARCHAR(100),
  CONSTRAINT fk_product_id
    FOREIGN KEY(product_id)
      REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS related_products (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  related_product_id INT NOT NULL,
  CONSTRAINT fk_product_id
    FOREIGN KEY(product_id)
      REFERENCES products(product_id)
);

-- Styles

CREATE TABLE IF NOT EXISTS product_styles (
  style_id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  name VARCHAR(200),
  slogan TEXT,
  original_price VARCHAR(50),
  sale_price VARCHAR(50),
  style_default BOOLEAN NOT NULL,
  CONSTRAINT fk_product_id
    FOREIGN KEY(product_id)
      REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS style_photos (
  photos_id SERIAL PRIMARY KEY,
  style_id INT NOT NULL,
  url TEXT,
  thumbnail_url TEXT,
  CONSTRAINT fk_style_id
    FOREIGN KEY(style_id)
      REFERENCES product_styles(style_id)
);

-- Skus

CREATE TABLE IF NOT EXISTS style_skus (
  sku_id SERIAL PRIMARY KEY,
  style_id INT NOT NULL,
  size VARCHAR(50),
  quantity INT,
  CONSTRAINT fk_style_id
    FOREIGN KEY(style_id)
      REFERENCES product_styles(style_id)
);

CREATE TABLE IF NOT EXISTS cart (
  cart_id SERIAL PRIMARY KEY,
  user_session INT,
  product_id INT NOT NULL,
  active INT,
  CONSTRAINT fk_product_id
    FOREIGN KEY(product_id)
      REFERENCES products(product_id)
);

