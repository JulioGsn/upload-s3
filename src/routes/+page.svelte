<script lang="ts">
    export let data;

    // export let { uploadURL } = data; It's work as well ;)

    console.log("data", data);

    let inputFileUpload: HTMLInputElement;

    let msg = "";

    async function uploadImageToS3() {
        msg = "";
        const file = inputFileUpload?.files[0];

        if(!file) {
            msg = "Selecione uma imagem para fazer upload";
            return;
        }

        msg = "Fazendo upload... " + file.name;

        try {

            await fetch(data.uploadURL, {
                method: "PUT",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: file // imagem
            });

            msg = "";

            let imageURL = data.uploadURL.split('?')[0];

            const image = document.createElement('img');
            image.src = imageURL;
            image.style.maxWidth = "100%";
            image.style.maxHeight = "100%";

            const imageContainer = document.getElementById('img');
            imageContainer?.appendChild(image);

        } catch (err) {
            console.log("Error", err);
        }


    }
</script>

<div class="main">
    <h1>Upload S3</h1>
    
    <form action="" on:submit={uploadImageToS3}>
        <input type="file" accept=".png, .jpeg" id="input-file-upload" bind:this={inputFileUpload}>
        <button class="btn">Salvar</button>
        <br>
        {msg}
    </form>

    <div id="img"></div>
</div>

<style>
    .main {
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .main h1 {
        font-size: 3rem;
    }

    .main form {
        max-width: 300px;
        display: flex;
        flex-direction: column;
        gap: 50px;
    }

    .main #img {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 800px;
        height: 600px;
        border: 1px dotted;
        padding: 5px;
    }
</style>