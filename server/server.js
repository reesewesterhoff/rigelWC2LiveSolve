//requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
// globals
const port = 5000;
// spin up server
app.listen( port, ()=>{
    console.log( 'server up on:', port );
}) // end server up

app.get( '/math', ( req, res )=>{
    console.log( '/math GET hit' );
    res.send( 'woof' );
}) // end /math GET

app.post( '/math', ( req, res )=>{
    console.log( '/math POST hit:', req.body );
    res.send( 'quack' );
}) // end /math POST