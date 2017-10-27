var AT = AT || {};

AT = (function($, window, document, AerTrip){
  AerTrip.home ={
    
    addUrlHtmlComponent : function(){
      var totalElement = 0;

      $(".add-url").on("click",function(){
        // var htmlElement = $(".sort:first").clone()
        totalElement = totalElement +1;
        var htmlElement =   "<li class='sort row clearfix' data-item_number="+totalElement+"><span class='glyphicon glyphicon-align-justify col-sm-1'></span><input type='text' class='url-field col-sm-6' name='url_field["+totalElement+"]' data-orderid="+totalElement+"></input><label for=url_field["+totalElement+"]></label></li>";
        $("#sortable").append(htmlElement);
        
      });  
    },

    urlDragable: function(){
      $("#sortable").sortable()
    },

    fetchUrl: function(){
      $(".fetch-url").on("click",function(event){
        // Add validation rule to form field
        if($('input.url-field').length == 0)
        {
          alert("Please add url");
          return
        }
        $('input.url-field').each(function() {
          $(this).rules("add", {
              required: true,
              url: true
            })
          
        });          

        event.preventDefault();
        //  check form field is valid
        if($('form.validate_form').validate().form()){
          $("input.roomId").val(AT.roomId);
          var sortOrder = $( "#sortable" ).sortable( "toArray", {attribute: 'data-item_number'} )
          $(".sort_order").val(sortOrder);
          $('.result ul').html('');
           
          // TODO Disbaled add url and fetch button etc
          $.ajax({
            type: "POST",
            url: "/extract_url",
            data: $(".validate_form").serialize(), // serializes the form's elements.
            success: function(data){
              $(".progress").show();
              // We don't need to presenrv url
              //  $('input.url-field').each(function() {
              //   var orderId = $(this).data("orderid")
              //   var url = $(this).val()
              //   var urlList = "<li id="+orderId+">"+url+"</li>"
              //   $('#url_results').append(urlList)
              // });          
            }
          });

        }
      })
    },
    resetForm: function(){
      $(".reset-form").on("click",function(){
        $('input.url-field').each(function() {
          $(this).parent().remove();
        });          
        $(".progress-bar").css("width", 0 + "%").text(0 + " %");
        $(".progress").hide();
         $('.result').html('');
      })
    },
    validateForm : function(){
      $(".validate_form").validate()
    },

  };
  return AerTrip;
 
})(jQuery, this, this.document, AT);