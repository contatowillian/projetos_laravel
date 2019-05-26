
  <!-- Este é o menu do site que é montado usando uma  session -->
    <aside id="left-panel" class="left-panel">
        <nav class="navbar navbar-expand-sm navbar-default">
            <div class="navbar-header">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand" href="./"><img src="{{ URL::asset('imagens/logo.png')}}" alt="Logo"></a>
                <a class="navbar-brand hidden" href="./"><img src="{{ URL::asset('imagens/logo2.png')}}" alt="Logo"></a>
            </div>
            <div id="main-menu" class="main-menu collapse navbar-collapse">
               <ul class="nav navbar-nav">
                  <li class="active">
                     <a href="./"> <i class="menu-icon fa fa-home"></i>Home </a>
                  </li>
                  <h3 class="menu-title">Menu</h3>
                  <!-- /.menu-title -->
                  <!--Menu acesso do usuario feito com a sessao logada-->
                  <li class="menu-item-has-children dropdown">
                     <!--Este código evita as categorias repetidas-->
                     <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-user-md"></i>Médicos</a>
                     <ul class="sub-menu children dropdown-menu">
                        <li><i class="fa fa-pencil-square-o "></i><a href="./cadastrar_medico">Cadastrar Médico</a></li>
                        <li><i class="fa fa-search-plus"></i><a href="./pesquisar_medico">Pesquisar Médico</a></li>
                        <!--Menu acesso do usuario feito com a sessao logada-->
                     </ul>
                  </li>
               </ul>
            </div>
            </nav>
        </aside><!-- /#left-panel -->
        <!-- Left Panel -->
        <!-- Right Panel -->