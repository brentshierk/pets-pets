// MODELS
const pet = require('../models/pet');
const Pet = require('../models/pet');

// PET ROUTES
module.exports = (app) => {

  // INDEX PET => index.js
//SEARCH PET
app.get('/search',(req,res) =>{
  const SearchTerm = new RegExp(req.query.term,"i");
  const page = req.query.page || 1;
  Pet.paginate(
    {
        $or: [{name:SearchTerm},{species:SearchTerm}]
    },
    {page:page}
  ).then((results) =>{
    res.render("pets-index",{
      pets:results.docs,
      pagesCount: results.pages,
      currentPage:page,
      term:req.query.term
    });
  });
   
});
//Show queryed pets
app.get('/search/:term/results',(req,res) => {
  Pet.find(req.params.term).exec((err,pet) =>{
    res.render("pets-results")
  })
});
  // NEW PET
  app.get('/pets/new', (req, res) => {
    res.render('pets-new');
  });

  // CREATE PET
  app.post('/pets', (req, res) => {
    var pet = new Pet(req.body);

    pet.save()
      .then((pet) => {
        res.redirect(`/pets/${pet._id}`);
      })
      .catch((err) => {
        // Handle Errors
      }) ;
  });

  // SHOW PET
  app.get('/pets/:id', (req, res) => {
    Pet.findById(req.params.id).exec((err, pet) => {
      res.render('pets-show', { pet: pet });
    });
  });

  // EDIT PET
  app.get('/pets/:id/edit', (req, res) => {
    Pet.findById(req.params.id).exec((err, pet) => {
      res.render('pets-edit', { pet: pet });
    });
  });

  // UPDATE PET
  app.put('/pets/:id', (req, res) => {
    Pet.findByIdAndUpdate(req.params.id, req.body)
      .then((pet) => {
        res.redirect(`/pets/${pet._id}`)
      })
      .catch((err) => {
        // Handle Errors
      });
  });

  // DELETE PET
  app.delete('/pets/:id', (req, res) => {
    Pet.findByIdAndRemove(req.params.id).exec((err, pet) => {
      return res.redirect('/')
    });
  });

  

};

  
