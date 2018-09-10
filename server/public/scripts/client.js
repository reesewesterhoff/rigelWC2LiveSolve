$( document ).ready( readyNow );
let currentEquation = {
  num1: '',
  num2: '',
  operator: ''
} // end currentEquation

function clearAll(){
  console.log( 'in clearAll' );
  currentEquation.num1 = '';
  currentEquation.num2 = '';
  currentEquation.operator = '';
  let el = $( '#calculatorOutput' );
  el.val( '0' );
  console.log( currentEquation );
} //end clear all

function doMathNow(){
  console.log( 'in doMathNow' );
  // send info to server via AJAX POST
  $.ajax({
    url: '/math',
    method: 'POST',
    data: currentEquation
  }).then( function( response ){
    console.log( 'back from server with:', response );
    // show answer
    let el = $( '#calculatorOutput' );
    el.val( response.answer );
    // show history
    showHistory();
  }).catch( function( error ){
    console.log( 'error:', error );
    alert( 'error sending data to server' );
  }) // end $http
} // end doMathNow

function setOperator(){
  console.log( 'in setOperator', $( this ).text() );
  currentEquation.operator = $( this ).text();
  updateOutput()
  console.log( currentEquation );
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

function updateNumber(){
  console.log( 'in updateNumber:', $( this ).text() );
  if( currentEquation.operator === '' ){
    // update num1 if no operator set
    currentEquation.num1 += $( this ).text();
  }
  else{
    // if operator is set, affect num2
    currentEquation.num2 += $( this ).text();
  }
  updateOutput();
  console.log( currentEquation );
} // end updateNumber

function updateOutput(){
  let el = $( '#calculatorOutput' );
  el.val( currentEquation.num1 + currentEquation.operator + currentEquation.num2 );
} // end updateOutput

function readyNow(){
  $( '#clearButton' ).on( 'click', clearAll );
  $( '#equalsButton' ).on( 'click', doMathNow );
  $( '.numberButton').on( 'click', updateNumber );
  $( '.operatorButton').on( 'click', setOperator );
  showHistory();
} //end readyNow