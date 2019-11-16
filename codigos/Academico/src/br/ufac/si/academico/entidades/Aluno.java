package br.ufac.si.academico.entidades;

import javax.persistence.*;

@Entity
@NamedQueries({
	@NamedQuery(name="Aluno.todos", 
		query="SELECT a FROM Aluno a"), 
	@NamedQuery(name="Aluno.todosPorNome", 
		query="SELECT a FROM Aluno a ORDER BY a.nome"),
	@NamedQuery(name="Aluno.todosPorNomeContendo", 
		query="SELECT a FROM Aluno a WHERE a.nome LIKE :termo ORDER BY a.nome")		
})
@Table(name="alunos")
public class Aluno {

	@Id
	private long matricula;
	
	@Column(nullable=false, length=50)
	private String nome;
	@Column(nullable=false, length=60)
	private String endereco;
	@Column(nullable=false, length=11)
	private String fone;
	@Column(nullable=true, length=8)
	private String cep;
	@Column(nullable=false, length=1)
	private String sexo;

	@ManyToOne()
	@JoinColumn(name="curso")
	private Curso curso;
	
	public Aluno () {}
	
	public Aluno(long matricula, String nome, String endereco, String fone, String cep, String sexo, Curso curso) {
		this.matricula = matricula;
		this.nome = nome;
		this.endereco = endereco;
		this.fone = fone;
		this.cep = cep;
		this.sexo = sexo;
		this.curso = curso;
	}

	public long getMatricula() {
		return matricula;
	}

	public void setMatricula(long matricula) {
		this.matricula = matricula;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getFone() {
		return fone;
	}

	public void setFone(String fone) {
		this.fone = fone;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public Curso getCurso() {
		return curso;
	}

	public void setCurso(Curso curso) {
		this.curso = curso;
	}

	//SOBRESCREVENDO PARA APRESENTAR ALGO LEGÍVEL
	public String toString() {
		return String.format("Aluno [matricula=%d, "
				+ "nome=\"%s\", "
				+ "endereco=\"%s\", "
				+ "fone=\"%s\", "
				+ "cep=\"%s\", "
				+ "sexo=\"%s\", "
				+ "curso=\"%s\"]", 
				this.matricula, 
				this.nome,
				this.endereco,
				this.fone,
				this.cep,
				this.sexo,
				this.curso);
	}
}
