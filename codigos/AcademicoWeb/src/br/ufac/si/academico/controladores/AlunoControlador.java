package br.ufac.si.academico.controladores;

import java.util.*;
import javax.faces.bean.*;

import br.ufac.si.academico.entidades.*;
import br.ufac.si.academico.gerentes.*;

@ManagedBean(name="alunoControlador")
@SessionScoped
public class AlunoControlador {

	private AlunoGerente ag;
//	private CursoGerente cg;
	private Aluno aluno;
	private String chave = "";
//	private int codigoDoCurso;
	
	public AlunoControlador() {
		ag = new AlunoGerente();
//		cg = new CursoGerente();
	}

	public String incluir() {
		this.aluno = new Aluno();
		return "alunoInclusao";
	}
	
	public String editar(Aluno aluno) {
		//codigoDoCurso = aluno.getCurso().getCodigo();
		this.aluno = aluno;
		return "alunoEdicao";
	}

	public String excluir(Aluno aluno) {
		//codigoDoCurso = aluno.getCurso().getCodigo();		
		this.aluno = aluno;
		return "alunoExclusao";
	}
	
	public String adicionar() {
		//aluno.setCurso(cg.recuperar(codigoDoCurso));
		ag.adicionar(aluno);
		return "alunoGerenciamento";
	}
	
	public String atualizar() {
		ag.atualizar(aluno);
		return "alunoGerenciamento";
	}
	
	public String remover() {
		ag.remover(aluno);
		return "alunoGerenciamento";
	}

	public Aluno getAluno() {
		return aluno;
	}

	public void setAluno(Aluno aluno) {
		this.aluno = aluno;
	}

	public List<Aluno> getAlunos() {
		return ag.recuperarTodosPorNomeContendo(chave);
	}

//	public List<Curso> getCursos() {
//		return cg.recuperarTodosPorNome();
//	}
	
	public String getChave() {
		return chave;
	}

	public void setChave(String chave) {
		this.chave = chave;
	}

//	public int getCodigoDoCurso() {
//		return codigoDoCurso;
//	}
//
//	public void setCodigoDoCurso(int codigoDoCurso) {
//		this.codigoDoCurso = codigoDoCurso;
//	}
	
}
