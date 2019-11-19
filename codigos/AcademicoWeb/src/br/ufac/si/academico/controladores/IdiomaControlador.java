package br.ufac.si.academico.controladores;

import java.util.*;
import javax.faces.bean.*;
import javax.faces.context.FacesContext;

import br.ufac.si.academico.entidades.*;
import br.ufac.si.academico.gerentes.*;

@ManagedBean(name = "idiomaControlador")
@SessionScoped
public class IdiomaControlador {

	private String linguagem = "pt";

//	private Locale localidade = new Locale(linguagem);
	private Locale localidade = FacesContext.getCurrentInstance().getViewRoot().getLocale();

	public Locale getLocalidade() {
		return localidade;
	}

	public String getLinguagem() {
		return linguagem;
	}

	public void setLinguagem(String linguagem) {

		this.linguagem = linguagem;
	}

	public void mudar() {
		this.localidade = new Locale(linguagem);
		FacesContext.getCurrentInstance().getViewRoot().setLocale(localidade);
	}
}
