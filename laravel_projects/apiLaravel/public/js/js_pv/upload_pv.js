
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

    function adicionar_atividade(id_capex){

         //lista de atividades do site quando nao tem na tabela
         $("#lista_atividades_site_"+id_capex).append("<tr>"+
                                                                "<td colspan='2'><input "+
                                                                     "type='text' class='form-control col-lg-8' "+ 
                                                                     "name='id_importacao_atividades_"+id_capex+"[]'/></td>"+
                                                                "</tr>");
    }


    //funcao que valida se o site é valido e paga suas atividades
    function valida_site_atividade(campo_site,id_capex){

      

         /* Faz a configuração necessaria do laravel antes de enviar */
        $.ajaxSetup({
          headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
        });
        $.ajax({
                type: 'POST',  
                url: './pega_lista_atividades_site',
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                data : {nome_site : campo_site  }, 
                dataType:'json',

                beforeSend:function(xhr, settings){
                   $( "#lista_atividades_site" ).html('');
                   
                },
                success:function(data){
                        
                        $( "#lista_atividades_site_"+id_capex ).html('');

                        //  json response  
                        if(data[0]===true){

                            


                            $.each(data.lista_atividades , function(key,value) {

                            $( "#id_regional_"+id_capex).val(this.id_regional_claro);
                               
                            $("#lista_atividades_site_"+id_capex).append("<tr>"+
                                                                "<td><input "+
                                                                     "type='checkbox' "+ 
                                                                     "name='id_importacao_atividades_"+id_capex+"[]' "+
                                                                     "value='"+this.id_plano_nominal_sites+"' /></td>"+
                                                                "<td>"+this.ATIVIDADE+"</td>"+
                                                            "</tr>");

                            });

                            /******** Abre a lista de questionamentos*********/
                            if(data.lista_atividades.length==0){

                                $( "#cadastro_atividade_nova_"+id_capex ).val('1');
                                $( "#lista_atividades_site_"+id_capex ).html("<tr ><td colspan='3' onclick='adicionar_atividade("+id_capex+")' class='hiperlink col-lg-8' > <i class='fa fa-plus-circle'></i>  Não existe atividade para este site. Clique aqui para adicionar um identificador</td></tr>");
                           
                            }else{

                                $( "#cadastro_atividade_nova_"+id_capex ).val('0');

                            }


                           return true;

                        }else{

                          $( "#lista_atividades_site_"+id_capex ).html('Erro ao listar atividades');
                           //carrega o grid novamente
                           return false; 
                        }
                },
                error: function(data) { 

                     $( "#lista_atividades_site_"+id_capex ).html('Erro ao listar atividades');

                }
        });
        
    }


    //funcao que valida o form 
    function valida_form_upload_pv(id_form){

        var inputs_preenchidos = 0;
        var atividade_nova = 0 ;
        var atividades_marcadas = $("input[name='id_importacao_atividades_"+id_form+"[]']:checked").length;
        
        var quantidade_campos_texto = $("input[type=text][name='id_importacao_atividades_"+id_form+"[]']").length;

        $("input[type=text][name='id_importacao_atividades_"+id_form+"[]']").each(function(){

            var valor_campo = $(this).val();
            var atividade_nova = 1;

            if(valor_campo!=''){
                inputs_preenchidos=1;
            }

        });

        if(quantidade_campos_texto>0 && inputs_preenchidos==0){
             alert('Preencha pelo menos uma atividade para inserir a PV');
            return false;
        }

        if(atividade_nova==0 && atividades_marcadas==0 && quantidade_campos_texto==0){
            alert('Escolha pelo menos uma atividade para inserir a PV');
            return false;
        }


        /********* Chama a funcao que faz o envio do form ***********/
        envia_form_complemento($( "#"+id_form ).serializeArray(),id_form)

         //evita que form seja submitido e troque de pagina
        return false;

    }


    function envia_form_complemento(dados_do_form,id_form){


            /* Faz a configuração necessaria do laravel antes de enviar */
            $.ajaxSetup({
              headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
            });

            $.ajax({    
                    type: 'POST',  
                    url: './upload_complemento_arquivo_pv',   
                    data:dados_do_form,  
                    dataType:'json',
                    cache: false,
                    
                    beforeSend:function(xhr, settings){
                        /*$( "#quadro_bt_carregando" ).show();*/
                        $( "#"+id_form ).hide();
                        $( "#arquivo_base").val("");
                    },
                    success:function(data){
                        /*Chama a funcao que faz o tratamento json retorno*/

                        if(data[0]===true){

                            $( "#mensagem_retorno_funcao_"+id_form ).removeClass('alert-danger');
                            $( "#mensagem_retorno_funcao_"+id_form ).addClass('alert-success');

                            $( "#mensagem_retorno_funcao_"+id_form ).show();
                            $( "#mensagem_retorno_funcao_"+id_form ).html(data.mensagem); 

                        }else{

                            $( "#"+id_form ).show();
                            $( "#mensagem_retorno_funcao_"+id_form ).removeClass('alert-success');
                            $( "#mensagem_retorno_funcao_"+id_form ).addClass('alert-danger');
                            
                            $('html, body').animate({scrollTop:$( "#lista_atividades_site_"+id_form ).offset().top}, 'slow');

                            $( "#mensagem_retorno_funcao_"+id_form ).show();
                            $( "#mensagem_retorno_funcao_"+id_form ).html(data.mensagem); 

                        }

                    },
                    error: function(data) { 

                         $( "#"+id_form ).show();
                    }
            });

            //evita que form seja submitido e troque de pagina
            return false;
    }






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
            $( "#resultado_importacao" ).show();
            $( "#progressbar_upload" ).hide();
            $( "#quadro_arquivos" ).show();
            $( "#arquivo_base" ).show();
            
        }

        $( "#quadro_arquivos" ).append(data.resposta_html);

        if(data[0]===true && data.resposta_html=='' ){

            var sucesso_atual = parseInt($("#quantidade_sucesso").html());
            $("#quantidade_sucesso").html(sucesso_atual+1);

            var lista_importados = $("#lista_importados").html()+'</br>';
            $("#lista_importados").html(lista_importados+data.mensagem);

            $("#mensagem_retorno_upload_arquivo").hide();

        }else if(data[0]===true && data.resposta_html!='' ){

            var sucesso_atual = parseInt($("#quantidade_atualizado").html());
            $("#quantidade_atualizado").html(sucesso_atual+1);

            var lista_atualizados = $("#lista_atualizados").html()+'</br>';
            $("#lista_atualizados").html(lista_atualizados+data.mensagem);

            $("#mensagem_retorno_upload_arquivo").hide();

        }else{

            var erros_atual = parseInt($("#quantidade_erros").html());
            $("#quantidade_erros").html(erros_atual+1);

            var lista_erros = $("#lista_erros_importacao").html()+'</br>';
            $("#lista_erros_importacao").html(lista_erros+data.mensagem);

            $("#mensagem_retorno_upload_arquivo").hide();

        }
    }

    function abre_erros_importacao(){
            if($("#lista_erros_importacao" ).is(":hidden")){
                $( "#lista_erros_importacao" ).show();
            }else{
                $( "#lista_erros_importacao" ).hide();
            }
       }

       function abre_importados(){
            if($("#lista_importados" ).is(":hidden")){
                $( "#lista_importados" ).show();
            }else{
                $( "#lista_importados" ).hide();
            }
       }


       function abre_atualizados(){
            if($("#lista_atualizados" ).is(":hidden")){
                $( "#lista_atualizados" ).show();
            }else{
                $( "#lista_atualizados" ).hide();
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
                    url: './upload_arquivo_pv',   
                    data:formdata,  
                    dataType:'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    beforeSend:function(xhr, settings){
                        /*$( "#quadro_bt_carregando" ).show();*/
                        $( "#resultado_importacao" ).hide();
                    },
                    success:function(data){
                        /*Chama a funcao que faz o tratamento json retorno*/
                        criar_quadros_arquivo(data);
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




       