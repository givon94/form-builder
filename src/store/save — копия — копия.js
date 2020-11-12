import Axios from "axios";

export default {
    state: {
        findings: []
    },
    actions: {
        async saveForm (html) {
            const generateForm = await Axios.post('api/downloadForm.php',{pageName: 'sad', html });

            let response = generateForm.data;
            console.log(response)
            if (response){
                console.log('work2');
                const uploadForm = await Axios.get('api/' + response, {responseType: 'blob'});
                response = uploadForm.data;

                let fileURL = window.URL.createObjectURL(new Blob([uploadForm.data]));
                let fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', 'file.zip');
                document.body.appendChild(fileLink);
                fileLink.click();
            } else {
                console.log('no work')
            }
            console.log(response)
        }
    },
}
