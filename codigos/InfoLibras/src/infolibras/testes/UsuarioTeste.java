package infolibras.testes;

import javax.persistence.EntityManagerFactory;
import javax.persistence.*;

import infolibras.entidades.Usuario;

public class UsuarioTeste {
	
	public static void main(String [] args) {
		
		Usuario u = new Usuario();
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("Infolibras");
		EntityManager em = emf.createEntityManager();
		
		u.setId(1);
		u.setNome("Testando Persistencia");
		
		
		em.getTransaction().begin();
		em.persist(u);
		em.getTransaction().commit();
		
		System.out.println("Deu certo! Terminado");
		pidjahfljkasndfljkasdnmlf
	}
}
