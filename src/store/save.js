import Axios from "axios";

export default {
    state: {
        findings: []
    },
    actions: {
        async saveForm (html) {
        Axios
            .post('api/builderForm.php',{pageName: 'sad', html })
            .then(r => r.data)
            .then(response => {
                const fileName = response;
                Axios
                    .get('api/' + fileName, {responseType: 'blob'})
                    .then(response => {
                        let fileURL = window.URL.createObjectURL(new Blob([response.data]));
                        let fileLink = document.createElement('a');
                        fileLink.href = fileURL;
                        fileLink.setAttribute('download', 'file.zip');
                        document.body.appendChild(fileLink);
                        fileLink.click();
                    })
                    .then(() => {
                        console.log('delete')
                        Axios.post('api/deleteForm.php', {fileName: fileName})
                    })
                    .catch(error => {
                        console.log('Error')
                        throw error
                    });
            })
            .catch(error => {
                console.log('Error')
                throw error
            });
        }
    },
}
