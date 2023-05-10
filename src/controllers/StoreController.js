
const Store = require('../models/Store');
const Location = require('../models/Location');

class AuthController {

    // [GET] api/store/get-all
    async getAll(req, res, next) {
        try {
            const list = await Store.find().populate('idLocation')
            return res.status(200).json(list)
        } catch (error) {
            return res.status(500).send('Server error');
        }
    }

    // [GET] api/store/list-:slug
    getBySlug(req, res, next) {
        Location.findOne({slug:req.params.slug})
              .then(location =>{
                  Store.find({idLocation: location._id})
                      .then(stores => {
                          if(stores.length > 0){
                              const id = location._id;
                              const name = location.name;
                              return res.json([{
                                  id,
                                  name,
                                  stores}])
                          } else {
                              return res.json()
                          }
                      })
                      .catch(error => console.log(error))
              })
              .catch(next)
    }

    // [POST] api/store/add
    async add(req, res, next){
        try {
            const { name, description, address, time, idLocation} = req.body;
            const image = req.file.filename;
        
            const store = new Store({
              name,
              description,
              image,
              address,
              time,
              idLocation
            });

            const savedStore = await store.save();
            res.status(201).json(savedStore);
          } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
          }
    }
}

module.exports = new AuthController();