//requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
// globals
const port = 5000;
let history = [];
// spin up server
app.listen( port, ()=>{
    console.log( 'server up on:', port );
}) // end server up

app.get( '/math', ( req, res )=>{
    console.log( '/math GET hit' );
    res.send( history );
}) // end /math GET

app.post( '/math', ( req, res )=>{
    console.log( '/math POST hit:', req.body );
    // check for type of math & do correct math
    let answer = 0;
    if( req.body.operator === '-' ){
        answer = Number( req.body.num1 ) - Number( req.body.num2 );
    } // end -
    else if( req.body.operator === '*' ){
        answer = Number( req.body.num1 ) * Number( req.body.num2 );
    } // end *
    else if( req.body.operator === '/' ){
        answer = Number( req.body.num1 ) / Number( req.body.num2 );
    } // end *
    else{
        answer = Number( req.body.num1 ) + Number( req.body.num2 );
    } // end *
    // add this solution to history
    // send answer
    history.push( req.body );
    res.send( { answer: answer } );
}) // end /math POST