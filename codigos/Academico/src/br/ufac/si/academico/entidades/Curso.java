package br.ufac.si.academico.entidades;

import javax.persistence.*;

@Entity
@Table(name="cursos")
@NamedQueries({
	@NamedQuery(name="Curso.todos", 
		query="SELECT c FROM Curso c"), 
	@NamedQuery(name="Curso.todosPorNome", 
		query="SELECT c FROM Curso c ORDER BY c.nome"),
	@NamedQuery(name="Curso.todosPorNomeContendo", 
		query="SELECT c FROM Curso c WHERE c.nome LIKE :termo ORDER BY c.nome")		
})
public class Curso {
	
	@Id
	private int codigo;
	@Column(length=50, nullable=false)
	private String nome;
	
	public Curso () {}
	
	public Curso(int codigo, String nome) {
		this.codigo = codigo;
		this.nome = nome;
	}

	public int getCodigo() {
		return codigo;
	}

	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
	//SOBRESCREVENDO PARA APRESENTAR ALGO LEGÍVEL
	public String toString() {
		return String.format("Curso [codigo=%d, nome=\"%s\"]", 
				this.codigo, 
				this.nome);
	}

	//SOBRESCREVENDO PARA COMPARAR UM CURSO COM OUTROS OBJETOS
	public boolean equals(Object value) {

		if ((value == null) || !(value instanceof Curso)) {
			return false;
		}
		Curso other = (Curso) value;
		return this.codigo == other.codigo;
	}
	
 }
