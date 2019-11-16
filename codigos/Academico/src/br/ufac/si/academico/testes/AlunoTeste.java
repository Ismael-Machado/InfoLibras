package br.ufac.si.academico.testes;

import br.ufac.si.academico.gerentes.*;
import br.ufac.si.academico.entidades.*;
import java.util.*;

public class AlunoTeste {
	
	public static void main(String[] args) {
		
		AlunoGerente ag = new AlunoGerente();
		CursoGerente cg = new CursoGerente();
		Aluno a1, a2, a3, a4, a5;
		Curso c1, c2, c3, c4;
		List<Aluno> alunos;
		
		c1 = cg.recuperar(1);
		c2 = cg.recuperar(2);
		c3 = cg.recuperar(3);
		c4 = cg.recuperar(30);
		
		a1 = new Aluno(123, "José", "Rua J", "", "123", "M", c1);
		a2 = new Aluno(456, "Maria", "Rua M", "", "456", "F", c2);
		a3 = new Aluno(789, "Jenniffer", "Rua J", "", "789", "F", c3);
		a4 = new Aluno(171, "Marcelo", "Rua M", "", "171", "M", c4);
		a5 = new Aluno(777, "Erick", "Rua E", "", "777", "M", c4);
		
		ag.adicionar(a1);
		ag.adicionar(a2);
		ag.adicionar(a3);
		ag.adicionar(a4);
		ag.adicionar(a5);
		
		alunos = ag.recuperarTodos();	
		System.out.println("Listando alunos...");
		for (Aluno aluno : alunos) {
			System.out.println(aluno); // EXIGIU REESCRITA DO toString
		}
		
		ag.encerrar();
	}
	
}
