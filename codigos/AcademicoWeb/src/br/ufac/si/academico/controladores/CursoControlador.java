package br.ufac.si.academico.controladores;

import java.util.*;
import javax.faces.bean.*;

import br.ufac.si.academico.entidades.*;
import br.ufac.si.academico.gerentes.*;

@ManagedBean(name="cursoControlador")
@SessionScoped
public class CursoControlador {

	private CursoGerente cg;
	private Curso curso;
	private String chave = "";
	
	public CursoControlador() {
		cg = new CursoGerente();
	}

	public String incluir() {
		this.curso = new Curso();
		return "cursoInclusao";
	}
	
	public String editar(Curso curso) {
		this.curso = curso;
		return "cursoEdicao";
	}

	public String excluir(Curso curso) {
		this.curso = curso;
		return "cursoExclusao";
	}
	
	public String adicionar() {
		cg.adicionar(curso);
		return "cursoGerenciamento";
	}
	
	public String atualizar() {
		cg.atualizar(curso);
		return "cursoGerenciamento";
	}
	
	public String remover() {
		cg.remover(curso);
		return "cursoGerenciamento";
	}

	public Curso getCurso() {
		return curso;
	}

	public void setCurso(Curso curso) {
		this.curso = curso;
	}

	public Curso recuperar(int codigo) {
		return cg.recuperar(codigo);
	}
	
	public List<Curso> getCursos() {
		return cg.recuperarTodos();
	}
	
	public List<Curso> getCursosPorNome(){
		return cg.recuperarTodosPorNome();
	}
	
	public List<Curso> 
		getCursosPorNomeContendo(){
		return cg.recuperarTodosPorNomeContendo(chave);
	}

	public String getChave() {
		return chave;
	}

	public void setChave(String chave) {
		this.chave = chave;
	}
	
}
