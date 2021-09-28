CREATE DATABASE product_overview;

\c product_overview;

-- Products

CREATE TABLE IF NOT EXISTS products (
  product_id INT NOT NULL,
  name VARCHAR(100),
  slogan VARCHAR(100),
  description VARCHAR(200),
  category VARCHAR(50),
  default_price VARCHAR(50),
  PRIMARY KEY(product_id)
);

CREATE TABLE IF NOT EXISTS product_features (
  feature_id INT NOT NULL,
  product_id INT NOT NULL,
  PRIMARY KEY(feature_id),
  CONSTRAINT fk_product
    FOREIGN KEY(feature_id)
      REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS features (
  id INT NOT NULL,
  feature_id INT NOT NULL,
  feature VARCHAR(100),
  value VARCHAR(100),
  PRIMARY KEY(id),
  CONSTRAINT fk_product_features
    FOREIGN KEY(feature_id)
      REFERENCES product_features(feature_id)
);

CREATE TABLE IF NOT EXISTS related_products (
  related_product_id INT NOT NULL,
  product_id INT NOT NULL,
  PRIMARY KEY(related_product_id),
  CONSTRAINT fk_product_id
    FOREIGN KEY(product_id)
      REFERENCES products(product_id)
);

-- Styles

CREATE TABLE IF NOT EXISTS product_styles (
  style_id INT NOT NULL,
  product_id INT NOT NULL,
  name VARCHAR(100),
  slogan VARCHAR(100),
  original_price VARCHAR(50),
  sale_price VARCHAR(50),
  style_default BOOLEAN NOT NULL,
  PRIMARY KEY(style_id),
  CONSTRAINT fk_product_id
    FOREIGN KEY(product_id)
      REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS style_photos (
  photos_id INT NOT NULL,
  style_id INT NOT NULL,
  thumbnail_url VARCHAR(100),
  url VARCHAR(100),
  PRIMARY KEY(photos_id),
  CONSTRAINT fk_style_id
    FOREIGN KEY(style_id)
      REFERENCES product_styles(style_id)
);

-- Skus

CREATE TABLE IF NOT EXISTS style_skus (
  sku_id INT NOT NULL,
  quantity INT,
  size VARCHAR(50),
  style_id INT NOT NULL,
  PRIMARY KEY(sku_id),
  CONSTRAINT fk_style_id
    FOREIGN KEY(style_id)
      REFERENCES product_styles(style_id)
);

CREATE TABLE IF NOT EXISTS cart (
  cart_id INT NOT NULL,
  sku_id INT NOT NULL,
  count INT,
  PRIMARY KEY(cart_id),
  CONSTRAINT fk_sku_id
    FOREIGN KEY(sku_id)
      REFERENCES style_skus(sku_id)
);

