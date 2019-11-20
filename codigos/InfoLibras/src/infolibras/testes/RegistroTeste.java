package infolibras.testes;

import java.sql.Date;

import infolibras.entidades.*;
import infolibras.gerentes.*;

public class RegistroTeste {

	public static void main(String[] args) {
		
//		Usuario u = new Usuario();
//		u.setNome("Bruno Fernando");
//		
//		UsuarioGerente ug = new UsuarioGerente();
//		
//		ug.adicionar(u);
		/*
		Usuario u;
		
		UsuarioGerente ug = new UsuarioGerente();
		
		u = ug.recuperar(1);
		
		System.out.println(u);
		*/
//		ug.atualizar(u);
//		
//		Termo t = new Termo();
//		
//		t.setNome("Software");
//		t.setDescricao("Representação do termo software");
//		t.setUser(u);
//		
//		TermoGerente tg = new TermoGerente();
//		
//		tg.adicionar(t);
		
		
		
		
		
//		rg.adicionar(r);
		
		Termo t;
		TermoGerente tg = new TermoGerente();
		
		t = tg.recuperar(1);
		
		
//		t.setNome("Software");
//		t.setDescricao("Representação do termo software");
//		t.setUser(u);
//		t.setR(r);
		
		Registro r = new Registro();
		RegistroGerente rg = new RegistroGerente();
		
		r.setTermo(t);
		
		rg.adicionar(r);
		
		
		
//		Registro r = new Registro();
//		
//		r.setTermo(t);
//		
//		RegistroGerente rg = new RegistroGerente();
//		rg.adicionar(r);
//		
		
		tg.encerrar();
//		ug.encerrar();
		rg.encerrar();
	}

}
