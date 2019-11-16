package br.ufac.si.academico.testes;

import br.ufac.si.academico.gerentes.*;
import br.ufac.si.academico.entidades.*;
import java.util.*;

public class CursoTeste {

	public static void main(String[] args) {
		
		CursoGerente cg = new CursoGerente();
		Curso c1, c2, c3, c30;
		List<Curso> cursos;
		
		c1 = new Curso(1, "Direito");
		c2 = new Curso(2, "Economia");
		c3 = new Curso(3, "Pedagogia");
		c30 = new Curso(30, "Sistemas de Informação");
		
		cg.adicionar(c1);
		cg.adicionar(c2);
		cg.adicionar(c3);
		cg.adicionar(c30);
		
		cursos = cg.recuperarTodos();	
		System.out.println("Listando cursos...");
		for (Curso curso : cursos) {
			System.out.println(curso); // EXIGIU REESCRITA DO toString
		}

		cg.encerrar();
	}

}
