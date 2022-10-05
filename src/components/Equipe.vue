<template>
    <div class="row">
        <div class="col-2" v-text="dados.enfermeiro" />
        <div class="col-2" v-text="dados.socorrista" />
        <div class="col-2" v-text="dados.medico" />
        <div class="col-2" v-text="dados.carro" />
        <div class="col-2" v-text="dados.telefone" />
        <div class="col-2" v-text="dados.kitDeReanimacao" />
    </div>
</template>

<script>
export default {
    name: 'Equipe',
    props: {
        dados: Object
    }
}
</script>