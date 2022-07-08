const router = require('express').Router();
const passport = require('passport');

router.get( '/discord', passport.authenticate( 'discord' ) );

router.get( '/discord/redirect', passport.authenticate( 'discord' ), ( req, res ) => {
  res.sendStatus( 200 );
})

router.get( '/', ( req, res ) => {
  if( req.user ){
    res.sendStatus( 200 );
  } else {
    res.status( 401 ).send( { msg: 'Unauthorized' } );
  }
})

module.exports = router;