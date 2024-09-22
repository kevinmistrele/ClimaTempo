export default {
    props: {
        forecast: Array
    },
    methods: {
        formatDate(dateString) {
            const options = { weekday: 'long', day: 'numeric', month: 'short' };
            return new Date(dateString).toLocaleDateString('pt-BR', options);
        }
    }
};
