const { ApolloServer, gql } = require('apollo-server')
const { importSchema } = require('graphql-import')

const perfis = [
  { id: 1, nome: 'comum' },
  { id: 2, nome: 'administrador' }
]

const usuarios = [
  {
    id: 1,
    nome: 'Elisa',
    email: 'ea@email.com',
    idade: 59,
    perfil_id: 2
  },
  {
    id: 2,
    nome: 'Mariana',
    email: 'mari@email.com',
    idade: 12,
    perfil_id: 1
  },
  {
    id: 3,
    nome: 'Marcelo',
    email: 'ma@email.com',
    idade: 54,
    perfil_id: 2
  },
  {
    id: 4,
    nome: 'Fernando',
    email: 'fe@email.com',
    idade: 12,
    perfil_id: 1
  },
  {
    id: 5,
    nome: 'Giulia',
    email: 'giu@email.com',
    idade: 4,
    perfil_id: 1
  }
]

const resolvers = {

  Produto: {
    precoComDesconto(produto) {
      if (produto.desconto) {
        return produto.preco * (1 - produto.desconto)
      } else {
        return produto.preco
      }
    }
  },

  Usuario: {
    salario(usuario) {
      return usuario.salario_real
    },
    perfil(usuario) {
      const selecionados = perfis
        .filter(p => p.id == usuario.perfil_id)
      return selecionados ? selecionados[0] : null
    }
  },

  Query: {
    ola() {
      return 'Bom dia!'
    },
    horaAtual() {
      return new Date
    },
    usuarioLogado() {
      return {
        id: 1,
        nome: 'Marcelo',
        email: 'marcelo.okasaki@email.com',
        idade: 54,
        salario_real: 100000.19,
        vip: true
      }
    },
    produtoEmDestaque() {
      return {
        nome: 'Notebook Gamer',
        preco: 7000.99,
        desconto: 0.15
      }
    },
    numerosMegaSena() {
      const crescente = (a, b) => a - b
      return Array(6).fill(0)
        .map(n => parseInt(Math.random() * 60 + 1))
        .sort(crescente)
    },
    usuarios() {
      return usuarios
    },
    usuario(_, { id }) {
      const selecionados = usuarios
        .filter(u => u.id == id)
      return selecionados ? selecionados[0] : null
    },
    perfis() {
      return perfis
    },
    perfil(_, { id }) {
      const selecionados = perfis
        .filter(p => p.id == id)
      return selecionados ? selecionados[0] : null
    }
  }
}

const server = new ApolloServer({
  typeDefs: importSchema('./schema/index.graphql'),
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Executando em ${url}`)
})
