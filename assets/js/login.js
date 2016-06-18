$(function(){
  swal({
    title: "Connectez-vous",
    text: "Choisissez votre login:",
    type: "input",
    showCancelButton: true,
    closeOnConfirm: false,
    animation: "slide-from-top",
    inputPlaceholder: "Ex : Shyam",
    closeOnCancel: false
  },
  function(inputValue){
    if (inputValue === false) return false;
    if (inputValue === "") {
      swal.showInputError("Vous devez saisir votre pseudo!");
      return false;
    }

    connectUser(inputValue);
    
  });

});
