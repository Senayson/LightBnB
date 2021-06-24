INSERT INTO users (name, email, password)
VALUES
('Eva Stanley', 'seabastianguerra@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Louisa Meyer', 'jacksonrose@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Sue Luna', 'jasonlevy@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Rosalina Garza', 'robertmueller@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Etta West', 'rigorousetta@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Leroy Hart', 'leroyharted@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');


INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES
(1, 'Casa Loma', 'Townhouse', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 250, 2, 3, 5, 'Canada', 'Groover', 'Etobicoke','Ontario', 'L6R1W4', True),
(2, 'Villa Verde', 'Country Home', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 450, 4, 5, 7, 'Canada', 'Franklin', 'Surrey','British Columbia', '12456', True),
(3, 'Rivoli Residence', 'Masion', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350 | https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 'https://images.pexels.com/photos/2076739/pexels-photo-2076739.jpeg', 750, 3, 8, 6, 'Canada', 'Rover', 'Regina','Sasketchewan', '12354', False),
(4, 'Black Corner', 'Masion', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350 | https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 'https://images.pexels.com/photos/2076739/pexels-photo-2076739.jpeg', 750, 3, 8, 6, 'Canada', 'Rover', 'Regina','Sasketchewan', '68844', False),
(5, 'Port Out', 'Masion', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350 | https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 'https://images.pexels.com/photos/2076739/pexels-photo-2076739.jpeg', 750, 3, 8, 6, 'Canada', 'Rover', 'Regina','Sasketchewan', '1e43t54', False);


INSERT INTO reservations (id, start_date , end_date, property_id, guest_id)
VALUES
(1,'2018-09-11', '2018-09-26', 2, 1),
(2,'2019-01-04', '2019-02-01', 2, 2),
(3,'2021-10-01', '2021-10-14', 2, 3),
(4,'2014-10-21', '2014-10-14', 4, 5);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES 
(1, 2, 1, 4, 'splendid'),
(2, 2, 2, 3, 'Okay'),
(3, 2, 3, 5, 'Great'),
(5, 4, 4, 1, 'Abhorrent');