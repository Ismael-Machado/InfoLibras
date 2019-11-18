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
		
		
		UsuarioGerente ug = new UsuarioGerente();
		
		
		
		ug.recuperar(2);
		
		
	}
}
