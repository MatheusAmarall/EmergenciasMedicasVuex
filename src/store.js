import Vuex from 'vuex'

export default new Vuex.Store({
    state: {
        titulo: 'Emergências Médicas',
        equipe: {
            enfermeiro: '',
            socorrista: '',
            medico: '',
            carro: '',
            telefone: '',
            kitDeReanimacao: ''
        },
        equipes: [],
        enfermeiros: [],
        socorristas: [],
        medicos: [],
        equipamentos: {
            carros: [],
            telefones: [],
            kitsDeReanimacao: []
        }
    },
    getters: {
        totalEnfermeiros(state) {
            return state.enfermeiros.length
        },
        socorristasPorTurno(state) { //closure
            return turno => !turno ? state.socorristas : state.socorristas.filter(s => s.turno === turno)
        },
        totalSocorristas(state) {
            return state.socorristas.length
        },
        totalSocorristasPorTurno(state, getters) {
            return turno => getters.socorristasPorTurno(turno).length
        }
    },
    mutations: {
        //setItemEquipe(state, item) {
        setItemEquipe(state, item) {
            let t = item.tipo
            let d = item.dados

            if(t == 'enfermeiros') state.equipe.enfermeiro = d.nome
            if(t == 'socorristas') state.equipe.socorrista = d.nome
            if(t == 'medicos') state.equipe.medico = d.nome
            if(t == 'carros') state.equipe.carro = d.placa
            if(t == 'telefones') state.equipe.telefone = d.telefone
            if(t == 'kits-de-reanimacao') state.equipe.kitDeReanimacao = d.kit
        },
        setEnfermeiros(state, payload) {
            state.enfermeiros = payload
        },
        setSocorristas(state, payload) {
            state.socorristas = payload
        },
        setMedicos(state, payload) {
            state.medicos = payload
        },
        setCarros(state, {carros}) {
            state.equipamentos.carros = carros
        },
        setTelefones(state, {telefones}) {
            state.equipamentos.telefones = telefones
        },
        setKitsDeReanimacao(state, {kitsDeReanimacao}) {
            state.equipamentos.kitsDeReanimacao = kitsDeReanimacao
        },
        adicionarEquipeEmEquipes(state, payload) {
            console.log(state.equipes)
            state.equipes.push(payload)
            state.equipe = {}
            console.log(state.equipes)
        }
    },
    actions: {
        fetchEquipamentos(context, {carros, telefones, kitsDeReanimacao}) {
            fetch('http://localhost:3001/equipamentos')
                .then(response => response.json())
                .then(dados => {
                    if(carros) context.commit('setCarros', dados)
                    if(telefones) context.commit('setTelefones', dados)
                    if(kitsDeReanimacao) context.commit('setKitsDeReanimacao', dados)
                })
        },
        fetchProfissionais(context) {
            fetch('http://localhost:3001/enfermeiros')
                .then(response => response.json())
                .then(dados => context.commit('setEnfermeiros', dados))

            fetch('http://localhost:3001/socorristas')
                .then(response => response.json())
                .then(dados => context.commit('setSocorristas', dados))

            fetch('http://localhost:3001/medicos')
                .then(response => response.json())
                .then(dados => context.commit('setMedicos', dados))
        }
    }
})