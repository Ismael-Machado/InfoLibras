package infolibras.testes;

import infolibras.entidades.*;
import infolibras.gerentes.*;

public class TermoTeste {

	public static void main(String[] args) {
		
		UsuarioGerente ug = new UsuarioGerente();
		TermoGerente tg = new TermoGerente();
		
		Usuario u1,u2;
		
		u1 = ug.recuperar(1);
		u2 = ug.recuperar(4);
		
		Termo t1, t2;
		Registro r1, r2;

		t1 = new Termo();
		r1 = new Registro();
		t1.setNome("Software");
		t1.setDescricao("Representa��o do termo software da �rea de tecnologia para linguagem brasileira de sinais");
		t1.setUser(u1);
		t1.setRegistro(r1);
		
		
		t2 = new Termo();
		r2 = new Registro();
		t2.setNome("Software");
		t2.setDescricao("Representa��o do termo software da �rea de tecnologia para linguagem brasileira de sinais");
		t2.setUser(u2);
		t2.setRegistro(r2);
		
		tg.adicionar(t1);
		tg.adicionar(t2);
		
		
		tg.encerrar();
		
	}

}
