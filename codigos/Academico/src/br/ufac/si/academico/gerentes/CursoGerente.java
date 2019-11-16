package br.ufac.si.academico.gerentes;

import java.util.*;

import javax.persistence.*;
import br.ufac.si.academico.entidades.*;

public class CursoGerente {

	private EntityManagerFactory emf;
	private EntityManager em;
	
	public CursoGerente() {
		emf = Persistence.createEntityManagerFactory("Academico");
		em = emf.createEntityManager();
	}

	public void adicionar(Curso curso) {
		em.getTransaction().begin();
		em.persist(curso);
		em.getTransaction().commit();
	}
	
	public Curso recuperar(int id) {
		return em.find(Curso.class, id);
	}
	
	public void atualizar(Curso curso) {
		em.getTransaction().begin();
		em.merge(curso);
		em.getTransaction().commit();
	}
	
	public void remover(Curso curso) {
		em.getTransaction().begin();
		em.remove(curso);
		em.getTransaction().commit();
	}
	
	@SuppressWarnings("unchecked")
	public List<Curso> recuperarTodos(){
		return em.createNamedQuery("Curso.todos")
				.getResultList();	
	}
	@SuppressWarnings("unchecked")
	public List<Curso> recuperarTodosPorNome(){
		return em.createNamedQuery("Curso.todosPorNome")
				.getResultList();
	}
	@SuppressWarnings("unchecked")
	public List<Curso> recuperarTodosPorNomeContendo(String termo){
		return em
				.createNamedQuery("Curso.todosPorNomeContendo")
				.setParameter("termo", "%"+termo+"%")
				.getResultList();
	}	
	
	public void encerrar() {
		em.close();
		emf.close();
	}
}
