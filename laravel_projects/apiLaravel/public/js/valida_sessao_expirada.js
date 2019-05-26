

	//Verifica se usuario esta logado
	function valida_sessao_expirada(){
		$.get( "./valida_sessao_expirada", function( data ) {
		 	//verifica se a sessao ainda esta ativa
            if(data=='0'){
                alert("Sua sessão expirou! Por favor, faça o login novamente.");
                window.location=('./login');
                throw new Error("Stopping the function!");

            }
		})
	};