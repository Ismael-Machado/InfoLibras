package infolibras.gerentes;

import java.util.List;

import javax.persistence.*;

import infolibras.entidades.*;

public class UsuarioGerente {

	EntityManagerFactory emf;
	EntityManager em;

	public UsuarioGerente() {
		emf = Persistence.createEntityManagerFactory("Infolibras");
		em = emf.createEntityManager();
	}

	public void adicionar(Usuario u) {
		em.getTransaction().begin();
		em.persist(u);
		em.getTransaction().commit();
	}

	public Usuario recuperar(int id) {
		return em.find(Usuario.class, id);
	}

	public void atualizar(Usuario u) {
		em.getTransaction().begin();
		em.merge(u);
		em.getTransaction().commit();
	}

	public void remover(Usuario u) {
		em.getTransaction().begin();
		em.remove(u);
		em.getTransaction().commit();
	}

	public void encerrar() {
		em.close();
		emf.close();
	}

	@SuppressWarnings("unchecked")
	public List<Usuario> recuperarTodos() {
		return em.createNamedQuery("Usuario.todos").getResultList();
	}
}
