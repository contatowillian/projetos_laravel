
    $( "#botao_logar" ).click(function() {
          //caso esteja preenchido o login e a senha chama a funcao que valida login
          if($( "#usuario" ).val()!='' && $( "#senha" ).val()!=''){
                valida_login();
          }
    });

    /* Funcao que faz o login do usuario*/
    function valida_login(){
        $.ajaxSetup({
          headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
        
    /*Envia o post para validação do usuario*/    
    $.ajax({    
            type: 'POST',  
            url: './valida_usuario',  
            data:$("#form_valida_login").serialize(),  
            dataType:'json',
            beforeSend:function(xhr, settings){
                $("#botao_logar").text("Validando usuário...");
            },
            success:function(data){

                console.log(data[0]);
                    //  json response  
                    if(data[0]===true){
                        $("#botao_logar").text("Logar");
                       window.location=('./');
                       return false; 
                    }else{

                       $("#usuario_invalido_mensagem").css("display","block");
                       $("#botao_logar").text("Logar");
                       return false; 
                    }
            },
            error: function(data) { 
                // if error occured
                alert("Falha no login do usário");
                $("#botao_logar").text("Logar");
            }
    });
    }   
        /* Funcao que faz o login do usuario*/