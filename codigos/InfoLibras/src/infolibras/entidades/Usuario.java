package infolibras.entidades;
import java.sql.Date;

import javax.persistence.*;

@Entity
@Table(name = "usuarios")
@NamedQueries({
	@NamedQuery(name="Usuario.todos", 
			query="SELECT u FROM Usuario u"),
	@NamedQuery(name="Usuario.todosPorNome",
			query="SELECT u FROM Usuario u ORDER BY u.nome"),
	@NamedQuery(name="Usuario.todosPorNomeContendo", 
		query="SELECT u FROM Usuario u WHERE u.nome LIKE :termo ORDER BY u.nome")
})
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String nome;
	private String telefone;
	private String email;
	private Date nascimento;
	private Date dataCadastro;
	private String sexo;
	private int tipo;

	public Usuario() {

	}

	public Usuario(int id, String nome, String telefone, String email, Date nascimento, Date dataCadastro, String sexo,
			int tipo) {
		super();
		this.id = id;
		this.nome = nome;
		this.telefone = telefone;
		this.email = email;
		this.nascimento = nascimento;
		this.dataCadastro = dataCadastro;
		this.sexo = sexo;
		this.tipo = tipo;
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

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getNascimento() {
		return nascimento;
	}

	public void setNascimento(Date nascimento) {
		this.nascimento = nascimento;
	}

	public Date getDataCadastro() {
		return dataCadastro;
	}

	public void setDataCadastro(Date dataCadastro) {
		this.dataCadastro = dataCadastro;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public int getTipo() {
		return tipo;
	}

	public void setTipo(int tipo) {
		this.tipo = tipo;
	}

	@Override
	public String toString() {
		return "Usuario [id=" + id + ", nome=" + nome + ", telefone=" + telefone + ", email=" + email + ", nascimento="
				+ nascimento + ", dataCadastro=" + dataCadastro + ", sexo=" + sexo + ", tipo=" + tipo + "]";
	}

}
