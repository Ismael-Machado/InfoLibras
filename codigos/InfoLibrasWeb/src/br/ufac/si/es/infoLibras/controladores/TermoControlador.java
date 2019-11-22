package br.ufac.si.es.infoLibras.controladores;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.faces.bean.*;

import org.primefaces.event.FileUploadEvent;
import org.primefaces.model.UploadedFile;

import infolibras.entidades.*;
import infolibras.gerentes.*;
import org.primefaces.component.lifecycle.LifecyclePhaseListener;
@SuppressWarnings("serial")
@ManagedBean(name = "termoControlador")
@ViewScoped
public class TermoControlador {
	private TermoGerente tg;
	private Termo termo;
	private String chave = "";

	public TermoControlador() {
		tg = new TermoGerente();
	}

	public String add() {
		this.termo = new Termo();
		return "addTemo";
	}

	public String adicionar() {
		this.termo = new Termo();
		tg.adicionar(this.termo);

		return "addTemo";
	}

	// m�todo adicionar-atualizar copiando o arquivo de imagem tempor�rio e colando
	// no diret�rio local
	// definindo o nome do arquivo como o mesmo nome da chave prim�ria que foi
	// atribu�do
	public String atualizar() {
		// Instaciando um objeto tempor�rio para guardar o id que ser� inserido no banco
		Termo termoRetorno;
		termoRetorno = (Termo) tg.atualizar(this.termo);

		// pegando origem do caminho tempor�rio
		Path origem = Paths.get(termo.getCaminho());
		// definindo o destino que o arquivo ser� salvo
		Path destino = Paths.get("C:/termosUploads" + termoRetorno.getId() + ".gif");

		try {
			// copiando da origem pro destino;
			Files.copy(origem, destino, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException erro) {
			erro.getMessage();
		}
		return "addTemo";
	}

	public Termo getTermo() {
		return termo;
	}

	public void setTermo(Termo termo) {
		this.termo = termo;
	}

	public String getChave() {
		return chave;
	}

	public void setChave(String chave) {
		this.chave = chave;
	}

	// m�todo para realizar upload de imagem salvando em uma pasta local da m�quina
	// local
	// e armazenando no banco de dados somente o caminho do arquivo
	public void upload(FileUploadEvent evento) {
		try {
			System.out.println("chamou o m�todo");
			UploadedFile arquivoUpload = evento.getFile();
			Path arquivoTemp = Files.createTempFile(null, null);
			Files.copy(arquivoUpload.getInputstream(), arquivoTemp, StandardCopyOption.REPLACE_EXISTING);
			termo.setCaminho(arquivoTemp.toString());
		} catch (IOException erro) {
			erro.printStackTrace();
		}
	}
}
