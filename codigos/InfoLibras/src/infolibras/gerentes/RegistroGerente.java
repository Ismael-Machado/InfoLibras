package infolibras.gerentes;

import javax.persistence.*;

import infolibras.entidades.*;

public class RegistroGerente {
	
	EntityManagerFactory emf;
	EntityManager em;
	
	public RegistroGerente() {
		emf = Persistence.createEntityManagerFactory("Infolibras");
		em = emf.createEntityManager();
	}
	
	public void adicionar(Registro r) {
		em.getTransaction().begin();
		em.persist(r);
		em.getTransaction().commit();
	}
	
	public Termo recuperar(Integer id) {
		return em.find(Termo.class, id);
	}
	
	public void atualizar(Registro r) {
		em.getTransaction().begin();
		em.merge(r);
		em.getTransaction().commit();
	}
	
	public void remover(Registro r) {
		em.getTransaction().begin();
		em.remove(r);
		em.getTransaction().commit();
	}
	
	public void encerrar() {
		em.close();
		emf.close();
	}
}
