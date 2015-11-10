CREATE DATABASE libros_db
  WITH OWNER = tedede_owner
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'Spanish_Spain.1252'
       LC_CTYPE = 'Spanish_Spain.1252'
       CONNECTION LIMIT = -1;

CREATE TABLE libros
(
  _id serial PRIMARY KEY,  
  titulo character varying(50) NOT NULL,
  autor character varying(50) NOT NULL,
  precio numeric(12,2) NOT NULL
);

INSERT INTO libros(_id, titulo, autor, precio)
VALUES 
    (1,'titulo1','autor1',111);

    
    -- Table: libros

 DROP TABLE usuarios;

CREATE TABLE usuarios
(
  nombre character varying(50),
  hash character varying(50) NOT NULL,
  CONSTRAINT usuarios_pkey PRIMARY KEY (nombre)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE libros
  OWNER TO postgres;

INSERT INTO usuarios (nombre,hash) values ('prueba',md5('1234'))

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;