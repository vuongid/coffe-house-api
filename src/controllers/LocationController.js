
const Location = require('../models/Location');

class AuthController {

    // [GET] api/location/get-all
    async getAll(req, res, next) {
        try {
            const list = await Location.find()
            return res.status(200).json(list)
        } catch (error) {
            return res.status(500).send('Server error');
        }
    }

    // [POST] api/location/add
    async add(req, res, next){
        try {
            const { name } = req.body;
            const location = new Location({
                name
            });
        
            const savedLocation = await location.save();
            return res.status(201).json(savedLocation);
          } catch (error) {
            console.error(error);
            return res.status(500).send('Server error');
          }
    }
}

module.exports = new AuthController();