package br.ufac.si.es.infoLibras.controladores;

import javax.faces.bean.*;
//import br.ufac.si.recursos.ExibirMensagem;
import infolibras.entidades.*;
import infolibras.gerentes.*;

@ManagedBean(name="usuarioControlador")
@SessionScoped
public class UsuarioControlador {
	private UsuarioGerente ug;
	private Usuario usuario = new Usuario();
	private String chave = "";


	//Contrutor
	public UsuarioControlador() {
		ug = new UsuarioGerente();
	}

	//Metodos get e set
	public String getChave() {
		return chave;
	}

	public void setChave(String chave) {
		this.chave = chave;
	}

	public void setUsuario(Usuario u) {
		this.usuario = u;
	}

	//Método que criar um usuario e retorna a pagina de inserção de usuário
	public String incluir() {
		this.usuario = new Usuario();
		return null;
//		return "/paginas/usuarioInclusao.xhtml?faces-redirect=true";
	}
	
	//Método que atribui o usuario selecionado e retorna a pagina de edição de usuário
	public String editar(Usuario u) {
		this.usuario = u;
		return null;
//			return "/paginas/usuarioEdicao.xhtml?faces-redirect=true";
	}
	
	//Método que atribui o usuario selecionado e retorna a pagina de exclusão de usuário
	public String excluir(Usuario u) {
		this.usuario = u;
		return null;
//			return "/paginas/usuarioExclusao.xhtml?faces-redirect=true";
	}

	//Metodo utilizado para persistir os dados do usuario no banco de dados
	public String adicionar() {
		try {
//			ExibirMensagem.sucesso("Usuario cadastrado com sucesso");
			System.out.println("Usuario cadastrado com sucesso");
			ug.adicionar(this.usuario);

		} catch (Exception e) {
//			ExibirMensagem.error("Erro ao tentar cadastrar usuário :"+e.getMessage());
			System.out.println("Erro ao tentar cadastrar usuário!");
		}
		return "/paginas/usuarioGerenciamento.xhtml";

	}

	//Metodo utilizado para realizar a atualização do usuario no banco de dados
	public String atualizar() {
		try {
			ug.atualizar(this.usuario);
//			ExibirMensagem.sucesso("Usuário atualizado com sucesso!");
			System.out.println("Usuário atualizado com sucesso!");
		} catch (Exception e) {
			System.out.println("Erro ao tentar atualizar usuário !");
//			ExibirMensagem.error("Erro ao tentar atualizar usuário :"+e.getMessage());

		}
		
		return null;
//		return "/paginas/usuarioGerenciamento.xhtml";
	}
	
	//Metodo utilizado para realizar a remoção do usuario no banco de dados
	public String remover() {
		try {
			System.out.println("Usuário removido com sucesso!");
//			ExibirMensagem.sucesso("Usuário removido com sucesso!");
			ug.remover(this.usuario);

		} catch (Exception e) {
//			ExibirMensagem.error("Erro ao tentar remover usuário :"+e.getMessage());
			System.out.println("Erro ao tentar remover usuário!");

		}
		return null;
//		return "/paginas/usuarioGerenciamento.xhtml";
	}

	//Metodo para retornar uma lista de usuarios
//	public List<Usuario> getUsuarios(){
//		return ug.buscarTodosPorNomeContendo(chave);
//	}


	//Metodo para retornar um Usuario
	public Usuario getUsuario() {
		return this.usuario;
	}
	
	//Metodo que retorna o ID do usuario corrente do Table
//	public String carregarUsuario() {
//	
//		String s = ExibirMensagem.getParam("usuID");
//		System.out.println(s);
//		if(s != null) {
//			this.usuario = ug.buscarUsuario(Long.valueOf(s));
//		}
//		return "/paginas/usuarioEdicao.xhtml?faces-redirect=true";
//	}


}
