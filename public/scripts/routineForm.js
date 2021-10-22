/// EXERCISE LIST FUNCTIONALITY
let valueList = "";
$('#add-exercise').on('click', (e) => {
          
     //Hide fieldsets if empty
     const input = $('#exercise').val();
     const optionValue = $('#body-area').val();
     if(input !== ''){
          // if first item added to list, clear example
          if($('#hidden-exercises').val() === ""){
               $(`#arms`).empty();
                    
               //clear placeholder
               $('#exercise').attr('placeholder', "")
          }
          //if input is not empty add item to list and to hidden input
          $(`#${optionValue}`).append($('<li>').text(input));
          valueList += "," + optionValue + '-' + input;
          $(`#hidden-exercises`).attr('value', valueList);
               
          //unhide fieldset
          $(`#fieldset-${optionValue}`).css('display', 'block');
     }
     $('#exercise').val(''); // clear the value from the input
          
});