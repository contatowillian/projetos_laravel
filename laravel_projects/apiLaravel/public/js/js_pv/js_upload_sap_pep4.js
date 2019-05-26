
    /* Js da pagina de upload  */

    //funcao da mascara do campo money
    function habilita_mascara(este){
          $('.money').mask('#.##0,00', {reverse: true});
    }

    //funcao chamado quando o cliente sobe escolhe um arquivo
    $('#arquivo_base').change(function(){

        //zera a base de quantidade de arquivos
        $( "#quantidade_arquivos" ).val(0);

        //vare os arquivos do input
        for(var i=0; i< this.files.length; i++){
            var quantidade_arquivos = $( "#quantidade_arquivos" ).val();
            $( "#quantidade_arquivos" ).val(parseInt(quantidade_arquivos)+1);
        }

        //Inicia a barra de progresso
        $( "#progressbar_upload" ).show();
        var porcentagem = 1;
        muda_progresso_barra(1,100);
        $( "#quantidade_importada" ).val(0);

        
        //antes de enviar verifica se o usuario esta logado
        var  sessao_expirada = valida_sessao_expirada();
        $("#mensagem_erro_retorno_funcao").hide();

        //Esta a variavel que vai pegar o retorno do controller
        var retorno = '';

        for(var i=0; i< this.files.length; i++){
           var file = this.files[i];
           name = file.name.toLowerCase();
           arquivo =$(this).prop('files')[i];
           tamanho = $(this).prop('files').length
           retorno =  upload_pv(arquivo,name,tamanho);
           
        }
    });

    


    function criar_quadros_arquivo(data){

        //funcao que muda a barra de progresso de upload
        var quantidade_importada = $( "#quantidade_importada" ).val();
        $( "#quantidade_importada" ).val(parseInt(quantidade_importada)+1);

        var progresso_atual = parseInt($( "#quantidade_importada" ).val());
        var total_arquivos = parseInt($( "#quantidade_arquivos" ).val());
        
        //muda barra de progresso
        muda_progresso_barra(progresso_atual,total_arquivos);

        if(progresso_atual==total_arquivos){
            //funcao abaixo é feito quando termina o upload
            $( "#quadro_bt_acao" ).show();
            $( "#quadro_bt_carregando" ).hide();
            $( "#resultado_importacao_upload" ).show();
            $( "#progressbar_upload" ).hide();
            $( "#arquivo_base" ).show();
            
        }

 

        if(data.status===true && data.atualizado=='0' ){

            var sucesso_atual = parseInt($("#quantidade_sucesso_upload").html());
            $("#quantidade_sucesso_upload").html(sucesso_atual+1);

            var lista_importados = $("#lista_importados_upload").html()+'</br>';
            $("#lista_importados_upload").html(lista_importados+data.mensagem);

            $("#mensagem_retorno_upload_arquivo").hide();

        }else if(data.status===true && data.atualizado=='1' ){

            var sucesso_atual = parseInt($("#quantidade_atualizado_upload").html());
            $("#quantidade_atualizado_upload").html(sucesso_atual+1);

            var lista_atualizados = $("#lista_atualizados_upload").html()+'</br>';
            $("#lista_atualizados_upload").html(lista_atualizados+data.mensagem);

            $("#mensagem_retorno_upload_arquivo").hide();

        }else{

            var erros_atual = parseInt($("#quantidade_erros_upload").html());
            $("#quantidade_erros_upload").html(erros_atual+1);

            var lista_erros = $("#lista_erros_importacao_upload").html()+'</br>';
            $("#lista_erros_importacao_upload").html(lista_erros+data.mensagem);

            $("#mensagem_retorno_upload_arquivo").hide();

        }
    }

    function abre_erros_importacao(){
            if($("#lista_erros_importacao_upload" ).is(":hidden")){
                $( "#lista_erros_importacao_upload" ).show();
            }else{
                $( "#lista_erros_importacao_upload" ).hide();
            }
       }

       function abre_importados(){
            if($("#lista_importados_upload" ).is(":hidden")){
                $( "#lista_importados_upload" ).show();
            }else{
                $( "#lista_importados_upload" ).hide();
            }
       }


       function abre_atualizados(){
            if($("#lista_atualizados_upload" ).is(":hidden")){
                $( "#lista_atualizados_upload" ).show();
            }else{
                $( "#lista_atualizados_upload" ).hide();
            }
       }


        function muda_progresso_barra(atual, total){
           porcentagem = atual/total*100;
           porcentagem_formatada = porcentagem.toFixed(0);
           $('.progress-bar').css('width', porcentagem_formatada+'%').attr('aria-valuenow', porcentagem_formatada).html(porcentagem_formatada+'%');    
        }


                        

       // primeira funcao chamada quando clica em enviar
       $( "#form_acao" ).submit(function( event ) {

        //antes de enviar verifica se o usuario esta logado
           var  sessao_expirada = valida_sessao_expirada();

         
            //Inicia a barra de progresso
           /* $( "#progressbar_upload" ).show();
            var porcentagem = 1;
            muda_progresso_barra(1,100);*/
            //Inicia a barra de progresso

            

            var formData = new FormData(this);
             salvar(formData);

        });



       //esta funcao que vai no controller de Upload PV
       function upload_pv(file,nome_arquivo,tamanho){ 

            //antes de enviar verifica se o usuario esta logado
            var  sessao_expirada = valida_sessao_expirada();
            $("#mensagem_erro_retorno_funcao").hide();

            //abre o upload
            $( "#arquivo_base" ).hide();
            $( "#quadro_bt_carregando" ).show();
            $( "#progressbar_upload" ).show();


            /* Faz a configuração necessaria do laravel antes de enviar */
            $.ajaxSetup({
              headers: {
                    scriptCharset: "utf-8" , 
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
            });

            var formdata = new FormData();
            if(tamanho > 0)
            {
                formdata.append("arquivo_base", file);
                formdata.append("nome_arquivo",  nome_arquivo);
            }

            $.ajax({    
                    type: 'POST',  
                    url: './upload_arquivo_sap_pep4',   
                    data:formdata,  
                    dataType:'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    beforeSend:function(xhr, settings){
                        /*$( "#quadro_bt_carregando" ).show();*/
                        $( "#resultado_importacao_upload" ).hide();
                    },
                    success:function(data){
                        /*Chama a funcao que faz o tratamento json retorno*/

                        $.each(data.retorno_validacao, function() {

                            console.log('aqui');
                            
                            criar_quadros_arquivo(this);
                        });

                        busca();
                        
                    },
                    error: function(data) { 

                        $( "#mensagem_retorno_upload_arquivo" ).show();    
                        $( "#passo_2_upload" ).hide();
                        $("#mensagem_retorno_upload_arquivo").html('Erro ao chamar a função, contate o adminstrador do sistema');
                        $( "#mensagem_erro_retorno_funcao" ).show();    
                        $( "#quadro_bt_carregando" ).hide();
                        $( "#quadro_bt_acao" ).show();
                        $("#mensagem_erro_retorno_funcao").html('Falha ao executar função, Por favor informe ao adminstrador do sistema');
                        $("#mensagem_erro_retorno_funcao").show();
                        $("#botao_acao").text("Salvar");
                    }
            });

        }




       