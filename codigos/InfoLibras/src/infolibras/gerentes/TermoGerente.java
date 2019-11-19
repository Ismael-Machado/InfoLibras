package infolibras.gerentes;

import java.util.List;

import javax.persistence.*;

import infolibras.entidades.*;

public class TermoGerente {

	EntityManagerFactory emf;
	EntityManager em;

	public TermoGerente() {
		emf = Persistence.createEntityManagerFactory("Infolibras");
		em = emf.createEntityManager();
	}

	public void adicionar(Termo t) {
		em.getTransaction().begin();
		em.persist(t);
		em.getTransaction().commit();
	}

	public Termo recuperar(int id) {
		return em.find(Termo.class, id);
	}

	public void atualizar(Termo t) {
		em.getTransaction().begin();
		em.merge(t);
		em.getTransaction().commit();
	}

	public void remover(Termo t) {
		em.getTransaction().begin();
		em.remove(t);
		em.getTransaction().commit();
	}

	public void encerrar() {
		em.close();
		emf.close();
	}

}
