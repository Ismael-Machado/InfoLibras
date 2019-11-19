package infolibras.entidades;

import javax.persistence.*;

@Entity
@Table(name = "termos")
public class Termo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String nome;
	private String descricao;

	@ManyToOne(cascade = { CascadeType.ALL })
	@JoinColumn(name = "fk_usuario")
	private Usuario user;

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

	@Override
	public String toString() {
		return "Termo [id=" + id + ", nome=" + nome + ", descricao=" + descricao + ", user=" + user + "]";
	}

}
