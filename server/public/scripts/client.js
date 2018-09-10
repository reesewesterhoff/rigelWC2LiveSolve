$( document ).ready( readyNow );
let currentOperator = '';

function clearAll(){
  console.log( 'in clearAll' );
} //end clear all

function doMathNow(){
  console.log( 'in doMathNow' );
  // get user input & combine with selected operator
  let objectToSend = {
    num1: $( '#num1In' ).val(),
    num2: $( '#num2In' ).val(),
    operator: currentOperator
  } //end objectToSend
  console.log( 'sending:', objectToSend );
  // send info to server via AJAX POST
  $.ajax({
    url: '/math',
    method: 'POST',
    data: objectToSend
  }).then( function( response ){
    console.log( 'back from server with:', response );
  }).catch( function( error ){
    console.log( 'error:', error );
    alert( 'error sending data to server' );
  }) // end $http
} // end doMathNow

function setOperator(){
  console.log( 'in setOperator', $( this ).text() );
  currentOperator = $( this ).text();
} // end setOperator

function readyNow(){
  $( '#clearButton' ).on( 'click', clearAll );
  $( '#equalsButton' ).on( 'click', doMathNow );
  $( '.operatorButton').on( 'click', setOperator );
} //end readyNow