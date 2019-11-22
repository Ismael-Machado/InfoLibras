package br.ufac.si.es.infoLibras.controladores;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.faces.bean.*;

import org.primefaces.model.DefaultStreamedContent;
import org.primefaces.model.StreamedContent;

@ManagedBean
@RequestScoped
public class ImagemControlador {
	
	@ManagedProperty("#param.caminho}")
	private String caminho;
	private StreamedContent foto;

	public String getCaminho() {
		return caminho;
	}

	public void setCaminho(String caminho) {
		this.caminho = caminho;
	}

	public StreamedContent getFoto() {
		try {
		Path path = Paths.get(caminho);
		InputStream is = Files.newInputStream(path);
		foto = new DefaultStreamedContent(is);
		}catch(IOException e) {
			e.getMessage();
		}
		
		return foto;
	}

	public void setFoto(StreamedContent foto) {
		this.foto = foto;
	}

}
