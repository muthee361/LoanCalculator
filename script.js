

document.getElementById('calculate').addEventListener('click', function(){
    //hide results
    document.querySelector('.loan-results').style.display = "none";

    //show loader
    document.querySelector('.loading').style.display = 'block';

    setTimeout(calculateLoan, 2000);
});

//calculate loan
function calculateLoan(){

  // get UI variables
  const amount = document.getElementById('loan-amount');
  const interest= document.getElementById('interest');
  const years = document.getElementById('years');

  //results UI variables
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // to get monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if(isFinite(monthly)) {
      monthlyPayment.value = monthly.toFixed(2);
      totalPayment.value = (monthly * calculatedPayments).toFixed(2);
      totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

      //show results
      document.querySelector('.loan-results').style.display = "block";

      //hide loader
      document.querySelector('.loading').style.display = "none";
  }else{
      showError('Error, check the numbers entered');
  }
}

//show error
function showError(error) {
    //hide results
    document.querySelector('.loan-results').style.display = "none";

    //hide loader
    document.querySelector('.loading').style.display = "none";

    //create a div
    const errorDiv = document.createElement('div');

    //get document elements
    const container = document.querySelector('.loan-details');
    const heading = document.getElementById('header');

    //add div details
    errorDiv.className = 'error';
    errorDiv.style.backgroundColor = 'tomato';
    errorDiv.style.color = 'black';
    errorDiv.style.textAlign = 'center';
    errorDiv.style.borderRadius = '6px';
    errorDiv.style.padding = '0.5rem';

    //create text node and append child
    errorDiv.appendChild(document.createTextNode(error));

    //insert error before heading
    container.insertBefore(errorDiv, heading);
    
    //remove error after 3 seconds
    setTimeout(clearError, 3000);

}

//clear error
function clearError(){
    document.querySelector('.error').remove();
}