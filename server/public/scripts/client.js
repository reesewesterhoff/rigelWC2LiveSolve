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
    // show answer
    let el = $( '#answerOut' );
    el.empty();
    el.append( response.answer );
    // show history
    showHistory();
  }).catch( function( error ){
    console.log( 'error:', error );
    alert( 'error sending data to server' );
  }) // end $http
} // end doMathNow

function setOperator(){
  console.log( 'in setOperator', $( this ).text() );
  currentOperator = $( this ).text();
} // end setOperator

function showHistory(){
  console.log( 'in showHistory' );
  // get history from server
  $.ajax({
    url: '/math',
    method: 'GET'
  }).then( function( response ){
    console.log( 'back from GET with:', response );
    let el = $( '#historyList' );
    el.empty();
    // loop through response
    for( solution of response ){
      // display each equation on DOM
      el.append( `<li>
      ${solution.num1} ${solution.operator} ${solution.num2}
      </li>`);
      // OR
      // el.append( `<li>` + solution.num1 + ` ` +
      // solution.operator + ` ` + solution.num2 +
      // `</li>`);
    } // end for
  }).catch( function( error ){
    console.log( 'error:', error );
    alert( 'error retrieving history' );
  }) // end AJAX 
} // end showHistory

function readyNow(){
  $( '#clearButton' ).on( 'click', clearAll );
  $( '#equalsButton' ).on( 'click', doMathNow );
  $( '.operatorButton').on( 'click', setOperator );
  showHistory();
} //end readyNow