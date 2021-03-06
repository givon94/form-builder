import Axios from "axios";

export default {
    actions: {
        async saveForm ({commit}, {form, attr_name}) {
        Axios
            .post('api/builderForm.php', {'html': form, 'attr_name': attr_name} )
            .then(r => r.data)
            .then(response => {
                const fileName = response;
                console.log(response)
                Axios
                    .get('api/' + fileName, {responseType: 'blob'})
                    .then(response => {
                        let fileURL = window.URL.createObjectURL(new Blob([response.data]));
                        let fileLink = document.createElement('a');
                        fileLink.href = fileURL;
                        fileLink.setAttribute('download', 'form-builder.zip');
                        document.body.appendChild(fileLink);
                        fileLink.click();
                    })
                    .then(() => {
                        Axios.post('api/deleteForm.php', {fileName: fileName})
                        commit('setSuccess', 'Форма успешно скачалась')
                    })
                    .catch(error => {
                        commit('setError', 'Произошла ошибка')
                        throw error
                    });
            })
            .catch(error => {
                if (error.response.status === 405) {
                    commit('setError', 'Github не поддерживает выполенние PHP файлов')
                } else {
                    commit('setError', 'Произошла ошибка')
                }
                throw error
            });
        },
    },
}
