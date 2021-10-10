const router = require("express").Router();
let Event = require("../models/events.model");

// Route to get daily view of a particular user
router
  .route("/events/user=:email/date=:date/month=:month/year=:year")
  .get((req, res) => {
    Event.find({
      email: req.params.email,
      date: req.params.date,
      month: req.params.month,
      year: req.params.year,
    })
      .then((event) => res.json(event))
      .catch((err) => res.json("Error: " + err));
  });

// Route to get monthly view of a particular user
router.route("/events/user=:email/month=:month/year=:year").get((req, res) => {
  Event.find({
    email: req.params.email,
    month: req.params.month,
    year: req.params.year,
  })
    .then((event) => res.json(event))
    .catch((err) => res.json("Error: " + err));
});

// Route to get daily view of a particular user
router
  .route("/events/user=:email/date=:date/month=:month/year=:year")
  .get((req, res) => {
    Event.find({
      email: req.params.email,
      date: req.params.date,
      month: req.params.month,
      year: req.params.year,
    })
      .then((event) => res.json(event))
      .catch((err) => res.json("Error: " + err));
  });

// Route to get monthly view of a particular user irrespective of year
router.route("/events/user=:email/month=:month").get((req, res) => {
  Event.find({ email: req.params.email, month: req.params.month })
    .then((event) => res.json(event))
    .catch((err) => res.json("Error: " + err));
});

// Route to create an event
router.route("/events").post((req, res) => {
  const email = req.body.email;
  const date = req.body.date;
  const month = req.body.month;
  const year = req.body.year;
  const time = req.body.time;
  const event = req.body.event;

  const newEvent = new Event({ email, date, month, year, time, event });

  newEvent
    .save()
    .then(() => res.json("New Event Added!!"))
    .catch((err) => res.json(err));
});

// Route to delete an event
router.route("/event/delete=:id").delete((req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then(() => res.json("Event deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Route to update an existing event
router.route("/events/update=:id").post((req, res) => {
  Event.findById(req.params.id)
    .then((event) => {
      event.email = req.body.email;
      event.date = Number(req.body.date);
      event.month = req.body.month;
      event.year = Number(req.body.year);
      event.time = Number(req.body.time);
      event.event = req.body.event;

      event
        .save()
        .then(() => res.json("Event updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Not needed
router.route("/events/:id").get((req, res) => {
  Event.findById(req.params.id)
    .then((event) => res.json(event))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
