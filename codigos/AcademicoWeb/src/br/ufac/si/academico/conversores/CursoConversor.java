package br.ufac.si.academico.conversores;

import javax.faces.component.*;
import javax.faces.context.*;
import javax.faces.convert.*;

import br.ufac.si.academico.entidades.*;
import br.ufac.si.academico.gerentes.*;

@FacesConverter(value="cursoConversor", forClass=Curso.class)
public class CursoConversor implements Converter {

	CursoGerente cg = new CursoGerente();
	
	@Override
	public Object getAsObject(FacesContext context, 
			UIComponent component, String value) {
		if(value == null || value.isEmpty())
			return null;
		return cg.recuperar(Integer.valueOf(value));
	}

	@Override
	public String getAsString(FacesContext context, 
			UIComponent component, Object value) {
		if(value == null || !(value instanceof Curso))
			return "";		// AQUI ESTAVA O GARGALO!
//			return null; 	// ANTES RETORNÁVAMOS null,
//							// ISSO ESTAVA GERANDO O PROBLEMA! 
//							// NA PROXIMA AULA, PERGUNTEM O PORQUÊ?
		return String.valueOf(((Curso)value).getCodigo());
	}

}
