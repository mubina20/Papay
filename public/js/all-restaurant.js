$(function() {

    $(".mb_top").on('change', async function(e) {
        const id = e.target.id;
        const mb_top = e.target.checked ? 'Y' : 'N' ;

        axios
            .post('/resto/all-restaurant/edit', {id: id, mb_top: mb_top})
            .then(response => {
                const result = response.data;

                console.log(response.data);
                if(result.state === 'muvaffaqiyatli') alert("Muvaffaqiyatli o'zgardi");
                else alert(result.message);
            })
            .catch(err => console.log(err))
    });

    $(".mb_status").on('change', function(e) {
        const id = e.target.id;
        const mb_status = $(`#${id}.mb_status`).val();
        console.log("mb_status:", mb_status);
        
        axios
            .post('/resto/all-restaurant/edit', {id: id, mb_status: mb_status})
            .then(response => {
                const result = response.data;
                console.log(response.data);
                if(result.state === 'muvaffaqiyatli') alert("Muvaffaqiyatli o'zgardi");
                else alert(result.message);
            })
            .catch(err => console.log(err));
    });

});