package infolibras.testes;

import javax.persistence.EntityManagerFactory;

import java.util.List;

import javax.persistence.*;

import infolibras.entidades.*;
import infolibras.gerentes.*;

public class UsuarioTeste {

	public static void main(String[] args) {

//		Usuario u = new Usuario();
//		EntityManagerFactory emf = Persistence.createEntityManagerFactory("Infolibras");
//		EntityManager em = emf.createEntityManager();
//		
//		u.setId(1);
//		u.setNome("Testando Persistencia");
//		
//		
//		em.getTransaction().begin();
//		em.persist(u);
//		em.getTransaction().commit();
//		
//		System.out.println("Deu certo! Terminado");

		Usuario u = new Usuario();
		u.setNome("Bruno Fernando");
//		
		UsuarioGerente ug = new UsuarioGerente();
//		
		ug.adicionar(u);

//		UsuarioGerente ug = new UsuarioGerente();
//		Usuario u;
//		
//		
//		u = ug.recuperar(1);
//		
//		System.out.println(u);
//		
//		ug.remover(u);
//		
//		System.out.println("Deu certo!");
//		
		ug.encerrar();

//		List<Usuario> usuarios;
//
//		UsuarioGerente ug = new UsuarioGerente();
//
//		usuarios = ug.recuperarTodos();
//
//		for (Usuario u : usuarios) {
//			System.out.println(u);
//		}
//
//		List<Termo> termos;
//		
//		TermoGerente tg = new TermoGerente();
//		
//		termos = tg.recuperarTodos();
//		
//		for(Termo t: termos) {
//			System.out.println(t);
//		}
//		
//		List<Registro> registros;
//		
//		RegistroGerente rg = new RegistroGerente();
//		
//		registros = rg.recuperarTodos();
//		
//		for(Registro r: registros) {
//			System.out.println(r);
//		}
	}
}
