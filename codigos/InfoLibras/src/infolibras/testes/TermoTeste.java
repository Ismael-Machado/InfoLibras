package infolibras.testes;

import infolibras.entidades.*;
import infolibras.gerentes.*;

public class TermoTeste {

	public static void main(String[] args) {
		
		Usuario u;
		
		UsuarioGerente ug = new UsuarioGerente();
		
		u = ug.recuperar(1);
		
		Termo t = new Termo();
		
		t.setNome("Software");
		t.setDescricao("Representação do termo software da área de tecnologia para linguagem brasileira de sinais");
		t.setUser(u);
		
		TermoGerente tg = new TermoGerente();
		
		tg.atualizar(t);
		tg.encerrar();
		
	}

}
