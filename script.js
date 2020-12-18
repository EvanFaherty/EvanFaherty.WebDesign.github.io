// Set checkout to 0
$(document).ready(function(){
      
    if (localStorage.getItem('checkout') == null) {  
        localStorage.setItem('checkout',0);
    }
    $("#checkout").html(localStorage.getItem('checkout'));
    
// check if login is valid or invalid
    $('form[name="login"]').submit(function( event ) {

        var email=$('input[name="email"]').val();
        var password =$('input[name="password"]').val();
        if (email=="wmitty@email.com" && password=="12345678")  {   
            // successful login
            localStorage.setItem('loggedIn',1);    
            window.location.href = "shop.html";
        }
        else {
            // login unsuccessful, error message appears
            localStorage.setItem('loggedIn',0);
            $("#loginerror").addClass("d-block");
        }
        return false;
    });
    
    // this code is run everytime this js file is loaded.   
    if (localStorage.getItem('userdetails') === null) {  
        // if userdetails is null, that means it has not been loaded before. we not initialise userdetails object
        var userDetails = {firstName:"Walter", lastName:"Mitty", dob:"1990-12-01",address1:"Buenos Ayres Drive", address2:"Strandhill", address3:"Co. Sligo"};
        // now we store the userdetails object as a localstorage object but localstore only stores text and userdetails is a javascript object
        // we convert a javascript object ot a string using JSON.stringify - we are being expedient!
        localStorage.setItem('userdetails',JSON.stringify(userDetails));
    } else {
        // if localstorage variable userdetails is already created - load it to javascript oject. JSON.parse turns it back into an javascript object
        userDetails=JSON.parse(localStorage.getItem('userdetails'));
    }
    
    // we only run this code if an id of udetails is on the html page we are currently on - makes the code a little bit more efficient
    // if the length > 0 it means we are on the right page - and we can populdate the form fields!!!
    if ($('#udetails').length > 0) {
        $('input[name="firstname"]').val(userDetails.firstName);         
        $('input[name="lastname"]').val(userDetails.lastName);
        $('input[name="dob"]').val(userDetails.dob);
        $('input[name="address1"]').val(userDetails.address1);
        $('input[name="address2"]').val(userDetails.address2);
        $('input[name="address3"]').val(userDetails.address3);
    }
      


    // wait for submit button to be clicked on userdetails update form
    $('form[name="userdetails"]' ).submit(function( event ) {
        // if the user updates the user details - we update the userDetails javascript object
        userDetails.firstName=$('input[name="firstname"]').val();
        userDetails.lastName=$('input[name="lastname"]').val();
        userDetails.address1=$('input[name="address1"]').val(); 
        userDetails.address2=$('input[name="address2"]').val();   
        userDetails.address3=$('input[name="address3"]').val();    
        // finally we convert the javascript object to a string with JSON.stringify and save it to localstorage
        localStorage.setItem('userdetails',JSON.stringify(userDetails));
        return false;
    }); 

      // wait for submit button to be clicked on userdetails update form
    $('form[name="paymentdetails"]' ).submit(function( event ) {
        var cardnumber=$('input[name="cardnumber"]').val();
        if (cardnumber=="1234 5678 9102 3456") {
            $( "#payment-failure" ).addClass( "d-none" );
            $( "#payment-success" ).removeClass( "d-none" );
            $( "#buy-button" ).addClass( "d-none" );
            $( "#checkout" ).html("0" );
            
        } else {
            $( "#payment-failure" ).removeClass( "d-none" );
        }
        return false;
    });
    
// Continuously increase counter of checkout
$(".addtocart").click(function(){
        var total=localStorage.getItem('checkout');
        total++;
        localStorage.setItem('checkout',total);
        $("#checkout").html(total );
    });
});
    