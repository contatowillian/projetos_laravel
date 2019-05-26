/*Envia o post para alteracao das configuracoes de perfil
*/    

    function salvar_perfil(){ 

        /* Faz a configuração necessaria do laravel antes de enviar */
        $.ajaxSetup({
          headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
        });

        $.ajax({    
                type: 'POST',  
                url: './salvar_perfil',  
                data:$("#form_salvar_perfil").serialize(),  
                dataType:'json',
                beforeSend:function(xhr, settings){
                    $("#bt_salva_perfil").text("Salvando Perfil...");
                },
                success:function(data){

                    console.log(data[0]);
                        //  json response  
                        if(data[0]===true){
                           $("#bt_salva_perfil").text("Salvar");
                           $("#mensagem_retorno_funcao").css("display","block");
                           return false; 
                        }else{

                           $("#mensagem_retorno_funcao").css("display","block");
                           $("#bt_salva_perfil").text("Salvar");
                           return false; 
                        }
                },
                error: function(data) { 
                    // if error occured
                    alert("Falha ao executar função, Por favor informe ao adminstrador do sistema");
                    $("#bt_salva_perfil").text("Salvar");
                }
        });
    }
      

   