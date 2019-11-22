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

	public Object atualizar(Termo t) {
		//definindo um objeto de retorno para guardar o objetivo que ser� inserido ou atualizado
		//para poder pegar o id do objeto logo ap�s a inser��o no banco
		//para no mesmo momento pegar esse id e usar como nome para armazenar a imagem no diret�rio local
		Object retorno;
		
		em.getTransaction().begin();
		retorno = (Object) em.merge(t);
		em.getTransaction().commit();
		
		return retorno;
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
	
	@SuppressWarnings("unchecked")
	public List<Termo> recuperarTodos(){
		return em.createNamedQuery("Termo.todos").getResultList();
	}
	
	@SuppressWarnings("unchecked")
	public List<Termo> recuperarTodosPorNome(){
		return em.createNamedQuery("Termo.todosPorNome")
				.getResultList();
	}
	@SuppressWarnings("unchecked")
	public List<Termo> recuperarTodosPorNomeContendo(String termo){
		return em
				.createNamedQuery("Termo.todosPorNomeContendo")
				.setParameter("termo", "%"+termo+"%")
				.getResultList();
	}
}
