const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '1234',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = (email) => {
  
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((result) => {
      
      if (result.rows[0]) {
        
        return result.rows[0];
      }
      return null;
    })
    .catch((err) => {
      return err.message;
    });
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = (id) => {
  
  return pool
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then((result) => {
      
      if (result.rows[0]) {

        return result.rows[0];
      }
      return null;
    })
    .catch((err) => {
      return err.message;
    });
};

exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = (user) => {
  return pool
    .query(`INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *;`, [user.name, user.email, user.password])
    .then((result) => {

      if (result.rows[0]) {

        return result.rows[0];
      }
      return null;
    })
    .catch((err) => {
      return err.message;
    });
};

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool
    .query(`SELECT * FROM reservations WHERE guest_id = $1 Limit $2;`, [guest_id, limit])
    .then((result) => {
      console.log('This is result' ,result.rows)
      if (result.rows) {

        return result.rows;
      }
      return null;
    })
    .catch((err) => {
      return err.message;
    });
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function (options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND owner_id = $${queryParams.length} `;
  }
  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night * 100}`);
    queryString += `AND cost_per_night > $${queryParams.length} `;
  }
  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night * 100}`);
    queryString += `AND cost_per_night < $${queryParams.length} `;
  }
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `AND rating > $${queryParams.length} `;
  }

  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  // console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then(
    (res) => {
    // console.log('This are the properties', res.rows);
    return  res.rows }
    );
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  console.log(property)
  let queryParams = [];

    for(const attribute in property){
      queryParams.push(property[attribute]);
    }
  
  let queryString = `
  INSERT INTO properties(
    title,
    description,
    number_of_bathrooms,
    number_of_bedrooms,
    parking_spaces,
    cost_per_night,
    thumbnail_photo_url,
    cover_photo_url,
    street,
    country,
    city,
    province,
    post_code,
    owner_id
  )
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13, $14) RETURNING *
  `


  return pool.query(queryString, queryParams);
}


exports.addProperty = addProperty;
