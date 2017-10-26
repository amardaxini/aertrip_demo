var AT = AT || {};

AT = (function($, window, document, AerTrip){
  AerTrip.home ={
    
    addUrlHtmlComponent : function(){
      var totalElement = 0;

      $(".add-url").on("click",function(){
        // var htmlElement = $(".sort:first").clone()
        totalElement = totalElement +1;
        var htmlElement =   "<li class='sort row clearfix'><span class='glyphicon glyphicon-align-justify col-sm-1'></span><input type='text' class='url-field col-sm-6' name='url_field["+totalElement+"]'></input><label for=url_field["+totalElement+"]></label></li>";
        $("#sortable").append(htmlElement);
        
      });  
    },

    urlDragable: function(){
      $("#sortable").sortable()
    },

    fetchUrl: function(){
      $(".fetch-url").on("click",function(event){
        $('input.url-field').each(function() {
          $(this).rules("add", {
              required: true,
              url: true
            })
        });          
        event.preventDefault();
        if($('form.validate_form').validate().form())
        {
          $("input.roomId").val(AT.roomId);
           $.ajax({
             type: "POST",
             url: "/extract_url",
             data: $(".validate_form").serialize(), // serializes the form's elements.
             success: function(data)
             {
                 
             }
         });
        }
      })
    },
    validateForm : function(){
      $(".validate_form").validate()
    },
  };
  return AerTrip;
 
})(jQuery, this, this.document, AT);