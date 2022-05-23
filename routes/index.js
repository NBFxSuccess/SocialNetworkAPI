const router = require('express').Router();
const thoughtRoutes = require('./api');
const userRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
