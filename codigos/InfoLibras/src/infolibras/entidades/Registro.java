package infolibras.entidades;

import java.util.*;

import javax.persistence.*;

@Entity
@Table(name = "registros")
public class Registro {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idRegistro;
	private int idUsuario;
	private int idAdmin;
	private String status;
	private String tipoOperacao;
	private Date dataRegistro;
	private Date DataValidacao;
	private String Observacoes;

//	@OneToOne(cascade = CascadeType.ALL)
//	@JoinColumn(name = "fk_termo")
//	private Termo termo;

	public Registro() {

	}

	public Registro(Integer idRegistro, int idUsuario, int idAdmin, String status, String tipoOperacao,
			Date dataRegistro, Date dataValidacao, String observacoes) {
		super();
		this.idRegistro = idRegistro;
		this.idUsuario = idUsuario;
		this.idAdmin = idAdmin;
		this.status = status;
		this.tipoOperacao = tipoOperacao;
		this.dataRegistro = dataRegistro;
		DataValidacao = dataValidacao;
		Observacoes = observacoes;
	}

	public Integer getIdRegistro() {
		return idRegistro;
	}

	public void setIdRegistro(Integer idRegistro) {
		this.idRegistro = idRegistro;
	}

	public int getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(int idUsuario) {
		this.idUsuario = idUsuario;
	}

	public int getIdAdmin() {
		return idAdmin;
	}

	public void setIdAdmin(int idAdmin) {
		this.idAdmin = idAdmin;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTipoOperacao() {
		return tipoOperacao;
	}

	public void setTipoOperacao(String tipoOperacao) {
		this.tipoOperacao = tipoOperacao;
	}

	public Date getDataRegistro() {
		return dataRegistro;
	}

	public void setDataRegistro(Date dataRegistro) {
		this.dataRegistro = dataRegistro;
	}

	public Date getDataValidacao() {
		return DataValidacao;
	}

	public void setDataValidacao(Date dataValidacao) {
		DataValidacao = dataValidacao;
	}

	public String getObservacoes() {
		return Observacoes;
	}

	public void setObservacoes(String observacoes) {
		Observacoes = observacoes;
	}

//	public Termo getTermo() {
//		return termo;
//	}
//
//	public void setTermo(Termo termo) {
//		this.termo = termo;
//	}

	@Override
	public String toString() {
		return "Registro [idRegistro=" + idRegistro + ", idUsuario=" + idUsuario + ", idAdmin=" + idAdmin + ", status="
				+ status + ", tipoOperacao=" + tipoOperacao + ", dataRegistro=" + dataRegistro + ", DataValidacao="
				+ DataValidacao + ", Observacoes=" + Observacoes + "]";
	}

}
