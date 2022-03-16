// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movies.model");
const mongoose = require("mongoose");
// all your routes here


router.get("/movies/create", async (req, res) => {

    const findCelebs = await Celebrity.find();
    res.render("movies/new-movie", {findCelebs});
});


router.post("/movies/create", async (req, res) => {
    try{
        const userCreatedMovie = new Movie ({
            title: req.body.title,
            genre: req.body.genre,
            plot: req.body.plot,
            cast: req.body.cast,
        })
        console.log(userCreatedMovie);
        await userCreatedMovie.save();
        res.redirect("/movies");
    }
    catch(err){
        console.log("error from create movie", err)
        res.redirect("/movies/create");
    }
   
});

router.get("/movies", async (req, res) => {

    const findMovies = await Movie.find();
    res.render("movies/movies", {findMovies});
});


router.get("/movies/:id", async (req, res) => {   //////// here must be /:id
    try{
    const movieId =  mongoose.Types.ObjectId(req.params.id);
    const movie = await Movie.findById(movieId);
    console.log(movie);
    
    await movie.populate("cast");
    console.log("ali <<<<<<<");
    res.render("movies/movie-details", {movie});
    }
    catch(err){
        console.log("error from movies id", err)
    }
})

router.get("/movies/:id/edit", async (req, res) => {
    try {
      const movieId = mongoose.Types.ObjectId(req.params.id);
      const movie = await Movie.findById(movieId);
      const celebrities = await Celebrity.find();
      res.render("movies/edit-movie.hbs", { movie, celebrities });
    } catch (err) {
      console.error(err);
    }
  });

  router.post("/movies/:id/edit", async (req, res) => {
    try {
      const movieId = mongoose.Types.ObjectId(req.params.id);
      await Movie.findByIdAndUpdate(movieId);   ///////// ???  ...req.body 
      res.redirect("/movies");
    } catch (err) {
      console.error(err);
    }
  });



module.exports = router;