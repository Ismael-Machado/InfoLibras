package infolibras.entidades;

import javax.persistence.*;

@Entity
@Table(name = "termos")
@NamedQueries({
	@NamedQuery(name="Termo.todos", 
			query="SELECT t FROM Termo t"),
	@NamedQuery(name="Termo.todosPorNome",
			query="SELECT t FROM Termo t ORDER BY t.nome"),
	@NamedQuery(name="Termo.todosPorNomeContendo", 
		query="SELECT t FROM Termo t WHERE t.nome LIKE :termo ORDER BY t.nome")
})
public class Termo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String nome;
	private String descricao;

	@ManyToOne(cascade = { CascadeType.MERGE })
	@JoinColumn(name = "fk_usuario")
	private Usuario user;
	
//	@OneToOne(cascade = { CascadeType.ALL })
//	@JoinColumn(name = "fk_registro")
//	private Registro registro;

	public Termo() {
		super();
	}

	public Termo(int id, String nome, String descricao) {
		super();
		this.id = id;
		this.nome = nome;
		this.descricao = descricao;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Usuario getUser() {
		return user;
	}

	public void setUser(Usuario user) {
		this.user = user;
	}

	
//	public Registro getR() {
//		return registro;
//	}
//
//	public void setR(Registro r) {
//		this.registro = registro;
//	}

	@Override
	public String toString() {
		return "Termo [id=" + id + ", nome=" + nome + ", descricao=" + descricao + ", user=" + user + "]";
	}

}
