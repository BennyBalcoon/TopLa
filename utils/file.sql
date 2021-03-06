DROP TABLE IF EXISTS adverts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;

CREATE TABLE
IF NOT EXISTS users
(
    usr_id SERIAL PRIMARY KEY NOT NULL,
    usr_firstname CHARACTER VARYING(255) NOT NULL,
    usr_lastname CHARACTER VARYING(255) NOT NULL,
    usr_avatar CHARACTER VARYING NOT NULL,
    usr_email CHARACTER VARYING(255) UNIQUE NOT NULL,
    usr_password CHARACTER VARYING NOT NULL,
    usr_birthdate DATE NOT NULL,
    usr_createdAt DATE,
    usr_updatedAt DATE
);

CREATE TABLE
IF NOT EXISTS categories
(
    cat_id SERIAL PRIMARY KEY NOT NULL,
    cat_name CHARACTER VARYING(255) NOT NULL,
    cat_image CHARACTER VARYING(255),
    cat_createdAt DATE,
    cat_updatedAt DATE
);

CREATE TYPE kind AS ENUM ('Don', 'Demande');
CREATE TYPE condition AS ENUM ('comme neuf', 'bon état', 'état moyen', 'à retaper');

CREATE TABLE
IF NOT EXISTS adverts
(
    adv_id SERIAL PRIMARY KEY NOT NULL,
    adv_kind kind,
    adv_title CHARACTER VARYING(255) NOT NULL,
    adv_description CHARACTER VARYING NOT NULL,
    adv_image CHARACTER VARYING NOT NULL,
    adv_condition condition,
    adv_address CHARACTER VARYING(255) NOT NULL,
    adv_location GEOGRAPHY(POINT, 4326) NOT NULL,
    adv_createdAt DATE,
    adv_updatedAt DATE,
    adv_usrid INTEGER NOT NULL,
    adv_catid INTEGER NOT NULL,
    FOREIGN KEY (adv_usrid) REFERENCES users(usr_id),
    FOREIGN KEY (adv_catid) REFERENCES categories(cat_id)
)
;

INSERT INTO categories
    (cat_name, cat_image, cat_createdAt, cat_updatedAt)
VALUES
    ('meubles', 'https://images.unsplash.com/photo-1550226891-ef816aed4a98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', '2020-11-03', '2020-11-03'),
    ('électroménager', 'https://images.unsplash.com/photo-1582189587033-17c59adf24ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1506&q=80', '2020-11-03', '2020-11-03'),
    ('vaisselle', 'https://images.unsplash.com/photo-1484632152040-840235adc262?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=958&q=80', '2020-11-03', '2020-11-03'),
    ('vêtements', 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80', '2020-11-03', '2020-11-03'),
    ('jeux et jouets', 'https://images.unsplash.com/photo-1500995617113-cf789362a3e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', '2020-11-03', '2020-11-03'),
    ('déco', 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', '2020-11-03', '2020-11-03'),
    ('livres', 'https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80', '2020-11-03', '2020-11-03'),
    ('musique', 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80', '2020-11-03', '2020-11-03'),
    ('films', 'https://images.unsplash.com/photo-1592780828756-c418d71faa1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', '2020-11-03', '2020-11-03'),
    ('jardin et bricolage', 'https://images.unsplash.com/photo-1523301551780-cd17359a95d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80', '2020-11-03', '2020-11-03')
;

-- INSERT INTO adverts (adv_kind, adv_title, adv_description, adv_image, adv_second_image, adv_third_image, adv_condition, adv_location, adv_createdAt, adv_updatedAt ,adv_usrid, adv_catid)
-- VALUES 
-- ('Don', 'table à rabats', 'Je donne cette table qui est très jolie et en bon état', 'https://res-2.cloudinary.com/made-com/image/upload/c_pad,dpr_1.0,f_auto,h_1500,q_auto:best,w_2889/v1/catalog/product/f/j/fjord_rectangular_gateleg_table_oak_lb06.jpg', '', '', 'bon état', '33250', '2020-11-03', '2020-11-03', '1', '1')
-- ('2019-12-05', 'Lot de plusieurs bavoirs', 'je ne les utilise plus', '13001', '2020-11-03', '2020-11-03', '2', '4'),
-- ('2020-10-02', 'Lots de 10 dvd', '10 films dont jurassic park, massacre à la tronçonneuse, etc...', '75018', '2020-11-03', '2020-11-03', '5', '9'),
-- ('2020-8-12', 'Intégrale livres amie prodigieuse', 'Les quatre livres sont en très bon état', '95000', '2020-11-03', '2020-11-03', '6', '7'),
-- ('2020-8-22', 'Fauteuil Ikea à retaper', 'Donne ce fauteuil. à nettoyer et repeindre', '50260', '2020-11-03', '2020-11-03', '3', '1'),
-- ('2019-11-15', 'Donne lot de 50 assiettes et verres en carton', 'encore sous emballage, jamais utilisé', '75018', '2020-11-03', '2020-11-03', '4', '3'),
-- ('2020-9-07', 'Paire de chaussures de marche taille 44', 'Elles sont comme neuves', '22110', '2020-11-03', '2020-11-03', '4', '4'),
-- ('2020-5-21', 'radio réveil sony', 'Bonjour! Je donne ce radio réveil très peu utilisé et qui fonctionne encore très bien', '75018', '2020-11-03', '2020-11-03', '6', '2')
;