<?php

$host='localhost';
$user='root';
$senha='ElS895623!';
$db="dados_login";

$con=new mysqli($host,$user,$senha,$db);
if(!$con){
    echo 'Não está conectado com o banco';
}
else{
    echo 'Está conectado ao banco';
}

$nome=$_POST['nome'];
$email=$_POST['email'];
$data=$_POST['data'];
$senha=MD5($_POST['senha']);

echo "sua senha é $nome, $senha";


$sql="INSERT INTO informacoes_cadastro(nome,senha,data_nascimento,email) 
                                 VALUES('$nome','$senha','$data','$email');";

        $salvar = mysqli_query($con,$sql);

        $linhas = mysqli_affected_rows($con);
      
        mysqli_close($con);
      
              if($linhas == 1){
              echo "<h3>Sucesso! Formulario Enviado: </h3> <br>
          <h5>Preenchido por: $nome - <br>
              email: $email -  <br>
              comentario :$senha -  Em: $email - <br>";
              }

?>