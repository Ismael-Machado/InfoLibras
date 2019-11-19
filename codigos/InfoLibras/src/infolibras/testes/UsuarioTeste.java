package infolibras.testes;

import javax.persistence.EntityManagerFactory;
import javax.persistence.*;

import infolibras.entidades.Usuario;
import infolibras.gerentes.UsuarioGerente;

public class UsuarioTeste {
	
	public static void main(String [] args) {
		
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
		
//		Usuario u = new Usuario();
//		u.setNome("Bruno Fernando");
//		
//		UsuarioGerente ug = new UsuarioGerente();
//		
//		ug.adicionar(u);
		
		
		UsuarioGerente ug = new UsuarioGerente();
		Usuario u;
		
		
		u = ug.recuperar(1);
		
		System.out.println(u);
		
		ug.remover(u);
		
		System.out.println("Deu certo!");
		
		ug.encerrar();
		
		
		
	}
}
